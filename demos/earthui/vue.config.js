const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const { defineConfig } = require('@vue/cli-service');
const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = "../Build/Cesium/Workers";
const cesiumBaseUrl = "cesiumStatic";
const webpack = require('webpack');
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        client: {
            progress: true,
            overlay: false,
        },
    },
    filenameHashing: false,
    css: {
        extract: true,
    },
    pages: {
        index: {
            // page 的入口
            entry: 'src/main.ts',
            inject: false,
            minify: false,
        },
    },
    publicPath: './',
    lintOnSave: false,
    productionSourceMap: false, //打包不生成map
    configureWebpack: {
        optimization: {
            splitChunks: false,
        },
        resolve: {
            alias: {
                cesium: path.resolve('node_modules/cesium/Source/Cesium'),
                cesiumWidgets: path.resolve('node_modules/cesium/Source/Widgets'),
            }
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    { from: path.join(cesiumSource, cesiumWorkers), to: `${cesiumBaseUrl}/Workers`, },
                    { from: path.join(cesiumSource, "ThirdParty"), to: `${cesiumBaseUrl}/ThirdParty`, },
                    { from: path.join(cesiumSource, "Assets"), to: `${cesiumBaseUrl}/Assets`, },
                    { from: path.join(cesiumSource, "Widgets"), to: `${cesiumBaseUrl}/Widgets`, },
                    { from: path.join('node_modules/earthsdk3-assets'), to: 'js/earthsdk3-assets', toType: 'dir' },
                ],
            }),
            new webpack.DefinePlugin({
                'CESIUM_BASE_URL': JSON.stringify(cesiumBaseUrl)
            })
        ]
    },
})
