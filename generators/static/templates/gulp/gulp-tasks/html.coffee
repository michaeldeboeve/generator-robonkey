fs = require('fs')
cfg = JSON.parse(fs.readFileSync('./config.json'))
gulp = require('gulp')
notify = require('gulp-notify')
plumber = require('gulp-plumber')
jade = require('gulp-jade')
prettify = require('gulp-prettify')
htmlreplace = require('gulp-html-replace')
jadeOptions = {}

# Compile jade files
gulp.task 'html', ->
  gulp.src(cfg.jade.src)
    .pipe(plumber(errorHandler: notify.onError(cfg.error)))
    .pipe(jade(jadeOptions))
    .pipe(prettify(indent_size: 2))
    .pipe gulp.dest(cfg.jade.build)
  return

gulp.task 'html-build', ->
  gulp.src(cfg.jade.src)
    .pipe(plumber(errorHandler: notify.onError(cfg.error)))
    .pipe(jade(jadeOptions))
    .pipe(htmlreplace(
      js: '<%= jsDirPath %>/script.min.js'
      css: '<%= cssDirPath %>/style.min.css'))
    .pipe(prettify(indent_size: 2))
    .pipe gulp.dest(cfg.jade.build)
  return
