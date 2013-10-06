module.exports = function(grunt) {

	// Load all grunt tasks automatically
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({

		// Import package manifest
		pkg: grunt.file.readJSON("package.json"),

		// Import build config
		config: grunt.file.readJSON("Gruntconfig.json"),

		// Banner definitions
		meta: {
			banner: "/*\n" +
				" *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
				" *  <%= pkg.description %>\n" +
				" *  <%= pkg.repository %>\n" +
				" *\n" +
				" *  Made by <%= pkg.author.name %>\n" +
				" *  Under <%= pkg.license %> License\n" +
				" */\n"
		},

		imagemin: {
			png: {
				options: {
					optimizationLevel: 7
				},
				files: [
					{
						// Set to true to enable the following options…
						expand: true,
						// cwd is 'current working directory'
						cwd: '<%= config.outputPath %>images/',
						src: ['**/*.png'],
						// Could also match cwd line above. i.e. project-directory/img/
						dest: '<%= config.outputPath %>images/',
						ext: '.png'
					}
				]
			},
			jpg: {
				options: {
					progressive: true
				},
				files: [
					{
						// Set to true to enable the following options…
						expand: true,
						// cwd is 'current working directory'
						cwd: '<%= config.outputPath %>images/',
						src: ['**/*.jpg'],
						// Could also match cwd. i.e. project-directory/img/
						dest: '<%= config.outputPath %>images/',
						ext: '.jpg'
					}
				]
			}
		},

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
						dest: '<%= config.outputPath %>styles/vendor/'
					}
				]
			}
		},

		// Optional task for conactinating scripts
		concat: {
			working: {
				src: '<%= config.workingFiles.scripts %>',
				dest: '<%= config.outputPath %>scripts/main.js'
			},
			vendor: {
				src: '<%= config.vendorFiles.scripts %>',
				dest: '<%= config.outputPath %>scripts/lib.min.js'
			}
		},

		cssmin: {
			minify: {
				expand: true,
				cwd: '<%= config.outputPath %>styles/vendor/',
				src: ['*.css', '!*.min.css'],
				dest: '<%= config.outputPath %>styles/vendor/'
			}
		},

		uglify: {
			vendor: {
				files: {
					'<%= config.outputPath %>scripts/lib.min.js': '<%= config.vendorFiles.scripts %>'
				}
			},
			modernizr: {
				files: {
					'<%= config.outputPath %>scripts/vendor/modernizr.min.js': '<%= config.vendorPath %>modernizr/modernizr.js'
				}
			},
			main: {
				files: {
					'<%= config.outputPath %>scripts/main.min.js': '<%= config.workingFiles.scripts %>'
				},
				options:{
					sourceMappingURL: "sourcemaps/main.map",
					sourceMap: "<%= config.outputPath %>scripts/sourcemaps/main.map",
					sourceMapRoot: "<%= config.sourceMapRoot %>"
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
					message: 'Compass and Uglify finished running.'
				}
			},
			watch_styles: {
				options: {
					message: 'Compass finished running.'
				}
			},
			watch_scripts: {
				options: {
					message: 'Uglify finished running.'
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
			'uglify:modernizr', // concatinate and minify Modernizr because it doesn't come minified
			'uglify:main', 		// concatinate and minify working JS
			'concat:vendor' 	// concatinate JS libraries, use "uglify:vendor" to concatinate and minify vendor scripts
		]
	);

	// Watch task, listens for changes on all working JS and SCSS
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

	// Watch task, listens for "working" JavaScript changes only
	grunt.registerTask('watch-scripts',
		[
			'watch:js'
		]
	);

	// Compress image in build directory
	grunt.registerTask('image-min',
		[
			'imagemin'
		]
	);
};