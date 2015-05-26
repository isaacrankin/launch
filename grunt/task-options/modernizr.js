/**
 * Modernizr task configuration
 *
 * Allows for an automatic custom Modernizr build
 */

'use strict';

var config = require('../config');

module.exports = {

    dist: {
        // [REQUIRED] Path to the build you're using for development.
        'devFile' : config.vendorPath + 'grunt-modernizr/lib/modernizr-dev.js',

        // Path to save out the built file.
        'outputFile' : config.outputPath + 'scripts/vendor/modernizr.min.js',

        // Based on default settings on http://modernizr.com/download/
        "extra" : {
            "shiv" : true,
            "printshiv" : false,
            "load" : true,
            "mq" : false,
            "cssclasses" : true
        },
        'extensibility' : {
            "addtest" : false,
            "prefixed" : false,
            "teststyles" : false,
            "testprops" : false,
            "testallprops" : false,
            "hasevents" : false,
            "prefixes" : false,
            "domprefixes" : false,
            "cssclassprefix": ""
        },

        // By default, source is uglified before saving
        'uglify' : true,

        // Define any tests you want to explicitly include.
        'tests' : [],
        'parseFiles' : true,
        'files' : {
            'src': [ config.workingFiles.scripts,
                    config.workingPath + 'styles/**/*.scss']
        },
        'matchCommunityTests' : false,
        'customTests' : []
    }
};