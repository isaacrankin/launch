/**
 * Babel task configuration - compiles ES5 to ES6
 */

'use strict';

var config = require('../config');

module.exports = function(){

    var task = {
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

    //task.dist.files[config.outputPath + 'scripts/app.js'] = config.tempPath + 'scripts/app.js';

    return task;
}();