import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/task-manager-app/',
  resolve: {
    alias: {
      '@': '/src', // Просто указываем путь напрямую
    },
  },
})
