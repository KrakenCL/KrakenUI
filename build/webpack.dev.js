'use strict';

const VueLoaderPlugin = require('vue-loader/lib/plugin');

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
    },
    watch: true,
    devtool: '#eval-source-map',
    devServer: {
        contentBase: options.paths.output.ui,
        host: '0.0.0.0', // Bind to 0.0.0.0 for external access for external devices (mobile testing)
        port: 9000,
        historyApiFallback: true,
        noInfo: true,
        clientLogLevel: 'error',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },    
}, { clone: false });

module.exports = config;
