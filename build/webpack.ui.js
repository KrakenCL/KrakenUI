'use strict';


const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const merge = require('deepmerge');
const options = require('./options');
const base = require('./webpack.base.js');

const config = merge(base, {
    entry: options.paths.resolve('ui-src/index.js'),
    output: {
        filename: 'ui.bundle.js',
        path: options.paths.output.ui
    },

    plugins: [ new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
          }) ],
    optimization: {},
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            }
        ]
    }   
}, { clone: false });

module.exports = config;
