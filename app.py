import hashlib
import json
import os
import re
import secrets
import smtplib
import threading
from datetime import datetime, timedelta
from email.message import EmailMessage
from urllib.parse import quote

try:
    import pymysql
    pymysql.install_as_MySQLdb()
    import MySQLdb as mysql
    # Esto engaña al código para que use pymysql como si fuera mysql.connector
    mysql.connector = mysql
except ImportError:
    import mysql.connector


CARPETA_WEB = os.path.join(os.path.dirname(os.path.abspath(__file__)), "web")

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "cambiar-por-una-clave-larga-y-secreta")
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
app.config["SESSION_COOKIE_HTTPONLY"] = True

APP_URL = os.getenv("APP_URL", "http://localhost:5001").rstrip("/")
MINUTOS_TOKEN = 60
CLAVE_MINIMA = 6

# Paginas que solo se pueden abrir con sesion iniciada
PAGINAS_PRIVADAS = {"carrito.html", "perfil.html", "admin.html"}
ROLES_ADMIN = ("admin", "admin-content", "admin-sales")

# Administradores de prueba
ADMINISTRADORES = [
    ("Jarman8068@gmail.com", "admin"),
    ("delahozmantillajairjunior@gmail.com", "admin-content"),
    ("Jair.DMantilla@gmail.com", "admin-sales"),
]


# Conexion con la base de datos
def configuracion_bd():
    config = {
        "host": os.getenv("DB_HOST", "localhost"),
        "port": int(os.getenv("DB_PORT", "3306")),
        "user": os.getenv("DB_USER", "root"),
        "password": os.getenv("DB_PASSWORD", ""),
    }
    # Conexion segura (SSL) para bases en la nube
    if os.getenv("DB_SSL", "false").lower() == "true":
        config["ssl_disabled"] = False
        if os.getenv("DB_SSL_CA"):
            config["ssl_ca"] = os.getenv("DB_SSL_CA")
    return config


def conectar():
    return mysql.connector.connect(
        database=os.getenv("DB_NAME", "universo_marvel"),
        **configuracion_bd()
    )


def inicializar_bd():
    """Crea la base, las tablas y los administradores."""
    nombre_bd = os.getenv("DB_NAME", "universo_marvel")

    # En la nube la base ya existe: si no se puede crear, seguimos
    try:
        con = mysql.connector.connect(**configuracion_bd())
        cur = con.cursor()
        cur.execute(f"CREATE DATABASE IF NOT EXISTS `{nombre_bd}` CHARACTER SET utf8mb4")
        cur.close()
        con.close()
    except mysql.connector.Error:
        pass

    con = conectar()
    cur = con.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS usuarios (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(100) NOT NULL,
            correo VARCHAR(150) NOT NULL UNIQUE,
            clave VARCHAR(255) NOT NULL,
            rol ENUM('user','admin','admin-content','admin-sales') NOT NULL DEFAULT 'user',
            foto MEDIUMTEXT NULL,
            creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) CHARACTER SET utf8mb4
    """)
    cur.execute("""
        CREATE TABLE IF NOT EXISTS recuperaciones (
            id INT AUTO_INCREMENT PRIMARY KEY,
            usuario_id INT NOT NULL,
            token_hash CHAR(64) NOT NULL UNIQUE,
            expira DATETIME NOT NULL,
            usado TINYINT(1) NOT NULL DEFAULT 0,
            creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
        ) CHARACTER SET utf8mb4
    """)
    clave_inicial = generate_password_hash(os.getenv("ADMIN_CLAVE_INICIAL", "12345"))
    for correo, rol in ADMINISTRADORES:
        cur.execute(
            "INSERT IGNORE INTO usuarios (nombre, correo, clave, rol) VALUES (%s, %s, %s, %s)",
            (correo.split("@")[0], correo.lower(), clave_inicial, rol)
        )
    con.commit()
    cur.close()
    con.close()


def consultar(sql, params=(), uno=False, escribir=False):
    """Ejecuta una consulta. Devuelve filas, una fila, o el id insertado."""
    con = conectar()
    cur = con.cursor(dictionary=True)
    try:
        cur.execute(sql, params)
        if escribir:
            con.commit()
            return cur.lastrowid
        return cur.fetchone() if uno else cur.fetchall()
    finally:
        cur.close()
        con.close()


# Inicio de sesion (Flask-Login)
login_manager = LoginManager()
login_manager.init_app(app)


class Usuario(UserMixin):
    def __init__(self, datos):
        self.id = datos["id"]
        self.nombre = datos["nombre"]
        self.correo = datos["correo"]
        self.rol = datos["rol"]
        self.foto = datos.get("foto")


@login_manager.user_loader
def cargar_usuario(user_id):
    datos = consultar(
        "SELECT id, nombre, correo, rol, foto FROM usuarios WHERE id = %s",
        (user_id,), uno=True
    )
    return Usuario(datos) if datos else None


@login_manager.unauthorized_handler
def no_autorizado():
    if request.path.startswith("/api/"):
        return jsonify(error="Debes iniciar sesión"), 401
    return redirect("/index.html?siguiente=" + quote(request.path.lstrip("/")))


def datos_de_sesion():
    """Datos de la sesion para el JavaScript."""
    if not current_user.is_authenticated:
        return None
    return {
        "rol": current_user.rol,
        "usuario": {
            "nombre": current_user.nombre,
            "correo": current_user.correo,
            "foto": current_user.foto,
        },
    }


def solo_admin(*roles):
    if not current_user.is_authenticated:
        return jsonify(error="Debes iniciar sesión"), 401
    if current_user.rol not in roles:
        return jsonify(error="No tienes permiso"), 403
    return None


# Funciones de ayuda
def correo_valido(correo):
    return bool(re.fullmatch(r"[^@\s]+@[^@\s]+\.[^@\s]+", correo)) and len(correo) <= 150


def pedir_json():
    return request.get_json(silent=True) or {}


def enviar_correo(destino, asunto, texto):
    """Envia el correo. Sin SMTP, lo muestra en la consola."""
    host = os.getenv("SMTP_HOST")
    if not host:
        print(f"\n--- CORREO (SMTP sin configurar) ---\nPara: {destino}\n{asunto}\n\n{texto}\n------------------------------------\n")
        return

    mensaje = EmailMessage()
    mensaje["Subject"] = asunto
    mensaje["From"] = os.getenv("SMTP_FROM", os.getenv("SMTP_USER", ""))
    mensaje["To"] = destino
    mensaje.set_content(texto)
    puerto = int(os.getenv("SMTP_PORT", "587"))
    try:
        if puerto == 465:
            servidor = smtplib.SMTP_SSL(host, puerto, timeout=15)
        else:
            servidor = smtplib.SMTP(host, puerto, timeout=15)
            servidor.starttls()
        with servidor:
            servidor.login(os.getenv("SMTP_USER", ""), os.getenv("SMTP_PASS", ""))
            servidor.send_message(mensaje)
    except Exception as error:
        print("No se pudo enviar el correo:", error)


def iniciar_sesion_de(datos):
    login_user(Usuario(datos))


# Cuenta: registro, login y perfil
@app.route("/sesion.js")
def sesion_js():
    """Entrega la sesion a cada pagina."""
    codigo = "window.SESION = " + json.dumps(datos_de_sesion()) + ";"
    respuesta = app.response_class(codigo, mimetype="application/javascript")
    respuesta.headers["Cache-Control"] = "no-store"
    return respuesta


@app.route("/api/registro", methods=["POST"])
def api_registro():
    d = pedir_json()
    nombre = str(d.get("nombre", "")).strip()
    correo = str(d.get("correo", "")).strip().lower()
    clave = str(d.get("clave", ""))

    if not nombre or len(nombre) > 100:
        return jsonify(error="Escribe tu nombre"), 400
    if not correo_valido(correo):
        return jsonify(error="Escribe un correo válido"), 400
    if len(clave) < CLAVE_MINIMA:
        return jsonify(error=f"La contraseña debe tener mínimo {CLAVE_MINIMA} caracteres"), 400
    if consultar("SELECT id FROM usuarios WHERE correo = %s", (correo,), uno=True):
        return jsonify(error="Ese correo ya está registrado"), 409

    try:
        nuevo_id = consultar(
            "INSERT INTO usuarios (nombre, correo, clave) VALUES (%s, %s, %s)",
            (nombre, correo, generate_password_hash(clave)), escribir=True
        )
    except mysql.connector.IntegrityError:
        return jsonify(error="Ese correo ya está registrado"), 409

    iniciar_sesion_de({"id": nuevo_id, "nombre": nombre, "correo": correo, "rol": "user", "foto": None})
    return jsonify(ok=True, rol="user")


@app.route("/api/login", methods=["POST"])
def api_login():
    d = pedir_json()
    correo = str(d.get("correo", "")).strip().lower()
    clave = str(d.get("clave", ""))

    datos = consultar("SELECT * FROM usuarios WHERE correo = %s", (correo,), uno=True)
    if not datos or not check_password_hash(datos["clave"], clave):
        return jsonify(error="Correo o contraseña incorrectos"), 401

    iniciar_sesion_de(datos)
    return jsonify(ok=True, rol=datos["rol"])


@app.route("/api/logout", methods=["POST"])
def api_logout():
    logout_user()
    return jsonify(ok=True)


@app.route("/api/perfil", methods=["PUT"])
@login_required
def api_perfil():
    d = pedir_json()
    cambios = {}

    if "nombre" in d:
        nombre = str(d["nombre"]).strip()
        if not nombre or len(nombre) > 100:
            return jsonify(error="Nombre no válido"), 400
        cambios["nombre"] = nombre

    if "correo" in d:
        correo = str(d["correo"]).strip().lower()
        if not correo_valido(correo):
            return jsonify(error="Escribe un correo válido"), 400
        otro = consultar("SELECT id FROM usuarios WHERE correo = %s AND id <> %s", (correo, current_user.id), uno=True)
        if otro:
            return jsonify(error="Ese correo ya está en uso"), 409
        cambios["correo"] = correo

    if "clave" in d:
        actual = consultar("SELECT clave FROM usuarios WHERE id = %s", (current_user.id,), uno=True)
        if not check_password_hash(actual["clave"], str(d.get("clave_actual", ""))):
            return jsonify(error="La contraseña actual no es correcta"), 403
        if len(str(d["clave"])) < CLAVE_MINIMA:
            return jsonify(error=f"La contraseña debe tener mínimo {CLAVE_MINIMA} caracteres"), 400
        cambios["clave"] = generate_password_hash(str(d["clave"]))

    if "foto" in d:
        foto = str(d["foto"])
        if not foto.startswith("data:image/") or len(foto) > 300000:
            return jsonify(error="Imagen no válida"), 400
        cambios["foto"] = foto

    if not cambios:
        return jsonify(error="No hay nada que cambiar"), 400

    # Las columnas salen de este diccionario, no del usuario
    partes = ", ".join(f"{columna} = %s" for columna in cambios)
    consultar(f"UPDATE usuarios SET {partes} WHERE id = %s", (*cambios.values(), current_user.id), escribir=True)

    datos = consultar("SELECT id, nombre, correo, rol, foto FROM usuarios WHERE id = %s", (current_user.id,), uno=True)
    iniciar_sesion_de(datos)
    return jsonify(ok=True, usuario={"nombre": datos["nombre"], "correo": datos["correo"], "foto": datos["foto"]})


# Recuperar contrasena por correo
@app.route("/api/recuperar", methods=["POST"])
def api_recuperar():
    correo = str(pedir_json().get("correo", "")).strip().lower()
    mensaje_igual = jsonify(ok=True, mensaje="Si el correo está registrado, te enviamos un enlace para cambiar tu contraseña. Revisa tu bandeja y el spam.")

    usuario = consultar("SELECT id, nombre FROM usuarios WHERE correo = %s", (correo,), uno=True)
    if not usuario:
        return mensaje_igual  # no revelar si el correo existe

    # Maximo una solicitud por minuto
    reciente = consultar(
        "SELECT id FROM recuperaciones WHERE usuario_id = %s AND creado > NOW() - INTERVAL 60 SECOND",
        (usuario["id"],), uno=True
    )
    if reciente:
        return mensaje_igual

    token = secrets.token_urlsafe(32)
    token_hash = hashlib.sha256(token.encode()).hexdigest()
    expira = datetime.now() + timedelta(minutes=MINUTOS_TOKEN)
    consultar("UPDATE recuperaciones SET usado = 1 WHERE usuario_id = %s", (usuario["id"],), escribir=True)
    consultar(
        "INSERT INTO recuperaciones (usuario_id, token_hash, expira) VALUES (%s, %s, %s)",
        (usuario["id"], token_hash, expira), escribir=True
    )

    enlace = f"{APP_URL}/restablecer.html?token={token}"
    texto = (
        f"Hola {usuario['nombre']},\n\n"
        f"Recibimos una solicitud para cambiar la contraseña de tu cuenta en Universo Marvel.\n"
        f"Entra a este enlace (vale {MINUTOS_TOKEN} minutos y solo se puede usar una vez):\n\n"
        f"{enlace}\n\n"
        f"Si no fuiste tú, ignora este mensaje: tu contraseña sigue igual."
    )
    # Enviar el correo en segundo plano
    threading.Thread(target=enviar_correo, args=(correo, "Recupera tu contraseña - Universo Marvel", texto)).start()
    return mensaje_igual


@app.route("/api/restablecer", methods=["POST"])
def api_restablecer():
    d = pedir_json()
    token = str(d.get("token", ""))
    clave = str(d.get("clave", ""))
    if len(clave) < CLAVE_MINIMA:
        return jsonify(error=f"La contraseña debe tener mínimo {CLAVE_MINIMA} caracteres"), 400

    token_hash = hashlib.sha256(token.encode()).hexdigest()
    fila = consultar(
        "SELECT id, usuario_id FROM recuperaciones WHERE token_hash = %s AND usado = 0 AND expira > %s",
        (token_hash, datetime.now()), uno=True
    )
    if not fila:
        return jsonify(error="El enlace no es válido o ya venció. Pide uno nuevo."), 400

    consultar("UPDATE usuarios SET clave = %s WHERE id = %s", (generate_password_hash(clave), fila["usuario_id"]), escribir=True)
    consultar("UPDATE recuperaciones SET usado = 1 WHERE usuario_id = %s", (fila["usuario_id"],), escribir=True)
    return jsonify(ok=True)


# Administracion de usuarios
@app.route("/api/admin/usuarios", methods=["GET", "POST"])
def api_admin_usuarios():
    error = solo_admin("admin", "admin-content")
    if error:
        return error

    if request.method == "GET":
        filas = consultar("SELECT id, nombre, correo FROM usuarios WHERE rol = 'user' ORDER BY id")
        return jsonify(ok=True, usuarios=filas)

    d = pedir_json()
    nombre = str(d.get("nombre", "")).strip()
    correo = str(d.get("correo", "")).strip().lower()
    clave = str(d.get("clave", ""))
    if not nombre or not correo_valido(correo) or len(clave) < CLAVE_MINIMA:
        return jsonify(error=f"Revisa los datos (contraseña mínimo {CLAVE_MINIMA} caracteres)"), 400
    if consultar("SELECT id FROM usuarios WHERE correo = %s", (correo,), uno=True):
        return jsonify(error="Ese correo ya existe"), 409
    consultar(
        "INSERT INTO usuarios (nombre, correo, clave) VALUES (%s, %s, %s)",
        (nombre, correo, generate_password_hash(clave)), escribir=True
    )
    return jsonify(ok=True)


@app.route("/api/admin/usuarios/<int:usuario_id>", methods=["DELETE"])
def api_admin_borrar(usuario_id):
    error = solo_admin("admin", "admin-content")
    if error:
        return error
    consultar("DELETE FROM usuarios WHERE id = %s AND rol = 'user'", (usuario_id,), escribir=True)
    return jsonify(ok=True)


# Paginas del sitio
@app.route("/")
def raiz():
    return send_from_directory(CARPETA_WEB, "home.html")


@app.route("/<path:ruta>")
def pagina(ruta):
    if ruta in PAGINAS_PRIVADAS:
        if not current_user.is_authenticated:
            return redirect("/index.html?siguiente=" + quote(ruta))
        if ruta == "admin.html" and current_user.rol not in ROLES_ADMIN:
            return redirect("/inicio.html")
    respuesta = send_from_directory(CARPETA_WEB, ruta)
    if ruta.endswith(".html"):
        respuesta.headers["Cache-Control"] = "no-cache"
    return respuesta


if __name__ == "__main__":
    inicializar_bd()
    app.run(debug=True, port=5001)
