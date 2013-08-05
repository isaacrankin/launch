module.exports = function(grunt) {

	// Load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	var config = {
		output: '..',
		working: ['scripts/lib.js',
					'scripts/models.js',
					'scripts/views.js',
					'scripts/main.js'],
		libraries: ['scripts/vendor/jquery/jquery.min.js',
					'scripts/vendor/underscore/underscore-min.js',
					'scripts/plugins.js']
	}

	grunt.initConfig({

		config: config,

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
					{ expand: true, flatten: true, src: ['scripts/vendor/modernizr/modernizr.js'], dest: '<%= config.output %>/scripts/vendor/'}
				]
			}
		},

		concat: {
			dist: {
				src: '<%= config.working %>',
				dest: '<%= config.output %>/scripts/main.js'
			}
		},

		uglify: {
			lib: {
				files: {
					'<%= config.output %>/scripts/lib.min.js': '<%= config.libraries %>'
				}
			},
			main: {
				files: {
					'<%= config.output %>/scripts/main.min.js': '<%= config.working %>'
				}
			}
		},

		watch: {
			src: {
				files: ['scripts/*.js', 'sass/**/*.*', '!scripts/vendor/'],
				tasks: ['compass', 'uglify:main']
			},
			css: {
				files: ['/sass/{,*/}*.{scss,sass}'],
				tasks: ['compass']
			}
		}
	});

	// Default task(s).
	grunt.registerTask('default',
		[
			'compass',
			'copy',
			'uglify:main', // concatinate and minify working JS
			'uglify:lib' // concatinate and minify vendor JS libraries
		]
	);

	// Watch task, listens for changes
	grunt.registerTask('watch-all',
		[
			'watch:src'
		]
	);

	// Watch task, listens for changes
	grunt.registerTask('watch-styles',
		[
			'watch:css'
		]
	);
};