import { MenuItem } from "./types";

export const MENU_ITEMS: MenuItem[] = [
  // --- Desayuno y Merienda Selecta ---
  {
    id: 8,
    name: "Bikini Focaccia",
    category: "Desayuno y Merienda Selecta",
    price: 5.30,
    description: "Sandwich tostado en pan de focaccia artesanal, crujiente por fuera y con un interior fundente y jugoso.",
    allergens: ["Gluten", "Lácteos"],
    image: "",
    featured: false
  },

  // --- Ibéricos y Embutidos ---
  {
    id: 74,
    name: "Tabla Selección Ibéricos",
    category: "Ibéricos y Embutidos",
    price: 21.90,
    description: "Un recorrido gourmet por nuestros mejores embutidos selectos: jamón, lomo, salchichón y chorizo ibérico cortados al momento. Acompañada de crujiente pan de cristal con tomate y aceite de oliva virgen extra, junto a una selección de frutos secos.",
    allergens: ["Frutos de cáscara"],
    image: "images/tabla_seleccion_ibericos.",
    featured: false
  },
  {
    id: 75,
    name: "Tabla Selección Quesos",
    category: "Ibéricos y Embutidos",
    price: 21.90,
    description: "Una esmerada variedad de quesos seleccionados de gran sabor y carácter, perfectos para degustar.",
    allergens: ["Lácteos"],
    image: "images/tabla_seleccion_quesos.jpg",
    featured: false
  },
  {
    id: 76,
    name: "Torrada Cristal de Ibérico",
    category: "Ibéricos y Embutidos",
    price: 8.50,
    description: "Rebanada de pan de cristal crujiente frotada con tomate natural y aceite de oliva virgen extra, coronada con finas lonchas de jamón ibérico.",
    allergens: ["Gluten"],
    image: "",
    featured: true
  },
  {
    id: 77,
    name: "Torrada Cristal Manchega",
    category: "Ibéricos y Embutidos",
    price: 7.90,
    description: "Crujiente pan de cristal con tomate natural y aceite de oliva virgen extra, cubierto con generosas lascas de auténtico queso manchego curado.",
    allergens: ["Gluten", "Lácteos"],
    image: "",
    featured: false
  },

  // --- Tapeo Selecto ---
  {
    id: 26,
    name: "Pincho de Tortilla + Caña",
    category: "Tapeo Selecto",
    price: 4.90,
    description: "El combo perfecto para el tapeo: un generoso pincho de nuestra tortilla de patatas acompañado de una caña bien tirada y fría.",
    allergens: ["Gluten", "Huevos"],
    image: "",
    featured: false
  },
  {
    id: 37,
    name: "Bravas de la Casa",
    category: "Tapeo Selecto",
    price: 6.50,
    description: "Nuestras patatas doradas y crujientes por fuera, tiernas por dentro, bañadas en una salsa brava casera con receta de la casa.",
    allergens: ["Huevos"],
    image: "",
    featured: false
  },
  {
    id: 38,
    name: "Ración Patatas Fritas",
    category: "Tapeo Selecto",
    price: 5.50,
    description: "Patatas fritas doradas y crujientes, el complemento ideal.",
    allergens: [],
    image: "",
    featured: false
  },
  {
    id: 39,
    name: "Bomba con Salsa Brava",
    category: "Tapeo Selecto",
    price: 3.90,
    description: "Crujiente bola de patata rellena de carne picada sazonada, frita a la perfección y coronada con nuestro toque bravo.",
    allergens: ["Gluten", "Huevos"],
    image: "",
    featured: false
  },
  {
    id: 40,
    name: "Pincho Moruno Ibérico",
    category: "Tapeo Selecto",
    price: 7.50,
    description: "Brocheta de carne ibérica marinada con una selección de especias tradicionales y hecha a la plancha.",
    allergens: [],
    image: "",
    featured: false
  },
  {
    id: 41,
    name: "Callos de la Casa",
    category: "Tapeo Selecto",
    price: 7.50,
    description: "Tradicional guiso de callos melosos, cocinados a fuego lento con su toque alegre de picante y embutidos de calidad.",
    allergens: ["Gluten"],
    image: "",
    featured: false
  },
  {
    id: 42,
    name: "Chorizos Ibérico a la Sidra",
    category: "Tapeo Selecto",
    price: 6.90,
    description: "Bocados de chorizo ibérico de primera, guisados en una reducción de sidra natural que le aporta un equilibrio perfecto.",
    allergens: [],
    image: "",
    featured: false
  },
  {
    id: 43,
    name: "Morcilla a la Plancha",
    category: "Tapeo Selecto",
    price: 6.50,
    description: "Morcilla artesanal hecha a la plancha.",
    allergens: [],
    image: "",
    featured: false
  },
  {
    id: 44,
    name: "Croquetas de Jamón (8 unidades)",
    category: "Tapeo Selecto",
    price: 12.00,
    description: "Croquetas súper cremosas con un sofrito casero cargado de virutas de nuestro jamón ibérico y un rebozado crujiente.",
    allergens: ["Gluten", "Lácteos", "Huevos"],
    image: "",
    featured: false
  },
  {
    id: 45,
    name: "Morros Fritos",
    category: "Tapeo Selecto",
    price: 5.80,
    description: "Deliciosos bocados de morro frito, súper crujientes en su punto justo de sal.",
    allergens: [],
    image: "",
    featured: false
  },
  {
    id: 46,
    name: "Carrilleras al Pedro Ximénez",
    category: "Tapeo Selecto",
    price: 10.90,
    description: "Deliciosas carrilleras ibéricas cocinadas a fuego muy lento hasta que se deshacen, en una reducción dulce de vino Pedro Ximénez.",
    allergens: [],
    image: "",
    featured: false
  },
  {
    id: 47,
    name: "Panceta Agridulce",
    category: "Tapeo Selecto",
    price: 6.50,
    description: "Panceta de cerdo ibérico cocinada a fuego lento, tierna y glaseada en una deliciosa salsa agridulce.",
    allergens: ["Soja"],
    image: "",
    featured: false
  },
  {
    id: 48,
    name: "Ensaladilla de la Casa",
    category: "Tapeo Selecto",
    price: 6.20,
    description: "Receta clásica y fresca de ensaladilla rusa con patata, bonito seleccionado, mayonesa suave y un toque casero infalible.",
    allergens: ["Huevos", "Pescado"],
    image: "",
    featured: false
  },
  {
    id: 49,
    name: "Boquerones en Vinagre",
    category: "Tapeo Selecto",
    price: 6.50,
    description: "Filetes de boquerón limpios y firmes, marinados en su punto justo de vinagre, aceite de oliva, ajo y perejil fresco.",
    allergens: ["Pescado", "Sulfitos"],
    image: "",
    featured: false
  },
  {
    id: 50,
    name: "Anchoas del Cantábrico",
    category: "Tapeo Selecto",
    price: 8.50,
    description: "Lomos de anchoa premium del Cantábrico, seleccionadas por su calibre y punto de sal, servidas en aceite de oliva.",
    allergens: ["Pescado"],
    image: "",
    featured: false
  },
  {
    id: 51,
    name: "Gildas",
    category: "Tapeo Selecto",
    price: 2.00,
    description: "El pincho clásico por excelencia: una combinación perfecta en banderilla de oliva, piparra en vinagre y anchoa de calidad.",
    allergens: ["Pescado", "Sulfitos"],
    image: "",
    featured: false
  },
  {
    id: 52,
    name: "Olivas Rellenas de Anchoa",
    category: "Tapeo Selecto",
    price: 2.50,
    description: "Aceitunas rellenas de sabrosa anchoa para abrir el apetito.",
    allergens: ["Pescado"],
    image: "",
    featured: false
  },
  {
    id: 53,
    name: "Trio de Picoteo",
    category: "Tapeo Selecto",
    price: 10.50,
    description: "Un trío ideal que combina patatas premium, aceitunas rellenas y deliciosos mejillones.",
    allergens: ["Pescado", "Sulfitos"],
    image: "images/trio_de_picoteo.jpg",
    featured: false
  },
  {
    id: 54,
    name: "Trio de Latas",
    category: "Tapeo Selecto",
    price: 19.90,
    description: "Una selección marina premium que incluye latas de berberechos, mejillones y aceitunas seleccionadas.",
    allergens: ["Pescado", "Moluscos"],
    image: "images/trio_de_latas.jpg",
    featured: false
  },
  {
    id: 55,
    name: "Trio Crunchy Mix",
    category: "Tapeo Selecto",
    price: 3.50,
    description: "El snack perfecto: mezcla de patatas crujientes, maíz gigante picante y sabrosas cortezas de cerdo.",
    allergens: ["Frutos de cáscara", "Cacahuetes"],
    image: "images/trio_crunchy_mix.jpg",
    featured: false
  },
  {
    id: 65,
    name: "Porky Fries",
    category: "Tapeo Selecto",
    price: 12.90,
    description: "Una ración generosa de patatas fritas crujientes coronadas con carne desmechada, queso fundido y salsas que convierten este plato en el picoteo perfecto.",
    allergens: ["Lácteos", "Huevos"],
    image: "images/porky_fries.jpg",
    featured: true
  },
  {
    id: 66,
    name: "Huevos Rotos con Jamón Ibérico",
    category: "Tapeo Selecto",
    price: 12.90,
    description: "Patatas fritas caseras, cortadas a mano, con huevos fritos y finas lonchas de nuestro selecto jamón ibérico de bellota.",
    allergens: ["Huevos"],
    image: "images/huevos_rotos_con_jamon_iberico.jpg",
    featured: false
  },
  {
    id: 67,
    name: "Huevos Rotos con Secreto Ibérico",
    category: "Tapeo Selecto",
    price: 14.90,
    description: "Patatas fritas caseras, cortadas a mano, coronadas con huevos fritos y jugosas tiras de secreto ibérico a la plancha.",
    allergens: ["Huevos"],
    image: "images/huevos_rotos_con_secreto_iberico.jpg",
    featured: false
  },
  {
    id: 68,
    name: "Panceta Ibérica Crujiente",
    category: "Tapeo Selecto",
    price: 14.50,
    description: "Panceta de cerdo ibérico cocinada a baja temperatura, huevo frito campero, patatas fritas y suave salsa alioli.",
    allergens: ["Huevos"],
    image: "",
    featured: false
  },
  {
    id: 81,
    name: "Oreja Cocida",
    category: "Tapeo Selecto",
    price: 6.50,
    description: "Deliciosa oreja cocida al estilo tradicional, tierna y sazonada en su punto.",
    allergens: [],
    image: "",
    featured: false
  },
  {
    id: 82,
    name: "Jamón Canario",
    category: "Tapeo Selecto",
    price: 7.50,
    description: "Jamón canario horneado al estilo artesanal, con su característica corteza tierna y especiada.",
    allergens: [],
    image: "",
    featured: false
  },
  {
    id: 83,
    name: "Pica-Pica de la Casa",
    category: "Tapeo Selecto",
    price: 11.50,
    description: "Un variado pica-pica con el toque de embutidos y aperitivos tradicionales de Alma Ibérica.",
    allergens: [],
    image: "",
    featured: false
  },

  // --- Bocadillos, Burgers y Pizzas (Platos Principales) ---
  {
    id: 24,
    name: "Bocadillo Clásico",
    category: "Bocadillos, Burgers y Pizzas",
    price: 4.50,
    description: "Tu embutido favorito servido en crujiente pan de agua (155g) o pan de chapata artesanal (135g), frotado con tomate y aceite de oliva.",
    allergens: ["Gluten"],
    image: "",
    featured: false
  },
  {
    id: 25,
    name: "Bocadillo de Tortilla de Patata",
    category: "Bocadillos, Burgers y Pizzas",
    price: 5.90,
    description: "Bocadillo caliente en pan a elegir con nuestra jugosa tortilla de patatas casera, hecha al estilo tradicional.",
    allergens: ["Gluten", "Huevos"],
    image: "",
    featured: false
  },
  {
    id: 27,
    name: "Bocadillo de Tortilla Francesa",
    category: "Bocadillos, Burgers y Pizzas",
    price: 4.90,
    description: "Sencillo y tierno bocadillo de tortilla francesa en pan chapata o pan de agua crujiente.",
    allergens: ["Gluten", "Huevos"],
    image: "",
    featured: false
  },
  {
    id: 28,
    name: "Bocadillo de Tortilla Francesa con Queso",
    category: "Bocadillos, Burgers y Pizzas",
    price: 5.50,
    description: "Bocadillo caliente de tortilla francesa con una capa de cremoso queso Havarti fundido.",
    allergens: ["Gluten", "Huevos", "Lácteos"],
    image: "",
    featured: false
  },
  {
    id: 29,
    name: "Bocadillo de Lomo Ibérico",
    category: "Bocadillos, Burgers y Pizzas",
    price: 6.90,
    description: "Lomo ibérico pasado por la plancha, servido en pan crujiente frotado con tomate.",
    allergens: ["Gluten"],
    image: "",
    featured: false
  },
  {
    id: 30,
    name: "Bocadillo de Lomo Ibérico con Queso",
    category: "Bocadillos, Burgers y Pizzas",
    price: 7.50,
    description: "Finas cintas de lomo ibérico pasadas por la plancha, servidas con queso Havarti fundido en pan crujiente.",
    allergens: ["Gluten", "Lácteos"],
    image: "",
    featured: false
  },
  {
    id: 31,
    name: "Bocadillo de Bacon",
    category: "Bocadillos, Burgers y Pizzas",
    price: 5.50,
    description: "Tiras de bacon ahumado crujiente a la plancha en pan recién horneado.",
    allergens: ["Gluten"],
    image: "",
    featured: false
  },
  {
    id: 32,
    name: "Bocadillo de Bacon con Queso",
    category: "Bocadillos, Burgers y Pizzas",
    price: 6.10,
    description: "Tiras de bacon ahumado crujiente a la plancha, con una capa de queso fundido.",
    allergens: ["Gluten", "Lácteos"],
    image: "",
    featured: false
  },
  {
    id: 33,
    name: "Bocadillo Serranito",
    category: "Bocadillos, Burgers y Pizzas",
    price: 6.90,
    description: "El gran clásico del sur. Lomo ibérico a la plancha, jamón ibérico de primera, pimiento verde frito y nuestro toque especial en pan crujiente.",
    allergens: ["Gluten"],
    image: "",
    featured: false
  },
  {
    id: 34,
    name: "Bocadillo de Pinchos Cerdo Ibérico",
    category: "Bocadillos, Burgers y Pizzas",
    price: 6.90,
    description: "Bocadillo caliente relleno de dados de cerdo ibérico marinados a la plancha, tiernos y llenos de sabor especiado.",
    allergens: ["Gluten"],
    image: "",
    featured: false
  },
  {
    id: 35,
    name: "Bocadillo Especial de la Casa",
    category: "Bocadillos, Burgers y Pizzas",
    price: 8.90,
    description: "La combinación caliente secreta que mejor define nuestra barra; el bocadillo definitivo para los amantes del buen comer.",
    allergens: ["Gluten"],
    image: "",
    featured: false
  },
  {
    id: 56,
    name: "Cesar Crujiente",
    category: "Bocadillos, Burgers y Pizzas",
    price: 10.90,
    description: "Clásica ensalada con base de lechuga fresca, pollo crujiente bien dorado, picatostes artesanales y lascas de queso, todo aderezado con nuestra cremosa salsa César casera.",
    allergens: ["Gluten", "Lácteos", "Huevos", "Pescado"],
    image: "images/cesar_crujiente.jpg",
    featured: false
  },
  {
    id: 57,
    name: "Burrata Ibérica",
    category: "Bocadillos, Burgers y Pizzas",
    price: 12.50,
    description: "Deliciosa y cremosa burrata fresca servida sobre una cama de brotes verdes, coronada con finas lonchas de nuestro mejor jamón ibérico y un toque de aceite de oliva virgen extra.",
    allergens: ["Lácteos", "Frutos de cáscara"],
    image: "images/burrata_iberica.jpg",
    featured: false
  },
  {
    id: 58,
    name: "Mediterránea",
    category: "Bocadillos, Burgers y Pizzas",
    price: 9.90,
    description: "Una opción fresca y ligera con una cuidada selección de hortalizas de la huerta, atún de calidad, aceitunas y un aliño tradicional que realza todo su sabor.",
    allergens: ["Pescado"],
    image: "images/mediterranea.jpg",
    featured: false
  },
  {
    id: 59,
    name: "Row Burger",
    category: "Bocadillos, Burgers y Pizzas",
    price: 13.90,
    description: "Hamburguesa premium con carne seleccionada a la parrilla, queso fundido y el toque justo de nuestros ingredientes secretos en un pan tierno y sellado.",
    allergens: ["Gluten", "Lácteos", "Huevos"],
    image: "",
    featured: false
  },
  {
    id: 60,
    name: "Mia Crispy",
    category: "Bocadillos, Burgers y Pizzas",
    price: 12.90,
    description: "Para los amantes del crujiente: jugosa carne acompañada de texturas crujientes, queso fundido y una salsa especial que equilibra cada bocado.",
    allergens: ["Gluten", "Lácteos", "Huevos"],
    image: "",
    featured: false
  },
  {
    id: 61,
    name: "Nala Pull",
    category: "Bocadillos, Burgers y Pizzas",
    price: 12.90,
    description: "Espectacular hamburguesa de carne desmechada (pulled pork) cocinada a baja temperatura, melosa, desbordante de sabor y bañada en nuestra salsa barbacoa selecta.",
    allergens: ["Gluten", "Lácteos", "Huevos"],
    image: "",
    featured: true
  },
  {
    id: 62,
    name: "Selecta Burger",
    category: "Bocadillos, Burgers y Pizzas",
    price: 14.90,
    description: "La joya de la corona. Carne de vacuno de primera con un maridaje de ingredientes gourmet que elevan la hamburguesa tradicional a una experiencia premium.",
    allergens: ["Gluten", "Lácteos", "Huevos"],
    image: "",
    featured: false
  },
  {
    id: 63,
    name: "Baos Carrilleras Ibéricas (3 uds + Boniato)",
    category: "Bocadillos, Burgers y Pizzas",
    price: 11.90,
    description: "Tres molletes asiáticos al vapor, súper esponjosos, rellenos de carrillera ibérica melosa cocinada a fuego lento. Acompañados de bastones crujientes de boniato frito.",
    allergens: ["Gluten", "Soja"],
    image: "images/baos_carrilleras_ibericas_3_uds_boniato.jpg",
    featured: false
  },
  {
    id: 64,
    name: "Baos Panceta Agridulce (3 uds + Boniato)",
    category: "Bocadillos, Burgers y Pizzas",
    price: 11.90,
    description: "Panecillos al vapor rellenos de panceta ibérica confitada y glaseada en una adictiva salsa agridulce casera. Con guarnición de boniato.",
    allergens: ["Gluten", "Soja"],
    image: "images/baos_panceta_agridulce_3_uds_boniato.jpg",
    featured: true
  },
  {
    id: 69,
    name: "Frankfurt Clásico con patatas",
    category: "Bocadillos, Burgers y Pizzas",
    price: 6.50,
    description: "Frankfurt clásico servido en pan caliente con guarnición de patatas fritas crujientes.",
    allergens: ["Gluten"],
    image: "",
    featured: false
  },
  {
    id: 70,
    name: "Frankfurt Cebolla Caramelizada con patatas",
    category: "Bocadillos, Burgers y Pizzas",
    price: 7.50,
    description: "Frankfurt a la plancha con un toque dulce de cebolla caramelizada, servido con patatas fritas.",
    allergens: ["Gluten"],
    image: "",
    featured: false
  },
  {
    id: 71,
    name: "Pizza Ibérica con Huevo",
    category: "Bocadillos, Burgers y Pizzas",
    price: 13.90,
    description: "Masa artesanal crujiente con base de tomate y mozzarella, cubierta con finas lonchas de jamón ibérico de bellota y un huevo campero en el centro que se funde en cada bocado.",
    allergens: ["Gluten", "Lácteos", "Huevos"],
    image: "images/iberica_con_huevo.jpg",
    featured: false
  },
  {
    id: 72,
    name: "Pizza Burrata Ibérica",
    category: "Bocadillos, Burgers y Pizzas",
    price: 13.50,
    description: "Una combinación espectacular que funde la cremosidad de la burrata fresca con el contraste salado de las virutas de jamón ibérico sobre una base crujiente horneada al punto.",
    allergens: ["Gluten", "Lácteos"],
    image: "images/burrata_iberica_pizza.jpg",
    featured: false
  },
  {
    id: 73,
    name: "Pizza La Clásica",
    category: "Bocadillos, Burgers y Pizzas",
    price: 11.90,
    description: "Nuestra pizza más casera y reconfortante, elaborada con ingredientes seleccionados de la casa sobre una base crujiente y fundente de queso.",
    allergens: ["Gluten", "Lácteos"],
    image: "images/la_clasica.jpg",
    featured: false
  },
  {
    id: 78,
    name: "Secreto Ibérico",
    category: "Bocadillos, Burgers y Pizzas",
    price: 19.90,
    description: "Corte selecto de secreto ibérico, extremadamente jugoso y cocinado a la plancha en su propio jugo para realzar su tierno sabor. Acompañado de una guarnición de patatas.",
    allergens: [],
    image: "",
    featured: false
  },
  {
    id: 79,
    name: "Lagarto Ibérico",
    category: "Bocadillos, Burgers y Pizzas",
    price: 15.90,
    description: "Exquisito y jugoso cordón del lomo ibérico marcado a fuego vivo, crujiente por fuera y tierno por dentro. Servido con una ración de patatas.",
    allergens: [],
    image: "",
    featured: false
  },
  {
    id: 80,
    name: "Butifarra Ibérica Encebollada",
    category: "Bocadillos, Burgers y Pizzas",
    price: 14.50,
    description: "Butifarra artesanal de receta ibérica, asada y acompañada de una melosa reducción de cebolla pochada a fuego lento y patatas.",
    allergens: [],
    image: "",
    featured: false
  },
  {
    id: 84,
    name: "Hamburguesa Cerdo Ibérico",
    category: "Bocadillos, Burgers y Pizzas",
    price: 7.90,
    description: "Sabrosa hamburguesa de carne picada de cerdo ibérico a la plancha, servida con patatas fritas.",
    allergens: ["Gluten", "Lácteos"],
    image: "",
    featured: false
  },

  // --- Bebidas y Vermuts ---
  {
    id: 114,
    name: "Quinto Estrella Damm",
    category: "Bebidas y Vermuts",
    price: 1.60,
    description: "Cerveza Quinto Estrella Damm.",
    allergens: ["Gluten"],
    image: "",
    featured: false
  },
  {
    id: 115,
    name: "Mediana Estrella Damm",
    category: "Bebidas y Vermuts",
    price: 2.30,
    description: "Cerveza Mediana Estrella Damm.",
    allergens: ["Gluten"],
    image: "",
    featured: false
  },
  {
    id: 116,
    name: "Voll Damm",
    category: "Bebidas y Vermuts",
    price: 2.50,
    description: "Doble malta Voll Damm.",
    allergens: ["Gluten"],
    image: "",
    featured: false
  },
  {
    id: 117,
    name: "Free Damm",
    category: "Bebidas y Vermuts",
    price: 2.30,
    description: "Cerveza sin alcohol Free Damm.",
    allergens: ["Gluten"],
    image: "",
    featured: false
  },
  {
    id: 118,
    name: "Copa de barril Estrella Damm",
    category: "Bebidas y Vermuts",
    price: 1.90,
    description: "Copa de barril Estrella Damm bien tirada.",
    allergens: ["Gluten"],
    image: "",
    featured: false
  },
  {
    id: 119,
    name: "Caña Estrella Damm",
    category: "Bebidas y Vermuts",
    price: 1.50,
    description: "Caña de cerveza Estrella Damm bien fría.",
    allergens: ["Gluten"],
    image: "",
    featured: false
  },
  {
    id: 120,
    name: "Copa de clara Estrella Damm",
    category: "Bebidas y Vermuts",
    price: 1.90,
    description: "Clara de cerveza con limón.",
    allergens: ["Gluten"],
    image: "",
    featured: false
  },
  {
    id: 121,
    name: "Mediana Turia",
    category: "Bebidas y Vermuts",
    price: 2.50,
    description: "Cerveza tostada Turia.",
    allergens: ["Gluten"],
    image: "",
    featured: false
  },
  {
    id: 135,
    name: "Vermut de la Casa",
    category: "Bebidas y Vermuts",
    price: 2.50,
    description: "Vermut tradicional selecto de la casa, servido bien frío con hielo y naranja.",
    allergens: ["Sulfitos"],
    image: "",
    featured: false
  }
];

export const INFO_EMPRESA = {
  nombre: "Alma Ibérica",
  direccion: "Carrer Lluís Pascual Roca, 38, 08830 Sant Boi de Llobregat, Barcelona",
  descripcion: "Un rincón donde la tradición se encuentra con el producto de calidad. Especialistas en embutidos de bellota cortados al momento y una experiencia de tapeo bien hecho en el corazón de Sant Boi.",
  telefono: "635 343 819",
  instagram: "almaibericaa",
  email: "almaibericastb@gmail.com",
  horarios: {
    semana: "Lunes a Jueves: 08:00 – 20:00 (Foco en desayunos de calidad y vermut)",
    finDeSemana: "Viernes, Sábado y Domingo: 08:00 – 00:00 (Foco total en vermut, tapeo de autor y cenas selectas)"
  }
};
