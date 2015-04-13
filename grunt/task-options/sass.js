/**
 * SASS task configuration
 */

'use strict';

var config = require('../config');

module.exports = {
    dist: {
        options: {
            style: 'compressed',
            sourceMap: true,
            quiet: true
        },
        files: [{
            expand: true,
            cwd: 'styles',
            src: ['{,*/}*.{scss,sass}'],
            dest: config.outputPath + 'styles',
            ext: '.css'
        }]
    }
};