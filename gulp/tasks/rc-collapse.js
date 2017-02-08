var gulp = require('gulp');
var rename = require('gulp-rename');

module.exports = function() {
  return gulp.src('node_modules/rc-collapse/assets/index.css')
    .pipe(rename('rc-collapse.css'))
    .pipe(gulp.dest('dist/css/'));
};
