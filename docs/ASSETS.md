# Assets reemplazables por cliente

Los archivos de esta tabla forman parte de la marca/catálogo y se reemplazan al duplicar el prototipo. Se recomienda respetar los nombres y las rutas; si cambian, actualizar también `src/brand.config.ts` o los datos del catálogo.

| Archivo | Para qué sirve | Dónde se usa | Medidas y peso recomendados | Quién lo provee |
|---|---|---|---|---|
| `public/assets/logo.png` | Logo horizontal principal, preferentemente PNG transparente. | Navbar sobre fondo claro y footer sobre fondo oscuro. | Mínimo 800 px de ancho. Para fondo oscuro se puede agregar opcionalmente `public/assets/logo-light.png`. | Cliente |
| `public/assets/hero/hero-1.jpg` | Imagen principal del sitio. | Sección Hero; ruta en `BRAND.hero.backgroundImage`. | 1920 × 1080 px; máximo 250 KB. El prototipo actual mide 512 × 286 px. | Cliente |
| `public/assets/hero/como-comprar-1.jpg` | Miniatura visible del video. | Sección “Cómo comprar”; ruta en `BRAND.howToBuy.posterUrl`. | 16:9, 1280 × 720 px; máximo 200 KB. El prototipo actual mide 512 × 279 px. | Cliente |
| `public/assets/video/como-comprar.mp4` | Video final de la guía de compra. | Reproductor HTML5 de “Cómo comprar”; ruta en `BRAND.howToBuy.videoUrl`. | H.264 + AAC, 16:9, 1280 × 720 px, 30 a 60 s; máximo 15 MB. **PENDIENTE en el prototipo.** | Cliente (video de muestra preparado con IA a partir de su catálogo) |
| `public/assets/products/*` | Fotografías de productos del catálogo. | Catálogo, fichas y carrito; rutas en los datos `PRODUCTS` de `src/products.ts`. | Según el catálogo; usar imágenes nítidas y optimizadas para web. | Cliente |

Las imágenes listadas en `BRAND.assetsWithPrototypeBranding` contienen marca ficticia incrustada y deben regenerarse sin esa marca o con la del cliente antes de entregar el sitio:

- `public/assets/hero/hero-1.jpg`
- `public/assets/hero/como-comprar-1.jpg`
- `public/assets/products/campera-chore-canvas-2.jpg`
- `public/assets/products/campera-chore-canvas-4.jpg`

El PNG del prototipo está actualmente en `public/assets/logo/logo.png`, por eso `BRAND.logo.src` apunta a `/assets/logo/logo.png`. No se mueve ni renombra. Al entregar un cliente real, ejecutar `npm run check:assets:strict`; el chequeo debe terminar en verde, sin archivos faltantes ni placeholders.

Durante el prototipado, `npm run check:assets` admite como único placeholder el video pendiente y las imágenes con marca ficticia; ambos se informan como advertencias. El modo estricto falla ante cualquiera de ellos.
