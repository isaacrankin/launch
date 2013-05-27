module.exports = function(grunt) {

    grunt.initConfig({
        compass: {
            dist: {
                options: {
                    config: 'config.rb'
                }
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, src: ['scripts/**'], dest: '../'} // includes files in path and its subdirs
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-peon-gui');

    // Default task(s).
    grunt.registerTask('default', ['compass', 'copy']);
};