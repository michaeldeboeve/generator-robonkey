var fs              = require('fs');
var cfg             = JSON.parse(fs.readFileSync('./config.json'));
var paths           = JSON.parse(fs.readFileSync('./paths.json'));
var gulp            = require('gulp');
var plumber         = require('gulp-plumber');
var jade            = require('gulp-jade');
var htmlreplace     = require("gulp-html-replace");

var jadeOptions = {
  pretty: true
};

// Compile jade files
gulp.task('html', function() {
  gulp.src(paths.jade.src)
    .pipe(plumber(onHtmlError))
    .pipe(jade(jadeOptions))
    .pipe(gulp.dest(paths.jade.build));
});

gulp.task('html-build', function() {
  gulp.src(paths.jade.src)
    .pipe(plumber(onHtmlError))
    .pipe(jade(jadeOptions))
    .pipe(htmlreplace({
      <% if(environmentOption !== 'express'){ %>js: '<%= jsDirPath %>/script.min.js',
      css: '<%= cssDirPath %>/style.min.css',
      modernizr: '<%= jsLibDirPath %>/modernizr.custom.js'<% } %><% if(environmentOption === 'express'){ %>
      js: '/javascripts/script.min.js',
      css: '/stylesheets/style.min.css',
      modernizr: '/javascripts/lib/modernizr.custom.js'<% } %>
    }))
    .pipe(gulp.dest(paths.jade.build));
});

function onHtmlError(e) {
  console.log('Html Error:', e.message, 'lineNumber:', e.lineNumber);
}
