var fs              = require('fs');
var cfg             = JSON.parse(fs.readFileSync('./config.json'));
var paths           = JSON.parse(fs.readFileSync('./paths.json'));
var gulp            = require('gulp');
var plumber         = require('gulp-plumber');
var haml            = require('gulp-haml');
var prettify        = require('gulp-prettify');
var htmlreplace     = require("gulp-html-replace");

var hamlOptions = {
};

// Compile haml files
gulp.task('html', function() {
  gulp.src(paths.haml.src)
    .pipe(plumber(onHtmlError))
    .pipe(haml(hamlOptions))
    .pipe(prettify({indent_size: 2}))
    .pipe(gulp.dest(paths.haml.build));
});

gulp.task('html-build', function() {
  gulp.src(paths.haml.src)
    .pipe(plumber(onHtmlError))
    .pipe(haml(hamlOptions))
    .pipe(htmlreplace({
      <% if(environmentOption !== 'express'){ %>js: '<%= jsDirPath %>/script.min.js',
      css: '<%= cssDirPath %>/style.min.css',
      modernizr: '<%= jsLibDirPath %>/modernizr.custom.js'<% } %><% if(environmentOption === 'express'){ %>
      js: '/javascripts/script.min.js',
      css: '/stylesheets/style.min.css',
      modernizr: '/javascripts/lib/modernizr.custom.js'<% } %>
    }))
    .pipe(prettify({indent_size: 2}))
    .pipe(gulp.dest(paths.haml.build));
});

function onHtmlError(e) {
  console.log('Html Error:', e.message, 'lineNumber:', e.lineNumber);
}
