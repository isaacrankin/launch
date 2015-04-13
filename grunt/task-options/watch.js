/**
 * Watch task configuration
 */

'use strict';

var config = require('../config');

module.exports = {
    css: {
        files: [config.workingPath + 'styles/{,*/}*.{scss,sass}'],
        tasks: ['styles']
    },
    js: {
        files: [config.workingPath + 'scripts/**/*.js'],
        tasks: ['scripts']
    },
    files: {
        files: [config.workingPath + '*.{html,php}', config.workingPath + 'includes/*.{html,php}'],
        tasks: ['copy:dist', 'notify:files']
    }
};