/**
 * Clean task configuration
 */

'use strict';

var config = require('../config');

module.exports = {
    build: [config.tempPath],
    release: [config.outputPath]
};