// ============================================================
// FUNCIONES QUE USAN TODAS LAS PÁGINAS
// (se carga con <script src="js/comun.js"> después de datos.js)
// ============================================================

// Planes de suscripción
const planes = [
  { nombre: "Marvel Basic", precio: 9.99, descripcion: "Acceso a contenido básico de Marvel" },
  { nombre: "Marvel Plus", precio: 14.99, descripcion: "Contenido completo + Comics digitales" },
  { nombre: "Marvel Ultimate", precio: 24.99, descripcion: "Todo incluido + Merchandising exclusivo" }
];

// ---------- Guardar y leer datos del navegador (localStorage) ----------
function leer(clave, valorPorDefecto) {
  const texto = localStorage.getItem(clave);
  if (texto === null) {
    return valorPorDefecto;
  }
  return JSON.parse(texto);
}

function guardar(clave, valor) {
  localStorage.setItem(clave, JSON.stringify(valor));
}

// ---------- Sesión ----------
// La sesión la maneja el servidor Flask (Flask-Login). /sesion.js define window.SESION
// con { rol, usuario } si hay sesión iniciada, o null si es un visitante.
function obtenerSesion() {
  return window.SESION || null;
}

// Manda al login y, al terminar, vuelve a la página donde estaba el visitante
function irALogin(motivo) {
  let destino = "index.html?siguiente=" + encodeURIComponent(location.pathname.split("/").pop() + location.search);
  if (motivo) {
    destino += "&motivo=" + motivo;
  }
  location.href = destino;
}

// Si no hay sesión, manda al login. Devuelve la sesión.
function exigirSesion() {
  const sesion = obtenerSesion();
  if (sesion === null) {
    irALogin();
  }
  return sesion;
}

function cerrarSesion() {
  fetch("/api/logout", { method: "POST" }).then(function () {
    location.href = "home.html";
  });
}

// Llama a la API del servidor y devuelve { ok, ...respuesta }
async function api(url, metodo, datos) {
  const respuesta = await fetch(url, {
    method: metodo || "GET",
    headers: { "Content-Type": "application/json" },
    body: datos ? JSON.stringify(datos) : undefined
  });
  let cuerpo = {};
  try {
    cuerpo = await respuesta.json();
  } catch (e) {}
  cuerpo.ok = respuesta.ok;
  return cuerpo;
}

// ---------- Menú de arriba (se escribe dentro de <div id="menu">) ----------
function cargarMenu(paginaActual) {
  const sesion = obtenerSesion();
  const paginas = [
    ["cronologia.html", "CRONOLOGIA UCM"],
    ["personajes.html", "PERSONAJES"],
    ["juegos.html", "JUEGOS"],
    ["tienda.html", "TIENDA"]
  ];
  if (sesion) {
    paginas.splice(3, 0, ["perfil.html", "PERFIL"]);
  }

  let enlaces = "";
  for (let i = 0; i < paginas.length; i++) {
    let clase = "";
    if (paginas[i][0] === paginaActual) {
      clase = "activo";
    }
    enlaces += '<a class="' + clase + '" href="' + paginas[i][0] + '">' + paginas[i][1] + "</a>";
  }
  if (sesion && sesion.rol !== "user") {
    enlaces += '<a href="admin.html">ADMIN</a>';
  }

  // Visitante: botones para entrar. Usuario con sesión: cerrar sesión.
  let botonSesion = "";
  if (sesion) {
    botonSesion = '<button class="cerrar" onclick="cerrarSesion()">Cerrar sesión</button>';
  } else {
    botonSesion = '<a class="carrito-nav" href="index.html?siguiente=' + encodeURIComponent(paginaActual) + '">Iniciar sesión</a>' +
      '<a class="carrito-nav" href="registro.html?siguiente=' + encodeURIComponent(paginaActual) + '">Crear cuenta</a>';
  }

  document.getElementById("menu").innerHTML =
    '<div class="navbar">' +
    '  <a class="logo" href="inicio.html">MARVEL</a>' +
    '  <div class="menu">' + enlaces + "</div>" +
    '  <div class="acciones-nav">' +
    '    <a class="carrito-nav" href="carrito.html">🛒 ' + contarCarrito() + "</a>" +
    botonSesion +
    "  </div>" +
    "</div>";
}

// ---------- Carrito y stock ----------
// El carrito se guarda como lista de { id, cantidad }
function contarCarrito() {
  const carrito = leer("carrito", []);
  let total = 0;
  for (let i = 0; i < carrito.length; i++) {
    total += carrito[i].cantidad;
  }
  return total;
}

// Stock = stock inicial - unidades vendidas
function stockDisponible(producto) {
  const vendidos = leer("vendidos", {});
  const cantidadVendida = vendidos[producto.id] || 0;
  return Math.max(0, producto.stock - cantidadVendida);
}

// ---------- Utilidades ----------
function buscarPorId(lista, id) {
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].id == id) {
      return lista[i];
    }
  }
  return null;
}

function dinero(numero) {
  return "$" + Number(numero).toFixed(2);
}

function fechaHoy() {
  return new Date().toISOString().slice(0, 10);
}

// Evita que un texto escrito por el usuario rompa el HTML
function escapar(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML.replace(/"/g, "&quot;");
}

// Lee el parámetro ?id=3 de la dirección de la página
function leerIdDeLaUrl() {
  return new URLSearchParams(location.search).get("id");
}

// Revisa los datos de la tarjeta (número, vencimiento MM/AA y CVV)
function tarjetaValida(numero, vencimiento, cvv) {
  const soloNumeros = numero.replace(/\s/g, "");
  const numeroOk = /^\d{13,19}$/.test(soloNumeros);
  const vencimientoOk = /^(0[1-9]|1[0-2])\/\d{2}$/.test(vencimiento);
  const cvvOk = /^\d{3,4}$/.test(cvv);
  if (numeroOk && vencimientoOk && cvvOk) {
    return true;
  }
  alert("Revisa la tarjeta: número (13 a 19 dígitos), vencimiento MM/AA y CVV (3 o 4 dígitos).");
  return false;
}

// ---------- Datos de prueba para el panel de ventas ----------
function crearDatosDePrueba() {
  if (leer("ventas", null) === null) {
    guardar("ventas", [
      { id: "V1001", cliente: "Ana Pérez", correo: "ana@correo.com", productos: [{ nombre: "Figura Thor", cantidad: 1, precio: 54.99 }], total: 54.99, fecha: "2026-10-02", estado: "completada" },
      { id: "V1002", cliente: "Luis Gómez", correo: "luis@correo.com", productos: [{ nombre: "Cómic Iron Man", cantidad: 2, precio: 19.99 }, { nombre: "Pin Logo Marvel", cantidad: 1, precio: 9.99 }], total: 49.97, fecha: "2026-10-09", estado: "pendiente" },
      { id: "V1003", cliente: "Marta Ruiz", correo: "marta@correo.com", productos: [{ nombre: "Spider-Man 2", cantidad: 1, precio: 69.99 }], total: 69.99, fecha: "2026-10-12", estado: "cancelada" }
    ]);
  }
  if (leer("suscripciones", null) === null) {
    guardar("suscripciones", [
      { id: "S1001", usuario: "Ana Pérez", correo: "ana@correo.com", plan: "Marvel Plus", precio: 14.99, inicio: "2026-09-15", proximoCobro: "2026-11-15", estado: "activa" },
      { id: "S1002", usuario: "Luis Gómez", correo: "luis@correo.com", plan: "Marvel Basic", precio: 9.99, inicio: "2026-07-01", proximoCobro: "2026-08-01", estado: "vencida" }
    ]);
  }
}
crearDatosDePrueba();
