const gulp = require ('gulp');
const browserSync = require('browser-sync').create();
const minCSS = require ('gulp-clean-css');
var rename = require("gulp-rename");


gulp.task('hello', function(done) {
  console.log('Привет, мир!');
  done( );
});

// Static server
gulp.task('browser-sync', function() {
  browserSync.init({
      proxy: "yourlocal.dev"
  });
  gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('min-CSS', function(done){
  gulp.src('./css/*.css')
    .pipe(minCSS())
    .pipe(rename({
        suffix: '.min'
      }))
    .pipe(gulp.dest('./minicss'));
    done( );
});

