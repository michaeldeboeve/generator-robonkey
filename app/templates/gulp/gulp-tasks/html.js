var fs              = require('fs');
var cfg             = JSON.parse(fs.readFileSync('./config.json'));
var paths           = JSON.parse(fs.readFileSync('./paths.json'));
var gulp            = require('gulp');
var plumber         = require('gulp-plumber');
var htmlreplace     = require("gulp-html-replace");


gulp.task('html-build', function () {
return gulp.src(paths.html.src)
  .pipe(plumber(onHtmlError))
  .pipe(htmlreplace({
    js: 'assets/js/script.min.js',
    css: 'assets/css/style.min.css',
    modernizr: 'assets/js/libs/modernizr.custom.js'
  }))
  .pipe(gulp.dest(paths.html.build));
});

function onHtmlError(e) {
  console.log('Html Error:', e.message, 'lineNumber:', e.lineNumber);
}
