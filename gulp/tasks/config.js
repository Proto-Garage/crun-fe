var gulp = require('gulp');

module.exports = function() {
  return gulp.src('src/config.json')
    .pipe(gulp.dest('dist'));
};
