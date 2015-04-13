/**
 * CSS min task configuration
 */

var config = require('../config');

module.exports = function(){

    var options = {
        vendor: {
            files: {}
        },
        target: {
            files: [{
                sourceMap: true,
                expand: true,
                cwd: config.outputPath + 'styles',
                src: ['app.css'],
                dest: config.outputPath + 'styles',
                ext: '.min.css'
            }]
        }
    };

    options.vendor.files[config.outputPath + 'styles/vendor.min.css'] = config.vendorFiles.styles;

    return options;
}();