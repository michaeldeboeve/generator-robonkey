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
  gulp.watch(cfg.scripts.src, [ 'scripts' ]).on 'change', browserSync.reload
  # watch for image changes
  gulp.watch cfg.images.src, [ 'images' ]
  # watch for SASS changes
  # gulp.watch(cfg.styles.src_files, ['styles']);
  # Watch for css changes, then inject css
  gulp.watch cfg.styles.build + '/**/*.css', [ 'css' ]
  # watch for Jade changes, then reload
  gulp.watch(cfg.jade.watch, [ 'html' ]).on 'change', browserSync.reload
  return
