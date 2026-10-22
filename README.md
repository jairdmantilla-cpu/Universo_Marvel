# Universo Marvel

Página web de Marvel hecha con HTML, CSS y JavaScript, y un servidor en Python (Flask).
Los usuarios se guardan en una base de datos MySQL.

## ¿Qué hace?

- Cualquier persona puede ver: inicio, cómics, cronología, personajes, juegos y la tienda.
- Para comprar hay que iniciar sesión (o crear una cuenta).
- Si olvidas tu contraseña, te llega un correo con un enlace para cambiarla.

## Qué hay en la carpeta

- `app.py`: el servidor.
- `web/`: las páginas de la web.
- `.env`: tus datos privados (base de datos, correo). No se sube a GitHub.
- `requirements.txt`: lo que hay que instalar.

## Cómo usarlo

1. Instala lo necesario:

   ```
   python -m pip install -r requirements.txt
   ```

2. Crea un archivo llamado `.env` (con el punto al inicio) junto a `app.py` con tus datos:

   ```
   SECRET_KEY=103d5db2889ac44ec2b08b659a4acd4440ce7cce0badb938fcfdab67939d9080
   APP_URL=http://localhost:5001

   DB_HOST=mysql-351763be-jair-9edb.g.aivencloud.com
   DB_PORT=15879
   DB_USER=avnadmin
   DB_PASSWORD=AVNS_GpFLRf2xyXgq__Hi7i2
   DB_NAME=defaultdb
   DB_SSL=true

   ADMIN_CLAVE_INICIAL=12345

   SMTP_HOST=
   SMTP_PORT=587
   SMTP_USER=
   SMTP_PASS=
   SMTP_FROM=
   ```

   - Con la base de datos local (XAMPP): `DB_HOST=localhost`, `DB_PORT=3306`, `DB_USER=root`, `DB_PASSWORD=` vacío, `DB_NAME=universo_marvel` y `DB_SSL=false`.
   - Con Aiven: copia los datos de tu servicio (Overview → Connection information).

3. Ejecuta el servidor:

   ```
   python app.py
   ```

4. Abre http://localhost:5001 en el navegador.

La primera vez, el programa crea las tablas y los administradores solo.

## Recuperar contraseña

- Si `SMTP_HOST` está vacío, el correo no se envía: el enlace aparece en la consola donde corre `python app.py`.
- Para enviar correos reales con Gmail, llena los `SMTP_*` (`SMTP_HOST=smtp.gmail.com`, tu correo y una contraseña de aplicación de Google).

## Administradores de prueba

| Correo | Rol |
|---|---|
| Jarman8068@gmail.com | admin |
| delahozmantillajairjunior@gmail.com | admin-content |
| Jair.DMantilla@gmail.com | admin-sales |

Su clave es la de `ADMIN_CLAVE_INICIAL` (por defecto `12345`).

## Errores comunes

- `No module named 'flask_login'`: falta instalar. Repite el paso 1.
- `Can't connect ... localhost`: el `.env` no se está leyendo. Revisa que se llame exactamente `.env` y esté junto a `app.py`.
- `Access denied`: el usuario o la contraseña de la base de datos están mal.

## Pendiente

El carrito, las ventas y las suscripciones todavía se guardan en el navegador (`localStorage`), no en MySQL.
