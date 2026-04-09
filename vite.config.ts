import { defineConfig, type Plugin } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

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

export default defineConfig({
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
  assetsInclude: ['**/*.svg', '**/*.csv'],

  server: {
    historyApiFallback: true,
  },
})
