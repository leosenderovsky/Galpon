import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import { BRAND } from './src/brand.config.ts';

type SiteUrlSource = 'VITE_SITE_URL' | 'URL' | 'DEPLOY_PRIME_URL' | 'none';

interface SiteUrlResolution {
  url: string;
  source: SiteUrlSource;
}

interface BuildInfo {
  commit: string;
  commitShort: string;
  branch: string;
  context: string;
  deployId: string | null;
  builtAt: string;
  siteUrl: string;
  siteUrlSource: SiteUrlSource;
  env: {
    VITE_SITE_URL: boolean;
    VITE_DEMO_BRAND_NAME: boolean;
    VITE_DEMO_BRAND_URL: boolean;
  };
}

function resolveSiteUrl(env: Record<string, string>): SiteUrlResolution {
  const viteSiteUrl = (env.VITE_SITE_URL || process.env.VITE_SITE_URL || '').trim();
  if (viteSiteUrl) return { url: viteSiteUrl, source: 'VITE_SITE_URL' };

  const candidates: Array<[SiteUrlSource, string | undefined]> = process.env.CONTEXT === 'production'
    ? [
        ['URL', process.env.URL],
        ['DEPLOY_PRIME_URL', process.env.DEPLOY_PRIME_URL]
      ]
    : [
        ['DEPLOY_PRIME_URL', process.env.DEPLOY_PRIME_URL],
        ['URL', process.env.URL]
      ];

  for (const [source, candidate] of candidates) {
    const url = candidate?.trim();
    if (url) return { url, source };
  }

  return { url: '', source: 'none' };
}

function gitValue(...args: string[]): string | undefined {
  try {
    return execFileSync('git', args, { encoding: 'utf8' }).trim() || undefined;
  } catch {
    return undefined;
  }
}

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

function buildInfoPlugin(info: BuildInfo): Plugin {
  return {
    name: 'build-info',
    apply: 'build',
    buildStart() {
      console.log(
        `[build-info] commit=${info.commit} context=${info.context} URL=${info.siteUrl || '(vacía)'} fuente=${info.siteUrlSource}`
      );
      if (!info.env.VITE_SITE_URL) {
        console.warn(
          'VITE_SITE_URL no definida: se usa la URL de Netlify; definila al conectar un dominio propio'
        );
      }
      if (info.siteUrlSource === 'none') {
        console.warn('sin URL pública: og:image y canonical saldrán relativos');
      }
    },
    transformIndexHtml() {
      return [{
        tag: 'meta',
        attrs: { name: 'build-commit', content: info.commitShort },
        injectTo: 'head'
      }];
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'build-info.json',
        source: `${JSON.stringify(info, null, 2)}\n`
      });
    }
  };
}

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const { url: siteUrl, source: siteUrlSource } = resolveSiteUrl(env);

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

  const commit = process.env.COMMIT_REF || gitValue('rev-parse', 'HEAD') || 'unknown';
  const buildInfo: BuildInfo = {
    commit,
    commitShort: commit.slice(0, 7),
    branch: process.env.BRANCH || gitValue('rev-parse', '--abbrev-ref', 'HEAD') || 'unknown',
    context: process.env.CONTEXT || 'local',
    deployId: process.env.DEPLOY_ID || null,
    builtAt: new Date().toISOString(),
    siteUrl,
    siteUrlSource,
    env: {
      VITE_SITE_URL: Boolean((env.VITE_SITE_URL || process.env.VITE_SITE_URL || '').trim()),
      VITE_DEMO_BRAND_NAME: Boolean((env.VITE_DEMO_BRAND_NAME || process.env.VITE_DEMO_BRAND_NAME || '').trim()),
      VITE_DEMO_BRAND_URL: Boolean((env.VITE_DEMO_BRAND_URL || process.env.VITE_DEMO_BRAND_URL || '').trim())
    }
  };

  return {
    plugins: [
      react(),
      tailwindcss(),
      brandMetadataPlugin(siteUrl),
      ...(command === 'build' ? [buildInfoPlugin(buildInfo)] : [])
    ],
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
