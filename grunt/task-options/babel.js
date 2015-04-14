/**
 * Babel task configuration - compiles ES5 to ES6
 */

'use strict';

var config = require('../config');

module.exports = {
    options: {
        sourceMap: false
    },
    dist: {
        files: [{
            expand: true,
            src: ['scripts/**/*.js'],
            dest: config.tempPath,
            ext: '.js'
        }]
    }
};