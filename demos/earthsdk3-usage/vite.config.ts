import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig, normalizePath } from 'vite';
import cesium from 'vite-plugin-cesium';
import vpe from 'vite-plugin-externals';
import { createHtmlPlugin } from 'vite-plugin-html';
import { viteStaticCopy } from 'vite-plugin-static-copy';
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    vue(),
    // vpe.viteExternalsPlugin({
    //   cesium: 'Cesium',
    // }),
    // 运行和构建时copy
    viteStaticCopy({
      targets: [
        // {
        //   src: [
        //     normalizePath(path.resolve(__dirname, '../../node_modules/xbsj-base/dist/xbsj-base.js')),
        //     normalizePath(path.resolve(__dirname, '../../node_modules/earthsdk3-assets')),
        //     normalizePath(path.resolve(__dirname, '../../node_modules/earthsdk3/dist/earthsdk3.js')),
        //     normalizePath(path.resolve(__dirname, '../../node_modules/earthsdk3-cesium/dist/earthsdk3-cesium.js')),
        //     normalizePath(path.resolve(__dirname, '../../node_modules/earthsdk3-ue/dist/earthsdk3-ue.js')),
        //     normalizePath(path.resolve(__dirname, './src/scripts'))
        //   ],
        //   dest: './js'
        // },
        // {
        //   src: [
        //     normalizePath(path.resolve(__dirname, './src/examples')),
        //     normalizePath(path.resolve(__dirname, './src/css')),
        //   ],
        //   dest: './'
        // }
      ]
    }),
    createHtmlPlugin({
      minify: true,
      pages: [
        {
          entry: 'src/pages/page_index/main.js',
          filename: 'index.html',
          template: 'src/pages/page_index/index.html',
        },
        {
          entry: 'src/pages/page_editor/main.js',
          filename: 'example.html',
          template: 'src/pages/page_editor/index.html',
        }
      ]
    })
  ]
})

