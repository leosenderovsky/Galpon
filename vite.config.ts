import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import { BRAND } from './src/brand.config.ts';

function brandMetadataPlugin(siteUrl: string): Plugin {
  const baseUrl = siteUrl ? new URL('/', siteUrl).href : '';
  const socialImage = baseUrl
    ? new URL(BRAND.seo.socialImage, baseUrl).href
    : BRAND.seo.socialImage;
  const canonicalUrl = baseUrl || '/';
  const title = `${BRAND.name} — ${BRAND.seo.titleSuffix}`;
  const replacements: Record<string, string> = {
    __BRAND_TITLE__: title,
    __BRAND_DESCRIPTION__: BRAND.seo.description,
    __BRAND_IMAGE__: socialImage,
    __BRAND_CANONICAL__: canonicalUrl,
    __BRAND_FAVICON_32__: BRAND.logo.favicon32,
    __BRAND_APPLE_ICON__: BRAND.logo.appleTouchIcon,
    __BRAND_FONT_STYLESHEET__: BRAND.typography.stylesheetUrl,
    __BRAND_ICON_STYLESHEET__: BRAND.typography.iconStylesheetUrl
  };

  return {
    name: 'brand-metadata',
    transformIndexHtml(html) {
      return Object.entries(replacements).reduce(
        (result, [marker, value]) => result.replaceAll(marker, value),
        html
      );
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const siteUrl = (
    env.VITE_SITE_URL
    || process.env.VITE_SITE_URL
    || process.env.DEPLOY_PRIME_URL
    || process.env.URL
    || ''
  ).trim();

  if (siteUrl) {
    try {
      new URL(siteUrl);
    } catch (error) {
      throw new Error(`Invalid site URL for brand metadata: ${siteUrl}`, { cause: error });
    }
  }

  const socialImagePath = path.resolve(
    process.cwd(),
    'public',
    BRAND.seo.socialImage.replace(/^\/+/, '')
  );
  if (!existsSync(socialImagePath)) {
    throw new Error(`Brand social image does not exist: ${socialImagePath}`);
  }

  return {
    plugins: [react(), tailwindcss(), brandMetadataPlugin(siteUrl)],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
