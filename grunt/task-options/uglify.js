/**
 * Uglify task configuration
 */

'use strict';

var config = require('../config');

module.exports = function(){

    var task = {
        vendor: {
            files: {}
        },
        app: {
            files: {},
            options:{
                sourceMap: true,
                sourceMapIncludeSources: true,
                cwd: config.tempPath
            }
        }
    };

    task.vendor.files[config.outputPath + 'scripts/lib.min.js'] = config.vendorFiles.scripts;
    task.app.files[config.outputPath + 'scripts/app.min.js'] = config.workingFiles.scripts;

    return task;

}();