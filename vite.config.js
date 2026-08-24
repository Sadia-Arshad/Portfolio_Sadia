import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Vercel auto-detects Vite: it runs `npm run build` and serves the `dist/` output.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    // Default is fine — kept explicit for clarity.
  },
})
