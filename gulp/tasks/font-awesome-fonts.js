var gulp = require('gulp');
var rename = require('gulp-rename');

module.exports = function() {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('dist/fonts'));
};
