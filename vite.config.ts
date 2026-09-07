import { defineConfig, loadEnv, type Plugin } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

/** Full HTTP POST URL from Power Automate (may include `sig=`). Not exposed to the browser — use without `VITE_` prefix. */
function powerAutomateProxyTarget(
  fullInvokeUrl: string | undefined,
): { target: string; path: string } {
  const fallbackHost =
    'https://defaultd0d9a0dbf53a4cf8845539afdeef41.d3.environment.api.powerplatform.com'
  const fallbackPath =
    '/powerautomate/automations/direct/workflows/a307a861ae224d9c80ed0d0ce4448324/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=bQkpvb3adcAzKIcI8TB4bOBgHDL8nqf80eXZgJ3um20'
  const raw = fullInvokeUrl?.trim()
  if (!raw) return { target: fallbackHost, path: fallbackPath }
  try {
    const u = new URL(raw)
    return {
      target: `${u.protocol}//${u.host}`,
      path: `${u.pathname}${u.search}`,
    }
  } catch {
    return { target: fallbackHost, path: fallbackPath }
  }
}

function figmaAssetFallback(): Plugin {
  const PLACEHOLDER_PNG_BASE64 =
    // 1x1 transparent PNG
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMB/6V9nWQAAAAASUVORK5CYII='

  const prefix = 'figma:asset/'
  const virtualPrefix = '\0figma-asset:'

  return {
    name: 'figma-asset-fallback',
    enforce: 'pre',
    resolveId(id) {
      if (id.startsWith(prefix)) return virtualPrefix + id.slice(prefix.length)
      return null
    },
    load(id) {
      if (!id.startsWith(virtualPrefix)) return null

      // Keep the exported value stable across HMR reloads.
      // If you later add real assets, replace this plugin with a resolver to your assets folder.
      return `export default "data:image/png;base64,${PLACEHOLDER_PNG_BASE64}";`
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const pa = powerAutomateProxyTarget(env.POWER_AUTOMATE_HTTP_URL)

  return {
  // Set by the GitHub Pages workflow to serve from the repo subpath; defaults to root for Vercel.
  base: env.GH_PAGES_BASE || '/',
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    figmaAssetFallback(),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv', '**/*.riv'],

  server: {
    historyApiFallback: true,
    proxy: {
      // Dev-only: browser → same-origin → proxy → Power Automate (avoids CORS on localhost).
      // Set POWER_AUTOMATE_HTTP_URL to the full POST URL from the trigger (after "Anyone" + save, includes sig=).
      "/api/powerautomate-demo": {
        target: pa.target,
        changeOrigin: true,
        secure: true,
        rewrite: () => pa.path,
      },
    },
  },
}
})
