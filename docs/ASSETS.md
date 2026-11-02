# Assets reemplazables por cliente

Los archivos de esta tabla forman parte de la marca/catálogo y se reemplazan al duplicar el prototipo. Se recomienda respetar los nombres y las rutas; si cambian, actualizar también `src/data/brand.json` o los datos del catálogo.

| Archivo | Para qué sirve | Dónde se usa | Medidas y peso recomendados | Quién lo provee |
|---|---|---|---|---|
| `public/assets/logo/logo.png` | Logo horizontal principal, preferentemente PNG transparente. | Navbar sobre fondo claro y footer sobre fondo oscuro. | El dueño debe resolver la contradicción: un documento pide 800 px como mínimo y otro limita la optimización a 800 px como máximo. | Cliente |
| `public/assets/hero/hero-1.jpg` | Imagen principal del sitio. | Sección Hero; ruta en `hero.backgroundImage`. | Recomendado 1920 × 1080 px; el chequeo exige 1600 px de ancho. El archivo actual mide 2560 × 1440 px. El esquema declara 250 KB y el optimizador permite 350 KB. | Cliente |
| `public/assets/hero/como-comprar-1.jpg` | Miniatura visible del video. | Sección “Cómo comprar”; ruta en `howToBuy.posterUrl`. | El chequeo exige 1600 px de ancho. El archivo actual mide 1600 × 900 px. Documentación: 1280 × 720 px, 16:9 y 200 KB; esquema: sin límite de peso; optimizador: hasta 350 KB. Confirmar el límite final. | Cliente |
| `public/assets/video/como-comprar.mp4` | Video final de la guía de compra. | Reproductor HTML5 de “Cómo comprar”; ruta en `howToBuy.videoUrl`. | H.264 + AAC, 16:9, 1280 × 720 px, 30 a 60 s; máximo 15 MB. **PENDIENTE en el prototipo.** | Cliente (video de muestra preparado con IA a partir de su catálogo) |
| `public/assets/products/*` | Fotografías de productos del catálogo. | Catálogo, fichas y carrito; rutas en `src/data/catalog.json`. | Mínimo 900 px de ancho y proporción 1:1 (tolerancia del 1 %); el optimizador apunta a 250 KB por imagen. | Cliente |

Las imágenes listadas en `assetsWithPrototypeBranding` contienen marca ficticia incrustada y deben regenerarse sin esa marca o con la del cliente antes de entregar el sitio:

- `public/assets/hero/hero-1.jpg`
- `public/assets/hero/como-comprar-1.jpg`
- `public/assets/products/campera-chore-canvas-2.jpg`
- `public/assets/products/campera-chore-canvas-4.jpg`

El PNG del prototipo está actualmente en `public/assets/logo/logo.png`, por eso `logo.src` apunta a `/assets/logo/logo.png`. No se mueve ni renombra. Al entregar un cliente real, ejecutar `npm run check:assets:strict`; el chequeo debe terminar en verde, sin archivos faltantes ni placeholders.

Durante el prototipado, `npm run check:assets` admite como único placeholder el video pendiente y las imágenes con marca ficticia; ambos se informan como advertencias. El modo estricto falla ante cualquiera de ellos.
