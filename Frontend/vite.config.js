import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        calculator: './calculator.html',
        login: '../../public/login.html'
      }
    }
  }
});