import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/todu-app/', // Replace this with your repository name
  plugins: [react()],
});
