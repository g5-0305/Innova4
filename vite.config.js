import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const productDatabase = (target) => ({
  target,
  changeOrigin: true,
  secure: true,
  headers: { 'User-Agent': 'Consumerverse/1.0 (local development app)' },
  rewrite: (path) => path.replace(/^\/off-(food|beauty|petfood|products)/, ''),
});

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/off-food': productDatabase('https://world.openfoodfacts.org'),
      '/off-beauty': productDatabase('https://world.openbeautyfacts.org'),
      '/off-petfood': productDatabase('https://world.openpetfoodfacts.org'),
      '/off-products': productDatabase('https://world.openproductsfacts.org'),
    },
  },
});
