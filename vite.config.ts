import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import vuePugPlugin from 'vue-pug-plugin'
import tailwindcss from '@tailwindcss/vite'

import Components from 'unplugin-vue-components/vite'
import {
  ElementPlusResolver,
} from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        preprocessOptions: {
          plugins: [
            vuePugPlugin,
          ]
        }
      }
    }),
    vueJsx(),
    vueDevTools(),
    Components({
      dts: true,
      resolvers: [
        ElementPlusResolver(),
      ],
      dirs: ['src/components'],
      deep: true,
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
