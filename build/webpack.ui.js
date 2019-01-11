'use strict';

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

    plugins: [ new VueLoaderPlugin() ],
    optimization: { },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    }   
}, { clone: false });

module.exports = config;
