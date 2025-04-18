const merge = require('webpack-merge');
const common = require('./webpack.common.js');
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
    }
  }),
  merge(common, devCommon, {
    output: {
      filename: 'earthsdk3-ol.mjs',
      library: {
        type: 'module'
      },
    },
    experiments: {
      outputModule: true
    }
  }),
  merge(common, devCommon, {
    output: {
      filename: 'earthsdk3-ol.cjs',
      library: {
        type: 'commonjs2'
      },
    }
  })
];
