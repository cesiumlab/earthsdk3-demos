import vue from '@vitejs/plugin-vue';
import { defineConfig, normalizePath } from 'vite';
import cesium from 'vite-plugin-cesium';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';
export default defineConfig({
  base: './', // 默认值，应用部署在根路径
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
          //此处注意若单独提取项目，路径应该为./node_modules
          src: normalizePath(path.resolve(__dirname, '../../node_modules/earthsdk3-assets')),
          dest: './js'
        }
      ]
    })
  ]
})

