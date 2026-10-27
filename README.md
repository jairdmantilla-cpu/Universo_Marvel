# Universo Marvel

Página de Marvel con Flask, Flask-Login y MySQL (local o en la nube, como Aiven).

- Cualquiera ve el universo Marvel, la cronología y el catálogo; para comprar hay que iniciar sesión.
- Recuperar contraseña por correo (SMTP) con enlace de un solo uso.
- Un solo administrador (`Jarman8068@gmail.com`) que gestiona productos, precios, stock, contenido, usuarios y ventas desde `admin.html`.

## Usarlo

1. `python -m pip install -r requirements.txt`
2. Copia `.env.example` como `.env` y llena tus datos.
3. `python app.py` y abre http://localhost:5001.

