var gulp = require('gulp');
var babel = require('gulp-babel');

module.exports = function() {
  return gulp.src('src/test/*.js')
    .pipe(babel({
      presets: ['es2015', 'react']
    }))
    .pipe(gulp.dest('dist/js/test'));
};
