/**
 * Copy task configuration
 */

'use strict';

var config = require('../config');

module.exports = {

    // Add anything that needs copying
    dist: {
        files: [{
            expand: true,
            dot: true,
            cwd: config.workingPath,
            dest: config.outputPath,
            src: [
                '*.{ico,txt,html,php}',
                '.htaccess',
                'browserconfig.xml',
                'crossdomain.xml',
                'apple-touch-icon.png',
                'fonts/{,*/}*.*',
                'images/{,*/}*.{svg,ico}'
            ]
        }]
    },

    // jQuery needs copying because used as a fallback if CDN fails
    jquery: {
        expand: true,
        flatten: true,
        src:[config.vendorPath + 'jquery/dist/jquery.min.js'],
        dest: config.outputPath + 'scripts/vendor/'
    }
};