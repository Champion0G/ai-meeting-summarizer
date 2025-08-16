import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ai-meeting-summarizer/', // Replace with your actual repo name
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})