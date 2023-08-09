import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      src: '/src',
      '@modules': '/src/modules',
      '@images': '/public/assets/images',
      '@zustand': '/src/zustand',
      '@api': '/src/api',
      '@components': '/src/shared/components',
      '@hooks': '/src/shared/hooks',
      '@util': '/src/shared/util',
      '@translations': '/src/i18n'
    }
  },
  plugins: [react(), svgr()]
})
