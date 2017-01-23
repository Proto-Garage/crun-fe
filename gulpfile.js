var gulp = require('gulp');
var copy = require('gulp-contrib-copy');
var rename = require('gulp-rename');

//CSS
gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
.pipe(gulp.dest('dist/css'));

//JS
gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.js')
.pipe(gulp.dest('dist/js'));

//React
gulp.src('node_modules/react/dist/react.min.js')
.pipe(gulp.dest('dist/js'));



gulp.task('default', function() {
  
});