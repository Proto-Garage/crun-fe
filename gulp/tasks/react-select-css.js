var gulp = require('gulp');
var rename = require('gulp-rename');

module.exports = function() {
  return gulp.src('node_modules/react-select/dist/react-select.min.css')
    .pipe(rename('react-select.css'))
    .pipe(gulp.dest('dist/css/'));
};
