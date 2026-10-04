# Informe y validación de imágenes

Ejecutar `npm run check:images` para informar las dimensiones y el peso de cada imagen bajo `public/assets`, buscar duplicados byte a byte mediante MD5 y revisar resolución y proporción. El comando es informativo y termina con código 0 aunque reporte observaciones.

Las comprobaciones por uso son:

| Uso | Resolución mínima | Proporción esperada |
|---|---:|---:|
| `public/assets/hero/hero-1.jpg` | 1600 px de ancho | — |
| `public/assets/hero/como-comprar-1.jpg` | 1600 px de ancho | — |
| `public/assets/products/*` | 900 px en ambos lados | 1:1, por el contenedor cuadrado de las tarjetas del catálogo |

La proporción de productos se compara con una tolerancia del 1%. Otros archivos de imagen se reportan con dimensiones y peso, pero no reciben umbrales específicos de uso.

Al correr `npm run check:images:strict`, cualquier imagen de baja resolución, proporción distinta o duplicada hace que el proceso termine con código 1. Corregir las observaciones antes de la entrega de producción.
