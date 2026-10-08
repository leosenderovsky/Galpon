# Galpón

Catálogo y landing de indumentaria masculina y de trabajo, con carrito, pedido por WhatsApp, precios mayoristas y video “Cómo comprar”.
Prototipo white-label para duplicar en clientes reales. Stack: React ^19.0.1, TypeScript, Vite ^8.3.0 y Tailwind CSS ^4.3.3.

## Cómo empezar

Requiere Node.js y npm.

```sh
npm install
npm run dev
```

Para generar y previsualizar la versión de producción:

```sh
npm run build
npm run preview
```

`predev` y `prebuild` ejecutan automáticamente `generate:image-dimensions` antes de levantar Vite o compilar.
Ese comando genera `src/generated/imageDimensions.json` con las dimensiones de las imágenes de `public/assets/`.
El JSON generado se commitea; no lo edites a mano. Al cambiar imágenes, los hooks lo regeneran.

## Mapa del proyecto

- `src/`: aplicación React y estilos.
- `src/components/`: secciones y componentes de la tienda.
- `src/context/CartContext.tsx`: estado del carrito y datos del pedido.
- `src/brand.config.ts`: configuración white-label de la marca.
- `src/products.ts`: categorías, talles y datos del catálogo.
- `src/sizeGuide.ts`: tablas de medidas por categoría.
- `src/generated/`: datos generados, hoy dimensiones de imágenes.
- `public/assets/hero/`: hero y miniatura de “Cómo comprar”.
- `public/assets/logo/`: logo, favicon y Apple Touch Icon.
- `public/assets/products/`: fotos del catálogo.
- `scripts/`: generación y validaciones de imágenes, assets e íconos.
- `docs/ASSETS.md`: assets que hay que reemplazar para un cliente.
- `docs/IMAGENES.md`: generación de dimensiones y criterios de validación de imágenes.

## Adaptar para un cliente

Editá los bloques de `BRAND` en `src/brand.config.ts`, en este orden:

- `name`, `legalName`, `shortName`, `tagline`, `foundedYear` y `cuit`: identificación de la marca.
- `whatsapp` y `email`: canales de consulta y textos iniciales.
- `theme`: colores de la interfaz; sus tokens se inyectan como variables CSS desde `src/main.tsx`.
- `typography`: familias tipográficas y hojas de estilo.
- `seo`: sufijo de título, descripción y vista previa social.
- `address`: dirección, depósito y retiro.
- `shipping`: etiqueta y descripción de entrega a domicilio.
- `logo`: logo, texto alternativo e íconos.
- `hero`: textos, imagen, botones, atributos y barra de anuncio.
- `b2b`: textos mayoristas, umbral del carrito, mínimo del combo y porcentaje de descuento.
- `howToBuy`: textos, video, miniatura y pasos de compra.
- `social`: enlaces de Instagram, Facebook y LinkedIn.
- `testimonials`: testimonios mostrados en la landing.
- `demo`: activación del carrito precargado y datos de cliente de ejemplo.
- `assetsWithPrototypeBranding`: imágenes que todavía tienen la marca ficticia.

Las reglas de precios mayoristas y descuento por combo están en `BRAND.b2b`.
El catálogo está en `src/products.ts`; cada producto puede definir `sku`, `price`, `wholesalePrice`,
`wholesaleMinUnits`, `sizes`, `colors`, `images` y `specs`, además de sus textos y otros datos opcionales.
La guía de talles vive en `src/sizeGuide.ts`.
El campo `category` es una unión de tipos (`camperas`, `pantalones`, `remeras`, `chalecos`):
si cambiás el rubro, actualizá también esa unión y las categorías relacionadas.

## Logo, video e imágenes

| Archivo | Uso | Medidas documentadas / validación |
|---|---|---|
| `public/assets/logo/logo.png` | Logo principal. | Mínimo recomendado de 800 px de ancho; optimización hasta 800 px y 120 KB. |
| `public/assets/logo/favicon-32.png` | Favicon. | 32 × 32 px, generado desde el logo. |
| `public/assets/logo/apple-touch-icon.png` | Ícono para Apple. | 180 × 180 px, opaco y generado desde el logo. |
| `public/assets/hero/hero-1.jpg` | Imagen principal. | Docs: 1920 × 1080 px recomendado; script: ancho mínimo 1600 px. El prototipo mide 512 × 286 px. |
| `public/assets/hero/como-comprar-1.jpg` | Miniatura del video. | Docs: 1280 × 720 px, 16:9; script: ancho mínimo 1600 px. El prototipo mide 512 × 279 px. |
| `public/assets/products/` | Fotos de productos. | Docs: mínimo 900 px en ambos lados; script: ancho mínimo 900 px y proporción 1:1 con tolerancia del 1 %. |
| `public/assets/video/como-comprar.mp4` | Video final de la guía. | H.264 + AAC, 1280 × 720 px, 16:9, 30–60 s y máximo 15 MB. **Pendiente: todavía no existe.** |

La sección “Cómo comprar” usa la miniatura `public/assets/hero/como-comprar-1.jpg`.
Mientras falte el video, funciona como placeholder y muestra el texto configurado en `BRAND.howToBuy.placeholderMessage`.
`BRAND.assetsWithPrototypeBranding` marca imágenes con la marca ficticia incrustada; hay que regenerarlas para un cliente real:

- `public/assets/hero/hero-1.jpg`
- `public/assets/hero/como-comprar-1.jpg`
- `public/assets/products/campera-chore-canvas-2.jpg`
- `public/assets/products/campera-chore-canvas-4.jpg`

`npm run check:images` informa dimensiones, peso, duplicados MD5, resolución y proporciones;
`npm run check:images:strict` falla ante observaciones.
`npm run check:assets` comprueba referencias, archivos faltantes, placeholders, marca del prototipo y el JSON de dimensiones.
`npm run check:assets:strict` también falla si quedan placeholders o imágenes con marca ficticia.

Otros comandos disponibles para trabajar con assets:

- `npm run generate:image-dimensions`: regenera el JSON de dimensiones.
- `npm run logo:optimize`: optimiza el PNG del logo manteniendo transparencia.
- `npm run make:icons`: genera los dos íconos a partir del logo.
- `npm run check:icons`: verifica que los íconos estén al día.
- `npm run make:og`: genera la imagen Open Graph de 1200 × 630 px y hasta 200 KB.

## Variables de entorno

| Variable | Uso |
|---|---|
| `VITE_SITE_URL` | URL canónica y base de la imagen social; se lee del entorno de Vite y también de `process.env`. |
| `VITE_DEMO_BRAND_NAME` | Nombre opcional para el banner de demo. |
| `VITE_DEMO_BRAND_URL` | Enlace HTTP(S) opcional del banner. |
| `DEPLOY_PRIME_URL` | URL específica del deploy de Netlify; se prioriza fuera de production. |
| `URL` | URL del sitio de Netlify; se prioriza en context `production`. |
| `DISABLE_HMR` | Con valor `true`, desactiva HMR y el watcher; se lee en `vite.config.ts`. |

Las tres variables `VITE_*` están documentadas en `.env.example`; las otras se consumen desde la configuración de Vite.
El orden de resolución es `VITE_SITE_URL` (entorno Vite y luego `process.env`); después, `URL` en context `production`
o `DEPLOY_PRIME_URL` en otros contextos; como fallback se prueban `URL` y `DEPLOY_PRIME_URL`, en ese orden.
La URL se recorta y valida; una URL inválida detiene la configuración.

## Verificar un deploy

Cada build publica `build-info.json` en la raíz de `dist`, con el commit, branch, contexto, URL pública y fuente
de esa URL, además del estado booleano de las variables de marca. El archivo no-cachea y no debe indexarse.
El `<head>` de `index.html` también incluye `<meta name="build-commit" content="...">` con los primeros siete
caracteres del commit publicado.

Para comparar el deploy con `main`, comprobar las variables informadas y verificar que canonical y `og:image`
respondan correctamente:

```sh
npm run verify:deploy -- https://<sitio>.netlify.app
```

## Modo demo

`src/components/PrototypeBanner.tsx` muestra el banner fijo de demo.
`src/demoBanner.config.ts` toma el nombre y enlace desde las variables de entorno y `getDemoLegend()` arma la leyenda del pie.
Si configurás un enlace, solo se usan URLs HTTP o HTTPS válidas.

`BRAND.demo.prefillCart` está en `false` en este prototipo. Si lo activás, el carrito se inicia con los primeros tres productos
y `BRAND.demo.customer` completa los datos de ejemplo: Juan Carlos Pérez, teléfono, correo, domicilio, código postal y notas.
Reemplazá esos datos por los del cliente o dejá la precarga desactivada.

Al entregar un sitio real, sacá el banner demo y su compensación de layout:
el import y el componente `PrototypeBanner` en `src/App.tsx`, el archivo `src/components/PrototypeBanner.tsx`,
la configuración `src/demoBanner.config.ts` y las clases `pt-10`, `sm:pt-9`, `lg:pt-8`
y los offsets del header que desplazan la página para dejar lugar al banner.
Revisá también `demoLegend`, los datos de `BRAND.demo` y las imágenes de marca ficticia.

## Deploy en Netlify

Configurá el build con `npm run build` y el directorio publicable como `dist`.
`prebuild` genera las dimensiones antes del build. Para una URL canónica propia, definí `VITE_SITE_URL`;
si la dejás vacía, production usa primero `URL` y los deploy previews/branch deploys usan primero
`DEPLOY_PRIME_URL`; en ambos casos se prueba la otra URL de Netlify como fallback.

## Antes de entregar

- Reemplazá datos, contactos, textos, colores, tipografías, SEO, logo y enlaces de `BRAND`.
- Actualizá productos, precios, imágenes, talles y guía de medidas.
- Regenerá los assets que tienen marca ficticia y agregá el video final de “Cómo comprar”.
- Regenerá el JSON de dimensiones con `npm run generate:image-dimensions`.
- Verificá imágenes e íconos con `npm run check:images:strict` y `npm run check:icons`.
- Corré `npm run lint` y `npm run build`.
- Corré `npm run check:assets:strict`: debe pasar, sin faltantes, placeholders ni marca ficticia.
- Revisá el sitio publicado, el carrito y el pedido por WhatsApp antes de compartirlo.
