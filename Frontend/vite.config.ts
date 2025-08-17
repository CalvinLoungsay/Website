import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
  },
  base: process.env.VITE_BASE_PATH || "/Website",
  server: {
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
});