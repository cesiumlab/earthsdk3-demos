import vue from '@vitejs/plugin-vue2';
import { defineConfig, normalizePath } from 'vite';
import cesium from 'vite-plugin-cesium';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';
export default defineConfig({
    plugins: [
        vue(),
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
    server: {
        port: 3100, // 可自定义端口
    },
})
