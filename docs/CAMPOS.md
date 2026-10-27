# Diccionario de Campos Editables

Este documento lista todos los campos editables del archivo `src/data/brand.json` definidos en `src/data/brand.schema.json`.

| Ruta | Título | Descripción | Widget | Asset | Ejemplo |
|---|---|---|---|---|---|
| `schemaVersion` | versión del esquema | Valor numérico. | `number` |  |  |
| `site` | identificador del sitio | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `name` | nombre | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | GALPÓN |
| `legalName` | Legal nombre | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | GALPÓN INDUMENTARIA |
| `shortName` | Corto nombre | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `tagline` | frase de la marca | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | INDUMENTARIA Y TRABAJO |
| `foundedYear` | Fundación año | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `cuit` | CUIT | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `whatsapp.display` | WhatsApp: visible | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | +54 9 11 4000-8800 |
| `whatsapp.rawNumber` | WhatsApp: sin formato número | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `whatsapp.defaultInquiryText` | WhatsApp: predeterminado consulta texto | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Hola Galpón! Quisiera hacer una consulta sobre los productos del catálogo. |
| `whatsapp.wholesaleInquiryText` | WhatsApp: mayorista consulta texto | Texto editable. Dejalo vacío para ocultar el elemento. | `textarea` |  | Hola Galpón! Quisiera solicitar presupuesto mayorista y lista de precios B2B para mi empresa/comercio. |
| `email` | correo electrónico | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | ventas@galponindumentaria.com.ar |
| `theme.primary` | Colores: color principal | Color en formato #RRGGBB. | `color` |  |  |
| `theme.primaryDeep` | Colores: primary profundo | Color en formato #RRGGBB. | `color` |  |  |
| `theme.secondary` | Colores: color secundario | Color en formato #RRGGBB. | `color` |  |  |
| `theme.secondaryDark` | Colores: secundario oscuro | Color en formato #RRGGBB. | `color` |  |  |
| `theme.accent` | Colores: acento | Color en formato #RRGGBB. | `color` |  |  |
| `theme.accentLight` | Colores: acento claro | Color en formato #RRGGBB. | `color` |  |  |
| `theme.accentOn` | Colores: acento sobre | Color en formato #RRGGBB. | `color` |  |  |
| `theme.background` | Colores: fondo | Color en formato #RRGGBB. | `color` |  |  |
| `theme.surface` | Colores: fondo de página | Color en formato #RRGGBB. | `color` |  |  |
| `theme.surfaceMuted` | Colores: fondo apagado | Color en formato #RRGGBB. | `color` |  |  |
| `theme.surfaceSubtle` | Colores: fondo sutil | Color en formato #RRGGBB. | `color` |  |  |
| `theme.surfaceHover` | Colores: fondo cursor encima | Color en formato #RRGGBB. | `color` |  |  |
| `theme.border` | Colores: borde | Color en formato #RRGGBB. | `color` |  |  |
| `theme.borderSoft` | Colores: borde suave | Color en formato #RRGGBB. | `color` |  |  |
| `theme.borderStrong` | Colores: borde fuerte | Color en formato #RRGGBB. | `color` |  |  |
| `theme.text` | Colores: texto | Color en formato #RRGGBB. | `color` |  |  |
| `theme.textSecondary` | Colores: texto secondary | Color en formato #RRGGBB. | `color` |  |  |
| `theme.textMuted` | Colores: texto apagado | Color en formato #RRGGBB. | `color` |  |  |
| `theme.textOnDark` | Colores: texto sobre oscuro | Color en formato #RRGGBB. | `color` |  |  |
| `theme.danger` | Colores: peligro | Color en formato #RRGGBB. | `color` |  |  |
| `theme.whatsapp` | Colores: whatsApp | Color en formato #RRGGBB. | `color` |  |  |
| `theme.whatsappHover` | Colores: whatsApp cursor encima | Color en formato #RRGGBB. | `color` |  |  |
| `theme.selection` | Colores: selección | Color en formato #RRGGBB. | `color` |  |  |
| `typography.stylesheetUrl` | Tipografías: hoja de fuentes | Dirección web completa (https://…). | `url` |  |  |
| `typography.iconStylesheetUrl` | Tipografías: icon hoja de estilos url | Dirección web completa (https://…). | `url` |  |  |
| `typography.headlineFamily` | Tipografías: títulos fuente | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `typography.bodyFamily` | Tipografías: body fuente | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `seo.titleSuffix` | SEO y redes: sufijo del título | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Indumentaria Masculina y de Trabajo |
| `seo.description` | SEO y redes: descripción | Texto editable. Dejalo vacío para ocultar el elemento. | `textarea` |  | Catálogo digital y landing con pedido directo por WhatsApp para indumentaria masculina y ropa de trabajo pesada. |
| `seo.socialImage` | SEO y redes: imagen para redes | Ruta pública de la imagen (carpeta public/assets). | `image` |  |  |
| `address.short` | Depósito y retiro: corto | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Parque Patricios, CABA |
| `address.full` | Depósito y retiro: completo | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Av. Amancio Alcorta 2490, Parque Patricios, CABA |
| `address.city` | Depósito y retiro: ciudad | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Buenos Aires, Argentina |
| `address.warehouseName` | Depósito y retiro: depósito nombre | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Galpón Despacho |
| `address.packingLabel` | Depósito y retiro: empaque etiqueta | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Control de Empaque Galpón |
| `address.pickupLabel` | Depósito y retiro: retiro etiqueta | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Retiro en Depósito Central (Lanús / Parque Patricios) |
| `address.pickupHours` | Depósito y retiro: retiro horario | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Lunes a Viernes de 07:30 a 16:30 hs |
| `shipping.homeDeliveryLabel` | Envíos: domicilio entrega etiqueta | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Envío a Domicilio (Correo Argentino / Andreani) |
| `shipping.homeDeliveryDescription` | Envíos: domicilio entrega descripción | Texto editable. Dejalo vacío para ocultar el elemento. | `textarea` |  | Despacho garantizado por Correo Argentino o Andreani con número de seguimiento en tiempo real. |
| `logo.src` | Logo: archivo | Ruta pública de la imagen (carpeta public/assets). | `image` |  |  |
| `logo.alt` | Logo: texto alternativo | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `logo.favicon32` | Logo: favicon32 | Ruta pública de la imagen (carpeta public/assets). | `image` |  |  |
| `logo.appleTouchIcon` | Logo: apple touch icon | Ruta pública de la imagen (carpeta public/assets). | `image` |  |  |
| `logo.srcLight` | Logo para fondos oscuros | Ruta opcional de una versión clara del logo (public/assets/logo-light.png). | `image` |  |  |
| `hero.badge` | Portada: sello | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | CONFECCIÓN INDUSTRIAL PESADA • DESDE 1978 |
| `hero.title` | Portada: título | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | ROPA HECHA PARA BANCARSE TODO. |
| `hero.description` | Portada: descripción | Texto editable. Dejalo vacío para ocultar el elemento. | `textarea` |  | Básicos pesados y ropa de trabajo resistente. Sin vueltas, sin descartables: directo del galpón textil a tu taller, obra o el asfalto diario. |
| `hero.backgroundImage` | Portada: fondo imagen | Ruta pública de la imagen (carpeta public/assets). | `image` |  |  |
| `hero.ctaCatalogText` | Portada: cta catálogo texto | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Ver Catálogo Completo |
| `hero.ctaHowToBuyText` | Portada: cta how to buy texto | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | ¿Cómo Comprar por WhatsApp? |
| `hero.valueProps[].icon` | Ventajas de la portada: ícono | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `hero.valueProps[].title` | Ventajas de la portada: título | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Algodón 24/1 Pesado |
| `hero.announcementBar.leftText` | Barra de anuncio: izquierda texto | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | STOCK DISPONIBLE PARA ENTREGA INMEDIATA EN PARQUE PATRICIOS |
| `hero.announcementBar.rightText` | Barra de anuncio: derecha texto | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | FACTURA A Y B DIRECTA |
| `hero.announcementBar.subHighlight` | Barra de anuncio: sub highlight | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | PRECIOS CON IVA INCLUIDO |
| `howToBuy.tagline` | Cómo comprar: frase de la marca | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | SISTEMA ÁGIL SIN VUELTAS |
| `howToBuy.title` | Cómo comprar: título | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | CÓMO COMPRAR EN 3 PASOS |
| `howToBuy.description` | Cómo comprar: descripción | Texto editable. Dejalo vacío para ocultar el elemento. | `textarea` |  | Despachamos pedidos en menos de 24 horas hábiles una vez acreditado el pago o coordinado el expreso. |
| `howToBuy.videoUrl` | Cómo comprar: video url | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `howToBuy.posterUrl` | Cómo comprar: imagen de portada url | Ruta pública de la imagen (carpeta public/assets). | `image` |  |  |
| `howToBuy.placeholderMessage` | Cómo comprar: ayuda mensaje | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Acá va el video de muestra del cliente real. Se prepara con IA a partir de su catálogo. |
| `howToBuy.badge` | Cómo comprar: sello | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | GUÍA INTERACTIVA |
| `howToBuy.duration` | Cómo comprar: duración | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | 0:45 MIN |
| `howToBuy.caption` | Cómo comprar: leyenda | Texto editable. Dejalo vacío para ocultar el elemento. | `textarea` |  | Audio en español • Demostración de armado de pedido y despacho por flete o Correo Argentino. |
| `howToBuy.steps[].number` | Pasos: número | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | 01 |
| `howToBuy.steps[].badge` | Pasos: sello | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | SELECCIÓN DE PRENDAS |
| `howToBuy.steps[].title` | Pasos: título | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Elegí artículos y talles |
| `howToBuy.steps[].description` | Pasos: descripción | Texto editable. Dejalo vacío para ocultar el elemento. | `textarea` |  | Explorá el catálogo. Podés sumar unidades individuales o paquetes cerrados por curva de talles con precios mayoristas. |
| `b2b.badge` | Mayoristas: sello | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | CANAL DISTRIBUIDOR & CUADRILLAS |
| `b2b.title` | Mayoristas: título | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | ¿TENÉS COMERCIO O NECESITÁS VESTIR A TU EQUIPO? |
| `b2b.description` | Mayoristas: descripción | Texto editable. Dejalo vacío para ocultar el elemento. | `textarea` |  | Atendemos directamente a metalúrgicas, constructoras, talleres mecánicos y locales multimarcas de todo el país. Precios por bulto cerrado y personalizaciones con bordado ignífugo o serigrafía textil de alta tenacidad. |
| `b2b.bullets` | Mayoristas: viñetas | Lista editable. | `list` |  |  |
| `b2b.cartWholesaleTarget` | Mayoristas: carrito mayorista objetivo | Valor numérico. | `number` |  |  |
| `b2b.comboMinItems` | Mayoristas: combo mínimo prendas | Valor numérico. | `number` |  |  |
| `b2b.comboDiscountPercent` | Mayoristas: combo descuento porcentaje | Valor numérico. | `number` |  |  |
| `social.instagram` | Redes sociales: instagram | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `social.facebook` | Redes sociales: facebook | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `social.linkedin` | Redes sociales: linkedIn | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `testimonials[].initials` | Testimonios: iniciales | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | MR |
| `testimonials[].name` | Testimonios: nombre | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Martín Rodríguez |
| `testimonials[].role` | Testimonios: cargo | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Logística & Cargas Rosario |
| `testimonials[].text` | Testimonios: texto | Texto editable. Dejalo vacío para ocultar el elemento. | `textarea` |  | “Compramos 25 camperas canvas para los mecánicos de la flota. Aguantan el roce con grasa y fierros pesados sin deshilacharse. Excelente atención y entrega en 48hs a Rosario.” |
| `testimonials[].color` | Testimonios: color | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `demo.prefillCart` | Demostración: precarga carrito | Activa o desactiva este elemento. | `boolean` |  |  |
| `demo.customer.fullName` | Cliente de ejemplo: completo nombre | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `demo.customer.phone` | Cliente de ejemplo: teléfono | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `demo.customer.email` | Cliente de ejemplo: correo electrónico | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `demo.customer.street` | Cliente de ejemplo: calle | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `demo.customer.postalCode` | Cliente de ejemplo: postal código | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `demo.customer.notes` | Cliente de ejemplo: notas | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `assetsWithPrototypeBranding` | Imágenes con marca de prototipo | Archivos que muestran la marca ficticia y deben regenerarse para un cliente real. | `list` |  |  |
| `ui.cartBar.confirm` | Barra de pedido (celular): botón confirmar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cartBar.label` | Barra de pedido (celular): etiqueta | Texto con variables que el sitio reemplaza solo: {count}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsappFloating.label` | Botón flotante de WhatsApp: etiqueta | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsappFloating.title` | Botón flotante de WhatsApp: título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.closeLabel` | Carrito: etiqueta accesible de cerrar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.b2bTitle` | Carrito: mayorista título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.targetReached` | Carrito: objetivo alcanzado | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.b2bReachedMessage` | Carrito: mayorista alcanzado mensaje | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.emptyTitle` | Carrito: título vacío | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.emptyDescription` | Carrito: descripción vacía | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.emptyButton` | Carrito: botón vacío | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.sizeLabel` | Carrito: talle etiqueta | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.reinforcedBadge` | Carrito: reinforced sello | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.decreaseLabel` | Carrito: etiqueta accesible de restar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.increaseLabel` | Carrito: etiqueta accesible de sumar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.remove` | Carrito: quitar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.packingNote` | Carrito: empaque nota | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `textarea` |  |  |
| `ui.cart.shipping` | Carrito: envío | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.shippingNote` | Carrito: nota de envío | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.total` | Carrito: total | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.totalNote` | Carrito: nota del total | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.noGatewayEmphasis` | Carrito: sin pasarela emphasis | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.noGatewayText` | Carrito: sin pasarela texto | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.continue` | Carrito: botón continuar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.keepShopping` | Carrito: botón seguir comprando | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.trustHuman` | Carrito: confianza humana | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.trustDispatch` | Carrito: confianza despacho | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.title` | Carrito: título | Texto con variables que el sitio reemplaza solo: {count}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.missing` | Carrito: missing | Texto con variables que el sitio reemplaza solo: {amount}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.b2bProgress` | Carrito: mayorista avance | Texto con variables que el sitio reemplaza solo: {amount}, {target}. Dejalo vacío para ocultar el elemento. | `textarea` |  |  |
| `ui.cart.colorLabel` | Carrito: color etiqueta | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.subtotal` | Carrito: subtotal | Texto con variables que el sitio reemplaza solo: {count}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.combo` | Carrito: combo | Texto con variables que el sitio reemplaza solo: {min}, {percent}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.standardColor` | Catálogo: estándar color | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.eyebrow` | Catálogo: sobretítulo | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.title` | Catálogo: título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.description` | Catálogo: descripción | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `textarea` |  |  |
| `ui.catalog.sizeFilterLabel` | Catálogo: talle filtro etiqueta | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.sizeGuideButton` | Catálogo: talle guía botón | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.sortLabel` | Catálogo: orden etiqueta | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.sortPopular` | Catálogo: orden populares | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.sortPriceAsc` | Catálogo: orden precio ascendente | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.sortPriceDesc` | Catálogo: orden precio descendente | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.viewSheet` | Catálogo: ver ficha | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.cardSizes` | Catálogo: tarjeta talles | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.cardColors` | Catálogo: tarjeta colores | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.retailPrice` | Catálogo: minorista precio | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.measures` | Catálogo: medidas | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.add` | Catálogo: botón agregar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.emptyTitle` | Catálogo: título vacío | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.emptyDescription` | Catálogo: descripción vacía | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.viewAll` | Catálogo: botón ver todos | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.sizeCtaTitle` | Catálogo: talle cta título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.sizeCtaText` | Catálogo: talle cta texto | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.sizeCtaButton` | Catálogo: talle cta botón | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.addedToast` | Catálogo: agregado aviso | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.viewCart` | Catálogo: ver carrito | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.activeCount` | Catálogo: activos count | Texto con variables que el sitio reemplaza solo: {count}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.title` | Checkout: título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.step1` | Checkout: paso 1 | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.step2` | Checkout: paso 2 | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.step3` | Checkout: paso 3 | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.step4` | Checkout: paso 4 | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.closeLabel` | Checkout: etiqueta accesible de cerrar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.noGatewayTitle` | Checkout: sin pasarela título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.humanBadge` | Checkout: humana sello | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.contactTitle` | Checkout: contacto título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.required` | Checkout: obligatorio | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.nameLabel` | Checkout: campo nombre | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.namePlaceholder` | Checkout: nombre ayuda | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.phoneLabel` | Checkout: campo teléfono | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.phoneHelp` | Checkout: ayuda del teléfono | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.emailLabel` | Checkout: correo etiqueta | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.emailHelp` | Checkout: correo ayuda | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.deliveryTitle` | Checkout: entrega título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.deliveryHint` | Checkout: entrega pista | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.quoteByZip` | Checkout: quote por código postal | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.free` | Checkout: gratis | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.expressTitle` | Checkout: exprés título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.expressBadge` | Checkout: exprés sello | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.expressDescription` | Checkout: exprés descripción | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `textarea` |  |  |
| `ui.checkout.destinationHint` | Checkout: destino pista | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.streetLabel` | Checkout: calle etiqueta | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.streetPlaceholder` | Checkout: calle ayuda | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.apartmentLabel` | Checkout: piso/depto etiqueta | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.apartmentPlaceholder` | Checkout: piso/depto ayuda | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.zipLabel` | Checkout: código postal etiqueta | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.zipPlaceholder` | Checkout: código postal ayuda | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.cityLabel` | Checkout: ciudad etiqueta | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.notesTitle` | Checkout: notas título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.optional` | Checkout: opcional | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.notesLabel` | Checkout: notas etiqueta | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.notesPlaceholder` | Checkout: ayuda del campo aclaraciones | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `textarea` |  |  |
| `ui.checkout.notesHelp` | Checkout: notas ayuda | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `textarea` |  |  |
| `ui.checkout.edit` | Checkout: editar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.subtotal` | Checkout: subtotal | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.shippingCost` | Checkout: envío costo | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.pickupFree` | Checkout: retiro gratis | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.shippingByWhatsapp` | Checkout: envío por WhatsApp | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.total` | Checkout: total | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.previewTitle` | Checkout: título de la vista previa | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.previewBadge` | Checkout: sello de la vista previa | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.previewNote` | Checkout: vista previa nota | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.confirm` | Checkout: botón confirmar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.trustInvoiceTitle` | Checkout: confianza factura título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.trustInvoiceText` | Checkout: confianza factura texto | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.trustStockTitle` | Checkout: confianza stock título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.trustStockText` | Checkout: confianza stock texto | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.orderNumber` | Checkout: pedido número | Texto con variables que el sitio reemplaza solo: {number}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.noGatewayText` | Checkout: sin pasarela texto | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `textarea` |  |  |
| `ui.checkout.expressLabel` | Checkout: exprés etiqueta | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.destinationTitle` | Checkout: destino título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.cityPlaceholder` | Checkout: ciudad ayuda | Texto con variables que el sitio reemplaza solo: {city}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.summaryTitle` | Checkout: resumen título | Texto con variables que el sitio reemplaza solo: {count}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.sizeColor` | Checkout: talle color | Texto con variables que el sitio reemplaza solo: {size}, {color}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.combo` | Checkout: combo | Texto con variables que el sitio reemplaza solo: {min}, {percent}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.pickupDetails` | Checkout: retiro details | Texto con variables que el sitio reemplaza solo: {address}, {hours}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.responseStart` | Checkout: response start | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.responseStrong` | Checkout: response fuerte | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.responseEnd` | Checkout: response end | Texto con variables que el sitio reemplaza solo: {hours}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.emailPlaceholder` | Checkout: correo ayuda | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.navbar.topShipping` | Barra de navegación: superior envío | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.navbar.topWholesale` | Barra de navegación: superior mayorista | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.navbar.topSizeTable` | Barra de navegación: superior talle table | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.navbar.catalog` | Barra de navegación: catálogo | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.navbar.howToBuy` | Barra de navegación: how to buy | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.navbar.b2b` | Barra de navegación: mayorista | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.navbar.contact` | Barra de navegación: contacto | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.navbar.whatsapp` | Barra de navegación: whatsApp | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.navbar.cartLabel` | Barra de navegación: etiqueta accesible del carrito | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.navbar.cartTotal` | Barra de navegación: carrito total | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.navbar.menuLabel` | Barra de navegación: menú etiqueta | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.navbar.mobileCatalog` | Barra de navegación: móvil catálogo | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.navbar.mobileHowToBuy` | Barra de navegación: móvil how to buy | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.navbar.mobileB2b` | Barra de navegación: móvil mayorista | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.navbar.mobileSizeGuide` | Barra de navegación: móvil talle guía | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.navbar.mobileContact` | Barra de navegación: móvil contacto | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.navbar.topWarehouseLine` | Barra de navegación: superior depósito línea | Texto con variables que el sitio reemplaza solo: {place}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.navbar.homeLabel` | Barra de navegación: domicilio etiqueta | Texto con variables que el sitio reemplaza solo: {name}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.navbar.mobileWhatsappLine` | Barra de navegación: móvil WhatsApp línea | Texto con variables que el sitio reemplaza solo: {phone}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.defaultColor` | Ficha técnica: predeterminado color | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.title` | Ficha técnica: título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.subtitle` | Ficha técnica: subtítulo | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.closeLabel` | Ficha técnica: etiqueta accesible de cerrar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.series` | Ficha técnica: serie | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.detailTitle` | Ficha técnica: detalle título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.view1` | Ficha técnica: vista 1 | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.view2` | Ficha técnica: vista 2 | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.view3` | Ficha técnica: vista 3 | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.view4` | Ficha técnica: vista 4 | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.specsTitle` | Ficha técnica: especificaciones título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.specFabric` | Ficha técnica: especificación tela | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.defaultFabric` | Ficha técnica: predeterminado tela | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.specStitching` | Ficha técnica: especificación confección | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.defaultStitching` | Ficha técnica: predeterminado confección | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.specHardware` | Ficha técnica: especificación herrajes | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.defaultHardware` | Ficha técnica: predeterminado herrajes | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.line` | Ficha técnica: línea | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.stock` | Ficha técnica: stock | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.retailPrice` | Ficha técnica: minorista precio | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.vatIncluded` | Ficha técnica: iVA incluido | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.invoiceNote` | Ficha técnica: factura nota | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.wholesaleEach` | Ficha técnica: mayorista c/u | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.selectedSize` | Ficha técnica: seleccionado talle | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.sizeGuide` | Ficha técnica: talle guía | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.decreaseLabel` | Ficha técnica: etiqueta accesible de restar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.increaseLabel` | Ficha técnica: etiqueta accesible de sumar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.addToOrder` | Ficha técnica: botón agregar al pedido | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.askStock` | Ficha técnica: consultar stock | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.trustExchange` | Ficha técnica: confianza cambio | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.trustShipping` | Ficha técnica: confianza envío | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.crossSellTitle` | Ficha técnica: venta cruzada venta título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.crossSellText` | Ficha técnica: venta cruzada venta texto | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.crossSellButton` | Ficha técnica: venta cruzada venta botón | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.defaultLot` | Ficha técnica: predeterminado lote | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.lotLine` | Ficha técnica: lote línea | Texto con variables que el sitio reemplaza solo: {value}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.originLine` | Ficha técnica: origen línea | Texto con variables que el sitio reemplaza solo: {value}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.viewAlt` | Ficha técnica: ver texto alternativo | Texto con variables que el sitio reemplaza solo: {number}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.wholesaleFromUnits` | Ficha técnica: mayorista from units | Texto con variables que el sitio reemplaza solo: {units}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.offBadge` | Ficha técnica: descuento sello | Texto con variables que el sitio reemplaza solo: {percent}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.savingsLine` | Ficha técnica: ahorro línea | Texto con variables que el sitio reemplaza solo: {amount}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.selectedColor` | Ficha técnica: seleccionado color | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.colorsCount` | Ficha técnica: colores count | Texto con variables que el sitio reemplaza solo: {count}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.addedToOrder` | Ficha técnica: agregado to pedido | Texto con variables que el sitio reemplaza solo: {quantity}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.whatsappInquiry` | Ficha técnica: whatsApp consulta | Texto con variables que el sitio reemplaza solo: {name}, {product}, {sku}, {units}. Dejalo vacío para ocultar el elemento. | `textarea` |  |  |
| `ui.productModal.skuLabel` | Ficha técnica: sKU etiqueta | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.sizeGuide.tabJackets` | Guía de talles: pestaña jackets | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.sizeGuide.tabPants` | Guía de talles: pestaña pants | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.sizeGuide.tabTshirts` | Guía de talles: pestaña tshirts | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.sizeGuide.tabHoodies` | Guía de talles: pestaña hoodies | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.sizeGuide.title` | Guía de talles: título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.sizeGuide.closeLabel` | Guía de talles: etiqueta accesible de cerrar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.sizeGuide.tipTitle` | Guía de talles: consejo título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.sizeGuide.help` | Guía de talles: ayuda | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.sizeGuide.close` | Guía de talles: cerrar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.sizeGuide.toleranceLine` | Guía de talles: tolerancia línea | Texto con variables que el sitio reemplaza solo: {tolerance}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.video.playError` | Video: reproducir error | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.video.playGuideLabel` | Video: reproducir guía etiqueta | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.video.dismiss` | Video: descartar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.video.pauseLabel` | Video: pausar etiqueta | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.video.playLabel` | Video: reproducir etiqueta | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.video.muteLabel` | Video: silenciar etiqueta | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.video.stepBadge` | Video: step sello | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.video.fullscreenLabel` | Video: pantalla completa etiqueta | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.b2bForm.pending` | Formulario mayorista: pendiente | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.b2bForm.defaultQuantity` | Formulario mayorista: predeterminado cantidad | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.b2bForm.closing` | Formulario mayorista: cierre | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.b2bForm.title` | Formulario mayorista: título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.b2bForm.subtitle` | Formulario mayorista: subtítulo | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.b2bForm.nameLabel` | Formulario mayorista: campo nombre | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.b2bForm.namePlaceholder` | Formulario mayorista: nombre ayuda | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.b2bForm.phoneLabel` | Formulario mayorista: campo teléfono | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.b2bForm.quantityLabel` | Formulario mayorista: cantidad etiqueta | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.b2bForm.quantityPlaceholder` | Formulario mayorista: cantidad ayuda | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.b2bForm.submit` | Formulario mayorista: enviar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.b2bForm.intro` | Formulario mayorista: introducción | Texto con variables que el sitio reemplaza solo: {name}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.b2bForm.companyLine` | Formulario mayorista: empresa línea | Texto con variables que el sitio reemplaza solo: {value}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.b2bForm.phoneLine` | Formulario mayorista: línea del teléfono | Texto con variables que el sitio reemplaza solo: {value}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.b2bForm.quantityLine` | Formulario mayorista: cantidad línea | Texto con variables que el sitio reemplaza solo: {value}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.shippingPending` | Mensaje del pedido: envío pendiente | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.notSpecified` | Mensaje del pedido: no especificado | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.noNotes` | Mensaje del pedido: sin notas | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.closing` | Mensaje del pedido: cierre | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.orderTitle` | Mensaje del pedido: título del pedido | Texto con variables que el sitio reemplaza solo: {name}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.itemLine` | Mensaje del pedido: línea de producto | Texto con variables que el sitio reemplaza solo: {quantity}, {name}, {size}, {color}, {price}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.noItems` | Mensaje del pedido: sin prendas | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.discountLine` | Mensaje del pedido: descuento línea | Texto con variables que el sitio reemplaza solo: {min}, {percent}, {amount}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.subtotalLine` | Mensaje del pedido: subtotal línea | Texto con variables que el sitio reemplaza solo: {subtotal}, {discount}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.totalLine` | Mensaje del pedido: línea del total | Texto con variables que el sitio reemplaza solo: {total}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.customerLine` | Mensaje del pedido: línea del cliente | Texto con variables que el sitio reemplaza solo: {value}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.phoneLine` | Mensaje del pedido: línea del teléfono | Texto con variables que el sitio reemplaza solo: {value}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.emailLine` | Mensaje del pedido: correo línea | Texto con variables que el sitio reemplaza solo: {value}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.modeLine` | Mensaje del pedido: línea de modalidad | Texto con variables que el sitio reemplaza solo: {value}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.destinationLine` | Mensaje del pedido: destino línea | Texto con variables que el sitio reemplaza solo: {value}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.notesLine` | Mensaje del pedido: notas línea | Texto con variables que el sitio reemplaza solo: {value}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `footer.about` | Pie de página: acerca de | Texto editable. Dejalo vacío para ocultar el elemento. | `textarea` |  | Ropa de trabajo y básicos pensados para durar. Venta minorista y por curva mayorista para cuadrillas, talleres y comercios de todo el país. |
| `footer.guarantee` | Pie de página: garantía | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Garantía de confección industrial |
| `footer.helpTitle` | Pie de página: ayuda título | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Asistencia y Guías |
| `footer.helpSizeGuide` | Pie de página: ayuda talle guía | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Guía de Talles y Medidas Exactas (IRAM) |
| `footer.helpReturns` | Pie de página: ayuda devoluciones | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Políticas de Cambio y Devolución (15 días) |
| `footer.helpShipping` | Pie de página: ayuda envío | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Envíos a todo el país por Expreso y Correo |
| `footer.helpTracking` | Pie de página: ayuda seguimiento | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Estado y Seguimiento de tu Pedido |
| `footer.b2bTitle` | Pie de página: mayorista título | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Canales Mayoristas |
| `footer.b2bQuotes` | Pie de página: mayorista presupuestos | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Presupuestos por Volumen & Licitaciones |
| `footer.b2bInvoice` | Pie de página: mayorista factura | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Facturación Oficial A / CUIT |
| `footer.b2bDesk` | Pie de página: mayorista mesa | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Mesa WhatsApp Comercial B2B |
| `footer.contactTitle` | Pie de página: contacto título | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Depósito & Contacto |
| `footer.whatsappAria` | Pie de página: whatsApp accesibilidad | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | WhatsApp |
| `footer.emailAria` | Pie de página: correo accesibilidad | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Email |
| `footer.phoneAria` | Pie de página: teléfono accesibilidad | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Teléfono |
| `footer.instagramLabel` | Pie de página: instagram etiqueta | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Instagram |
| `footer.facebookLabel` | Pie de página: facebook etiqueta | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Facebook |
| `footer.linkedinLabel` | Pie de página: linkedIn etiqueta | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | LinkedIn |
| `footer.consumerDefense` | Pie de página: consumidor defensa | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | DEFENSA DEL CONSUMIDOR |
| `footer.whatsappLine` | Pie de página: whatsApp línea | Texto con variables que el sitio reemplaza solo: {phone}. Dejalo vacío para ocultar el elemento. | `text` |  | WhatsApp: {phone} |
| `footer.copyright` | Pie de página: derechos de autor | Texto con variables que el sitio reemplaza solo: {year}, {name}. Dejalo vacío para ocultar el elemento. | `text` |  | © {year} {name}. Todos los derechos reservados. |
| `footer.cuitLine` | Pie de página: cUIT línea | Texto con variables que el sitio reemplaza solo: {cuit}. Dejalo vacío para ocultar el elemento. | `text` |  | CUIT {cuit} |
| `testimonialsSection.title` | Sección de testimonios: título | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | EN EL CUERO DE QUIENES LABURAN |
| `testimonialsSection.badge` | Sección de testimonios: sello | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | CLIENTES VERIFICADOS EN TODO EL PAÍS |
| `demoLegend` | Leyenda de demostración | Texto base de prototipo. El sitio lo completa con el nombre del servicio (no se edita en brand.json). | `textarea` |  | Marca, productos y precios de ejemplo — prototipo de demostración |
