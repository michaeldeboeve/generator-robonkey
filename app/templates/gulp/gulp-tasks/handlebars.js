var fs              = require('fs');
var cfg             = JSON.parse(fs.readFileSync('./config.json'));
var paths           = JSON.parse(fs.readFileSync('./paths.json'));
var gulp            = require('gulp');
var plumber         = require('gulp-plumber');
var handlebars      = require('handlebars');
var gulpHandlebars  = require('gulp-handlebars-html')(handlebars);
var prettify        = require('gulp-prettify');
var htmlreplace     = require("gulp-html-replace");

// Template Data
var templateData = JSON.parse(fs.readFileSync('../src/handlebars/data/data.json'));
var options = {
  partialsDirectory : ['../src/handlebars/partials'],
  allowedExtensions: ['hb', 'hbs', 'handlebars', 'html']
};

// Compile haml files
gulp.task('handlebars', function () {
  return gulp.src(paths.handlebars.src)
    .pipe(plumber(onHtmlError))
    .pipe(gulpHandlebars(templateData, options))
    .pipe(prettify({indent_size: 2}))
    .pipe(gulp.dest(paths.handlebars.build));
});

gulp.task('handlebars-build', function () {
  return gulp.src(paths.handlebars.src)
    .pipe(plumber(onHtmlError))
    .pipe(gulpHandlebars(templateData, options))
    .pipe(htmlreplace({
      <% if(environmentOption !== 'express'){ %>js: '<%= jsDirPath %>/script.min.js',
      css: '<%= cssDirPath %>/style.min.css',
      modernizr: '<%= jsLibDirPath %>/modernizr.custom.js'<% } %><% if(environmentOption === 'express'){ %>
      js: '/javascripts/script.min.js',
      css: '/stylesheets/style.min.css',
      modernizr: '/javascripts/lib/modernizr.custom.js'<% } %>
    }))
    .pipe(prettify({indent_size: 2}))
    .pipe(gulp.dest(paths.handlebars.build));
});

function onHtmlError(e) {
  console.log('Html Error:', e.message, 'lineNumber:', e.lineNumber);
}
