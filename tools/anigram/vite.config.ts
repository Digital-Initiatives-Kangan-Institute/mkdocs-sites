import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative asset paths so the built tool works when served from /tools/anigram.
  base: './',
  build: {
    // Emit directly to the deploy folder: <repo>/build/tools/anigram.
    outDir: resolve(__dirname, '../../build/tools/anigram'),
    emptyOutDir: true,
  },
})
