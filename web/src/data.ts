export type Dish = {
  key: string;        // único: nombre del archivo sin extensión, o slug del nombre si no hay foto
  cat: string;        // etiqueta display: "Bocadillos" | "Tapeo" | "Platos" | "Bebidas"
  bloque: string;     // clave interna: "bocadillos" | "tapeo" | "platos" | "bebidas"
  name: string;
  desc: string;
  price: number;      // usar la columna "Precio Venta al Publico (€)"
  alerg: string;      // alérgenos separados por coma; "" si ninguno
  img: string;        // "/images/<archivo>.webp" — o "" para usar placeholder
};

/* INICIO DATOS */
export const MENU_DATA: Record<string, Dish[]> = {
  bocadillos: [
    {
      key: "pinchos_cerdo_iberico",
      cat: "Bocadillos",
      bloque: "bocadillos",
      name: "Pinchos Cerdo Ibérico",
      desc: "Bocadillo caliente relleno de dados de cerdo ibérico marinados a la plancha, tiernos y llenos de sabor especiado.",
      price: 6.90,
      alerg: "Gluten",
      img: ""
    },
    {
      key: "especial_de_la_casa",
      cat: "Bocadillos",
      bloque: "bocadillos",
      name: "Especial de la Casa",
      desc: "La combinación caliente secreta que mejor define nuestra barra; el bocadillo definitivo para los amantes del buen comer.",
      price: 8.90,
      alerg: "Gluten",
      img: ""
    }
  ],
  tapeo: [
    {
      key: "pincho_de_tortilla_cana",
      cat: "Tapeo",
      bloque: "tapeo",
      name: "Pincho de Tortilla + Caña",
      desc: "El combo perfecto para el tapeo: un generoso pincho de nuestra tortilla de patatas acompañado de una caña bien tirada y fría.",
      price: 4.90,
      alerg: "Gluten, Huevos",
      img: ""
    },
    {
      key: "oreja_cocida",
      cat: "Tapeo",
      bloque: "tapeo",
      name: "Oreja Cocida",
      desc: "Tradicional ración de oreja tierna cocida a la plancha con su punto crujiente, sazonada al estilo de la casa.",
      price: 6.50,
      alerg: "",
      img: "/images/oreja_cocida.webp"
    },
    {
      key: "jamon_canario",
      cat: "Tapeo",
      bloque: "tapeo",
      name: "Jamón Canario",
      desc: "Exquisito jamón canario asado al estilo tradicional, tierno y con un sabor sazonado único cortado fino.",
      price: 7.50,
      alerg: "",
      img: "/images/jamon_canario.webp"
    },
    {
      key: "bravas_casa",
      cat: "Tapeo",
      bloque: "tapeo",
      name: "Bravas de la Casa",
      desc: "Nuestras patatas doradas y crujientes por fuera, tiernas por dentro, bañadas en una salsa brava casera con receta de la casa.",
      price: 5.90,
      alerg: "Huevos",
      img: "/images/bravas_casa.webp"
    },
    {
      key: "racion_patatas_fritas",
      cat: "Tapeo",
      bloque: "tapeo",
      name: "Ración Patatas Fritas",
      desc: "Patatas seleccionadas cortadas a mano y fritas al punto de sal crujiente.",
      price: 5.50,
      alerg: "Ninguno",
      img: "/images/racion_patatas_fritas.webp"
    },
    {
      key: "bomba_salsa_brava",
      cat: "Tapeo",
      bloque: "tapeo",
      name: "Bomba con Salsa Brava",
      desc: "Crujiente bola de patata rellena de carne picada sazonada, frita a la perfección y coronada con nuestro toque bravo.",
      price: 4.90,
      alerg: "Gluten, Huevos",
      img: "/images/bomba_salsa_brava.webp"
    },
    {
      key: "pincho_moruno_iberico",
      cat: "Tapeo",
      bloque: "tapeo",
      name: "Pincho Moruno Ibérico",
      desc: "Brocheta de carne ibérica marinada con una selección de especias tradicionales y hecha a la plancha.",
      price: 6.90,
      alerg: "Ninguno",
      img: "/images/pincho_moruno_iberico.webp"
    },
    {
      key: "callos_casa",
      cat: "Tapeo",
      bloque: "tapeo",
      name: "Callos de la Casa",
      desc: "Tradicional guiso de callos melosos, cocinados a fuego lento con su toque alegre de picante y embutidos de calidad.",
      price: 7.20,
      alerg: "Ninguno",
      img: "/images/callos_casa.webp"
    },
    {
      key: "chorizos_iberico_sidra",
      cat: "Tapeo",
      bloque: "tapeo",
      name: "Chorizos Ibérico a la Sidra",
      desc: "Bocados de chorizo ibérico de primera, guisados en una reducción de sidra natural que le aporta un equilibrio perfecto.",
      price: 6.50,
      alerg: "Ninguno",
      img: "/images/chorizos_iberico_sidra.webp"
    },
    {
      key: "morcilla_plancha",
      cat: "Tapeo",
      bloque: "tapeo",
      name: "Morcilla a la Plancha",
      desc: "Rodajas de morcilla artesanal hechas a la plancha para conseguir un exterior crujiente y un interior sabroso.",
      price: 6.50,
      alerg: "Ninguno",
      img: "/images/morcilla_plancha.webp"
    },
    {
      key: "croquetas_jamon",
      cat: "Tapeo",
      bloque: "tapeo",
      name: "Croquetas de Jamón (8 unidades)",
      desc: "Croquetas súper cremosas con un sofrito casero cargado de virutas de nuestro jamón ibérico y un rebozado crujiente.",
      price: 12.00,
      alerg: "Gluten, Lácteos, Huevos",
      img: "/images/croquetas_jamon.webp"
    },
    {
      key: "morros_fritos",
      cat: "Tapeo",
      bloque: "tapeo",
      name: "Morros Fritos",
      desc: "Crujientes bocados de morro de cerdo fritos en su punto justo, ideales para acompañar con un vermut.",
      price: 5.80,
      alerg: "Ninguno",
      img: "/images/morros_fritos.webp"
    },
    {
      key: "carrilleras_pedro_ximenez",
      cat: "Tapeo",
      bloque: "tapeo",
      name: "Carrilleras al Pedro Ximénez",
      desc: "Deliciosas carrilleras ibéricas cocinadas a fuego muy lento hasta que se deshacen, en una reducción dulce de vino Pedro Ximénez.",
      price: 10.90,
      alerg: "Ninguno",
      img: "/images/carrilleras_pedro_ximenez.webp"
    },
    {
      key: "panceta_agridulce",
      cat: "Tapeo",
      bloque: "tapeo",
      name: "Panceta Agridulce",
      desc: "Panceta cocinada a fuego lento con glaseado agridulce adictivo de la casa.",
      price: 6.50,
      alerg: "Soja",
      img: "/images/panceta_agridulce.webp"
    },
    {
      key: "ensaladilla_casa",
      cat: "Tapeo",
      bloque: "tapeo",
      name: "Ensaladilla de la Casa",
      desc: "Receta clásica y fresca de ensaladilla rusa con patata, bonito seleccionado, mayonesa suave y un toque casero infalible.",
      price: 6.20,
      alerg: "Huevos, Pescado",
      img: "/images/ensaladilla_casa.webp"
    },
    {
      key: "boquerones_vinagre",
      cat: "Tapeo",
      bloque: "tapeo",
      name: "Boquerones en Vinagre",
      desc: "Filetes de boquerón limpios y firmes, marinados en su punto justo de vinagre, aceite de oliva, ajo y perejil fresco.",
      price: 8.00,
      alerg: "Pescado, Sulfitos",
      img: "/images/boquerones_vinagre.webp"
    },
    {
      key: "anchoas_cantabrico",
      cat: "Tapeo",
      bloque: "tapeo",
      name: "Anchoas del Cantábrico",
      desc: "Lomos de anchoa premium del Cantábrico, seleccionadas por su calibre y punto de sal, servidas en aceite de oliva.",
      price: 6.50,
      alerg: "Pescado",
      img: "/images/anchoas_cantabrico.webp"
    },
    {
      key: "gildas",
      cat: "Tapeo",
      bloque: "tapeo",
      name: "Gildas",
      desc: "El pincho clásico por excelencia: una combinación perfecta en banderilla de oliva, piparra en vinagre y anchoa de calidad.",
      price: 2.00,
      alerg: "Pescado, Sulfitos",
      img: "/images/gildas.webp"
    },
    {
      key: "olivas_rellenas",
      cat: "Tapeo",
      bloque: "tapeo",
      name: "Olivas Rellenas de Anchoa",
      desc: "Aceitunas manzanilla carnosas rellenas de sabrosa anchoa seleccionada.",
      price: 2.50,
      alerg: "Pescado",
      img: "/images/olivas_rellenas.webp"
    },
    {
      key: "trio_de_picoteo",
      cat: "Tapeo",
      bloque: "tapeo",
      name: "Trio de Picoteo",
      desc: "La combinación perfecta de patatas premium seleccionadas, aceitunas rellenas de anchoa y mejillones en escabeche.",
      price: 10.50,
      alerg: "Pescado, Sulfitos",
      img: "/images/trio_de_picoteo.webp"
    },
    {
      key: "trio_de_latas",
      cat: "Tapeo",
      bloque: "tapeo",
      name: "Trio de Latas",
      desc: "Una selección marina gourmet que incluye berberechos de las rías gallegas, mejillones selectos en escabeche y aceitunas.",
      price: 19.90,
      alerg: "Pescado, Moluscos",
      img: "/images/trio_de_latas.webp"
    },
    {
      key: "trio_crunchy_mix",
      cat: "Tapeo",
      bloque: "tapeo",
      name: "Trio Crunchy Mix",
      desc: "El acompañamiento crujiente definitivo para el vermut: combinación de patatas chips, maíz gigante crujiente y cortezas de cerdo seleccionadas.",
      price: 3.50,
      alerg: "Frutos de cáscara, Cacahuetes",
      img: "/images/trio_crunchy_mix.webp"
    },
    {
      key: "pica_pica_casa",
      cat: "Tapeo",
      bloque: "tapeo",
      name: "Pica-Pica de la Casa",
      desc: "Selección especial de aperitivos y pequeños bocados ibéricos al centro de la barra.",
      price: 11.50,
      alerg: "",
      img: "/images/pica_pica_casa.webp"
    },
    {
      key: "porky_fries",
      cat: "Tapeo",
      bloque: "tapeo",
      name: "Porky Fries",
      desc: "Una ración generosa de patatas fritas crujientes coronadas con jugosa carne desmechada, queso fundido y salsas selectas.",
      price: 12.90,
      alerg: "Lácteos, Huevos",
      img: "/images/porky_fries.webp"
    },
    {
      key: "huevos_rotos_jamon",
      cat: "Tapeo",
      bloque: "tapeo",
      name: "Huevos Rotos con Jamón Ibérico",
      desc: "Base de patatas fritas caseras cortadas a mano, huevos camperos fritos con puntilla y una generosa cobertura de jamón ibérico de bellota.",
      price: 12.90,
      alerg: "Huevos",
      img: "/images/huevos_rotos_jamon.webp"
    },
    {
      key: "huevos_rotos_secreto",
      cat: "Tapeo",
      bloque: "tapeo",
      name: "Huevos Rotos con Secreto Ibérico",
      desc: "Patatas fritas caseras cubiertas con huevos fritos rotos al momento y finas tiras de jugoso secreto ibérico marcado a la plancha.",
      price: 14.90,
      alerg: "Huevos",
      img: "/images/huevos_rotos_secreto.webp"
    },
    {
      key: "panceta_iberica_crujiente",
      cat: "Tapeo",
      bloque: "tapeo",
      name: "Panceta Ibérica Crujiente",
      desc: "Panceta de cerdo ibérico cocinada a baja temperatura para máxima ternura, servida con huevo frito, patatas fritas y salsa alioli suave.",
      price: 14.50,
      alerg: "Ninguno",
      img: "/images/panceta_iberica_crujiente.webp"
    },
    {
      key: "tabla_seleccion_ibericos",
      cat: "Tapeo",
      bloque: "tapeo",
      name: "Tabla Selección Ibéricos",
      desc: "Un recorrido gourmet por nuestros mejores embutidos selectos: jamón, lomo, salchichón y chorizo ibérico cortados al momento. Acompañada de crujiente pan de cristal con tomate y aceite de oliva virgen extra, junto a una selección de frutos secos.",
      price: 21.90,
      alerg: "Ninguno",
      img: "/images/tabla_seleccion_ibericos.webp"
    },
    {
      key: "tabla_seleccion_quesos",
      cat: "Tapeo",
      bloque: "tapeo",
      name: "Tabla Selección Quesos",
      desc: "Una esmerada variedad de quesos nacionales seleccionados, con matices aromáticos únicos, perfectos para los amantes del buen queso.",
      price: 21.90,
      alerg: "Lácteos",
      img: "/images/tabla_seleccion_quesos.webp"
    },
    {
      key: "torrada_cristal_iberico",
      cat: "Tapeo",
      bloque: "tapeo",
      name: "Torrada Cristal de Ibérico",
      desc: "Rebanada de pan de cristal crujiente frotada con tomate natural y aceite de oliva virgen extra, coronada con finas lonchas de jamón ibérico.",
      price: 8.50,
      alerg: "Gluten",
      img: "/images/torrada_cristal_iberico.webp"
    },
    {
      key: "torrada_cristal_manchega",
      cat: "Tapeo",
      bloque: "tapeo",
      name: "Torrada Cristal Manchega",
      desc: "Crujiente pan de cristal con tomate y aceite de oliva, cubierto con lascas de auténtico queso manchego curado.",
      price: 7.90,
      alerg: "Gluten, Lácteos",
      img: "/images/torrada_cristal_manchega.webp"
    }
  ],
  platos: [
    {
      key: "burrata_iberica",
      cat: "Platos",
      bloque: "platos",
      name: "Burrata Ibérica",
      desc: "Deliciosa y cremosa burrata fresca servida sobre una cama de brotes verdes, coronada con finas lonchas de nuestro mejor jamón ibérico y un toque de aceite de oliva virgen extra.",
      price: 12.50,
      alerg: "Lácteos, Frutos de cáscara",
      img: "/images/burrata_iberica.webp"
    },
    {
      key: "mediterranea",
      cat: "Platos",
      bloque: "platos",
      name: "Mediterránea",
      desc: "Una opción fresca y ligera con una cuidada selección de hortalizas de la huerta, atún de calidad, aceitunas y un aliño tradicional que realza todo su sabor.",
      price: 9.90,
      alerg: "Pescado",
      img: "/images/mediterranea.webp"
    },
    {
      key: "hamburguesa_cerdo_iberico",
      cat: "Platos",
      bloque: "platos",
      name: "Hamburguesa Cerdo Ibérico",
      desc: "Jugosa hamburguesa artesanal elaborada con carne de cerdo ibérico picada de primera, sazonada y hecha a la parrilla, servida con guarnición.",
      price: 7.90,
      alerg: "",
      img: "/images/hamburguesa_cerdo_iberico.webp"
    },
    {
      key: "row_burger",
      cat: "Platos",
      bloque: "platos",
      name: "Row Burger",
      desc: "Hamburguesa premium con carne seleccionada a la parrilla, queso fundido y el toque justo de nuestros ingredientes secretos en un pan tierno y sellado.",
      price: 13.90,
      alerg: "Gluten, Lácteos, Huevos",
      img: "/images/row_burger.webp"
    },
    {
      key: "mia_crispy",
      cat: "Platos",
      bloque: "platos",
      name: "Mia Crispy",
      desc: "Para los amantes del crujiente: jugosa carne acompañada de texturas crujientes, queso fundido y una salsa especial que equilibra cada bocado.",
      price: 12.90,
      alerg: "Gluten, Lácteos, Huevos",
      img: "/images/mia_crispy.webp"
    },
    {
      key: "nala_pull",
      cat: "Platos",
      bloque: "platos",
      name: "Nala Pull",
      desc: "Espectacular hamburguesa de carne desmechada (pulled pork) cocinada a baja temperatura, melosa, desbordante de sabor y bañada en nuestra salsa barbacoa selecta.",
      price: 12.90,
      alerg: "Gluten, Lácteos, Huevos",
      img: "/images/nala_pull.webp"
    },
    {
      key: "selecta_burger",
      cat: "Platos",
      bloque: "platos",
      name: "Selecta Burger",
      desc: "La joya de la corona. Carne de vacuno de primera con un maridaje de ingredientes gourmet que elevan la hamburguesa tradicional a una experiencia premium.",
      price: 14.90,
      alerg: "Gluten, Lácteos, Huevos",
      img: "/images/selecta_burger.webp"
    },
    {
      key: "baos_carrilleras_ibericas",
      cat: "Platos",
      bloque: "platos",
      name: "Baos Carrilleras Ibéricas (3 uds + Boniato)",
      desc: "Tres molletes asiáticos al vapor, súper esponjosos, rellenos de carrillera ibérica melosa cocinada a fuego lento. Acompañados de bastones crujientes de boniato frito.",
      price: 11.90,
      alerg: "Gluten, Soja",
      img: "/images/baos_carrilleras_ibericas.webp"
    },
    {
      key: "baos_panceta_agridulce",
      cat: "Platos",
      bloque: "platos",
      name: "Baos Panceta Agridulce (3 uds + Boniato)",
      desc: "Panecillos al vapor rellenos de panceta ibérica confitada y glaseada en una adictiva salsa agridulce casera. Con guarnición de boniato.",
      price: 11.90,
      alerg: "Gluten, Soja",
      img: "/images/baos_panceta_agridulce.webp"
    },
    {
      key: "iberica_con_huevo",
      cat: "Platos",
      bloque: "platos",
      name: "Ibérica con Huevo",
      desc: "Masa artesanal crujiente con base de tomate y mozzarella, cubierta con finas lonchas de jamón ibérico de bellota y un huevo campero en el centro que se funde en cada bocado.",
      price: 13.90,
      alerg: "Gluten, Lácteos, Huevos",
      img: "/images/iberica_con_huevo.webp"
    },
    {
      key: "burrata_iberica_pizza",
      cat: "Platos",
      bloque: "platos",
      name: "Burrata Ibérica (Pizza)",
      desc: "Una combinación espectacular que funde la cremosidad de la burrata fresca con el contraste salado de las virutas de jamón ibérico sobre una base crujiente horneada al punto.",
      price: 13.50,
      alerg: "Gluten, Lácteos",
      img: "/images/burrata_iberica_pizza.webp"
    },
    {
      key: "la_clasica",
      cat: "Platos",
      bloque: "platos",
      name: "La Clásica",
      desc: "Nuestra pizza más casera y reconfortante, elaborada con ingredientes seleccionados de la casa sobre una base crujiente y fundente de queso.",
      price: 11.90,
      alerg: "Gluten, Lácteos",
      img: "/images/la_clasica.webp"
    },
    {
      key: "secreto_iberico",
      cat: "Platos",
      bloque: "platos",
      name: "Secreto Ibérico",
      desc: "Corte selecto de secreto ibérico, extremadamente jugoso y cocinado a la plancha en su propio jugo para realzar su tierno sabor. Acompañado de una guarnición de patatas.",
      price: 19.90,
      alerg: "Ninguno",
      img: "/images/secreto_iberico.webp"
    },
    {
      key: "lagarto_iberico",
      cat: "Platos",
      bloque: "platos",
      name: "Lagarto Ibérico",
      desc: "Exquisito y jugoso cordón del lomo ibérico marcado a fuego vivo, crujiente por fuera y tierno por dentro. Servido con una ración de patatas.",
      price: 15.90,
      alerg: "Ninguno",
      img: "/images/lagarto_iberico.webp"
    },
    {
      key: "butifarra_iberica_encebollada",
      cat: "Platos",
      bloque: "platos",
      name: "Butifarra Ibérica Encebollada",
      desc: "Butifarra artesanal de receta ibérica, asada y acompañada de una melosa reducción de cebolla pochada a fuego lento y patatas.",
      price: 14.50,
      alerg: "Ninguno",
      img: "/images/butifarra_iberica_encebollada.webp"
    }
  ],
  bebidas: [
    {
      key: "quinto",
      cat: "Bebidas",
      bloque: "bebidas",
      name: "Quinto",
      desc: "Quinto de cerveza Estrella Damm, helado y perfecto para calmar la sed.",
      price: 1.60,
      alerg: "Gluten",
      img: ""
    },
    {
      key: "mediana",
      cat: "Bebidas",
      bloque: "bebidas",
      name: "Mediana",
      desc: "Mediana de cerveza Estrella Damm tradicional, el tamaño ideal de barra.",
      price: 2.30,
      alerg: "Gluten",
      img: ""
    },
    {
      key: "voll_damm",
      cat: "Bebidas",
      bloque: "bebidas",
      name: "Voll Damm",
      desc: "Cerveza doble malta mítica con gran cuerpo, intensidad y aroma.",
      price: 2.50,
      alerg: "Gluten",
      img: ""
    },
    {
      key: "free_damm",
      cat: "Bebidas",
      bloque: "bebidas",
      name: "Free Damm",
      desc: "Cerveza sin alcohol Premium, fresca y ligera con todo el sabor.",
      price: 2.30,
      alerg: "Gluten",
      img: ""
    },
    {
      key: "copa_barril_estrella",
      cat: "Bebidas",
      bloque: "bebidas",
      name: "Copa de barril Estrella Damm",
      desc: "Copa de cerveza tirada de barril directa y servida con espuma perfecta.",
      price: 1.90,
      alerg: "Gluten",
      img: ""
    },
    {
      key: "cana_estrella",
      cat: "Bebidas",
      bloque: "bebidas",
      name: "Caña Estrella Damm",
      desc: "Caña tradicional bien tirada, fresca, burbujeante e ideal para el tapeo.",
      price: 1.50,
      alerg: "Gluten",
      img: ""
    },
    {
      key: "copa_clara_estrella",
      cat: "Bebidas",
      bloque: "bebidas",
      name: "Copa de clara Estrella Damm",
      desc: "Clara refrescante, combinación clásica de cerveza de barril con limón.",
      price: 1.90,
      alerg: "Gluten",
      img: ""
    },
    {
      key: "mediana_turia",
      cat: "Bebidas",
      bloque: "bebidas",
      name: "Mediana Turia",
      desc: "Cerveza tostada Turia de origen valenciano con notas a pan tostado.",
      price: 2.50,
      alerg: "Gluten",
      img: ""
    },
    {
      key: "vermut",
      cat: "Bebidas",
      bloque: "bebidas",
      name: "Vermut",
      desc: "Vermut selecto de la casa servido con hielo, su toque cítrico de naranja y aceituna.",
      price: 2.50,
      alerg: "Sulfitos",
      img: ""
    }
  ]
};
/* FIN DATOS */

export const CAT_ORDER = ['bocadillos', 'tapeo', 'platos', 'bebidas'];

export const CAT_LABELS: Record<string, string> = {
  bocadillos: 'Bocadillos',
  tapeo:      'Tapeo Selecto',
  platos:     'Platos Principales',
  bebidas:    'Bodega y Bebidas',
};
