var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');

module.exports = function(){

  return gulp.src('src/css/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('src/css/less'));
};
