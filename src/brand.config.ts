/**
 * BRAND CONFIGURATION FILE (White-label Master Config)
 * ===================================================
 * Este es el ÚNICO archivo que hace falta editar para adaptar este sitio
 * a un cliente nuevo (marca, paleta, textos, WhatsApp, redes, video, depósito).
 *
 * Todos los componentes visuales consumen directamente esta configuración.
 */

export interface BrandConfig {
  name: string;
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
  address: {
    short: string;
    full: string;
    city: string;
    warehouseName: string;
    pickupHours: string;
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
    minUnitsWholesale: number;
    wholesaleDiscountPercent: number;
  };

  // Social & Web Links
  social: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  };

  // Mandatory Demo Footer Legend
  demoLegend: string;
}

export const BRAND: BrandConfig = {
  name: "GALPÓN",
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

  address: {
    short: "Parque Patricios, CABA",
    full: "Av. Amancio Alcorta 2490, Parque Patricios, CABA",
    city: "Buenos Aires, Argentina",
    warehouseName: "Depósito Central Lanús / Parque Patricios",
    pickupHours: "Lunes a Viernes de 07:30 a 16:30 hs"
  },

  hero: {
    badge: "CONFECCIÓN INDUSTRIAL PESADA • DESDE 1978",
    title: "ROPA HECHA PARA BANCARSE TODO.",
    description: "Básicos pesados y ropa de trabajo resistente. Sin vueltas, sin descartables: directo del galpón textil a tu taller, obra o el asfalto diario.",
    backgroundImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNThUUlrq1MX2h_4dCw0txNQwVbdB9bWBMvrrvQeLuItcs1c_8UL-RZnO6rsnlOeXfdquozGubWrdlnO9usLioXfZoSvr63XSC5AZ8pUAsk43ysbVGJBbzSkNMG_BdwOZYJFp0u6PMnLnmThdBgnR-7wrRSQ1kF6ts0MdsXjX1LfgQmY1RfPcjF0PcpI7Vs1ZlFmg-RIFQEOm1T3uMcnDFndQCsfGhgWyXjsjdaaqme_DbxIKWJWDYBQ",
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
    // Video nativo con placeholder funcional MP4 accesible de forma fiable
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    posterUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLlkvwVSjJK2mgQ8z-1hB8RtPCwal7sUC0NnC623p4lfPlhdnw-l4Zrtkh9rD6n17aL-1_DdP01aLuKHe-Qh7rFVOVNpTP-mskvM7q_pSjKstSq0FFiKEFtH3NSWh6Ns6efxdZNWFy9KiYr9bpGLXWooRY4j_L-HyLZNv3yJVbc9vgjzRFKpBfVromx1YYOl4bd3d-zTzYRSqTwSCmYdu1LWRcxe_zk9BywummsPI0JzgR9MwJw38KmA",
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
    minUnitsWholesale: 6,
    wholesaleDiscountPercent: 10
  },

  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    linkedin: "https://linkedin.com"
  },

  demoLegend: "Marca, productos y precios de ejemplo — prototipo de demostración de sender.ia"
};
