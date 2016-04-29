var fs              = require('fs');
var cfg             = JSON.parse(fs.readFileSync('./config.json'));
var gulp            = require('gulp');
var browserSync     = require('browser-sync');<% if(environmentOption === 'express'){ %>
var nodemon         = require('gulp-nodemon');<% } %>


<% if(environmentOption === 'express'){ %>// Browser Sync and Nodemon
// we'd need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon
var BROWSER_SYNC_RELOAD_DELAY = 500;

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({

    // nodemon our expressjs server
    script: cfg.browsersync.nodemon.script,

    // watch core server file(s) that require server restart on change
    watch: cfg.browsersync.nodemon.watch
  })
    .on('start', function onStart() {
      // ensure start only got called once
      if (!called) { cb(); }
      called = true;
    })
    .on('restart', function onRestart() {
      // reload connected browsers after a slight delay
      setTimeout(function reload() {
        browserSync.reload({
          stream: false
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});<% } %>


gulp.task('browser-sync', <% if(environmentOption === 'express'){ %>['nodemon'], <% } %>function(){
    browserSync({<% if(environmentOption === 'static'){ %>
      server: {
        baseDir: cfg.browsersync.server
      }<% } if(environmentOption === 'express'){ %>
      proxy: cfg.browsersync.proxy,
      port: cfg.browsersync.port<% } %>
    });
});

gulp.task('css', function () {
  return gulp.src(cfg.styles.build + '/**/*.css')
    .pipe(browserSync.reload({ stream: true }));
})

gulp.task('bs-reload', function () {
  browserSync.reload();
});
