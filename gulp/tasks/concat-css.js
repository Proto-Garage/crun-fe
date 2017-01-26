var gulp = require('gulp');
var concatCss = require('gulp-concat-css');

module.exports = function(){
  return gulp.src('src/css/less/*.css')
    .pipe(concatCss('src/css/less/*.css'))
    .pipe(gulp.dest('src/css/'));
}
