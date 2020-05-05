const gulp = require ('gulp');
var browserSync = require('browser-sync').create();
const minCSS = require ('gulp-clean-css');
var rename = require("gulp-rename");


gulp.task('hello', function(done) {
  console.log('Привет, мир!');
  done( );
});

// Static server
gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "./src"
      }
  });
  gulp.watch("./src/*.html").on('change', browserSync.reload);
});

gulp.task('min-CSS', function(done){
  gulp.src('./src/css/*.css')
    .pipe(minCSS())
    .pipe(rename({
        suffix: '.min'
      }))
    .pipe(gulp.dest('./dist/css'));
    done( );
});

