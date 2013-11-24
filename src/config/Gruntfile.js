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

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'<%= config.workingFiles.scripts %>'
			]
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
						dest: '<%= config.outputPath %>images/optimized/',
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
						cwd: '<%= config.workingPath %>images/',
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
			},

			// Copy over working scripts, referenced by sourcemaps
			scripts: {
				files: [
					{
						expand: true,
							cwd: '<%= config.workingPath %>scripts/',
						src: ['**'],
						dest: '<%= config.outputPath %>scripts/src/'
					}
				]
			}
		},

		// Optional task for concatinating scripts
		concat: {
			working: {
				src: '<%= config.workingFiles.scripts %>',
				dest: '<%= config.outputPath %>scripts/main.min.js'
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
					sourceMappingURL: "main.map",
					sourceMap: "<%= config.outputPath %>scripts/main.map",
					sourceMapRoot: "src/",
					sourceMapPrefix: 2
				}
			}
		},

		watch: {
			src: {
				files: ['<%= config.workingPath %>scripts/*.js', '<%= config.workingPath %>sass/**/*.*'],
				tasks: ['compass', 'copy:scripts', 'uglify:main', 'notify:watch_all'],
				livereload: true
			},
			css: {
				files: ['<%= config.workingPath %>sass/{,*/}*.{scss,sass}'],
				tasks: ['compass', 'notify:watch_styles']
			},
			js: {
				files: ['<%= config.workingPath %>scripts/*.js'],
				tasks: ['copy:scripts', 'uglify:main', 'notify:watch_scripts']
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

	// Default task(s) for production
	grunt.registerTask('default',
		[
			'jshint',
			'compass',
			'copy:main',
			'copy:scripts',
			'cssmin',
			'uglify:modernizr', // concatinate and minify Modernizr because it doesn't come minified
			'uglify:main', 		// concatinate and minify working JS
			'concat:vendor' 	// concatinate JS libraries, use "uglify:vendor" to concatinate and minify vendor scripts
		]
	);

	// Development build
	// Does NOT compile vendor libraries or minify CSS
	grunt.registerTask('dev',
		[
			'jshint',
			'compass',
			'copy:main',
			'copy:scripts',
			'concat:working' // concatinate and minify working JS
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