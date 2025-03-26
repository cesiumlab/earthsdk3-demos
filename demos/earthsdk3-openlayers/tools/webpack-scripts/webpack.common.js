const path = require('path');
const webpack = require('webpack');
const { defines, info } = require('../base/defines');

module.exports = {
    mode: 'production',
    stats: 'errors-only',
    entry: {
        app: './src/index.ts'
    },
    output: {
        path: path.resolve(__dirname, '../../dist'),
        globalObject: 'this'
    },
    module: {
        rules: [
            {
                test: /.ts$/,
                loader: 'ts-loader',
                exclude: [/node_modules/]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        alias: {
            '@olSrc': path.resolve(__dirname, '../../src'),
        },
    },
    externals: {
        "earthsdk3": "earthsdk3",
        "xbsj-base": "xbsj-base",
        // "ol": "ol",//ol引入方式太多样，暂时不处理
    },
    plugins: [
        new webpack.BannerPlugin(`${info.name}(${info.version}-${info.commitId.slice(0, 8)}-${info.date}) 版权所有@${info.owner}`),
        new webpack.DefinePlugin(defines)
    ]
};
