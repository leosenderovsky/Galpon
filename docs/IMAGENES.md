# Informe y validación de imágenes

Las medidas de las imágenes se generan automáticamente en `src/generated/imageDimensions.json` a partir de los archivos de `public/assets`. Al agregar o reemplazar imágenes no hay que editar ni mantener dimensiones a mano: `npm run dev` y `npm run build` regeneran el JSON antes de ejecutarse. El archivo generado se incluye en el repositorio para que los builds desplegados y las copias del sitio para clientes también tengan las dimensiones disponibles.

`npm run check:images` y `npm run check:assets` advierten si el JSON no coincide con las imágenes reales; sus variantes `:strict` terminan con error en ese caso. Para regenerarlo explícitamente, ejecutar `npm run generate:image-dimensions`.

`npm run logo:optimize` conserva una copia del logo original en `.image-originals/` (directorio ignorado por Git) y optimiza `public/assets/logo/logo.png` como PNG con transparencia, hasta 800 px de ancho y un máximo de 120 KB. Ejecutar `npm run make:icons` después de cambiar el logo; `npm run check:icons` verifica que los íconos generados estén al día y que el Apple Touch Icon sea opaco y de 180 × 180 px.

`npm run make:og` genera `public/assets/misc/og-image.jpg` recortando al centro la imagen principal a 1200 × 630 px y hasta 200 KB. Esa imagen se usa como vista previa de enlaces.

Ejecutar `npm run check:images` para informar las dimensiones y el peso de cada imagen bajo `public/assets`, buscar duplicados byte a byte mediante MD5 y revisar resolución y proporción. El comando es informativo y termina con código 0 aunque reporte observaciones.

Las comprobaciones por uso son:

| Uso | Resolución mínima | Proporción esperada |
|---|---:|---:|
| `public/assets/hero/hero-1.jpg` | 1600 px de ancho | — |
| `public/assets/hero/como-comprar-1.jpg` | 1600 px de ancho | — |
| `public/assets/products/*` | 900 px en ambos lados | 1:1, por el contenedor cuadrado de las tarjetas del catálogo |

La proporción de productos se compara con una tolerancia del 1%. Otros archivos de imagen se reportan con dimensiones y peso, pero no reciben umbrales específicos de uso.

Al correr `npm run check:images:strict`, cualquier imagen de baja resolución, proporción distinta o duplicada hace que el proceso termine con código 1. Corregir las observaciones antes de la entrega de producción.
