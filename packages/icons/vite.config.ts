import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'fari-icons',
      fileName: 'index',
      formats: ['es']
    },
    outDir: 'dist',
    emptyOutDir: false 
  }
});