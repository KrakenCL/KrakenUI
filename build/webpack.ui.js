'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('deepmerge');
const webpack = require('webpack');

const options = require('./options');
const base = require('./webpack.base.js');

const config = merge(base, {
    entry: options.paths.resolve('ui-src/index.js'),

    output: {
        filename: 'ui.bundle.js',
        path: options.paths.output.ui
    },

    plugins: [
        new ExtractTextPlugin({
            filename: 'ui.bundle.css'
        }),

        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),

        // Set the production environment
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ]
}, { clone: false });

// First item in module.rules array is Vue
config.module.rules[0].options.loaders = {
    scss: ExtractTextPlugin.extract({
        loader: 'css-loader!sass-loader',
        fallbackLoader: 'vue-style-loader'
    })
};

module.exports = config;
