var gulp = require('gulp');
var order = require('gulp-order');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var gif = require('gulp-if');
var print = require('gulp-print').default;

function stringEndsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function isCoffeeFile(file) {
  return stringEndsWith(file.relative, 'coffee');
}
//各级目录是分开的，同级，不包含嵌套目录
gulp.task('default', function () {
  gulp.src([
    './vendor/*.js',
    './bower_components/jquery.js',  //只加载未压缩版本
    './content/*.js',
    './content/*.coffee'
  ])
    .pipe(print())
    .pipe(gif(isCoffeeFile, coffee()))
    .pipe(order([
      'always-first.js',
      'jquery*.js',         // depending on env, this could be streaming min or non-min file so use wildcard
      'lodash.js',
      'file1.js',           // compiled from file1.coffee
      'file2.js',           // compiled from file2.coffee
      '!always-last.js',    // everything else except always-last.js
      'always-last.js'
    ]))
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist'));
});
