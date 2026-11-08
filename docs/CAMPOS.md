# Diccionario de campos editables

Este documento se genera desde `brand.schema.json`, `catalog.schema.json` y `size-guide.schema.json`.

## BrandConfig

| Ruta | Título | Descripción | Widget | Asset | Ejemplo |
|---|---|---|---|---|---|
| `schemaVersion` | Versión del esquema | Valor numérico. | `number` |  |  |
| `site` | Identificador del sitio | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `name` | Nombre de la marca | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | GALPÓN |
| `legalName` | Razón social | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | GALPÓN INDUMENTARIA |
| `shortName` | Nombre abreviado | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `tagline` | Frase de la marca | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | INDUMENTARIA Y TRABAJO |
| `foundedYear` | Año de fundación | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `cuit` | CUIT | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `whatsapp.display` | Número visible de WhatsApp | Texto editable. Dejalo vacío para ocultar el elemento. | `whatsapp` |  | +54 9 11 4000-8800 |
| `whatsapp.rawNumber` | Número de WhatsApp para los enlaces | Texto editable. Dejalo vacío para ocultar el elemento. | `whatsapp` |  |  |
| `whatsapp.defaultInquiryText` | Mensaje predeterminado para consultas por WhatsApp | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Hola Galpón! Quisiera hacer una consulta sobre los productos del catálogo. |
| `whatsapp.wholesaleInquiryText` | Mensaje para consultas mayoristas por WhatsApp | Texto editable. Dejalo vacío para ocultar el elemento. | `textarea` |  | Hola Galpón! Quisiera solicitar presupuesto mayorista y lista de precios B2B para mi empresa/comercio. |
| `email` | Correo electrónico | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | ventas@galponindumentaria.com.ar |
| `theme.primary` | Color principal | Color en formato #RRGGBB. | `color` |  |  |
| `theme.primaryDeep` | Color principal oscuro | Color en formato #RRGGBB. | `color` |  |  |
| `theme.secondary` | Color secundario | Color en formato #RRGGBB. | `color` |  |  |
| `theme.secondaryDark` | Secundario oscuro | Color en formato #RRGGBB. | `color` |  |  |
| `theme.accent` | Acento | Color en formato #RRGGBB. | `color` |  |  |
| `theme.accentLight` | Acento claro | Color en formato #RRGGBB. | `color` |  |  |
| `theme.accentOn` | Acento sobre | Color en formato #RRGGBB. | `color` |  |  |
| `theme.background` | Fondo | Color en formato #RRGGBB. | `color` |  |  |
| `theme.surface` | Fondo de página | Color en formato #RRGGBB. | `color` |  |  |
| `theme.surfaceMuted` | Fondo apagado | Color en formato #RRGGBB. | `color` |  |  |
| `theme.surfaceSubtle` | Fondo sutil | Color en formato #RRGGBB. | `color` |  |  |
| `theme.surfaceHover` | Fondo cursor encima | Color en formato #RRGGBB. | `color` |  |  |
| `theme.border` | Borde | Color en formato #RRGGBB. | `color` |  |  |
| `theme.borderSoft` | Borde suave | Color en formato #RRGGBB. | `color` |  |  |
| `theme.borderStrong` | Borde fuerte | Color en formato #RRGGBB. | `color` |  |  |
| `theme.text` | Texto | Color en formato #RRGGBB. | `color` |  |  |
| `theme.textSecondary` | Texto secundario | Color en formato #RRGGBB. | `color` |  |  |
| `theme.textMuted` | Texto apagado | Color en formato #RRGGBB. | `color` |  |  |
| `theme.textOnDark` | Texto sobre oscuro | Color en formato #RRGGBB. | `color` |  |  |
| `theme.danger` | Peligro | Color en formato #RRGGBB. | `color` |  |  |
| `theme.whatsapp` | WhatsApp | Color en formato #RRGGBB. | `color` |  |  |
| `theme.whatsappHover` | Color de WhatsApp al pasar el cursor | Color en formato #RRGGBB. | `color` |  |  |
| `theme.selection` | Selección | Color en formato #RRGGBB. | `color` |  |  |
| `typography.stylesheetUrl` | Hoja de fuentes | Dirección web completa (https://…). | `url` |  |  |
| `typography.iconStylesheetUrl` | Dirección de la hoja de estilos de íconos | Dirección web completa (https://…). | `url` |  |  |
| `typography.headlineFamily` | Familia tipográfica de los títulos | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `typography.bodyFamily` | Familia tipográfica del texto | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `seo.titleSuffix` | Título de sufijo del | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Indumentaria Masculina y de Trabajo |
| `seo.description` | Descripción | Texto editable. Dejalo vacío para ocultar el elemento. | `textarea` |  | Catálogo digital y landing con pedido directo por WhatsApp para indumentaria masculina y ropa de trabajo pesada. |
| `seo.socialImage` | Imagen para redes | Ruta pública de la imagen (carpeta public/assets). | `image` | path: /assets/misc/og-image.jpg, minWidth: 1200, maxWidth: —, ratio: 1200:630, ratios: —, ratioTolerance: —, maxKB: 200 |  |
| `address.short` | Dirección breve | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Parque Patricios, CABA |
| `address.full` | Dirección completa | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Av. Amancio Alcorta 2490, Parque Patricios, CABA |
| `address.city` | Ciudad | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Buenos Aires, Argentina |
| `address.warehouseName` | Nombre del depósito | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Galpón Despacho |
| `address.packingLabel` | Etiqueta de empaque | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Control de Empaque Galpón |
| `address.pickupLabel` | Etiqueta de retiro | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Retiro en Depósito Central (Lanús / Parque Patricios) |
| `address.pickupHours` | Horario de retiro | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Lunes a Viernes de 07:30 a 16:30 hs |
| `shipping.exchangeDays` | Días para cambios | Cantidad de días disponibles para solicitar un cambio. | `number` |  |  |
| `shipping.homeDeliveryLabel` | Etiqueta de entrega a domicilio | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Envío a Domicilio (Correo Argentino / Andreani) |
| `shipping.homeDeliveryDescription` | Descripción de la entrega a domicilio | Texto editable. Dejalo vacío para ocultar el elemento. | `textarea` |  | Despacho garantizado por Correo Argentino o Andreani con número de seguimiento en tiempo real. |
| `logo.src` | Archivo | Ruta pública de la imagen (carpeta public/assets). | `image` | path: /assets/logo/logo.png, minWidth: —, maxWidth: —, ratio: —, ratios: —, ratioTolerance: —, maxKB: 120 |  |
| `logo.alt` | Texto alternativo | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `logo.favicon32` | Ícono del sitio de 32 píxeles | Ruta pública de la imagen (carpeta public/assets). | `image` | path: /assets/logo/favicon-32.png, minWidth: —, maxWidth: —, ratio: 1:1, ratios: —, ratioTolerance: —, maxKB: — |  |
| `logo.appleTouchIcon` | Ícono para dispositivos Apple | Ruta pública de la imagen (carpeta public/assets). | `image` | path: /assets/logo/apple-touch-icon.png, minWidth: —, maxWidth: —, ratio: 1:1, ratios: —, ratioTolerance: —, maxKB: — |  |
| `logo.srcLight` | Logo para fondos oscuros | Ruta opcional de una versión clara del logo (public/assets/logo-light.png). | `image` | path: /assets/logo/logo-light.png, minWidth: —, maxWidth: —, ratio: —, ratios: —, ratioTolerance: —, maxKB: — |  |
| `hero.badge` | Sello | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | CONFECCIÓN INDUSTRIAL PESADA • DESDE 1978 |
| `hero.title` | Título | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | ROPA HECHA PARA BANCARSE TODO. |
| `hero.description` | Descripción | Texto editable. Dejalo vacío para ocultar el elemento. | `textarea` |  | Básicos pesados y ropa de trabajo resistente. Sin vueltas, sin descartables: directo del galpón textil a tu taller, obra o el asfalto diario. |
| `hero.backgroundImage` | Fondo imagen | Ruta pública de la imagen (carpeta public/assets). | `image` | path: /assets/hero/hero-1.jpg, minWidth: 1600, maxWidth: —, ratio: 16:9, ratios: —, ratioTolerance: —, maxKB: 250 |  |
| `hero.ctaCatalogText` | Texto del botón para ver el catálogo | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Ver Catálogo Completo |
| `hero.ctaHowToBuyText` | Texto del botón para conocer cómo comprar | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | ¿Cómo Comprar por WhatsApp? |
| `hero.valueProps[].icon` | Ícono | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `hero.valueProps[].title` | Título | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Algodón 24/1 Pesado |
| `hero.announcementBar.leftText` | Izquierda texto | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | STOCK DISPONIBLE PARA ENTREGA INMEDIATA EN PARQUE PATRICIOS |
| `hero.announcementBar.rightText` | Derecha texto | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | FACTURA A Y B DIRECTA |
| `hero.announcementBar.subHighlight` | Texto destacado | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | PRECIOS CON IVA INCLUIDO |
| `howToBuy.tagline` | Frase de la marca | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | SISTEMA ÁGIL SIN VUELTAS |
| `howToBuy.title` | Título | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | CÓMO COMPRAR EN 3 PASOS |
| `howToBuy.description` | Descripción | Texto editable. Dejalo vacío para ocultar el elemento. | `textarea` |  | Despachamos pedidos en menos de 24 horas hábiles una vez acreditado el pago o coordinado el expreso. |
| `howToBuy.videoUrl` | Video dirección web | Video de compra en formato H.264 + AAC, proporción 16:9, entre 30 y 60 segundos y hasta 15 MB. | `text` |  |  |
| `howToBuy.posterUrl` | Imagen de portada dirección web | Ruta pública de la imagen (carpeta public/assets). | `image` | path: /assets/hero/como-comprar-1.jpg, minWidth: 1600, maxWidth: —, ratio: 16:9, ratios: —, ratioTolerance: —, maxKB: — |  |
| `howToBuy.placeholderMessage` | Ayuda mensaje | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Acá va el video de muestra del cliente real. Se prepara con IA a partir de su catálogo. |
| `howToBuy.badge` | Sello | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | GUÍA INTERACTIVA |
| `howToBuy.duration` | Duración | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | 0:45 MIN |
| `howToBuy.caption` | Leyenda | Texto editable. Dejalo vacío para ocultar el elemento. | `textarea` |  | Audio en español • Demostración de armado de pedido y despacho por flete o Correo Argentino. |
| `howToBuy.steps[].number` | Número | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | 01 |
| `howToBuy.steps[].badge` | Sello | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | SELECCIÓN DE PRENDAS |
| `howToBuy.steps[].title` | Título | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Elegí artículos y talles |
| `howToBuy.steps[].description` | Descripción | Texto editable. Dejalo vacío para ocultar el elemento. | `textarea` |  | Explorá el catálogo. Podés sumar unidades individuales o paquetes cerrados por curva de talles con precios mayoristas. |
| `b2b.badge` | Sello | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | CANAL DISTRIBUIDOR & CUADRILLAS |
| `b2b.title` | Título | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | ¿TENÉS COMERCIO O NECESITÁS VESTIR A TU EQUIPO? |
| `b2b.description` | Descripción | Texto editable. Dejalo vacío para ocultar el elemento. | `textarea` |  | Atendemos directamente a metalúrgicas, constructoras, talleres mecánicos y locales multimarcas de todo el país. Precios por bulto cerrado y personalizaciones con bordado ignífugo o serigrafía textil de alta tenacidad. |
| `b2b.bullets` | Viñetas | Lista editable. | `list` |  |  |
| `b2b.cartWholesaleTarget` | Monto objetivo para el pedido mayorista | Valor numérico. | `number` |  |  |
| `b2b.comboMinItems` | Cantidad mínima de prendas por conjunto | Valor numérico. | `number` |  |  |
| `b2b.comboDiscountPercent` | Porcentaje de descuento por conjunto | Valor numérico. | `number` |  |  |
| `social.instagram` | Instagram | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `social.facebook` | Facebook | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `social.linkedin` | LinkedIn | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `testimonials[].initials` | Iniciales | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | MR |
| `testimonials[].name` | Nombre | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Martín Rodríguez |
| `testimonials[].role` | Cargo | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Logística & Cargas Rosario |
| `testimonials[].text` | Texto | Texto editable. Dejalo vacío para ocultar el elemento. | `textarea` |  | “Compramos 25 camperas canvas para los mecánicos de la flota. Aguantan el roce con grasa y fierros pesados sin deshilacharse. Excelente atención y entrega en 48hs a Rosario.” |
| `testimonials[].color` | Color | Clase técnica de Tailwind con color hexadecimal, no un selector de color. Como alternativa, usar tokens del tema. | `text` |  |  |
| `demo.showPrototypeBanner` | Mostrar aviso de prototipo | Muestra el aviso de demostración de Tienda ON!. | `boolean` |  |  |
| `demo.prefillCart` | Precarga carrito | Activa o desactiva este elemento. | `boolean` |  |  |
| `demo.customer.fullName` | Completo nombre | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `demo.customer.phone` | Teléfono | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `demo.customer.email` | Correo electrónico | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `demo.customer.street` | Calle | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `demo.customer.postalCode` | Postal código | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `demo.customer.notes` | Notas | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `assetsWithPrototypeBranding` | Imágenes con marca de prototipo | Archivos que muestran la marca ficticia y deben regenerarse para un cliente real. | `list` |  |  |
| `ui.cartBar.confirm` | Botón confirmar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cartBar.label` | Etiqueta | Texto con variables que el sitio reemplaza solo: {count}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsappFloating.label` | Etiqueta | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsappFloating.title` | Título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.closeLabel` | Etiqueta accesible de cerrar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.b2bTitle` | Título de mayorista | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.targetReached` | Objetivo alcanzado | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.b2bReachedMessage` | Mayorista alcanzado mensaje | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.emptyTitle` | Título vacío | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.emptyDescription` | Descripción vacía | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  | Explorá el catálogo de existencias para sumar camperas, pantalones o remeras de trabajo. |
| `ui.cart.emptyButton` | Botón vacío | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.sizeLabel` | Etiqueta de talle | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.reinforcedBadge` | Sello de prenda reforzada | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.decreaseLabel` | Etiqueta accesible de restar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.increaseLabel` | Etiqueta accesible de sumar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.remove` | Quitar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.packingNote` | Empaque nota | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `textarea` |  | Cada prenda es revisada individualmente y embalada en bolsa sellada de alta densidad para flete o correo pesado. |
| `ui.cart.shipping` | Envío | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.shippingNote` | Nota de envío | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.total` | Total | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.totalNote` | Nota del total | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.noGatewayEmphasis` | Sin pasarela emphasis | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.noGatewayText` | Aviso cuando no hay pasarela de pago | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.continue` | Botón continuar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.keepShopping` | Botón seguir comprando | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.trustHuman` | Confianza humana | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.trustDispatch` | Confianza despacho | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  | Despachos en 24hs hábiles |
| `ui.cart.title` | Título | Texto con variables que el sitio reemplaza solo: {count}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.missing` | Faltante | Texto con variables que el sitio reemplaza solo: {amount}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.b2bProgress` | Mayorista avance | Texto con variables que el sitio reemplaza solo: {amount}, {target}. Dejalo vacío para ocultar el elemento. | `textarea` |  |  |
| `ui.cart.colorLabel` | Etiqueta de color | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.subtotal` | Subtotal | Texto con variables que el sitio reemplaza solo: {count}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.cart.combo` | Combo | Texto con variables que el sitio reemplaza solo: {min}, {percent}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.standardColor` | Color estándar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.allCategoryLabel` | Etiqueta de todas las categorías | Texto que aparece para mostrar todos los productos. Dejalo vacío para ocultar la opción. | `text` |  |  |
| `ui.catalog.eyebrow` | Sobretítulo | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.title` | Título | Texto con la variable {year}, que indica el año actual del catálogo. | `text` |  |  |
| `ui.catalog.description` | Descripción | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `textarea` |  |  |
| `ui.catalog.sizeFilterLabel` | Etiqueta de talle filtro | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.sizeGuideButton` | Botón para talle guía | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.sortLabel` | Etiqueta de orden | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.sortPopular` | Orden populares | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.sortPriceAsc` | Orden precio ascendente | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.sortPriceDesc` | Orden precio descendente | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.viewSheet` | Ver ficha | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.cardSizes` | Tarjeta talles | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.cardColors` | Tarjeta colores | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.retailPrice` | Minorista precio | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.measures` | Medidas | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.add` | Botón agregar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.emptyTitle` | Título vacío | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.emptyDescription` | Descripción vacía | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.viewAll` | Botón ver todos | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.sizeCtaTitle` | Título de la invitación a consultar talles | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.sizeCtaText` | Mensaje de la invitación a consultar talles | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  | Todas las prendas son confeccionadas bajo norma IRAM de holgura de trabajo y faena pesada. |
| `ui.catalog.sizeCtaButton` | Botón para consultar talles | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  | Ver Tabla de Medidas Oficial (IRAM) |
| `ui.catalog.addedToast` | Agregado aviso | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.viewCart` | Ver carrito | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.catalog.activeCount` | Cantidad de productos visibles | Texto con variables que el sitio reemplaza solo: {count}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.title` | Título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.step1` | Paso 1 | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.step2` | Paso 2 | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.step3` | Paso 3 | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.step4` | Paso 4 | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.closeLabel` | Etiqueta accesible de cerrar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.noGatewayTitle` | Título de sin pasarela | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.humanBadge` | Humana sello | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.contactTitle` | Título de contacto | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.required` | Obligatorio | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.nameLabel` | Campo nombre | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.namePlaceholder` | Ayuda para nombre | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.phoneLabel` | Campo teléfono | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.phoneHelp` | Ayuda del teléfono | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.emailLabel` | Etiqueta de correo | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.emailHelp` | Ayuda para correo | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.deliveryTitle` | Título de entrega | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.deliveryHint` | Entrega pista | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.quoteByZip` | Cotización según el código postal | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.free` | Gratis | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.expressTitle` | Título de exprés | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.expressBadge` | Exprés sello | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.expressDescription` | Descripción de exprés | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `textarea` |  | Llevamos el bulto precintado sin cargo al expreso de tu elección en Villa Soldati o Pompeya. |
| `ui.checkout.destinationHint` | Destino pista | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.streetLabel` | Etiqueta de calle | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.streetPlaceholder` | Ayuda para calle | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.apartmentLabel` | Etiqueta de piso/depto | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.apartmentPlaceholder` | Ayuda para piso/depto | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.zipLabel` | Etiqueta de código postal | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.zipPlaceholder` | Ayuda para código postal | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.cityLabel` | Etiqueta de ciudad | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.notesTitle` | Título de notas | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.optional` | Opcional | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.notesLabel` | Etiqueta de notas | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.notesPlaceholder` | Ayuda del campo aclaraciones | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `textarea` |  | Ej: Entregar por la mañana; solicitar Factura A con CUIT; si no hay en tono carbón cambiar por verde... |
| `ui.checkout.notesHelp` | Ayuda para notas | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `textarea` |  |  |
| `ui.checkout.edit` | Editar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.subtotal` | Subtotal | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.shippingCost` | Envío costo | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.pickupFree` | Retiro gratis | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.shippingByWhatsapp` | Envío por WhatsApp | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.total` | Total | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.previewTitle` | Título de la vista previa | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.previewBadge` | Sello de la vista previa | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.previewNote` | Vista previa nota | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.confirm` | Botón confirmar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.trustInvoiceTitle` | Título de confianza factura | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.trustInvoiceText` | Confianza factura texto | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.trustStockTitle` | Título de confianza existencias | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.trustStockText` | Confianza existencias texto | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.orderNumber` | Pedido número | Texto con variables que el sitio reemplaza solo: {number}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.noGatewayText` | Aviso cuando no hay pasarela de pago | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `textarea` |  |  |
| `ui.checkout.expressLabel` | Etiqueta de exprés | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.destinationTitle` | Título de destino | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.cityPlaceholder` | Ayuda para ciudad | Texto con variables que el sitio reemplaza solo: {city}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.summaryTitle` | Título de resumen | Texto con variables que el sitio reemplaza solo: {count}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.sizeColor` | Talle y color | Texto con variables que el sitio reemplaza solo: {size}, {color}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.combo` | Combo | Texto con variables que el sitio reemplaza solo: {min}, {percent}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.pickupDetails` | Retiro detalles | Texto con variables que el sitio reemplaza solo: {address}, {hours}. Dejalo vacío para ocultar el elemento. | `text` |  | {address}. {hours}. Listo en 4 hs hábiles sin costo. |
| `ui.checkout.responseStart` | Response start | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.responseStrong` | Response fuerte | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.responseEnd` | Response end | Texto con variables que el sitio reemplaza solo: {hours}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.checkout.emailPlaceholder` | Ayuda para correo | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.navbar.topShipping` | Superior envío | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.navbar.topWholesale` | Superior mayorista | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.navbar.topSizeTable` | Superior talle table | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  | TABLA DE MEDIDAS IRAM |
| `ui.navbar.catalog` | Catálogo | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.navbar.howToBuy` | Compra | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.navbar.b2b` | Mayorista | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.navbar.contact` | Contacto | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.navbar.whatsapp` | WhatsApp | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.navbar.cartLabel` | Etiqueta accesible del carrito | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.navbar.cartTotal` | Carrito total | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.navbar.menuLabel` | Etiqueta de menú | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.navbar.mobileCatalog` | Móvil catálogo | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.navbar.mobileHowToBuy` | Móvil compra | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.navbar.mobileB2b` | Móvil mayorista | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  | Canal Mayorista & Cuadrillas |
| `ui.navbar.mobileSizeGuide` | Móvil talle guía | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.navbar.mobileContact` | Móvil contacto | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.navbar.topWarehouseLine` | Línea de superior depósito | Texto con variables que el sitio reemplaza solo: {place}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.navbar.homeLabel` | Etiqueta de domicilio | Texto con variables que el sitio reemplaza solo: {name}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.navbar.mobileWhatsappLine` | Texto de WhatsApp para móviles | Texto con variables que el sitio reemplaza solo: {phone}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.defaultColor` | Color predeterminado | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.title` | Título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.subtitle` | Subtítulo | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.closeLabel` | Etiqueta accesible de cerrar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.series` | Serie | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.detailTitle` | Título de detalle | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.view1` | Vista 1 | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.view2` | Vista 2 | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.view3` | Vista 3 | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.view4` | Vista 4 | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.specsTitle` | Título de especificaciones | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.specFabric` | Especificación tela | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.defaultFabric` | Predeterminado tela | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  | Lona 100% Algodón de alto gramaje con torsión industrial. |
| `ui.productModal.specStitching` | Especificación confección | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.defaultStitching` | Predeterminado confección | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.specHardware` | Especificación herrajes | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.defaultHardware` | Predeterminado herrajes | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.line` | Línea | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.stock` | Existencias | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.retailPrice` | Minorista precio | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.vatIncluded` | IVA incluido | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.invoiceNote` | Factura nota | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.wholesaleEach` | Mayorista c/u | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.selectedSize` | Seleccionado talle | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.sizeGuide` | Talle guía | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.decreaseLabel` | Etiqueta accesible de restar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.increaseLabel` | Etiqueta accesible de sumar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.addToOrder` | Botón agregar al pedido | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.askStock` | Consultar existencias | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.trustExchange` | Confianza cambio | Texto con la variable {days}, que indica cuántos días hay para solicitar un cambio. | `text` |  |  |
| `ui.productModal.trustShipping` | Confianza envío | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.crossSellTitle` | Título de venta cruzada venta | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  | Conjunto Cuadrilla |
| `ui.productModal.crossSellText` | Venta cruzada venta texto | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.crossSellButton` | Botón para venta cruzada venta | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.defaultLot` | Predeterminado lote | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  | 2025-Q1 |
| `ui.productModal.lotLine` | Línea de lote | Texto con variables que el sitio reemplaza solo: {value}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.originLine` | Línea de origen | Texto con variables que el sitio reemplaza solo: {value}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.viewAlt` | Ver texto alternativo | Texto con variables que el sitio reemplaza solo: {number}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.wholesaleFromUnits` | Texto desde la cantidad mínima mayorista | Texto con variables que el sitio reemplaza solo: {units}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.offBadge` | Descuento sello | Texto con variables que el sitio reemplaza solo: {percent}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.savingsLine` | Línea de ahorro | Texto con variables que el sitio reemplaza solo: {amount}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.selectedColor` | Color seleccionado | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.colorsCount` | Colores cantidad | Texto con variables que el sitio reemplaza solo: {count}. Dejalo vacío para ocultar el elemento. | `text` |  | {count} Tonos Industriales |
| `ui.productModal.addedToOrder` | Aviso de producto agregado al pedido | Texto con variables que el sitio reemplaza solo: {quantity}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.productModal.whatsappInquiry` | Consulta por WhatsApp | Texto con variables que el sitio reemplaza solo: {name}, {product}, {sku}, {units}. Dejalo vacío para ocultar el elemento. | `textarea` |  |  |
| `ui.productModal.skuLabel` | Etiqueta de código | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.sizeGuide.title` | Título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  | Guía Oficial de Talles y Medidas IRAM |
| `ui.sizeGuide.closeLabel` | Etiqueta accesible de cerrar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.sizeGuide.tipTitle` | Título de consejo | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.sizeGuide.help` | Ayuda | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  | ¿Tenés dudas con las medidas de tu cuadrilla? Consultanos en tiempo real por WhatsApp. |
| `ui.sizeGuide.close` | Cerrar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.sizeGuide.toleranceLine` | Línea de tolerancia | Texto con variables que el sitio reemplaza solo: {tolerance}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.video.playError` | Reproducir error | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.video.playGuideLabel` | Etiqueta de reproducir guía | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.video.dismiss` | Descartar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.video.pauseLabel` | Etiqueta de pausar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.video.playLabel` | Etiqueta de reproducir | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.video.muteLabel` | Etiqueta de silenciar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.video.stepBadge` | Sello del paso | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.video.fullscreenLabel` | Etiqueta de pantalla completa | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.b2bForm.pending` | Pendiente | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.b2bForm.defaultQuantity` | Predeterminado cantidad | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  | Curva estándar para cuadrilla |
| `ui.b2bForm.closing` | Cierre | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.b2bForm.title` | Título | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.b2bForm.subtitle` | Subtítulo | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  | Respuesta en menos de 2 horas hábiles por WhatsApp. |
| `ui.b2bForm.nameLabel` | Campo nombre | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.b2bForm.namePlaceholder` | Ayuda para nombre | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.b2bForm.phoneLabel` | Campo teléfono | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.b2bForm.quantityLabel` | Etiqueta de cantidad | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.b2bForm.quantityPlaceholder` | Ayuda para cantidad | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  | Ej: 30 Pantalones cargo + 50 remeras |
| `ui.b2bForm.submit` | Enviar | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.b2bForm.intro` | Introducción | Texto con variables que el sitio reemplaza solo: {name}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.b2bForm.companyLine` | Línea de empresa | Texto con variables que el sitio reemplaza solo: {value}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.b2bForm.phoneLine` | Línea del teléfono | Texto con variables que el sitio reemplaza solo: {value}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.b2bForm.quantityLine` | Línea de cantidad | Texto con variables que el sitio reemplaza solo: {value}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.shippingPending` | Envío pendiente | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.notSpecified` | No especificado | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.noNotes` | Sin notas | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.closing` | Cierre | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.orderTitle` | Título del pedido | Texto con variables que el sitio reemplaza solo: {name}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.itemLine` | Línea de producto | Texto con variables que el sitio reemplaza solo: {quantity}, {name}, {size}, {color}, {price}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.noItems` | Sin prendas | Texto de la interfaz. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.discountLine` | Línea de descuento | Texto con variables que el sitio reemplaza solo: {min}, {percent}, {amount}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.subtotalLine` | Línea de subtotal | Texto con variables que el sitio reemplaza solo: {subtotal}, {discount}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.totalLine` | Línea del total | Texto con variables que el sitio reemplaza solo: {total}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.customerLine` | Línea del cliente | Texto con variables que el sitio reemplaza solo: {value}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.phoneLine` | Línea del teléfono | Texto con variables que el sitio reemplaza solo: {value}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.emailLine` | Línea de correo | Texto con variables que el sitio reemplaza solo: {value}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.modeLine` | Línea de modalidad | Texto con variables que el sitio reemplaza solo: {value}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.destinationLine` | Línea de destino | Texto con variables que el sitio reemplaza solo: {value}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `ui.whatsapp.notesLine` | Línea de notas | Texto con variables que el sitio reemplaza solo: {value}. Dejalo vacío para ocultar el elemento. | `text` |  |  |
| `footer.about` | Acerca de | Texto editable. Dejalo vacío para ocultar el elemento. | `textarea` |  | Ropa de trabajo y básicos pensados para durar. Venta minorista y por curva mayorista para cuadrillas, talleres y comercios de todo el país. |
| `footer.guarantee` | Garantía | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Garantía de confección industrial |
| `footer.helpTitle` | Ayuda para Título de | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Asistencia y Guías |
| `footer.helpSizeGuide` | Ayuda talle guía | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Guía de Talles y Medidas Exactas (IRAM) |
| `footer.helpReturns` | Ayuda devoluciones | Texto con la variable {days}, que indica cuántos días hay para solicitar un cambio. | `text` |  | Políticas de Cambio y Devolución (15 días) |
| `footer.helpShipping` | Ayuda envío | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Envíos a todo el país por Expreso y Correo |
| `footer.helpTracking` | Ayuda seguimiento | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Estado y Seguimiento de tu Pedido |
| `footer.b2bTitle` | Título de mayorista | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Canales Mayoristas |
| `footer.b2bQuotes` | Mayorista presupuestos | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Presupuestos por Volumen & Licitaciones |
| `footer.b2bInvoice` | Mayorista factura | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Facturación Oficial A / CUIT |
| `footer.b2bDesk` | Mayorista mesa | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Mesa WhatsApp Comercial B2B |
| `footer.contactTitle` | Título de contacto | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Depósito & Contacto |
| `footer.whatsappAria` | Texto accesible para WhatsApp | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | WhatsApp |
| `footer.emailAria` | Correo accesibilidad | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Email |
| `footer.phoneAria` | Teléfono accesibilidad | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Teléfono |
| `footer.instagramLabel` | Etiqueta de Instagram | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Instagram |
| `footer.facebookLabel` | Etiqueta de Facebook | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | Facebook |
| `footer.linkedinLabel` | Etiqueta de LinkedIn | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | LinkedIn |
| `footer.consumerDefense` | Consumidor defensa | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | DEFENSA DEL CONSUMIDOR |
| `footer.whatsappLine` | Texto de WhatsApp | Texto con variables que el sitio reemplaza solo: {phone}. Dejalo vacío para ocultar el elemento. | `text` |  | WhatsApp: {phone} |
| `footer.copyright` | Derechos de autor | Texto con variables que el sitio reemplaza solo: {year}, {name}. Dejalo vacío para ocultar el elemento. | `text` |  | © {year} {name}. Todos los derechos reservados. |
| `footer.cuitLine` | Línea de cUIT | Texto con variables que el sitio reemplaza solo: {cuit}. Dejalo vacío para ocultar el elemento. | `text` |  | CUIT {cuit} |
| `testimonialsSection.title` | Título | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | EN EL CUERO DE QUIENES LABURAN |
| `testimonialsSection.badge` | Sello | Texto editable. Dejalo vacío para ocultar el elemento. | `text` |  | CLIENTES VERIFICADOS EN TODO EL PAÍS |
| `demoLegend` | Leyenda de demostración | Leyenda editable del pie de página. Se agrega el nombre de la marca de demostración cuando está configurado. | `textarea` |  | Marca, productos y precios de ejemplo — prototipo de demostración |

## CatalogConfig

| Ruta | Título | Descripción | Widget | Asset | Ejemplo |
|---|---|---|---|---|---|
| `$schema` | Esquema de datos | Referencia al esquema que valida estos datos. | `text` |  |  |
| `schemaVersion` | Versión del formato | Versión del formato de datos utilizado. | `number` |  |  |
| `categories[].id` | Identificador de la categoría | Identificador estable de la categoría, en kebab-case. | `text` |  |  |
| `categories[].label` | Nombre visible de la categoría | Texto que se muestra para identificar la categoría. | `text` |  |  |
| `availableSizes` | Talles disponibles | Lista completa y ordenada de talles que ofrece el negocio. | `text` |  |  |
| `settings.defaultSize` | Talle preseleccionado | Talle que se elige al abrir la ficha o al sumar un producto desde la tarjeta, si el producto lo tiene. Si no lo tiene, se elige el primero. | `select` |  |  |
| `products[].id` | Identificador del producto | Identificador estable de la categoría, en kebab-case. | `text` |  |  |
| `products[].sku` | Código interno del producto | Código interno utilizado para identificar el producto. | `text` |  |  |
| `products[].name` | Nombre del producto | Nombre que se muestra en el catálogo. | `text` |  |  |
| `products[].cardLabel` | Etiqueta de la tarjeta del producto | Línea corta sobre el nombre en la tarjeta del catálogo (por ejemplo, un código de artículo y la línea de producto). Si la dejás vacía, se muestra el nombre de la categoría. | `text` |  | ART. 4100 • INDUMENTARIA PESADA |
| `products[].category` | Identificador de la categoría | Debe coincidir con una categoría definida en el catálogo. | `text` |  |  |
| `products[].price` | Precio de venta | Precio de venta del producto. | `number` |  |  |
| `products[].wholesalePrice` | Precio mayorista | Precio por unidad para compras mayoristas. | `number` |  |  |
| `products[].wholesaleMinUnits` | Cantidad mínima mayorista | Cantidad mínima para acceder al precio mayorista. | `number` |  |  |
| `products[].wholesaleBadge` | Etiqueta del precio mayorista | Texto que acompaña el precio mayorista. | `text` |  |  |
| `products[].sizes` | Talles del producto | Talles disponibles para este producto. | `text` |  |  |
| `products[].colors[].name` | Nombre del color | Nombre visible del color del producto. | `text` |  |  |
| `products[].colors[].hex` | Color del producto | Color en formato #RRGGBB. | `text` |  |  |
| `products[].images` | Imágenes del producto | Rutas de las imágenes asociadas al producto. | `text` |  |  |
| `products[].description` | Descripción breve del producto | Descripción breve que aparece en el catálogo. | `text` |  |  |
| `products[].lot` | Lote del producto | Lote informado para el producto. | `text` |  |  |
| `products[].origin` | Origen del producto | Origen informado para el producto. | `text` |  |  |
| `products[].badge` | Etiqueta destacada del producto | Texto breve que destaca una característica del producto. | `text` |  |  |
| `products[].badgeTone` | Color de la etiqueta destacada | Define el color visual de la etiqueta sin depender del texto que muestra. | `select` |  |  |
| `products[].specs.fabric` | Tela y material | Descripción de la tela y sus características. | `text` |  |  |
| `products[].specs.seams` | Costuras | Descripción de las costuras y los refuerzos. | `text` |  |  |
| `products[].specs.hardware` | Herrajes | Descripción de botones, cierres u otros componentes. | `text` |  |  |
| `products[].relatedProductId` | Identificador del producto relacionado | Identificador de otro producto relacionado. | `text` |  |  |
| `products[].longDescription` | Descripción completa del producto | Descripción ampliada que aparece en el detalle. | `text` |  |  |
| `products[].material` | Material principal | Material principal del producto. | `text` |  |  |

## SizeGuideConfig

| Ruta | Título | Descripción | Widget | Asset | Ejemplo |
|---|---|---|---|---|---|
| `$schema` | Esquema de datos | Referencia al esquema que valida estos datos. | `text` |  |  |
| `schemaVersion` | Versión del formato | Versión del formato de datos utilizado. | `number` |  |  |
| `guides.{categoryId}.category` | Identificador de la categoría | Debe coincidir con una categoría definida en el catálogo. | `text` |  |  |
| `guides.{categoryId}.title` | Título de la guía de talles | Texto que encabeza la guía de talles. | `text` |  |  |
| `guides.{categoryId}.tolerance` | Tolerancia de las medidas | Margen de variación de las medidas. | `text` |  |  |
| `guides.{categoryId}.columns.size` | Talle | Talle al que corresponden las medidas. | `text` |  |  |
| `guides.{categoryId}.columns.primaryMeasure` | Medida principal | Nombre de la medida principal de cada talle. | `text` |  |  |
| `guides.{categoryId}.columns.secondaryMeasure` | Medida secundaria | Nombre de la segunda medida de cada talle. | `text` |  |  |
| `guides.{categoryId}.columns.tertiaryMeasure` | Tercera medida | Nombre de la tercera medida de cada talle. | `text` |  |  |
| `guides.{categoryId}.columns.recommendation` | Referencia de talle | Nombre de la referencia adicional de talle. | `text` |  |  |
| `guides.{categoryId}.rows[].size` | Talle | Talle al que corresponden las medidas. | `text` |  |  |
| `guides.{categoryId}.rows[].sizeLabel` | Nombre visible del talle | Texto que se muestra para identificar el talle. | `text` |  |  |
| `guides.{categoryId}.rows[].chestOrWaist` | Medida de pecho o cintura | Medida de pecho o cintura para este talle. | `text` |  |  |
| `guides.{categoryId}.rows[].length` | Largo de la prenda | Largo de la prenda para este talle. | `text` |  |  |
| `guides.{categoryId}.rows[].sleeveOrInseam` | Largo de manga o entrepierna | Largo de manga o entrepierna para este talle. | `text` |  |  |
| `guides.{categoryId}.rows[].recommendedHeight` | Estatura recomendada | Estatura sugerida para este talle. | `text` |  |  |
| `guides.{categoryId}.rows[].recommendedWeight` | Peso recomendado | Peso sugerido para este talle. | `text` |  |  |
| `guides.{categoryId}.recommendationNote` | Recomendación de calce | Consejo de calce para elegir el talle. | `text` |  |  |
| `guides.{categoryId}.tabLabel` | Nombre visible de la pestaña | Texto que se muestra en la pestaña de esta guía. | `text` |  | Camperas de Trabajo |

