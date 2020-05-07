const {src, dest, watch} = require ('gulp');
const browserSync = require('browser-sync').create();
const sass = require ('gulp-sass');

// Static server
function bs() {
  serveSass();
  browserSync.init({
      server: {
          baseDir: "./src/"
      }
  });
  watch("./src/*.html").on('change', browserSync.reload);
  watch("./src/**/*.sass", serveSass);
  watch("./src/js/*.js").on('change', browserSync.reload);
};

// Compile sass into CSS & auto-inject into browsers
function serveSass() {
  return src("./src/**/*.sass")
      .pipe(sass())
      .pipe(dest("./src/css"))
      .pipe(browserSync.stream());
};

exports.serve = bs;