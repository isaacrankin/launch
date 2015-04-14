/**
 * Uglify task configuration
 */

'use strict';

var config = require('../config');

module.exports = {
    vendor: {
        files: [{
            src: [config.vendorFiles.scripts],
            dest: config.outputPath + 'scripts/lib.min.js'
        }]
    },
    app: {
        files: [{
            src: [config.tempPath + 'scripts/**/*.js'],
            dest: config.outputPath + 'scripts/app.min.js'
        }],
        options:{
            sourceMap: true,
            sourceMapIncludeSources: true,
            cwd: config.tempPath
        }
    }
};