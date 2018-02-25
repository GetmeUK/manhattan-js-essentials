var path = require('path');


module.exports = {
    entry: {
        'index': './module/index.js'
    },

    output: {
        library: 'manhattan-essentials',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'umd'),
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },

    stats: {
         colors: true
    }
 };
