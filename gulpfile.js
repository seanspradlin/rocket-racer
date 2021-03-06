'use strict';

var gulp        = require('gulp')
  , sourcemaps  = require('gulp-sourcemaps')
  , concat      = require('gulp-concat')
  , wrap        = require('gulp-wrap')
  , uglify      = require('gulp-uglify')
  , minifyHtml  = require('gulp-minify-html')
  , minifyCss   = require('gulp-minify-css')
  , tslint      = require('gulp-tslint')
  , ts          = require('gulp-typescript')
  , merge       = require('merge2')
  , Config      = require('./gulpfile.config');

// TS Lint
gulp.task('tslint', function () {
  return gulp.src(Config.source + 'scripts/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
});

gulp.task('ts-crunch', function() {
  return gulp.src(Config.source + 'scripts/**/*.ts')
              .pipe(sourcemaps.init())
              .pipe(ts({
                target: 'ES5'
              }))
              .pipe(concat('app.min.js'))
              .pipe(uglify())
              .pipe(sourcemaps.write())
              .pipe(gulp.dest(Config.build + 'scripts'));
});

// Minify HTML
gulp.task('html-crunch', function () {
  return gulp.src(Config.source + 'index.html')
    .pipe(minifyHtml())
    .pipe(gulp.dest(Config.build));
});

// Minify CSS
gulp.task('css-crunch', function() {
  return gulp.src(Config.source + 'style.css')
    .pipe(sourcemaps.init())
    .pipe(concat('style.min.css'))
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(Config.build));
});

gulp.task('css-production', function() {
  return gulp.src(Config.source + 'style.css')
    .pipe(concat('style.min.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest(Config.build));
});

// Migrate phaser files
gulp.task('phaser', function () {
  return gulp.src('./node_modules/phaser/dist/phaser.*')
    .pipe(gulp.dest(Config.build + 'scripts/'));
});

// Assets
gulp.task('assets', function () {
  return gulp.src(Config.source + 'assets/**/*.*')
    .pipe(gulp.dest(Config.build + 'assets/'));
});

// Watch
gulp.task('watch', function() {
  return gulp.watch(Config.source + '**/*.ts', ['ts-crunch']);
});

gulp.task('default', ['watch', 'ts-crunch', 'html-crunch', 'css-crunch', 'phaser', 'assets']);
gulp.task('production', ['js-production', 'html-crunch', 'css-production', 'phaser', 'assets']);
