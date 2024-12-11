import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/todu-app/', // Replace "todu-app" with your repository name
  plugins: [react()],
});
