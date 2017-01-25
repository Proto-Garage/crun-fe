var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

let tasks = [
  'bootstrap-css',
  'react',
  'react-dom',
  'transpile',
  'redux',
  'index'
];

tasks.forEach(function(name) {
  gulp.task(name, require('./gulp/tasks/' + name));
});

gulp.task('browserify', [
  'transpile'
], function() {
  return browserify('./dist/js/react/App.js')
      .bundle()
      .pipe(source('app.js'))
      .pipe(gulp.dest('dist/js'));
});

gulp.task('default',[
  'browserify',
  'bootstrap-css',
  'react',
  'react-dom',
  'redux',
  'index'
]);
