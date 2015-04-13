/**
 * JSHint task configuration
 */

'use strict';

var config = require('../config');

module.exports = {

    all: [config.workingFiles.scripts],

    options: {

        // Add JSHintRC file with options
        jshintrc: '.jshintrc',
        ignores: [
            config.workingPath + 'scripts/plugins.js'
        ]
    }
};