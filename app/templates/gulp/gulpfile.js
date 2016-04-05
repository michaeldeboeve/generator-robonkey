// include config
var fs              = require('fs');
var cfg             = JSON.parse(fs.readFileSync('./config.json'));

var gulp            = require('gulp');
var watch           = require('gulp-watch');
var requireDir      = require('require-dir');<% if(browsersyncOption){ %>
var browserSync     = require('browser-sync');<% } if(environmentOption === 'express'){ %>
var nodemon         = require('gulp-nodemon');<% } %>

requireDir('./gulp-tasks');



// Dev gulp task
gulp.task('serve', ['default'], function() {});
gulp.task('dev', ['default'], function() {});

// Build gulp task
gulp.task('build', [
                    <% if(modernizrOption){ %>'modernizr',<% } if(customIconfontOption){ %>
                    'iconfont', <% } %>
                    'moveBower',<% if(environmentOption === 'static'){ %>
                    'html-build', <% } %>
                    'images',
                    'scripts-build',
                    'styles-build',
                    'removeDevFiles'
  ], function() {});

// Default gulp task
gulp.task('default', [
                      'moveBower', <% if(environmentOption === 'static'){ %>
                      'html', <% } %>
                      'images',
                      'scripts',
                      'styles'<% if(browsersyncOption){ %>,
                      'browser-sync'<% } %>
  ], function() {

  // watch for JS changes, then reload
  gulp.watch(cfg.scripts.src, ['scripts'])<% if(browsersyncOption){ %>.on('change', browserSync.reload)<% } %>;

  // watch for SASS changes
  gulp.watch(cfg.styles.src_files, ['styles']);

  <% if(browsersyncOption){ %>// Watch for css changes, then inject css
  gulp.watch(cfg.styles.build + '/**/*.css',  ['css']);<% } %>

  // watch for image changes
  gulp.watch(cfg.images.src, ['images']);

  <% if(templateOption === 'jade'){ %>// watch for Jade changes, then reload
  gulp.watch(cfg.jade.watch, ['html'])<% if(browsersyncOption){ %>.on('change', browserSync.reload)<% } %>;<% } %>
  <% if(templateOption === 'haml'){ %>// watch for Haml changes, then reload
  gulp.watch(cfg.haml.watch, ['html'])<% if(browsersyncOption){ %>.on('change', browserSync.reload)<% } %>;<% } %>
  <% if(templateOption === 'nunjucks'){ %>// watch for Nunjucks changes, then reload
  gulp.watch(cfg.nunjucks.watch, ['html'])<% if(browsersyncOption){ %>.on('change', browserSync.reload)<% } %>;<% } %>
  <% if(templateOption === 'handlebars'){ %>// watch for Handlebars changes, then reload
  gulp.watch(cfg.handlebars.watch, ['html'])<% if(browsersyncOption){ %>.on('change', browserSync.reload)<% } %>;
  gulp.watch(cfg.handlebars.watchdata, ['html'])<% if(browsersyncOption){ %>.on('change', browserSync.reload)<% } %>;<% } %>
});
