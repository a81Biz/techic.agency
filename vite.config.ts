import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base relativa para que el build funcione en cualquier subcarpeta/host
export default defineConfig({
  base: './',
  plugins: [react()],
})
