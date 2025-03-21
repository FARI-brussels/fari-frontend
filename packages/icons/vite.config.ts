import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import svgLoader from 'vite-svg-loader'

export default defineConfig({
	plugins: [],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'fari-icons',
      fileName: 'index',
      formats: ['es']
    },
  }
});