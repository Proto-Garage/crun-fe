var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');

let tasks = [
  'bootstrap-css',
  'react',
  'react-dom',
  'transpile',
  'redux',
  'index',
  'less',
  'font-awesome',
  'font-awesome-fonts'
];

tasks.forEach(function(name) {
  gulp.task(name, require('./gulp/tasks/' + name));
});

//JS
gulp.task('browserify', [
  'transpile'
], function() {
  return browserify('./dist/js/react/App.js')
      .bundle()
      .pipe(source('app.js'))
      .pipe(gulp.dest('dist/js'));
});

//CSS
gulp.task('minify-css', [
  'less',
], function(){
  return gulp.src('src/css/less/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('default',[
  'browserify',
  'bootstrap-css',
  'react',
  'react-dom',
  'redux',
  'index',
  'minify-css',
  'font-awesome',
  'font-awesome-fonts'
]);
