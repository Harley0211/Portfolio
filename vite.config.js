import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' makes the build work at a domain root (Netlify) and under /<repo>/ (GitHub Pages).
export default defineConfig({
  plugins: [react()],
  base: './',
  server: { port: 3000 },
  preview: { port: 3000 }
});
