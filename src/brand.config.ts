/**
 * BRAND CONFIGURATION FILE (White-label Master Config)
 * ===================================================
 * Este es el ÚNICO archivo que hace falta editar para adaptar este sitio
 * a un cliente nuevo (marca, paleta, textos, WhatsApp, redes, video, depósito).
 *
 * Todos los componentes visuales consumen directamente esta configuración.
 */

import { getDemoLegend } from './demoBanner.config.ts';

export interface BrandConfig {
  name: string;
  legalName?: string;
  shortName: string;
  tagline: string;
  foundedYear: string;
  cuit: string;
  
  // Contact & Logistics
  whatsapp: {
    display: string;
    rawNumber: string; // E.g. "5491140008800" (sin símbolos para wa.me)
    defaultInquiryText: string;
    wholesaleInquiryText: string;
  };
  email: string;
  theme: {
    primary: string;
    primaryDeep: string;
    secondary: string;
    secondaryDark: string;
    accent: string;
    accentLight: string;
    accentOn: string;
    background: string;
    surface: string;
    surfaceMuted: string;
    surfaceSubtle: string;
    surfaceHover: string;
    border: string;
    borderSoft: string;
    borderStrong: string;
    text: string;
    textSecondary: string;
    textMuted: string;
    textOnDark: string;
    danger: string;
    whatsapp: string;
    whatsappHover: string;
    selection: string;
  };
  typography: {
    stylesheetUrl: string;
    iconStylesheetUrl: string;
    headlineFamily: string;
    bodyFamily: string;
  };
  seo: {
    titleSuffix: string;
    description: string;
    socialImage: string;
  };
  address: {
    short: string;
    full: string;
    city: string;
    warehouseName: string;
    packingLabel: string;
    pickupLabel: string;
    pickupHours: string;
  };
  shipping: {
    homeDeliveryLabel: string;
    homeDeliveryDescription: string;
  };
  logo: {
    src: string;
    srcLight?: string;
    alt: string;
    favicon32: string;
    appleTouchIcon: string;
  };
  
  // Hero Copy
  hero: {
    badge: string;
    title: string;
    description: string;
    backgroundImage: string;
    ctaCatalogText: string;
    ctaHowToBuyText: string;
    valueProps: Array<{
      icon: string;
      title: string;
    }>;
    announcementBar: {
      leftText: string;
      rightText: string;
      subHighlight: string;
    };
  };

  // Video Section ("Cómo Comprar")
  howToBuy: {
    tagline: string;
    title: string;
    description: string;
    // URL del video de cómo comprar. Por defecto utiliza un video demo HTML5 que se puede reemplazar por el render de IA.
    videoUrl: string;
    posterUrl: string;
    placeholderMessage: string;
    badge: string;
    duration: string;
    caption: string;
    steps: Array<{
      number: string;
      badge: string;
      title: string;
      description: string;
    }>;
  };

  // Wholesale / B2B Section
  b2b: {
    badge: string;
    title: string;
    description: string;
    bullets: string[];
    cartWholesaleTarget: number;
    comboMinItems: number;
    comboDiscountPercent: number;
  };

  // Social & Web Links
  social: {
    instagram: string;
    facebook: string;
    linkedin: string;
  };

  testimonials: Array<{
    initials: string;
    name: string;
    role: string;
    text: string;
    color: string;
  }>;

  // Mandatory Demo Footer Legend
  demoLegend: string;
  demo: {
    prefillCart: boolean;
    customer: {
      fullName: string;
      phone: string;
      email: string;
      street: string;
      postalCode: string;
      notes: string;
    };
  };
  assetsWithPrototypeBranding: string[];
}

export const BRAND: BrandConfig = {
  name: "GALPÓN",
  legalName: "GALPÓN INDUMENTARIA",
  shortName: "G",
  tagline: "INDUMENTARIA Y TRABAJO",
  foundedYear: "1978",
  cuit: "30-71829910-4",

  whatsapp: {
    display: "+54 9 11 4000-8800",
    rawNumber: "5491140008800",
    defaultInquiryText: "Hola Galpón! Quisiera hacer una consulta sobre los productos del catálogo.",
    wholesaleInquiryText: "Hola Galpón! Quisiera solicitar presupuesto mayorista y lista de precios B2B para mi empresa/comercio."
  },

  email: "ventas@galponindumentaria.com.ar",

  theme: {
    primary: "#152536",
    primaryDeep: "#000f20",
    secondary: "#7c5733",
    secondaryDark: "#613f1e",
    accent: "#fdcb9e",
    accentLight: "#ffdcbf",
    accentOn: "#2d1600",
    background: "#f8f9fb",
    surface: "#ffffff",
    surfaceMuted: "#f3f4f6",
    surfaceSubtle: "#edeef0",
    surfaceHover: "#e7e8ea",
    border: "#c4c6cd",
    borderSoft: "#e1e2e4",
    borderStrong: "#d9dadc",
    text: "#191c1e",
    textSecondary: "#44474c",
    textMuted: "#7c8ca1",
    textOnDark: "#b8c8de",
    danger: "#ba1a1a",
    whatsapp: "#25d366",
    whatsappHover: "#20ba59",
    selection: "#c2956c"
  },

  typography: {
    stylesheetUrl: "https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Work+Sans:wght@400;500;600;700&display=swap",
    iconStylesheetUrl: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200",
    headlineFamily: "'Oswald', sans-serif",
    bodyFamily: "'Work Sans', sans-serif"
  },

  seo: {
    titleSuffix: "Indumentaria Masculina y de Trabajo",
    description: "Catálogo digital y landing con pedido directo por WhatsApp para indumentaria masculina y ropa de trabajo pesada.",
    socialImage: "/assets/misc/og-image.jpg"
  },

  address: {
    short: "Parque Patricios, CABA",
    full: "Av. Amancio Alcorta 2490, Parque Patricios, CABA",
    city: "Buenos Aires, Argentina",
    warehouseName: "Galpón Despacho",
    packingLabel: "Control de Empaque Galpón",
    pickupLabel: "Retiro en Depósito Central (Lanús / Parque Patricios)",
    pickupHours: "Lunes a Viernes de 07:30 a 16:30 hs"
  },

  shipping: {
    homeDeliveryLabel: "Envío a Domicilio (Correo Argentino / Andreani)",
    homeDeliveryDescription: "Despacho garantizado por Correo Argentino o Andreani con número de seguimiento en tiempo real."
  },

  logo: {
    // Para fondos oscuros, agregar public/assets/logo-light.png y configurar srcLight con esa ruta.
    src: "/assets/logo/logo.png",
    alt: "GALPÓN",
    favicon32: "/assets/logo/favicon-32.png",
    appleTouchIcon: "/assets/logo/apple-touch-icon.png"
  },

  hero: {
    badge: "CONFECCIÓN INDUSTRIAL PESADA • DESDE 1978",
    title: "ROPA HECHA PARA BANCARSE TODO.",
    description: "Básicos pesados y ropa de trabajo resistente. Sin vueltas, sin descartables: directo del galpón textil a tu taller, obra o el asfalto diario.",
    backgroundImage: "/assets/hero/hero-1.jpg",
    ctaCatalogText: "Ver Catálogo Completo",
    ctaHowToBuyText: "¿Cómo Comprar por WhatsApp?",
    valueProps: [
      { icon: "texture", title: "Algodón 24/1 Pesado" },
      { icon: "shield_with_heart", title: "Costura Triple Refuerzo" },
      { icon: "payments", title: "Curvas Mayoristas" },
      { icon: "local_shipping", title: "Expreso a Todo el País" }
    ],
    announcementBar: {
      leftText: "STOCK DISPONIBLE PARA ENTREGA INMEDIATA EN PARQUE PATRICIOS",
      rightText: "FACTURA A Y B DIRECTA",
      subHighlight: "PRECIOS CON IVA INCLUIDO"
    }
  },

  howToBuy: {
    tagline: "SISTEMA ÁGIL SIN VUELTAS",
    title: "CÓMO COMPRAR EN 3 PASOS",
    description: "Despachamos pedidos en menos de 24 horas hábiles una vez acreditado el pago o coordinado el expreso.",
    // videoUrl y posterUrl son los dos archivos que se reemplazan por los del cliente, con los mismos nombres, o se cambian las rutas aquí.
    // videoUrl también acepta una URL https absoluta.
    videoUrl: "/assets/video/como-comprar.mp4",
    posterUrl: "/assets/hero/como-comprar-1.jpg",
    placeholderMessage: "Acá va el video de muestra del cliente real. Se prepara con IA a partir de su catálogo.",
    badge: "GUÍA INTERACTIVA",
    duration: "0:45 MIN",
    caption: "Audio en español • Demostración de armado de pedido y despacho por flete o Correo Argentino.",
    steps: [
      {
        number: "01",
        badge: "SELECCIÓN DE PRENDAS",
        title: "Elegí artículos y talles",
        description: "Explorá el catálogo. Podés sumar unidades individuales o paquetes cerrados por curva de talles con precios mayoristas."
      },
      {
        number: "02",
        badge: "CHEQUEO Y DATOS",
        title: "Revisá tu orden en el carrito",
        description: "Completás tu localidad, modalidad de envío o retiro y si precisás Factura A con CUIT o Factura B consumidor final."
      },
      {
        number: "03",
        badge: "CIERRE POR WHATSAPP",
        title: "Confirmación y Despacho",
        description: "Tu pedido viaja listo a nuestra mesa comercial de WhatsApp. Chequeamos stock físico en depósito y te pasamos el link de pago o CBU."
      }
    ]
  },

  b2b: {
    badge: "CANAL DISTRIBUIDOR & CUADRILLAS",
    title: "¿TENÉS COMERCIO O NECESITÁS VESTIR A TU EQUIPO?",
    description: "Atendemos directamente a metalúrgicas, constructoras, talleres mecánicos y locales multimarcas de todo el país. Precios por bulto cerrado y personalizaciones con bordado ignífugo o serigrafía textil de alta tenacidad.",
    bullets: [
      "Emisión de Factura A en el acto",
      "Bordados institucionales desde 20u",
      "Envíos por expreso a coordinar",
      "Lista de precios en Excel / PDF"
    ],
    cartWholesaleTarget: 130000,
    comboMinItems: 3,
    comboDiscountPercent: 10
  },

  social: {
    instagram: "",
    facebook: "",
    linkedin: ""
  },

  // Los testimonios deben ser reales y contar con autorización del cliente.
  testimonials: [
    {
      initials: "MR",
      name: "Martín Rodríguez",
      role: "Logística & Cargas Rosario",
      text: "“Compramos 25 camperas canvas para los mecánicos de la flota. Aguantan el roce con grasa y fierros pesados sin deshilacharse. Excelente atención y entrega en 48hs a Rosario.”",
      color: "bg-[#152536]"
    },
    {
      initials: "EP",
      name: "Esteban Peralta",
      role: "Taller Herrería Peralta - Córdoba",
      text: "“Las remeras 24/1 son verdaderamente pesadas, no tienen nada que ver con lo que te venden habitualmente que se deforma al segundo lavado. El cuello queda siempre intacto.”",
      color: "bg-[#7c5733]"
    },
    {
      initials: "GD",
      name: "Gastón Domínguez",
      role: "Electromecánica Sur - Neuquén",
      text: "“Pedimos curva cerrada de pantalones ripstop para cuadrilla de tendido eléctrico. Calce cómodo para trepar y arneses, los refuerzos de rodilla son clave.”",
      color: "bg-[#000f20]"
    }
  ],

  demoLegend: getDemoLegend(),
  demo: {
    prefillCart: false,
    customer: {
      fullName: "Juan Carlos Pérez",
      phone: "+54 9 11 2345-6789",
      email: "juancarlos.perez@industria.com.ar",
      street: "Calle Falsa 123",
      postalCode: "1824",
      notes: "Horario de entrega por la mañana de 09:00 a 13:00 hs."
    }
  },
  assetsWithPrototypeBranding: [
    "/assets/hero/hero-1.jpg",
    "/assets/hero/como-comprar-1.jpg",
    "/assets/products/campera-chore-canvas-2.jpg",
    "/assets/products/campera-chore-canvas-4.jpg"
  ]
};
