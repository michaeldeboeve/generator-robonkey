var fs              = require('fs');
var cfg             = JSON.parse(fs.readFileSync('./config.json'));
var gulp            = require('gulp');
var plumber         = require('gulp-plumber');
var nunjucks        = require('gulp-nunjucks-render');
var prettify        = require('gulp-prettify');
var htmlreplace     = require("gulp-html-replace");


// Compile Nunjucks files
gulp.task('html', function () {
return gulp.src(cfg.nunjucks.src)
  .pipe(plumber(onHtmlError))
  .pipe(nunjucks({
    path: [cfg.nunjucks.templates] // String or Array
  }))
  .pipe(prettify({indent_size: 2}))
  .pipe(gulp.dest(cfg.nunjucks.build));
});

gulp.task('html-build', function () {
return gulp.src(cfg.nunjucks.src)
  .pipe(plumber(onHtmlError))
  .pipe(nunjucks({
    path: [cfg.nunjucks.templates] // String or Array
  }))
  .pipe(htmlreplace({
    js: '<%= jsDirPath %>/script.min.js',
    css: '<%= cssDirPath %>/style.min.css'
  }))
  .pipe(prettify({indent_size: 2}))
  .pipe(gulp.dest(cfg.nunjucks.build));
});



function onHtmlError(e) {
  console.log('Html Error:', e.message, 'lineNumber:', e.lineNumber);
}
