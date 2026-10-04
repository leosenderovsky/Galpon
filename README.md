# Galpón

Prototipo de tienda web white-label. Para preparar una copia para un cliente, editar:

- `src/brand.config.ts`: datos de marca, colores, tipografías, SEO, contacto, logística, video y textos.
- `public/assets/`: logo, iconos, imágenes y videos de la marca.
- `src/products.ts`: catálogo, precios, talles e imágenes de producto.

## Variables de entorno

- `VITE_SITE_URL`: URL pública canónica; tiene prioridad para canonical y Open Graph. Netlify usa `DEPLOY_PRIME_URL` en previews y `URL` en deploys como fallback.
- `VITE_DEMO_BRAND_NAME` y `VITE_DEMO_BRAND_URL`: nombre y destino opcionales del banner de demostración.
- `APP_URL`: URL inyectada por AI Studio, si aplica.

## Validación

```sh
npm run check:assets
npm run check:assets:strict
npm run check:images
npm run check:images:strict
npm run lint
npm run build
npm run make:icons
```

Antes de entregar al cliente, completar los assets pendientes y ejecutar los chequeos estrictos.
