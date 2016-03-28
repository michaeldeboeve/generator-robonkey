// include config
var fs              = require('fs');
var cfg             = JSON.parse(fs.readFileSync('./config.json'));
var paths           = JSON.parse(fs.readFileSync('./paths.json'));
var gulp            = require('gulp');
var watch           = require('gulp-watch');
var browserSync     = require('browser-sync');
var requireDir      = require('require-dir');
requireDir('./gulp-tasks');


gulp.task('css', function () {
  return gulp.src(paths.styles.build + '/**/*.css')
    .pipe(browserSync.reload({ stream: true }));
})

gulp.task('browser-sync', function() {
    browserSync({
      files: [paths.styles.build + '/**/*.css'],
      open: 'external',
      proxy: cfg.projectURL,
      host: cfg.projectURL
    });
});


// Dev gulp task
gulp.task('serve', ['default'], function() {});
gulp.task('dev', ['default'], function() {});

// Build gulp task
gulp.task('build', [
                    <% if(modernizrOption){ %>'modernizr',<% } %><% if(customIconfontOption){ %>
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
                      'moveBower', <% if(environmentOption === 'static' && !templateOption === 'html'){ %>
                      'html', <% } %>
                      'images',
                      'scripts',
                      'styles',
                      'browser-sync'
  ], function() {

  // watch for JS changes, then reload
  gulp.watch(paths.scripts.src, ['scripts']).on('change', browserSync.reload);

  // watch for SASS changes
  gulp.watch(paths.styles.src_files, ['styles']);

  // Watch for css changes, then inject css
  gulp.watch(paths.styles.build + '/**/*.css',  ['css']);

  // watch for image changes
  gulp.watch(paths.images.src, ['images']);

  <% if(templateOption === 'jade'){ %>// watch for Jade changes, then reload
  gulp.watch(paths.jade.watch, ['jade']).on('change', browserSync.reload);<% } %>
  <% if(templateOption === 'haml'){ %>// watch for Haml changes, then reload
  gulp.watch(paths.haml.watch, ['haml']).on('change', browserSync.reload);<% } %>
  <% if(templateOption === 'nunjucks'){ %>// watch for Nunjucks changes, then reload
  gulp.watch(paths.nunjucks.watch, ['nunjucks']).on('change', browserSync.reload);<% } %>
  <% if(templateOption === 'handlebars'){ %>// watch for Handlebars changes, then reload
  gulp.watch(paths.handlebars.watch, ['handlebars']).on('change', browserSync.reload);
  gulp.watch(paths.handlebars.watchdata, ['handlebars']).on('change', browserSync.reload);<% } %>
});
