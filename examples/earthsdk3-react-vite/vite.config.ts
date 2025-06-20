import { defineConfig, normalizePath } from 'vite'
import react from '@vitejs/plugin-react'
import cesium from 'vite-plugin-cesium';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    cesium(),
    // 运行和构建时copy
    viteStaticCopy({
      targets: [
        {
          src: normalizePath(path.resolve(__dirname, './node_modules/earthsdk3-assets')),
          dest: './js'
        }
      ]
    })
  ],
  resolve: {
    alias: {
      // 配置Cesium的访问
      cesium: path.resolve(__dirname, 'node_modules/cesium/Source/Cesium')
    }
  },
})
