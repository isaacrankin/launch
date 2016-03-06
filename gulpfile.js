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

var paths = {
    dist: './dist',
    scripts: [
        './js/**/*.js'
    ],
    sass: ['./sass/**/*.scss'],
    // files that simply get copied to dist folder
    copy: [
        './fonts',
        './img',
        './svg',
        './.htaccess',
        './apple-touch-icon.png',
        './browserconfig.xml',
        './crossdomain.xml',
        './favicon.ico',
        './*.html',
        './robots.txt',
        './tile.png',
        './tile-wide.png'
    ],
    // vendor scripts to get combined
    vendorScripts: [
        './js/vendor/*.js'
    ],
    // vendor scripts that shouldn't be combined
    copyVendorScripts: [
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/jquery/dist/jquery.min.map',
        './node_modules/systemjs/dist/system.js',
        './node_modules/systemjs/dist/system.js.map'
    ]
};

gulp.task('sass', function () {
    return gulp.src(paths.sass)
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename('app.min.css'))
        .pipe(gulp.dest(`${paths.dist}/css`));
});

// Compile application scripts with Babel to SystemJS modules
gulp.task('scripts', function () {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist + '/js'));
});

// Copy files to dist dir
gulp.task('copy', function () {
    return gulp.src(paths.copy)
        .pipe(gulp.dest(paths.dist));
});

// Concat and ugilfy vendor scripts
gulp.task('vendor-scripts', function () {
    return gulp.src(paths.vendorScripts)
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(`${paths.dist}/js`));
});

// Copy over vendor scripts that shouldn't be combined
gulp.task('copy-vendor-scripts', function () {
    gulp.src(paths.copyVendorScripts)
        .pipe(gulp.dest(`${paths.dist}/js/vendor`));
});

// Re-run the task when a file changes
gulp.task('watch', function () {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.vendorScripts, ['scripts']);
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.copy, ['copy']);
});

gulp.task('default', ['sass', 'scripts', 'copy', 'copy-vendor-scripts', 'vendor-scripts']);
