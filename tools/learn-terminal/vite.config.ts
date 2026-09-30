import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative asset paths so the built tool works when served from /tools/learn-terminal.
  base: './',
  // Allow importing the common shell from tools/shared/ (outside this root).
  server: { fs: { allow: ['..'] } },
  // Resolve react from this tool's node_modules so tools/shared/ files
  // (which sit outside this root) use the same copy.
  resolve: { alias: { react: resolve(__dirname, 'node_modules/react') } },
  build: {
    // Emit directly to the deploy folder: <repo>/build/tools/learn-terminal.
    outDir: resolve(__dirname, '../../build/tools/learn-terminal'),
    emptyOutDir: true,
  },
})
