import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    lib: {
      entry: 'src/main.ts',
      name: 'GreeterComponent',
      fileName: 'greeter-component',
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        globals: {
          vue: 'Vue'
        },
        inlineDynamicImports: true,
      },
    },
    cssCodeSplit: true,
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env': JSON.stringify({})
  },
  test: {
    globals: true,
    environment: 'jsdom',
  }
})
