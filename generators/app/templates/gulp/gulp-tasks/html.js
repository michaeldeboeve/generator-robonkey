var fs              = require('fs');
var cfg             = JSON.parse(fs.readFileSync('./config.json'));
var gulp            = require('gulp');
var notify          = require("gulp-notify");
var plumber         = require('gulp-plumber');
var prettify        = require('gulp-prettify');
var htmlreplace     = require("gulp-html-replace");

gulp.task('html', function () {
return gulp.src(cfg.html.src)
  .pipe(plumber({errorHandler: notify.onError(cfg.error)}))
  .pipe(prettify({indent_size: 2}))
  .pipe(gulp.dest(cfg.html.build));
});

gulp.task('html-build', function () {
return gulp.src(cfg.html.src)
  .pipe(plumber({errorHandler: notify.onError(cfg.error)}))
  .pipe(htmlreplace({
    js: '<%= jsDirPath %>/script.min.js',
    css: '<%= cssDirPath %>/style.min.css'
  }))
  .pipe(prettify({indent_size: 2}))
  .pipe(gulp.dest(cfg.html.build));
});
