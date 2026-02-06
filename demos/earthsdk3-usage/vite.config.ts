import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig, normalizePath } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { readFileSync } from 'fs';

const packageJson = JSON.parse(readFileSync(path.resolve(__dirname, 'package.json'), 'utf-8'));
const dependencies = packageJson.dependencies || {};

export default defineConfig({
    base: './',
    define: {
        '__VERSION_CESIUM__': JSON.stringify(dependencies.cesium || ''),
        '__VERSION_EARTHSDK3__': JSON.stringify(dependencies.earthsdk3 || ''),
        '__VERSION_EARTHSDK3_CESIUM__': JSON.stringify(dependencies['earthsdk3-cesium'] || ''),
        '__VERSION_EARTHSDK3_UE__': JSON.stringify(dependencies['earthsdk3-ue'] || ''),
        '__VERSION_EARTHSDK3_ASSETS__': JSON.stringify(dependencies['earthsdk3-assets'] || ''),
    },
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

