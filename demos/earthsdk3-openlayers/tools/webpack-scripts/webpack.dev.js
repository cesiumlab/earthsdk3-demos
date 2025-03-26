const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const devCommon = {
  devtool: 'inline-source-map',
  optimization: {
    usedExports: true,
    minimize: false
  }
};

module.exports = [
  merge(common, devCommon, {
    output: {
      filename: "earthsdk3-ol.js",
      library: {
        name: 'earthsdk3-ol',
        type: 'umd'
      },
    },
    plugins: [new CleanWebpackPlugin()],
  }),
  merge(common, devCommon, {
    output: {
      filename: 'earthsdk3-ol.esm.js',
      library: {
        type: 'module'
      },
    },
    experiments: {
      outputModule: true
    }
  })
];
