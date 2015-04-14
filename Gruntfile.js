/**
 * Grunt setup
 */

'use strict';

var xtend = require('xtend');

/**
 * Load configuration files for Grunt
 * @param  {string} path Path to folder with tasks
 * @return {object}      All options
 */
var loadConfig = function (path) {
    var glob = require('glob');
    var object = {};
    var key;

    glob.sync('*', { cwd: path }).forEach(function (option) {
        key = option.replace(/\.js$/,'');
        object[key] = require(path + option);
    });

    return object;
};

/*
 * Call Grunt configuration
 */
module.exports = function (grunt) {

    // Measure time of grunt tasks
    require('time-grunt')(grunt);

    // TODO: explain how this works?
    var config = xtend({
        pkg: require('./package')
    }, loadConfig('./grunt/task-options/'));

    // Load project configuration
    grunt.initConfig(config);

    // Load all npm tasks through jit-grunt (all tasks from node_modules)
    require('jit-grunt')(grunt);

    grunt.registerTask('default', [
        'clean:build',
        'sass',
        'newer:cssmin',
        'jshint',
        'babel',
        'newer:uglify',
        'newer:copy',
        'newer:autoprefixer',
        'modernizr',
        'newer:imagemin',
        'notify:build_all'
    ]);

    grunt.registerTask('styles', [
        'clean:build',
        'sass',
        'newer:cssmin',
        'newer:autoprefixer',
        'modernizr',
        'notify:styles'
    ]);

    grunt.registerTask('scripts', [
        'clean:build',
        'jshint',
        'babel',
        'newer:uglify',
        'modernizr',
        'notify:scripts'
    ]);
};