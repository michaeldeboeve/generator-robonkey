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
    <% if(environmentOption !== 'express'){ %>js: '<%= jsDirPath %>/script.min.js',
    css: '<%= cssDirPath %>/style.min.css',
    modernizr: '<%= jsLibDirPath %>/modernizr.custom.js'<% } %><% if(environmentOption === 'express'){ %>
    js: '/javascripts/script.min.js',
    css: '/stylesheets/style.min.css',
    modernizr: '/javascripts/lib/modernizr.custom.js'<% } %>
  }))
  .pipe(prettify({indent_size: 2}))
  .pipe(gulp.dest(paths.nunjucks.build));
});



function onHtmlError(e) {
  console.log('Html Error:', e.message, 'lineNumber:', e.lineNumber);
}
