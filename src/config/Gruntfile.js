module.exports = function(grunt) {

	// Load all grunt tasks automatically
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	require('time-grunt')(grunt);

	grunt.initConfig({

		// Import package manifest
		pkg: grunt.file.readJSON("package.json"),

		// Import build config
		config: grunt.file.readJSON("config.json"),

		// Banner definition
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

		usebanner: {
			taskName: {
				options: {
					position: 'top' || 'bottom',
					banner: '<%= meta.banner %>',
					linebreak: true || false
				},
				files: {
					src: [ '<%= config.outputPath %>scripts/main.min.js', '<%= config.outputPath %>styles/main.css' ]
				}
			}
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
						cwd: '<%= config.workingPath %>images/',
						src: ['**/*.png'],
						// Could also match cwd line above. i.e. project-directory/img/
						dest: '<%= config.outputPath %>images/',
						ext: '.png'
					}
				]
			},
			jpg: {
				options: {
					progressive: true,
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
					cssDir: '<%= config.outputPath %>styles',
					sassDir: '<%= config.workingPath %>styles',
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
				files: ['<%= config.workingPath %>scripts/*.js', '<%= config.workingPath %>styles/**/*.*'],
				tasks: ['dev', 'notify:watch_src']
			},
			css: {
				files: ['<%= config.workingPath %>styles/{,*/}*.{scss,sass}'],
				tasks: ['compass', 'notify:watch_styles']
			},
			js: {
				files: ['<%= config.workingPath %>scripts/*.js'],
				tasks: ['copy:scripts', 'concat:working', 'notify:watch_scripts']
			}
		},

		notify: {
			watch_src: {
				options: {
					message: 'Finished compiling scripts and styles'
				}
			},
			watch_styles: {
				options: {
					message: 'Finished compiling styles'
				}
			},
			watch_scripts: {
				options: {
					message: 'Finished compiling scripts'
				}
			}
		}
	});

	// Default task for production
	grunt.registerTask('default',
		[
			'jshint',
			'compass',
			'copy:main',
			'copy:scripts',     // copy over working scripts, referenced by sourcemaps
			'cssmin',           // minifies vendor CSS
			'uglify:modernizr', // concatinate and minify Modernizr because it doesn't come minified
			'uglify:main', 		// concatinate and minify working JS
			'concat:vendor', 	// concatinate JS libraries, use "uglify:vendor" to concatinate and minify vendor scripts
			'imagemin',
			'usebanner'         // add meta banner to CSS and JS
		]
	);

	// Development build
	// Does NOT compile vendor libraries or minify JS
	grunt.registerTask('dev',
		[
			'jshint',
			'compass:dist',
			'copy:scripts',
			'concat:working' // concatinate working JS
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