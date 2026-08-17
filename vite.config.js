import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig({
  base: '/online-kenshu-lp/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        legal: resolve(__dirname, 'legal.html'),
      },
    },
  },
})
