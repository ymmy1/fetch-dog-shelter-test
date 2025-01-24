import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/fetch-dog-shelter-test',
  plugins: [react()],
});
