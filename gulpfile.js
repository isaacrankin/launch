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

const srcDir = './src';
const distDir = './dist';

var paths = {
  scripts: srcDir + '/js/**/*.js',
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
  vendorScripts: srcDir + '/js/vendor/*.js',

  // vendor scripts that shouldn't be combined
  copyVendorScripts: [
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/jquery/dist/jquery.min.map',
    './node_modules/systemjs/dist/system-polyfills.js',
    './node_modules/systemjs/dist/system-polyfills.js.map',
    './node_modules/systemjs/dist/system.js',
    './node_modules/systemjs/dist/system.js.map'
  ]
};

var compileSass = function() {
  console.log('Launch: Compiling sass...');
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

var compileScripts = function() {
  console.log('Launch: Compiling scripts...');
  return gulp.src(paths.scripts)
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(sourcemaps.init())
  .pipe(babel())
  .pipe(uglify())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(distDir + '/js'));
};

var copyFiles = function() {
  console.log('Launch: Copying files...');
  return gulp.src(paths.copy, { base: srcDir })
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

// Browsersync server
gulp.task('serve', ['default'], function () {

  // Serve files from the dist directory
  browserSync.init({
    server: {
      baseDir: distDir
    }
    // Add additional options https://www.browsersync.io/docs/options/
  });

  // Call reload after watch task triggered
  gulp.watch([paths.scripts, paths.vendorScripts], ['scripts', browserSync.reload]);
  gulp.watch(paths.sass, ['sass', browserSync.reload]);
  gulp.watch(paths.copy, ['copy', browserSync.reload]);
});

gulp.task('default', ['sass', 'scripts', 'copy', 'compress-svg', 'copy-vendor-scripts', 'vendor-scripts']);
