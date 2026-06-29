import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true, // Ensures local development routing works
  },
  preview: {
    historyApiFallback: true, // Ensures preview builds fall back to index.html
  }
})
