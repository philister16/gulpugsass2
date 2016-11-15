/**
 * Boilerplate
 */

'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var del = require('del');

var paths = {
  sass: './src/styles/**/*.scss',
  pug: './src/views/*.pug',
  scripts: [
    './bower_components/jquery/dist/jquery.js',
    './src/scripts/**/*.js'
  ],
  assets: './src/assets/**/*'
}

// Compile Pug
gulp.task('pug', function() {
  return gulp.src(paths.pug)
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('./dist/'));
});

// Compile Sass
gulp.task('sass', function() {
  return gulp.src(paths.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/styles'));
});

// Concatenate scripts
gulp.task('js', function() {
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(concat('index.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/scripts'));
});

// Copying static assets
gulp.task('statics', function() {
  return gulp.src(paths.assets)
    .pipe(gulp.dest('./dist/assets'));
});

// Clean task
gulp.task('clean', function() {
  return del('dist');
});

// Watchers
gulp.task('watch', function() {
  gulp.watch(paths.pug, ['pug']);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.scripts, ['js']);
  gulp.watch(paths.assets, ['statics']);
});

// Default task
gulp.task('default', ['pug', 'sass', 'js', 'statics']);