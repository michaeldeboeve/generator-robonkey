fs = require('fs')
cfg = JSON.parse(fs.readFileSync('./config.json'))
gulp = require('gulp')
watch = require('gulp-watch')
requireDir = require('require-dir')
browserSync = require('browser-sync')
requireDir './gulp-tasks'

# Dev gulp task
gulp.task 'serve', [ 'default' ], ->
gulp.task 'dev', [ 'default' ], ->
gulp.task 'default', cfg.tasks.default.map(String), ->

# Build gulp task
gulp.task 'build', cfg.tasks.build.map(String), ->

# Main gulp task
gulp.task 'main', cfg.tasks.main.map(String)

# Watch gulp task
gulp.task 'watch', ->
  # watch for JS changes, then reload
  gulp.watch(cfg.scripts.src, [ 'scripts' ])<% if(environmentOption === 'static'){ %>.on 'change', browserSync.reload<% } %>
  # watch for image changes
  gulp.watch cfg.images.src, [ 'images' ]
  # watch for SASS changes
  gulp.watch(cfg.styles.src_files, ['styles']);
  <% if(environmentOption === 'static'){ %># Watch for css changes, then inject css
  gulp.watch cfg.styles.build + '/**/*.css', [ 'css' ]
  # Watch for html changes, then reload page
  gulp.watch(cfg.html.build + '/**/*.html').on 'change', browserSync.reload<% } %>
  <% if(templateOption === 'pug' && environmentOption === 'static'){ %># watch for Pug changes, then reload
  gulp.watch(cfg.pug.watch, [ 'html' ]).on 'change', browserSync.reload<% }
  if(templateOption === 'jade' && environmentOption === 'static'){ %># watch for Jade changes, then reload
  gulp.watch(cfg.jade.watch, [ 'html' ]).on 'change', browserSync.reload<% }
  if(templateOption === 'nunjucks' && environmentOption === 'static'){ %>#watch for Nunjucks changes, then reload
  gulp.watch(cfg.nunjucks.watch, [ 'html' ]).on 'change', browserSync.reload<% } %>
  return
