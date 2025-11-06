import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'

// Base relativa para que el build funcione en cualquier subcarpeta/host
export default defineConfig({
  base: './',
  plugins: [react(), mdx()],
})
