fs = require('fs')
cfg = JSON.parse(fs.readFileSync('./config.json'))
gulp = require('gulp')
browserSync = require('browser-sync')<% if(environmentOption === 'express'){ %>
nodemon = require('gulp-nodemon')<% } %>


<% if(environmentOption === 'express'){ %># Browser Sync and Nodemon
# we'd need a slight delay to reload browsers
# connected to browser-sync after restarting nodemon
BROWSER_SYNC_RELOAD_DELAY = 500
gulp.task 'nodemon', (cb) ->
  called = false
  nodemon(
    script: cfg.browsersync.nodemon.script
    watch: cfg.browsersync.nodemon.watch).on('start', ->
    # ensure start only got called once
    if !called
      cb()
    called = true
    return
  ).on 'restart', ->
    # reload connected browsers after a slight delay
    setTimeout (->
      browserSync.reload stream: false
      return
    ), BROWSER_SYNC_RELOAD_DELAY
    return<% } %>


gulp.task 'browser-sync', <% if(environmentOption === 'express'){ %>[ 'nodemon' ], <% } %>->
  browserSync<% if(environmentOption === 'static'){ %>
    server: baseDir: cfg.browsersync.server<% } if(environmentOption === 'express'){ %>
    proxy: cfg.browsersync.proxy
    port: cfg.browsersync.port<% } %>
  return

gulp.task 'css', ->
  gulp.src(cfg.styles.build + '/**/*.css')
    .pipe browserSync.reload(stream: true)

gulp.task 'bs-reload', ->
  browserSync.reload()
  return
