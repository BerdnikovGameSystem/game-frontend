import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import vuePugPlugin from 'vue-pug-plugin'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

import Components from 'unplugin-vue-components/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        preprocessOptions: {
          plugins: [vuePugPlugin],
        },
        compilerOptions: {
          // isBuiltInComponent: (tag) => {
          //   console.log(tag);
          //   return Symbol(tag);
          // },
        },
      },
    }),
    vueJsx(),
    vueDevTools(),
    Components({
      dts: true,
      resolvers: [],
      dirs: ['src/components'],
      deep: true,
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
