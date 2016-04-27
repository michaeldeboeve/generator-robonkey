// include config
var fs              = require('fs');
var cfg             = JSON.parse(fs.readFileSync('./config.json'));

var gulp            = require('gulp');
var watch           = require('gulp-watch');
var requireDir      = require('require-dir');<%
if(environmentOption === 'static'){ %>
var browserSync     = require('browser-sync');<% }
if(environmentOption === 'express'){ %>
var nodemon         = require('gulp-nodemon');<% } %>

requireDir('./gulp-tasks');



// Dev gulp task
gulp.task('serve', ['default'], function() {});
gulp.task('dev', ['default'], function() {});

gulp.task('default', cfg.tasks.default.map(String), function() {});

// Build gulp task
gulp.task('build', cfg.tasks.build.map(String), function() {});

// Main gulp task
gulp.task('main', cfg.tasks.main.map(String));


// Watch gulp task
gulp.task('watch', function() {
  // watch for JS changes, then reload
  gulp.watch(cfg.scripts.src, ['scripts'])<% if(environmentOption === 'static'){ %>.on('change', browserSync.reload)<% } %>;

  // watch for image changes
  gulp.watch(cfg.images.src, ['images']);

  // watch for SASS changes
  gulp.watch(cfg.styles.src_files, ['styles']);
  <% if(environmentOption === 'static'){ %>// Watch for css changes, then inject css
  gulp.watch(cfg.styles.build + '/**/*.css',  ['css']);<% } %>
  <% if(templateOption === 'jade' && environmentOption === 'static'){ %>// watch for Jade changes, then reload
  gulp.watch(cfg.jade.watch, ['html']).on('change', browserSync.reload);<% }
  if(templateOption === 'haml' && environmentOption === 'static'){ %>// watch for Haml changes, then reload
  gulp.watch(cfg.haml.watch, ['html']).on('change', browserSync.reload);<% }
  if(templateOption === 'nunjucks' && environmentOption === 'static'){ %>// watch for Nunjucks changes, then reload
  gulp.watch(cfg.nunjucks.watch, ['html']).on('change', browserSync.reload);<% }
  if(templateOption === 'handlebars' && environmentOption === 'static'){ %>// watch for Handlebars changes, then reload
  gulp.watch(cfg.handlebars.watch, ['html']).on('change', browserSync.reload);
  gulp.watch(cfg.handlebars.watchdata, ['html']).on('change', browserSync.reload);<% } %>
});
