const {src, dest, watch, series} = require ('gulp');
const browserSync = require('browser-sync').create();
const sass = require ('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const minify = require('gulp-minify');
const htmlmin = require('gulp-htmlmin');
const tinypng = require('gulp-tinypng-compress');

// Static server
function bs() {
  serveSass();
  browserSync.init({
      server: {
          baseDir: "./src/"
      }
  });
  watch("./src/*.html").on('change', browserSync.reload);
  watch("./src/sass/**/*.sass", serveSass);
  watch("./src/sass/**/*.scss", serveSass);
  watch("./src/js/*.js").on('change', browserSync.reload);
};

// Compile sass into CSS & auto-inject into browsers
function serveSass() {
  return src("./src/sass/**/*.sass")
      .pipe(sass())
      .pipe(autoprefixer({
        cascade: false
    }))
      .pipe(dest("./src/css"))
      .pipe(browserSync.stream());
};

function buildCSS(done) {
  src("./src/css/**/*.css")
    .pipe(cleanCSS({compatibility: 'ie8' }))
    .pipe(dest("./dist/css"));
  done();
};

function buildJS(done) {
  src(["./src/js/*.js", "./src/js/*.min.js"])
    .pipe(minify({ext:{
        min:".js"
      }
    }))
    .pipe(dest("./dist/js"));
    
  done();
};

function html(done) {
  src("./src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("./dist"));
  done();
};

function php(done) {
  src("./src/*.php")
    .pipe(dest("./dist"));
  src("./src/phpmailer/*.php")
    .pipe(dest("./dist/phpmailer"));  
  done();
};

function fonts(done) {
  src("./src/fonts/**/*.*")
    .pipe(dest("./dist/fonts")); 
  done();
};

function imagemin(done) {
  src("./src/img/**/*.{png,jpg,jpeg}")
    .pipe(tinypng({
      key: "4vCd7DRTKMrgD6X8dRWxxGw1GpXm1fwb"
    }))
    .pipe(dest("./dist/img"));
  src("./src/img/**/*.svg")
    .pipe(dest("./dist/img"));
  done();
};

exports.serve = bs;
exports.build = series(buildCSS, html, php, fonts);