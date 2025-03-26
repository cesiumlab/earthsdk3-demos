import vue from '@vitejs/plugin-vue';
import { defineConfig, normalizePath } from 'vite';
import cesium from 'vite-plugin-cesium';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';
export default defineConfig({
  resolve: {
    alias: {
      // 配置Cesium的访问
      cesium: path.resolve(__dirname, 'node_modules/cesium/Source/Cesium')
    }
  },
  plugins: [
    vue(),
    cesium(),
    // 运行和构建时copy
    viteStaticCopy({
      targets: [
        {
          src: normalizePath(path.resolve(__dirname, './node_modules/earthsdk3-assets/dist-web')),
          dest: './js/earthsdk3-assets'
        }
      ]
    })
  ]
})

