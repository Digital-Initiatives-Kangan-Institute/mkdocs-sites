import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative asset paths so the built tool works when served from /tools/code.
  base: './',
  build: {
    // Emit directly to the deploy folder: <repo>/build/tools/code.
    outDir: resolve(__dirname, '../../build/tools/code'),
    emptyOutDir: true,
  },
})
