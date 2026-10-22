// ============================================================
// DATOS DEL SITIO
// Aquí están todos los textos, imágenes y videos que usan las páginas.
// Para agregar un cómic, un juego o un producto basta con añadirlo a la lista.
// ============================================================

// Cómics (textos del original)
const comics = [
  {
    "id": 1,
    "titulo": "Doctor Strange #1",
    "imagen": "img/comic_1.jpg",
    "anio": "2025",
    "autor": "Marvel Comics",
    "sinopsis": "El Doctor Strange se enfrenta a nuevas amenazas mágicas que ponen en peligro el equilibrio del universo. En esta aventura, Stephen Strange debe usar todo su conocimiento del misticismo para proteger la realidad.",
    "personajes": "Doctor Strange, Wong, enemigos del multiverso.",
    "colorTitulo": "#ff2a2a"
  },
  {
    "id": 2,
    "titulo": "Hulk: Smash Everything",
    "imagen": "img/comic_2.jpg",
    "anio": "2025",
    "autor": "Ryan North (guion) y Vincenzo Carratù (arte) - Marvel Comics",
    "sinopsis": "Hulk se embarca en una historia extrema donde pone a prueba su fuerza como nunca antes. En cada número, se enfrenta a desafíos cada vez más absurdos y poderosos, desde dinosaurios hasta fuerzas cósmicas y elementos del universo mismo. La serie lleva al límite la pregunta: ¿Hulk es realmente el ser más fuerte que existe?",
    "personajes": "Hulk (Bruce Banner), criaturas prehistóricas, entidades cósmicas y fuerzas del universo.",
    "colorTitulo": "#00ff88"
  },
  {
    "id": 3,
    "titulo": "Laura Kinney: Sabretooth #3",
    "imagen": "img/comic_3.jpg",
    "anio": "2025",
    "autor": "Erica Schultz (guion) y Valentina Pinti (arte) - Marvel Comics",
    "sinopsis": "Laura Kinney se enfrenta a una de las decisiones más difíciles de su vida mientras la historia se traslada a Arakko, un territorio ligado a los mutantes y a Apocalypse. En medio del conflicto y un futuro incierto, Laura debe elegir entre proteger a su familia o mantenerse fiel a su misión. Esta elección desencadena consecuencias oscuras que cambian su camino para siempre.",
    "personajes": "Laura Kinney (X-23), Sabretooth, Apocalypse y mutantes de Arakko.",
    "colorTitulo": "#ff2a2a"
  },
  {
    "id": 4,
    "titulo": "Miles Morales: Spider-Man #41",
    "imagen": "img/comic_4.jpg",
    "anio": "2025",
    "autor": "Cody Ziglar (guion) y Marco Renna (arte) - Marvel Comics",
    "sinopsis": "Miles Morales continúa una intensa batalla contra Rabble, una enemiga que ha estado planeando su venganza durante años. En este enfrentamiento, el pasado de Miles vuelve para perseguirlo, llevando la pelea a un nivel mucho más personal. La situación se vuelve cada vez más peligrosa, poniendo en riesgo no solo a Miles, sino también a las personas que lo rodean. Esta es una lucha donde las consecuencias serán inevitables.",
    "personajes": "Miles Morales (Spider-Man), Rabble y aliados cercanos de Miles.",
    "colorTitulo": "#ff2a2a"
  },
  {
    "id": 5,
    "titulo": "Black Cat #8",
    "imagen": "img/comic_5.jpg",
    "anio": "2026",
    "autor": "G. Willow Wilson (guion) y Gleb Melnikov (arte) - Marvel Comics",
    "sinopsis": "Felicia Hardy, conocida como Black Cat, se embarca en un ambicioso robo junto a Venom, pero lo que parecía un golpe sencillo rápidamente se convierte en un caos multiversal. Al infiltrarse en uno de los lugares más protegidos, desencadenan una serie de eventos fuera de control. Además, la situación se vuelve personal al involucrar a Mary Jane, haciendo que el conflicto sea aún más peligroso y emocional. A pesar del riesgo, Black Cat no está dispuesta a retirarse sin luchar hasta el final.",
    "personajes": "Black Cat (Felicia Hardy), Venom, Mary Jane Watson y amenazas del multiverso.",
    "colorTitulo": "#ff2a2a"
  },
  {
    "id": 6,
    "titulo": "I Am Iron Man",
    "imagen": "img/comic_6.jpg",
    "anio": "2024",
    "autor": "Marvel Comics",
    "sinopsis": "Tony Stark reflexiona sobre su legado como Iron Man mientras enfrenta una nueva amenaza que pondrá a prueba todas las versiones de su armadura. Una historia épica que recorre la evolución de la tecnología de Stark Industries y el verdadero significado de ser un héroe.",
    "personajes": "Tony Stark (Iron Man), múltiples versiones de armaduras Mark.",
    "colorTitulo": "#ff2a2a"
  }
];

// Personajes (cartas coleccionables)
const personajes = [
  {
    "clave": "ironman",
    "nombre": "Iron Man",
    "imagen": "img/personaje_ironman.jpg",
    "rareza": "legendary",
    "rarezaTexto": "LEGENDARIO",
    "nombreReal": "Tony Stark",
    "afiliacion": "Avengers",
    "poderes": "Armadura tecnológica"
  },
  {
    "clave": "cap",
    "nombre": "Capitán América",
    "imagen": "img/personaje_cap.jpg",
    "rareza": "common",
    "rarezaTexto": "COMÚN",
    "nombreReal": "Steve Rogers",
    "afiliacion": "Avengers",
    "poderes": "Súper soldado"
  },
  {
    "clave": "thor",
    "nombre": "Thor",
    "imagen": "img/personaje_thor.jpg",
    "rareza": "epic",
    "rarezaTexto": "ÉPICO",
    "nombreReal": "Thor Odinson",
    "afiliacion": "Avengers",
    "poderes": "Dios del trueno"
  },
  {
    "clave": "hulk",
    "nombre": "Hulk",
    "imagen": "img/personaje_hulk.jpg",
    "rareza": "epic",
    "rarezaTexto": "ÉPICO",
    "nombreReal": "Bruce Banner",
    "afiliacion": "Avengers",
    "poderes": "Fuerza ilimitada"
  },
  {
    "clave": "spiderman",
    "nombre": "Spider-Man",
    "imagen": "img/personaje_spiderman.jpg",
    "rareza": "legendary",
    "rarezaTexto": "LEGENDARIO",
    "nombreReal": "Peter Parker",
    "afiliacion": "Avengers",
    "poderes": "Sentido arácnido"
  },
  {
    "clave": "strange",
    "nombre": "Doctor Strange",
    "imagen": "img/personaje_strange.jpg",
    "rareza": "epic",
    "rarezaTexto": "ÉPICO",
    "nombreReal": "Stephen Strange",
    "afiliacion": "Hechiceros",
    "poderes": "Magia"
  },
  {
    "clave": "panther",
    "nombre": "Black Panther",
    "imagen": "img/personaje_panther.jpg",
    "rareza": "epic",
    "rarezaTexto": "ÉPICO",
    "nombreReal": "T'Challa",
    "afiliacion": "Wakanda",
    "poderes": "Traje de vibranium"
  },
  {
    "clave": "wanda",
    "nombre": "Scarlet Witch",
    "imagen": "img/personaje_wanda.jpg",
    "rareza": "legendary",
    "rarezaTexto": "LEGENDARIO",
    "nombreReal": "Wanda Maximoff",
    "afiliacion": "Avengers",
    "poderes": "Magia del caos"
  }
];

// Videojuegos (con su video local)
const juegos = [
  {
    "id": 1,
    "titulo": "Marvel's Spider-Man 2",
    "poster": "img/juego_1.jpg",
    "descripcion": "Acción intensa con dos Spider-Man en una nueva historia llena de villanos.",
    "video": "video/spiderman2.mp4",
    "descripcionCompleta": "Marvel's Spider-Man 2 es la secuela del aclamado juego de Spider-Man de 2018. Esta vez, tanto Peter Parker como Miles Morales unen fuerzas para enfrentar nuevas amenazas en una Nueva York más grande y detallada. Con el simbionte Venom desatado y nuevos villanos emergiendo, los dos Spider-Man deberán trabajar juntos para salvar la ciudad que aman.",
    "fecha": "20 de Octubre, 2023",
    "desarrollador": "Insomniac Games",
    "distribuidor": "Sony Interactive Entertainment",
    "plataformas": [
      "PlayStation 5"
    ],
    "generos": [
      "Acción",
      "Aventura",
      "Mundo Abierto"
    ],
    "calificacion": 4.8,
    "jugadores": "Un jugador",
    "caracteristicas": [
      "Juega como Peter Parker y Miles Morales",
      "Trajes simbiontes con habilidades únicas",
      "Nueva York expandida con Queens y Brooklyn",
      "Combate mejorado y nuevas habilidades web",
      "Villanos icónicos como Venom, Kraven y más",
      "Historia cinematográfica con gráficos next-gen"
    ],
    "requisitosMinimos": {
      "sistema": "PlayStation 5",
      "procesador": "AMD Zen 2",
      "memoria": "16 GB GDDR6",
      "grafica": "AMD RDNA 2",
      "almacenamiento": "98 GB SSD"
    },
    "requisitosRecomendados": {
      "sistema": "PlayStation 5",
      "procesador": "AMD Zen 2 (Modo Performance)",
      "memoria": "16 GB GDDR6",
      "grafica": "AMD RDNA 2 (Ray Tracing)",
      "almacenamiento": "98 GB SSD"
    }
  },
  {
    "id": 2,
    "titulo": "Marvel Rivals",
    "poster": "img/juego_2.jpg",
    "descripcion": "Combates multijugador rápidos con héroes icónicos del universo Marvel.",
    "video": "video/rivals.mp4",
    "descripcionCompleta": "Marvel Rivals es un shooter de héroes competitivo en tercera persona que reúne a los personajes más icónicos del Universo Marvel. Forma equipo con tus amigos y compite en batallas 6v6 llenas de acción, donde cada héroe tiene habilidades únicas y jugabilidad distintiva. Desde Iron Man volando por los cielos hasta Hulk destrozando el campo de batalla, cada partida ofrece una experiencia épica.",
    "fecha": "6 de Diciembre, 2024",
    "desarrollador": "NetEase Games",
    "distribuidor": "NetEase Games",
    "plataformas": [
      "PC",
      "PlayStation 5",
      "Xbox Series X/S"
    ],
    "generos": [
      "Shooter",
      "Multijugador",
      "Competitivo"
    ],
    "calificacion": 4.5,
    "jugadores": "Multijugador (6v6)",
    "caracteristicas": [
      "Más de 30 héroes y villanos jugables",
      "Combates 6v6 en tiempo real",
      "Mapas destructibles e interactivos",
      "Sistema de sinergia entre personajes",
      "Modos de juego competitivos y casuales",
      "Actualizaciones constantes con nuevos personajes"
    ],
    "requisitosMinimos": {
      "sistema": "Windows 10 64-bit",
      "procesador": "Intel Core i5-6600K / AMD Ryzen 5 1600",
      "memoria": "8 GB RAM",
      "grafica": "NVIDIA GTX 1060 / AMD RX 580",
      "almacenamiento": "50 GB espacio disponible"
    },
    "requisitosRecomendados": {
      "sistema": "Windows 10/11 64-bit",
      "procesador": "Intel Core i7-8700K / AMD Ryzen 7 2700X",
      "memoria": "16 GB RAM",
      "grafica": "NVIDIA RTX 2060 / AMD RX 5700 XT",
      "almacenamiento": "50 GB SSD"
    }
  },
  {
    "id": 3,
    "titulo": "Marvel's Wolverine",
    "poster": "img/juego_3.jpg",
    "descripcion": "Una experiencia más oscura centrada en Logan y su historia brutal.",
    "video": "video/wolverine.mp4",
    "descripcionCompleta": "Desarrollado por Insomniac Games, Marvel's Wolverine promete ser una experiencia madura y visceral que explora la naturaleza brutal de Logan. Con un tono más oscuro que sus predecesores de Spider-Man, este juego llevará a los jugadores a través de la compleja historia de Wolverine, enfrentando sus demonios internos mientras lucha contra enemigos formidables. El juego aprovecha al máximo las capacidades del PlayStation 5 para ofrecer combate intenso y una narrativa profunda.",
    "fecha": "Por Anunciar (2025+)",
    "desarrollador": "Insomniac Games",
    "distribuidor": "Sony Interactive Entertainment",
    "plataformas": [
      "PlayStation 5"
    ],
    "generos": [
      "Acción",
      "Aventura",
      "Clasificación M"
    ],
    "calificacion": 4.9,
    "jugadores": "Un jugador",
    "caracteristicas": [
      "Experiencia narrativa madura y oscura",
      "Sistema de combate brutal y visceral",
      "Factor de curación regenerativa en gameplay",
      "Exploración de la historia de Logan",
      "Gráficos de nueva generación",
      "Encuentros épicos con villanos clásicos"
    ],
    "requisitosMinimos": {
      "sistema": "PlayStation 5",
      "procesador": "AMD Zen 2",
      "memoria": "16 GB GDDR6",
      "grafica": "AMD RDNA 2",
      "almacenamiento": "TBD GB SSD"
    },
    "requisitosRecomendados": {
      "sistema": "PlayStation 5",
      "procesador": "AMD Zen 2 (Optimizado)",
      "memoria": "16 GB GDDR6",
      "grafica": "AMD RDNA 2 (Ray Tracing)",
      "almacenamiento": "TBD GB SSD"
    }
  }
];

// Cronología del UCM
const cronologia = [
  {
    "id": 1,
    "titulo": "Capitán América",
    "subtitulo": "Segunda Guerra Mundial",
    "anio": "2011",
    "protagonistas": "Steve Rogers, Peggy Carter",
    "etiquetaConexion": "Conecta con",
    "conexion": "Avengers",
    "imagen": "img/cronologia_1.jpg",
    "lado": "left"
  },
  {
    "id": 2,
    "titulo": "Capitana Marvel",
    "subtitulo": "Año 1995",
    "anio": "2019",
    "protagonistas": "Carol Danvers",
    "etiquetaConexion": "Conecta con",
    "conexion": "Avengers Endgame",
    "imagen": "img/cronologia_2.jpg",
    "lado": "right"
  },
  {
    "id": 3,
    "titulo": "Iron Man",
    "subtitulo": "Inicio del UCM",
    "anio": "2008",
    "protagonistas": "Tony Stark",
    "etiquetaConexion": "Conecta con",
    "conexion": "Iron Man 2",
    "imagen": "img/cronologia_3.jpg",
    "lado": "left"
  },
  {
    "id": 4,
    "titulo": "The Avengers",
    "subtitulo": "Batalla de Nueva York",
    "anio": "2012",
    "protagonistas": "Iron Man, Thor, Capitán América",
    "etiquetaConexion": "Evento",
    "conexion": "Formación de los Avengers",
    "imagen": "img/cronologia_4.jpg",
    "lado": "right"
  },
  {
    "id": 5,
    "titulo": "WandaVision",
    "subtitulo": "Después de Endgame",
    "anio": "2021",
    "protagonistas": "Wanda, Vision",
    "etiquetaConexion": "Conecta con",
    "conexion": "Doctor Strange 2",
    "imagen": "img/cronologia_5.jpg",
    "lado": "left"
  }
];

// Productos de la tienda
const productos = [
  {
    "id": 1,
    "nombre": "Figura Spider-Man",
    "precio": 49.99,
    "imagen": "img/producto_1.webp",
    "categoria": "Figuras",
    "descripcion": "Figura coleccionable de Spider-Man de 30cm",
    "stock": 8
  },
  {
    "id": 2,
    "nombre": "Póster Iron Man",
    "precio": 24.99,
    "imagen": "img/producto_2.webp",
    "categoria": "Posters",
    "descripcion": "Póster oficial de Iron Man tamaño A2",
    "stock": 0
  },
  {
    "id": 3,
    "nombre": "Figura Thor",
    "precio": 54.99,
    "imagen": "img/producto_3.webp",
    "categoria": "Figuras",
    "descripcion": "Figura premium de Thor con martillo Mjolnir",
    "stock": 5
  },
  {
    "id": 4,
    "nombre": "Figura Black Panther",
    "precio": 52.99,
    "imagen": "img/producto_4.webp",
    "categoria": "Figuras",
    "descripcion": "Figura de Black Panther con detalles de Wakanda",
    "stock": 3
  },
  {
    "id": 7,
    "nombre": "Cómic Iron Man",
    "precio": 19.99,
    "imagen": "img/producto_7.webp",
    "categoria": "Comics",
    "descripcion": "Cómic coleccionable 'I Am Iron Man'",
    "stock": 12
  },
  {
    "id": 9,
    "nombre": "Pin Logo Marvel",
    "precio": 9.99,
    "imagen": "img/producto_9.webp",
    "categoria": "Accesorios",
    "descripcion": "Pin metálico del logo Marvel Comics",
    "stock": 0
  },
  {
    "id": 13,
    "nombre": "Llavero Thor Mjolnir",
    "precio": 12.99,
    "imagen": "img/producto_13.webp",
    "categoria": "Accesorios",
    "descripcion": "Llavero chibi de Thor con martillo Mjolnir",
    "stock": 20
  },
  {
    "id": 14,
    "nombre": "Funko Pop Spider-Man Deluxe",
    "precio": 44.99,
    "imagen": "img/producto_14.webp",
    "categoria": "Figuras",
    "descripcion": "Funko Pop! Deluxe Spider-Man con telaraña #1462",
    "stock": 2
  },
  {
    "id": 15,
    "nombre": "Marvel Legends Black Panther",
    "precio": 34.99,
    "imagen": "img/producto_15.webp",
    "categoria": "Figuras",
    "descripcion": "Figura Marvel Legends Black Panther Infinity War",
    "stock": 6
  },
  {
    "id": 16,
    "nombre": "Marvel Legends Thor Maximum",
    "precio": 59.99,
    "imagen": "img/producto_16.webp",
    "categoria": "Figuras",
    "descripcion": "Figura Marvel Legends Maximum Series Thor deluxe",
    "stock": 4
  },
  {
    "id": 17,
    "nombre": "Spider-Man Amazing Fantasy",
    "precio": 29.99,
    "imagen": "img/producto_17.webp",
    "categoria": "Figuras",
    "descripcion": "Figura Marvel Legends Amazing Fantasy Spider-Man",
    "stock": 0
  },
  {
    "id": 18,
    "nombre": "Spider-Man 2",
    "precio": 69.99,
    "imagen": "img/producto_18.webp",
    "categoria": "Videojuegos",
    "descripcion": "Acción intensa con dos Spider-Man en una nueva historia",
    "stock": 15
  },
  {
    "id": 19,
    "nombre": "Marvel Rivals",
    "precio": 0,
    "imagen": "img/producto_19.webp",
    "categoria": "Videojuegos",
    "descripcion": "Combates multijugador con héroes icónicos del universo Marvel",
    "stock": 999
  },
  {
    "id": 20,
    "nombre": "Wolverine",
    "precio": 79.99,
    "imagen": "img/producto_20.webp",
    "categoria": "Videojuegos",
    "descripcion": "Experiencia oscura centrada en Logan y su historia brutal",
    "stock": 10
  }
];

