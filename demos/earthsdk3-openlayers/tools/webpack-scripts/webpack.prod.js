const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const prodCommon = {
  optimization: {
    usedExports: true,
    minimize: true
  }
};

module.exports = [
  merge(common, prodCommon, {
    output: {
      filename: 'earthsdk3-ol.js',
      library: {
        name: 'earthsdk3-ol',
        type: 'umd'
      },
    }
  }),
  merge(common, prodCommon, {
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
  merge(common, prodCommon, {
    output: {
      filename: 'earthsdk3-ol.cjs',
      library: {
        type: 'commonjs2'
      },
    }
  })
];
