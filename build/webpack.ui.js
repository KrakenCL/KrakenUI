'use strict';

const merge = require('deepmerge');
const webpack = require('webpack');

const options = require('./options');
const base = require('./webpack.base.js');

const config = merge(base, {
    entry: options.paths.resolve('ui-src/index.js'),

    output: {
        filename: 'ui.bundle.js',
        path: options.paths.output.ui,
    },
    plugins: [ ],
    optimization: { },
    module: {
        rules: [
            

        ]
    },    
}, { clone: false });

config.module.rules[0].options.loaders = {
    scss: 'vue-style-loader!css-loader!sass-loader'
};
module.exports = config;
