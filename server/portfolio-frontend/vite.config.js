import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// This builds straight into the existing ../client folder that
// server.js already serves as a static site — so no server.js
// changes are needed. Run `npm run build` from inside this
// portfolio-frontend folder before deploying.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../client',
    emptyOutDir: true,
  },
  server: {
    proxy: {
      // During local dev, requests to /contact go to the Express
      // backend on port 5000 instead of the Vite dev server.
      '/contact': 'http://localhost:5000',
    },
  },
})