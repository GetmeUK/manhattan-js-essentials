var path = require('path');
var webpack = require('webpack');


module.exports = {
     entry: {
        'index': './module/index.js',
        'index.min': './module/index.js'
     },

     output: {

         library: "manhattanEssentials",

         // We want webpack to build a UMD wrapper for our module
         libraryTarget: "umd",

         // the destination file name
         filename: "umd/[name].js"
     },

     module: {
         loaders: [
             {
                 test: /\.js$/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015']
                 }
             }
         ]
     },

     plugins: [
         new webpack.optimize.UglifyJsPlugin({
             include: /\.min\.js$/,
             minimize: true
         })
     ],

     stats: {
         colors: true
     }
 };
