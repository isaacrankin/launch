module.exports = function(grunt) {

	// Load all grunt tasks automatically
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	var workingPath = "../",
		outputPath = "../../build/",
		vendorPath = "../vendor/";

	var config = {

		workingPath: workingPath,

		outputPath: outputPath,

		vendorPath: vendorPath,

		vendorFiles: {
			styles: [vendorPath+"normalize-css/normalize.css"],
			scripts: [vendorPath+"jquery/jquery.min.js",
					vendorPath+"underscore/underscore-min.js",
					vendorPath+"/backbone/backbone-min.js",
					vendorPath+"/scripts/plugins.js"]
		},

		workingFiles: {
			scripts: [workingPath+"scripts/models.js",
					workingPath+"scripts/views.js",
					workingPath+"scripts/main.js"]
		}
	}

	grunt.initConfig({

		config: config,

		compass: {
			dist: {
				options: {
					environment: 'production',
					cssDir: '<%= config.outputPath %>styles',
					sassDir: '<%= config.workingPath %>sass',
					outputStyle: "compressed"
				}
			}
		},

		copy: {
			main: {
				files: [
					{
						expand: true,
						flatten: true,
						src: ['<%= config.vendorPath %>normalize-css/normalize.css'],
						dest: '<%= config.outputPath %>styles/vendor/'}
				]
			}
		},

		concat: {
			dist: {
				src: '<%= config.workingFiles.scripts %>',
				dest: '<%= config.outputPath %>scripts/main.js'
			},
			lib: {
				src: '<%= config.vendorFiles.scripts %>',
				dest: '<%= config.outputPath %>scripts/lib.min.js'
			}
		},

		cssmin: {
			minify: {
				expand: true,
				cwd: '<%= config.outputPath %>styles/vendor/',
				src: ['*.css', '!*.min.css'],
				dest: '<%= config.outputPath %>styles/vendor/',
				ext: '.min.css'
			}
		},

		uglify: {
			vendor: {
				files: {
					'<%= config.outputPath %>scripts/lib.min.js': '<%= config.vendorFiles.scripts %>',
					'<%= config.outputPath %>scripts/vendor/modernizr.min.js': '<%= config.vendorPath %>modernizr/modernizr.js'
				}
			},
			main: {
				files: {
					'<%= config.outputPath %>scripts/main.min.js': '<%= config.workingFiles.scripts %>'
				},
				options:{
					sourceMappingURL: "sourcemaps/main.map",
					sourceMap: "../../scripts/sourcemaps/main.map",
					sourceMapRoot: "../../src/build/"
				}
			}
		},

		watch: {
			src: {
				files: ['<%= config.workingPath %>scripts/*.js', '<%= config.workingPath %>sass/**/*.*'],
				tasks: ['compass', 'uglify:main', 'notify:watch_all']
			},
			css: {
				files: ['<%= config.workingPath %>sass/{,*/}*.{scss,sass}'],
				tasks: ['compass', 'notify:watch_styles']
			},
			js: {
				files: ['<%= config.workingPath %>scripts/*.js'],
				tasks: ['uglify:main', 'notify:watch_scripts']
			}
		},

		notify: {
			watch_all: {
				options: {
					//title: 'Task Complete',  // optional
					message: 'Compass and Uglify finished running.' //required
				}
			},
			watch_styles: {
				options: {
					//title: 'Task Complete',  // optional
					message: 'Compass finished running.' //required
				}
			},
			watch_scripts: {
				options: {
					message: 'Uglify finished running.' //required
				}
			}
		}
	});

	// Default task(s).
	grunt.registerTask('default',
		[
			'compass',
			'copy',
			'cssmin',
			'uglify:main', // concatinate and minify working JS
			'uglify:vendor' // concatinate and minify vendor JS libraries, use this if libraries are not minified
		]
	);

	// Watch task, listens for changes on all workin JS and SCSS
	grunt.registerTask('watch-all',
		[
			'watch:src'
		]
	);

	// Watch task, listens for style changes only
	grunt.registerTask('watch-styles',
		[
			'watch:css'
		]
	);

	// Watch task, listens for JavaScript changes only
	grunt.registerTask('watch-scripts',
		[
			'watch:js'
		]
	);
};