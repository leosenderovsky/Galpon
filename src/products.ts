/**
 * PRODUCTS DATA SOURCE & REPOSITORY
 * =================================
 * Este archivo actúa como única fuente de datos para el catálogo de productos.
 * El componente de catálogo y la ficha técnica leen SIEMPRE de esta estructura.
 * 
 * ============================================================================
 * 🔌 [CONEXIÓN FUTURA CON FIREBASE / FIRESTORE]:
 * Para conectar este catálogo a una base de datos en tiempo real (Firebase Firestore)
 * y permitir que el cliente actualice precios, stock y fotos desde un panel propio:
 * 
 * 1. Inicializar Firebase Firestore (usando `getFirestore(app)`).
 * 2. Reemplazar la exportación de `PRODUCTS` estática por un hook reactivo:
 *    `useProductsCollection()` que haga:
 *    `onSnapshot(collection(db, "products"), (snapshot) => { ... })`
 * 3. La interfaz `Product` se mantiene idéntica, por lo que NINGÚN componente
 *    visual (Catalog, ProductModal, Cart, Checkout) necesitará ser modificado.
 * ============================================================================
 */

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductSpecification {
  fabric: string;
  seams: string;
  hardware: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: 'camperas' | 'pantalones' | 'remeras' | 'chalecos';
  categoryLabel: string;
  // Precios editables aquí:
  price: number; // Precio minorista unitario en ARS
  wholesalePrice: number; // Precio mayorista por unidad
  wholesaleMinUnits: number; // Unidades mínimas para precio mayorista
  wholesaleBadge: string;
  
  sizes: string[]; // Talles disponibles (ej: ['S', 'M', 'L', 'XL', 'XXL', '3XL'])
  colors: ProductColor[]; // Colores disponibles
  images: string[]; // URLs de imágenes
  
  description: string;
  extendedDescription?: string;
  lot?: string;
  origin?: string;
  badge?: string; // Ej: 'DESTACADO', 'MÁS VENDIDO', 'PACK X2', 'TÉRMICO'
  materialTag?: string; // Ej: 'LONA 12 OZ', 'RIPSTOP ANTIDESGARRO'
  specs?: ProductSpecification;
  relatedProductId?: string; // ID de prenda sugerida para conjunto
}

const PRODUCT_IMAGE_DIMENSIONS: Record<string, { width: number; height: number }> = {
  '/assets/products/buzo-canguro-frisa.jpg': { width: 1024, height: 1024 },
  '/assets/products/buzo-frisa-gruesa.jpg': { width: 512, height: 279 },
  '/assets/products/camisa-trabajo-denim.jpg': { width: 512, height: 279 },
  '/assets/products/campera-chore-canvas.jpg': { width: 512, height: 512 },
  '/assets/products/campera-chore-canvas-2.jpg': { width: 512, height: 279 },
  '/assets/products/campera-chore-canvas-3.jpg': { width: 512, height: 279 },
  '/assets/products/campera-chore-canvas-4.jpg': { width: 512, height: 279 },
  '/assets/products/campera-parka-corderito.jpg': { width: 1024, height: 1024 },
  '/assets/products/chaleco-utilitario-termico.jpg': { width: 512, height: 279 },
  '/assets/products/chomba-pique-pesada.jpg': { width: 1024, height: 1024 },
  '/assets/products/jean-industrial-rigido.jpg': { width: 1024, height: 1024 },
  '/assets/products/pack-remeras-heavy-duty.jpg': { width: 512, height: 512 },
  '/assets/products/pantalon-cargo-ripstop.jpg': { width: 512, height: 512 },
  '/assets/products/pantalon-carpintero-canvas.jpg': { width: 1024, height: 1024 },
  '/assets/products/remera-manga-larga-heavy-duty.jpg': { width: 1024, height: 1024 },
};

export function getProductImageDimensions(src: string) {
  return PRODUCT_IMAGE_DIMENSIONS[src];
}

export const CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'remeras', label: 'Remeras y Chombas' },
  { id: 'pantalones', label: 'Pantalones Cargo y Jeans' },
  { id: 'camperas', label: 'Camperas de Trabajo' },
  { id: 'chalecos', label: 'Buzos y Chalecos' }
] as const;

export const AVAILABLE_SIZES = ['S', 'M', 'L', 'XL', 'XXL', '3XL', '40', '42', '44', '46', '48'] as const;

export const PRODUCTS: Product[] = [
  {
    id: 'campera-chore-canvas',
    sku: 'GLP-CHP-01',
    name: 'Campera Chore Canvas Pesada',
    category: 'camperas',
    categoryLabel: 'ART. 4100 • INDUMENTARIA PESADA',
    price: 54000,
    wholesalePrice: 41500,
    wholesaleMinUnits: 6,
    wholesaleBadge: 'Mayorista x6',
    sizes: ['M', 'L', 'XL', 'XXL', '3XL'],
    colors: [
      { name: 'Carbón Oscuro (Black Duck)', hex: '#2a2b2c' },
      { name: 'Marrón Tabaco (Canvas Tan)', hex: '#7c5733' },
      { name: 'Verde Militar (Olive Drab)', hex: '#3a4439' }
    ],
    images: [
      '/assets/products/campera-chore-canvas.jpg',
      '/assets/products/campera-chore-canvas-2.jpg',
      '/assets/products/campera-chore-canvas-3.jpg',
      '/assets/products/campera-chore-canvas-4.jpg'
    ],
    description: 'Lona de algodón 100% encerado ligero, botones de bronce matrizados y 3 bolsillos de carga exterior reforzados.',
    extendedDescription: 'Confeccionada para cuadrillas de taller, obras y uso diario en intemperie. Resistencia abrasiva de grado industrial con holgura funcional pensada para calzar con un buzo o camisa de abrigo debajo.',
    lot: '2025-Q1',
    origin: 'TALLER INDUSTRIAL BUENOS AIRES',
    badge: 'DESTACADO',
    materialTag: 'LONA 12 OZ',
    specs: {
      fabric: 'Lona 100% Algodón 12oz (Heavyweight Canvas peinado de alto gramaje).',
      seams: 'Costuras dobles reforzadas con atraque en zonas de tensión.',
      hardware: 'Botones metálicos macizos color bronce envejecido de alta durabilidad.'
    },
    relatedProductId: 'pantalon-cargo-ripstop'
  },
  {
    id: 'pantalon-cargo-ripstop',
    sku: 'GLP-CRG-22',
    name: 'Pantalón Cargo Reforzado Ripstop',
    category: 'pantalones',
    categoryLabel: 'ART. 2280 • PANTALONERÍA',
    price: 38500,
    wholesalePrice: 29900,
    wholesaleMinUnits: 10,
    wholesaleBadge: 'Mayorista x10',
    sizes: ['40', '42', '44', '46', '48'],
    colors: [
      { name: 'Khaki Arena', hex: '#8a7d65' },
      { name: 'Verde Militar', hex: '#3a4439' },
      { name: 'Negro Azabache', hex: '#1e1f20' }
    ],
    images: [
      '/assets/products/pantalon-cargo-ripstop.jpg'
    ],
    description: 'Tejido antidesgarro con rodillas preformadas dobles, tiro alto para trabajo y bolsillos fuelle con velcro militar.',
    extendedDescription: 'Diseñado para instaladores, mecánicos y cuadrillas en movimiento continuo. Cuenta con 6 bolsillos estratégicos con atraques en zigzag y pasacintos reforzados para portaherramientas.',
    lot: '2025-Q1',
    origin: 'TALLER INDUSTRIAL BUENOS AIRES',
    badge: 'MÁS VENDIDO',
    materialTag: 'RIPSTOP ANTIDESGARRO',
    specs: {
      fabric: 'Ripstop 65% Algodón / 35% Poliéster antidesgarro 240g.',
      seams: 'Costura triple de seguridad en entrepierna y laterales.',
      hardware: 'Cierre YKK metálico de bronce y botón de alta presión.'
    }
  },
  {
    id: 'pack-remeras-heavy-duty',
    sku: 'GLP-REM-10',
    name: 'Remera Heavy Duty 24/1 (Pack x2)',
    category: 'remeras',
    categoryLabel: 'ART. 1040 • BÁSICOS PESADOS',
    price: 22000,
    wholesalePrice: 16200,
    wholesaleMinUnits: 12,
    wholesaleBadge: 'Mayorista x12',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Azul Marino + Verde Militar', hex: '#1c2833' },
      { name: 'Negro + Crudo Natural', hex: '#191c1e' },
      { name: 'Gris Melange + Carbón', hex: '#505558' }
    ],
    images: [
      '/assets/products/pack-remeras-heavy-duty.jpg'
    ],
    description: 'Gramaje auténtico 210g sin achique. Cuello en ribb reforzado con tapa costura de hombro a hombro.',
    extendedDescription: 'Remeras de verdadero algodón peinado 24/1 pesado. No se desbocan ni deforman tras los lavados de taller ni exigen cuidados especiales. Vienen en pack sellado de a dos unidades.',
    lot: '2025-Q1',
    origin: 'HILANDERÍA BUENOS AIRES',
    badge: 'PACK X2',
    materialTag: 'ALGODÓN 100% PEINADO',
    specs: {
      fabric: 'Jersey 24/1 algodón 100% título peinado pesado 210 GSM.',
      seams: 'Tapa costura completa en escote trasero y dobladillos dobles.',
      hardware: 'Ribb de cuello con elastómero 1x1 indeformable.'
    }
  },
  {
    id: 'camisa-trabajo-denim',
    sku: 'GLP-DNM-33',
    name: 'Camisa de Trabajo Denim Industrial',
    category: 'camperas',
    categoryLabel: 'ART. 3310 • CAMISERÍA TÉCNICA',
    price: 34500,
    wholesalePrice: 26000,
    wholesaleMinUnits: 8,
    wholesaleBadge: 'Mayorista x8',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Azul Denim Índigo', hex: '#1c3144' },
      { name: 'Gris Oscuro Desgastado', hex: '#373a3c' }
    ],
    images: [
      '/assets/products/camisa-trabajo-denim.jpg'
    ],
    description: 'Sarga de algodón puro pre-lavado. Botonadura de pasta industrial y bolsillo para lápiz o calibre.',
    extendedDescription: 'Construida para jornadas completas en obra, fábrica o campo. Suave al tacto pero con grosor de 9.5 oz que resiste roces sin desgarrar.',
    lot: '2025-Q1',
    origin: 'TALLER INDUSTRIAL BUENOS AIRES',
    materialTag: 'DENIM 9.5 OZ',
    specs: {
      fabric: 'Sarga 100% Algodón Denim 9.5 oz pre-lavado enzimático.',
      seams: 'Costuras pespunteadas en hilo color ocre de alta torsión.',
      hardware: 'Botones de pasta industrial prensada de 4 agujeros.'
    }
  },
  {
    id: 'buzo-frisa-gruesa',
    sku: 'GLP-BZO-50',
    name: 'Buzo Frisa Gruesa Cuello Redondo',
    category: 'chalecos',
    categoryLabel: 'ART. 5050 • ABRIGO CLÁSICO',
    price: 29000,
    wholesalePrice: 21800,
    wholesaleMinUnits: 10,
    wholesaleBadge: 'Mayorista x10',
    sizes: ['S', 'M', 'L', 'XL', '3XL'],
    colors: [
      { name: 'Gris Melange Industrial', hex: '#7a7e80' },
      { name: 'Azul Marino Taller', hex: '#16222f' },
      { name: 'Negro Grafito', hex: '#212224' }
    ],
    images: [
      '/assets/products/buzo-frisa-gruesa.jpg'
    ],
    description: 'Interior esmerilado ultra térmico. Puños y cintura con elastómero que no ceden con los lavados de faena.',
    extendedDescription: 'Frisa invisible 320g pesada con afelpado interno que conserva el calor corporal sin limitar el movimiento.',
    lot: '2025-Q1',
    origin: 'TEJEDURÍA BUENOS AIRES',
    materialTag: 'FRISA INVISIBLE 320G',
    specs: {
      fabric: 'Frisa de algodón y poliéster 70/30 de 320 gramos.',
      seams: 'Costura overlock de 5 hilos con refuerzo en cuello y hombros.',
      hardware: 'Puños y faja en ribb pesado con elastómero memoria.'
    }
  },
  {
    id: 'chaleco-utilitario-termico',
    sku: 'GLP-CHL-62',
    name: 'Chaleco Utilitario Multibolsillos Térmico',
    category: 'chalecos',
    categoryLabel: 'ART. 6200 • CHALECOS TALLER',
    price: 42000,
    wholesalePrice: 32500,
    wholesaleMinUnits: 6,
    wholesaleBadge: 'Mayorista x6',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Negro Taller', hex: '#1f2022' },
      { name: 'Marrón Tabaco', hex: '#634b35' },
      { name: 'Verde Bosque', hex: '#2b362c' }
    ],
    images: [
      '/assets/products/chaleco-utilitario-termico.jpg'
    ],
    description: 'Línea acolchada liviana con 4 compartimentos frontales, bolsillo interno con cierre y espalda extendida para protección lumbar.',
    extendedDescription: 'Ideal para tareas en intemperie que exigen brazos libres y torso abrigado. Forro interior de tafeta deslizante para poner y sacar sobre buzos o camisas sin trabarse.',
    lot: '2025-Q1',
    origin: 'TALLER INDUSTRIAL BUENOS AIRES',
    badge: 'TÉRMICO',
    materialTag: 'GUATTA 150G + TAFETA',
    specs: {
      fabric: 'Exterior micro-ripstop repelente al agua con guatta siliconada 150g.',
      seams: 'Acolchado en rombos con atraque en boca de bolsillos.',
      hardware: 'Cremallera central de diente grueso metálico y broches a presión.'
    }
  },
  {
    id: 'campera-parka-corderito',
    sku: 'GLP-PRK-44',
    name: 'Parka Corta Canvas Forro Corderito',
    category: 'camperas',
    categoryLabel: 'ART. 4400 • ABRIGO DE INTEMPERIE',
    price: 78000,
    wholesalePrice: 60500,
    wholesaleMinUnits: 6,
    wholesaleBadge: 'Mayorista x6',
    sizes: ['M', 'L', 'XL', 'XXL', '3XL'],
    colors: [
      { name: 'Negro Taller', hex: '#1f2022' },
      { name: 'Marrón Tabaco', hex: '#634b35' },
      { name: 'Verde Militar', hex: '#3a4439' }
    ],
    images: ['/assets/products/campera-parka-corderito.jpg'],
    description: 'Lona encerada con forro corderito, capucha ajustable y cierre doble con tapa de broches de bronce.',
    extendedDescription: 'Pensada para depósitos, obras y trabajo a la intemperie en pleno invierno. Mantiene el calor sin perder libertad de movimiento y la lona encerada repele lluvia y salpicaduras.',
    lot: '2025-Q1',
    origin: 'TALLER INDUSTRIAL BUENOS AIRES',
    badge: 'INVIERNO',
    materialTag: 'LONA 12 OZ + CORDERITO',
    specs: {
      fabric: 'Lona 100% algodón encerada 12 oz con forro interior de corderito sintético.',
      seams: 'Costuras dobles reforzadas con atraque en bolsillos y capucha.',
      hardware: 'Cierre metálico doble corredera y broches de bronce envejecido.'
    },
    relatedProductId: 'pantalon-carpintero-canvas'
  },
  {
    id: 'jean-industrial-rigido',
    sku: 'GLP-JNS-24',
    name: 'Jean Industrial Rígido 14 oz',
    category: 'pantalones',
    categoryLabel: 'ART. 2410 • JEANERÍA PESADA',
    price: 41000,
    wholesalePrice: 31800,
    wholesaleMinUnits: 10,
    wholesaleBadge: 'Mayorista x10',
    sizes: ['40', '42', '44', '46', '48'],
    colors: [
      { name: 'Azul Índigo Rígido', hex: '#1c3144' },
      { name: 'Negro Rígido', hex: '#1e1f20' },
      { name: 'Azul Lavado Oscuro', hex: '#2f4a63' }
    ],
    images: ['/assets/products/jean-industrial-rigido.jpg'],
    description: 'Denim rígido de 14 oz sin elastano, corte recto y remaches de bronce en todos los puntos de tensión.',
    extendedDescription: 'Un jean de verdad para trabajo pesado: aguanta roce, grasa y lavados de taller sin deformarse. Se va marcando con el uso y mejora con los meses.',
    lot: '2025-Q1',
    origin: 'TALLER INDUSTRIAL BUENOS AIRES',
    materialTag: 'DENIM 14 OZ',
    specs: {
      fabric: 'Denim 100% algodón rígido 14 oz.',
      seams: 'Costura doble pespunteada en hilo ocre y atraques en bolsillos.',
      hardware: 'Remaches de bronce y botón de alta presión con cierre metálico.'
    },
    relatedProductId: 'camisa-trabajo-denim'
  },
  {
    id: 'pantalon-carpintero-canvas',
    sku: 'GLP-CPT-26',
    name: 'Pantalón Carpintero Canvas Doble Rodilla',
    category: 'pantalones',
    categoryLabel: 'ART. 2620 • PANTALONERÍA',
    price: 44500,
    wholesalePrice: 34200,
    wholesaleMinUnits: 8,
    wholesaleBadge: 'Mayorista x8',
    sizes: ['40', '42', '44', '46', '48'],
    colors: [
      { name: 'Marrón Tabaco', hex: '#634b35' },
      { name: 'Carbón', hex: '#2a2b2c' },
      { name: 'Verde Olive', hex: '#3a4439' }
    ],
    images: ['/assets/products/pantalon-carpintero-canvas.jpg'],
    description: 'Lona pesada con doble rodilla reforzada, portamartillo y bolsillo para regla.',
    extendedDescription: 'Hecho para carpinteros, instaladores y oficios de piso y rodilla. Los refuerzos dobles duplican la vida útil de la zona que más se gasta.',
    lot: '2025-Q1',
    origin: 'TALLER INDUSTRIAL BUENOS AIRES',
    badge: 'NUEVO',
    materialTag: 'LONA 10 OZ',
    specs: {
      fabric: 'Lona 100% algodón 10 oz con refuerzo doble en rodillas.',
      seams: 'Costura triple en entrepierna y atraques en portaherramientas.',
      hardware: 'Cierre YKK metálico y botón de alta presión.'
    },
    relatedProductId: 'campera-chore-canvas'
  },
  {
    id: 'chomba-pique-pesada',
    sku: 'GLP-CHM-12',
    name: 'Chomba Piqué Pesada de Trabajo',
    category: 'remeras',
    categoryLabel: 'ART. 1220 • CHOMBAS',
    price: 24500,
    wholesalePrice: 18300,
    wholesaleMinUnits: 12,
    wholesaleBadge: 'Mayorista x12',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Azul Marino', hex: '#1c2833' },
      { name: 'Gris Melange', hex: '#505558' },
      { name: 'Negro', hex: '#191c1e' }
    ],
    images: ['/assets/products/chomba-pique-pesada.jpg'],
    description: 'Piqué de algodón pesado, cuello y puños en ribb reforzado, botonadura de dos botones.',
    extendedDescription: 'La chomba para uniformes de cuadrilla y atención al público: se ve prolija toda la jornada y aguanta los lavados industriales sin deformarse ni perder color.',
    lot: '2025-Q1',
    origin: 'HILANDERÍA BUENOS AIRES',
    materialTag: 'PIQUÉ 220G',
    specs: {
      fabric: 'Piqué 100% algodón peinado de 220 gramos.',
      seams: 'Tapa costura en hombros y dobladillos dobles.',
      hardware: 'Botones de pasta de 4 agujeros y cuello en ribb indeformable.'
    }
  },
  {
    id: 'remera-manga-larga-heavy-duty',
    sku: 'GLP-REM-14',
    name: 'Remera Manga Larga Heavy Duty 24/1',
    category: 'remeras',
    categoryLabel: 'ART. 1140 • BÁSICOS PESADOS',
    price: 25500,
    wholesalePrice: 19000,
    wholesaleMinUnits: 12,
    wholesaleBadge: 'Mayorista x12',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Gris Melange', hex: '#505558' },
      { name: 'Azul Marino', hex: '#1c2833' },
      { name: 'Verde Militar', hex: '#3a4439' }
    ],
    images: ['/assets/products/remera-manga-larga-heavy-duty.jpg'],
    description: 'Algodón peinado 24/1 de 210g, manga larga y cuello en ribb reforzado para abrigar bajo la campera.',
    extendedDescription: 'La base térmica de las jornadas frías: gramaje real, no se desboca ni se achica y entra cómoda debajo de un buzo o una campera.',
    lot: '2025-Q1',
    origin: 'HILANDERÍA BUENOS AIRES',
    badge: 'NUEVO',
    materialTag: 'ALGODÓN 100% PEINADO',
    specs: {
      fabric: 'Jersey 24/1 algodón 100% peinado pesado 210 GSM.',
      seams: 'Tapa costura en escote trasero y puños con costura doble.',
      hardware: 'Ribb de cuello y puños con elastómero 1x1 indeformable.'
    },
    relatedProductId: 'buzo-canguro-frisa'
  },
  {
    id: 'buzo-canguro-frisa',
    sku: 'GLP-BZC-52',
    name: 'Buzo Canguro Capucha Frisa Pesada',
    category: 'chalecos',
    categoryLabel: 'ART. 5250 • ABRIGO CLÁSICO',
    price: 36500,
    wholesalePrice: 27500,
    wholesaleMinUnits: 8,
    wholesaleBadge: 'Mayorista x8',
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    colors: [
      { name: 'Negro Grafito', hex: '#212224' },
      { name: 'Gris Melange Industrial', hex: '#7a7e80' },
      { name: 'Azul Marino Taller', hex: '#16222f' }
    ],
    images: ['/assets/products/buzo-canguro-frisa.jpg'],
    description: 'Frisa pesada con interior afelpado, capucha forrada, bolsillo canguro y puños y cintura en ribb.',
    extendedDescription: 'Abrigo diario para taller, depósito y calle. El interior esmerilado retiene el calor y la capucha doble protege cuello y nuca sin limitar el movimiento.',
    lot: '2025-Q1',
    origin: 'TEJEDURÍA BUENOS AIRES',
    materialTag: 'FRISA 340G',
    specs: {
      fabric: 'Frisa de algodón y poliéster 70/30 de 340 gramos.',
      seams: 'Overlock de 5 hilos con refuerzo en capucha, hombros y bolsillo.',
      hardware: 'Cordones de algodón con puntera metálica y ribb con elastómero.'
    }
  }
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id);
}

export function formatARS(amount: number): string {
  return '$' + Math.round(amount).toLocaleString('es-AR');
}
