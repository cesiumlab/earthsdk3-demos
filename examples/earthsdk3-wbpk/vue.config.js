const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = "../Build/Cesium/Workers";
const cesiumBaseUrl = "cesiumStatic";

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
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
          { from: path.join('node_modules/earthsdk3-assets', 'dist-web'), to: 'js/earthsdk3-assets/dist-web' },
        ],
      }),
      new webpack.DefinePlugin({
        'CESIUM_BASE_URL': JSON.stringify(cesiumBaseUrl)
      })
    ]
  },
})
