/**
 * Autoprefixer task configuration
 */

'use strict';

var config = require('../config');

module.exports = {
    single_file: {
        src: config.outputPath + 'styles/app.min.css'
    }
};
