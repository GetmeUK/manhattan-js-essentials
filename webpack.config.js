
// Pollyfill for older versions of Node
require('es6-promise').polyfill()

// Imports
const path = require('path')
const webpack = require('webpack')

// Plugin config
const plugins = [

    new webpack.DefinePlugin({
        'process.env': {

            // The `NODE_ENV` flag indicates which environment web pack is compiling
            // in/for (defaults to the local environment).
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'dev')

        }
    })

];

// Environment specific config
switch (process.env.NODE_ENV) {

    case 'dev':
        break;

    case 'prod':
        var uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            compress: {
                drop_console: true,
                warnings: false
            },
            mangle: {
                except: ['webpackJsonp'],
                screw_ie8 : true,
                keep_fnames: true
            }
        })

        plugins.push(uglifyPlugin);
        break;

}

// Project config
module.exports = {
    plugins: plugins,

    entry: {
        'index': [
            path.resolve(__dirname, 'src', 'essentials.coffee')
        ]
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.js'
    },

    module: {
        preLoaders: [
            // CoffeeScript (lint)
            {
                test: /\.coffee$/,
                exclude: /node_modules/,
                loader: 'coffeelint-loader'
            }
        ],

        loaders: [
            // CoffeeScript (to JavaScript)
            {
                test: /\.coffee$/,
                loaders: ['coffee', 'coffee-import']
            }
        ]
    },

    // Dev server
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        inline: true,
        port: 5999
    }
};