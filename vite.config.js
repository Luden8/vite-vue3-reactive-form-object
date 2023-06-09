import { fileURLToPath } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import eslint from 'vite-plugin-eslint';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
import svgLoader from 'vite-svg-loader';
import Inspect from 'vite-plugin-inspect';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    quasar({
      autoImportComponentCase: 'pascal',
      sassVariables: false
    }),
    eslint({
      cache: false,
      exclude: ['dist']
    }),
    Pages({
      extensions: ['vue'],
      pagesDir: [{ dir: 'src/modules/**/pages', baseRoute: '' }]
    }),
    Layouts({
      defaultLayout: 'Default.layout',
      layoutsDir: 'src/shared/layouts'
    }),
    svgLoader(),
    Inspect({
      // change this to enable inspect for debugging
      enabled: false
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use 'src/styles/base/color';
          @use 'src/styles/base/typography';

          @use 'src/styles/utils/breakpoint';
        `
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        // https://rollupjs.org/guide/en/#outputmanualchunks
        manualChunks(id) {
          if (id.includes('src/modules/users')) return 'users';
          if (id.includes('src/modules/posts')) return 'posts';
        }
      }
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
});
