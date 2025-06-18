import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig, normalizePath } from 'vite';
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
        viteStaticCopy({
            targets: [
                {
                    src: [
                        normalizePath(path.resolve(__dirname, './node_modules/xbsj-base/dist/xbsj-base.js')),
                        normalizePath(path.resolve(__dirname, './node_modules/earthsdk3-assets')),
                        normalizePath(path.resolve(__dirname, './node_modules/earthsdk3/dist/earthsdk3.iife.js')),
                        normalizePath(path.resolve(__dirname, './node_modules/earthsdk3-cesium/dist/earthsdk3-cesium.iife.js')),
                        normalizePath(path.resolve(__dirname, './node_modules/earthsdk3-ue/dist/earthsdk3-ue.iife.js')),
                    ],
                    dest: './earthsdk3'
                }
            ]
        })
    ],
    build: {
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'index.html'),
                example: path.resolve(__dirname, 'example.html'),
            },
        }
    }
})

