/**
 * CSS min task configuration
 */

var config = require('../config');

module.exports = function(){

    var task = {
        vendor: {
            files: {}
        }

        // Optionally minify app.css but sourcemaps don't work
        //target: {
        //    files: [{
        //        expand: true,
        //        cwd: config.outputPath + 'styles',
        //        src: ['app.css'],
        //        dest: config.outputPath + 'styles',
        //        ext: '.min.css'
        //    }]
        //}
    };

    task.vendor.files[config.outputPath + 'styles/vendor.min.css'] = config.vendorFiles.styles;

    return task;
}();