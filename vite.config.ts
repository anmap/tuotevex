import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

const isStorybook = process.env.STORYBOOK === 'true' || process.env.STORYBOOK === '1'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // vite-plugin-vue-devtools is incompatible with Storybook's Vite server
    // Fix for: https://github.com/storybookjs/storybook/issues/32462
    !isStorybook && vueDevTools(),
    tailwindcss(),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
