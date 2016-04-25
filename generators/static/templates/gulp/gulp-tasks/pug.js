var fs              = require('fs');
var cfg             = JSON.parse(fs.readFileSync('./config.json'));
var gulp            = require('gulp');
var notify          = require("gulp-notify");
var plumber         = require('gulp-plumber');
var pug             = require('gulp-pug');
var prettify        = require('gulp-prettify');
var htmlreplace     = require("gulp-html-replace");

var pugOptions = {
  // pretty: true
};

// Compile jade files
gulp.task('html', function() {
  gulp.src(cfg.pug.src)
    .pipe(plumber({errorHandler: notify.onError(cfg.error)}))
    .pipe(pug(pugOptions))
    .pipe(prettify({indent_size: 2}))
    .pipe(gulp.dest(cfg.pug.build));
});

gulp.task('html-build', function() {
  gulp.src(cfg.pug.src)
    .pipe(plumber({errorHandler: notify.onError(cfg.error)}))
    .pipe(pug(jadeOptions))
    .pipe(htmlreplace({
      js: '<%= jsDirPath %>/script.min.js',
      css: '<%= cssDirPath %>/style.min.css'
    }))
    .pipe(prettify({indent_size: 2}))
    .pipe(gulp.dest(cfg.pug.build));
});
