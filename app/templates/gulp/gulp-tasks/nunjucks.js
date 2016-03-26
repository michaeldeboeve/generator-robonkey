var fs              = require('fs');
var cfg             = JSON.parse(fs.readFileSync('./config.json'));
var paths           = JSON.parse(fs.readFileSync('./paths.json'));
var gulp            = require('gulp');
var plumber         = require('gulp-plumber');
var nunjucks        = require('gulp-nunjucks-render');
var prettify        = require('gulp-prettify');
var htmlreplace     = require("gulp-html-replace");


// Compile Nunjucks files
gulp.task('html', function () {
return gulp.src(paths.nunjucks.src)
  .pipe(plumber(onHtmlError))
  .pipe(nunjucks({
    path: [paths.nunjucks.templates] // String or Array
  }))
  .pipe(prettify({indent_size: 2}))
  .pipe(gulp.dest(paths.nunjucks.build));
});

gulp.task('html-build', function () {
return gulp.src(paths.nunjucks.src)
  .pipe(plumber(onHtmlError))
  .pipe(nunjucks({
    path: [paths.nunjucks.templates] // String or Array
  }))
  .pipe(htmlreplace({
    js: 'assets/js/script.min.js',
    css: 'assets/css/style.min.css',
    modernizr: 'assets/js/libs/modernizr.custom.js'
  }))
  .pipe(prettify({indent_size: 2}))
  .pipe(gulp.dest(paths.nunjucks.build));
});



function onHtmlError(e) {
  console.log('Html Error:', e.message, 'lineNumber:', e.lineNumber);
}
