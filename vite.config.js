import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Vercel auto-detects Vite: it runs `npm run build` and serves the `dist/` output.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    // Split stable vendor libs into their own chunks so they are cached
    // independently and the app entry stays small. Build-time only — has no
    // effect on `check:render`, which loads source modules via Vite SSR.
    // (Vite 8's Rolldown bundler only accepts the function form of
    // manualChunks, not the object form.)
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/scheduler/')) {
            return 'react-vendor'
          }
          if (id.includes('/framer-motion/')) return 'framer-vendor'
          if (id.includes('/lucide-react/')) return 'lucide-vendor'
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.js'],
    css: false,
    // The default "forks" pool spawns one child process per test file, which
    // times out on this machine during worker startup. Worker threads running
    // serially are lighter and reliable here — plenty fast for 6 small files.
    pool: 'threads',
    singleThread: true,
  },
})
