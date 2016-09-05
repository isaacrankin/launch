'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const sourcemaps = require("gulp-sourcemaps");
const rename = require('gulp-rename');
const jshint = require('gulp-jshint');
const sassLint = require('gulp-sass-lint');
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const imagemin = require('gulp-imagemin');
const exec = require('child_process').exec;

const srcDir = './src';
const distDir = './dist';
const testDir = './test';
const packagesDir = './node_modules';

var paths = {
  scripts: [srcDir + '/js/**/*.js', '!' + srcDir + '/js/vendor/**/*.js'],
  sass: srcDir + '/sass/**/*.scss',
  svg: srcDir + '/svg/**/*.*',

  // files that get copied to dist folder
  copy: [
    srcDir + '/fonts/**/*.*',
    srcDir + '/img/**/*.*',
    srcDir + '/.htaccess',
    srcDir + '/apple-touch-icon.png',
    srcDir + '/browserconfig.xml',
    srcDir + '/crossdomain.xml',
    srcDir + '/favicon.ico',
    srcDir + '/*.html',
    srcDir + '/*.php',
    srcDir + '/robots.txt',
    srcDir + '/tile.png',
    srcDir + '/tile-wide.png'
  ],

  // vendor scripts to get combined
  // this is useful for small plugins or utilities
  vendorScripts: srcDir + '/js/vendor/*.js',

  // vendor scripts that shouldn't be combined
  copyVendorScripts: [
    packagesDir + '/jquery/dist/jquery.min.js',
    packagesDir + '/jquery/dist/jquery.min.map',
    packagesDir + '/systemjs/dist/system-polyfills.js',
    packagesDir + '/systemjs/dist/system-polyfills.js.map',
    packagesDir + '/systemjs/dist/system.js',
    packagesDir + '/systemjs/dist/system.js.map'
  ]
};

var swallowError = function (error) {
  // If you want details of the error in the console
  console.log(error.toString());
  this.emit('end')
};

var compileSass = function () {
  return gulp.src(paths.sass)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
    .pipe(sass({
      outputStyle: 'compressed',
      // allow importing SASS from node_modules
      includePaths: './node_modules/'
    }).on('error', sass.logError))
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest(`${distDir}/css`));
};

var compileScripts = function () {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015'],
      plugins: ['transform-es2015-modules-systemjs']
    }))
    .on('error', swallowError)
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(distDir + '/js'));
};

// Compile to ES5 just for tests
var compileTestScripts = function () {
  return gulp.src(paths.scripts)
    .pipe(babel({
      presets: ['es2015'],
      // We need CommonJS modules for use in a node context
      plugins: ['transform-es2015-modules-commonjs']
    }))
    .on('error', swallowError)
    .pipe(gulp.dest(testDir + '/tmp'));
};

var copyFiles = function () {
  return gulp.src(paths.copy, {base: srcDir})
    .pipe(gulp.dest(distDir));
};

var compressSvg = function () {
  gulp.src(paths.svg)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [
        {removeViewBox: false},
        {cleanupIDs: false}
      ]
    }))
    .pipe(gulp.dest(`${distDir}/svg`));
};

gulp.task('watch', function () {
  watch(paths.sass, compileSass);
  watch(paths.scripts, compileScripts);
  watch(paths.copy, copyFiles);
  watch(paths.svg, compressSvg);
});

gulp.task('sass', compileSass);
gulp.task('scripts', compileScripts);
gulp.task('test-scripts', compileTestScripts);
gulp.task('copy', copyFiles);
gulp.task('compress-svg', compressSvg);

// Concat and ugilfy vendor scripts
gulp.task('vendor-scripts', function () {
  return gulp.src(paths.vendorScripts)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(`${distDir}/js`));
});

// Copy over vendor scripts that shouldn't be combined
gulp.task('copy-vendor-scripts', function () {
  gulp.src(paths.copyVendorScripts)
    .pipe(gulp.dest(`${distDir}/js/vendor`));
});

gulp.task('compress-images', function () {
  gulp.src(srcDir + '/img/**/*.*')
    .pipe(imagemin({
      verbose: true,
      progressive: true
    }))
    .pipe(gulp.dest(`${distDir}/img`));
});

// Run mocha tests - this expects mocha to be installed locally not globally
gulp.task('test', ['test-scripts'], function (cb) {
  exec('node node_modules/.bin/mocha', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

// Browsersync server
gulp.task('serve', ['default'], function () {

  // Serve files from the dist directory
  browserSync.init({
    open: false,
    ghostMode: {
      clicks: true,
      forms: true,
      scroll: false
    },
    server: {
      baseDir: distDir
    }
    // Add additional options https://www.browsersync.io/docs/options/
  });

  // Call reload after watch task triggered
  gulp.watch([paths.scripts, paths.vendorScripts], ['scripts', browserSync.reload]);
  gulp.watch(paths.sass, ['sass', browserSync.reload]);
  gulp.watch(paths.copy, ['copy', browserSync.reload]);
  gulp.watch(paths.svg, ['compress-svg', browserSync.reload]);
});

gulp.task('default', ['test', 'sass', 'scripts', 'copy', 'compress-svg', 'copy-vendor-scripts', 'vendor-scripts']);
