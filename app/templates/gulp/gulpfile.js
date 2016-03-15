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


// default gulp task
gulp.task('default', [<% if(includeJade){ %>'jade', <% } %>'images', 'scripts-min', 'styles', 'browser-sync'], function() {

  // watch for JS changes, then reload
  // gulp.watch(paths.scripts.src, ['scripts', 'scripts-min']).on('change', browserSync.reload);
  gulp.watch(paths.scripts.src, ['scripts-min']).on('change', browserSync.reload);

  // watch for SASS changes
  gulp.watch(paths.styles.src_files, ['styles']);

  // Watch for css changes, then inject css
  gulp.watch(paths.styles.build + '/**/*.css',  ['css']);

  // watch for image changes
  gulp.watch(paths.images.src, ['images']);

  <% if(includeJade){ %>// watch for Jade changes, then reload
  gulp.watch(paths.jade.watch, ['jade']).on('change', browserSync.reload);<% } %>

});
