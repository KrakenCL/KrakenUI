'use strict';

const path = require('path');

// Hardcoding here (and not reading from package.json) as the files are built
// before the version is updated in package.json
const version = '0.0.1';

const banner =
  '/*!\n' +
  ' * KrakenUI v' + version + ' (https://github.com/KrakenCL/KrakenUI)\n' +
  ' * (c) ' + new Date().getFullYear() + ' Volodymyr Pavliukevych\n' +
  ' * Released under the GPL 3 License.\n' +
  ' */';

module.exports = {
    banner,

    isProduction: process.env.NODE_ENV === 'production',

    paths: {
        root: path.join(__dirname, '..'),

        src: {
            main: path.join(__dirname, '..', 'src'),
            ui: path.join(__dirname, '..', 'ui-src')
        },

        output: {
            ui: path.join(__dirname, '..', 'ui')
        },

        resolve(location) {
            return path.join(__dirname, '..', location);
        }
    }
};
