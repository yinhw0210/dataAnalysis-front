import type { PluginOption } from 'vite'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import vitePluginsAutoI18n, { TranslateTypeEnum, YoudaoTranslator } from 'vite-auto-i18n-plugin'

const i18nPlugin = vitePluginsAutoI18n({
  globalPath: './lang',
  namespace: 'lang',
  distPath: './dist/assets',
  distKey: 'index',
  targetLangList: ['zh-cn', 'ko', 'ja', 'en'],
  translator: new YoudaoTranslator({
    appId: '6e12e128d571d8ea',
    appKey: 'a97XMZM0IpWjMw1a3zdIGk7Zb0Xw3Y9o',
  }),
  translateType: TranslateTypeEnum.SEMI_AUTO,
})

// https://vite.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [react(), tailwindcss() as PluginOption, i18nPlugin],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        // target: 'http://14.103.153.217/api',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
})
