fs = require('fs')
cfg = JSON.parse(fs.readFileSync('./config.json'))
gulp = require('gulp')
notify = require('gulp-notify')
plumber = require('gulp-plumber')
pug = require('gulp-pug')
prettify = require('gulp-prettify')
htmlreplace = require('gulp-html-replace')

pugOptions = {}

# Compile pug files
gulp.task 'html', ->
  gulp.src(cfg.pug.src)
    .pipe(plumber(errorHandler: notify.onError(cfg.error)))
    .pipe(pug(pugOptions))
    .pipe(prettify(indent_size: 2))
    .pipe gulp.dest(cfg.pug.build)
  return

gulp.task 'html-build', ->
  gulp.src(cfg.pug.src)
    .pipe(plumber(errorHandler: notify.onError(cfg.error)))
    .pipe(pug(pugOptions))
    .pipe(htmlreplace(
      js: '<%= jsDirPath %>/script.min.js'
      css: '<%= cssDirPath %>/style.min.css'))
    .pipe(prettify(indent_size: 2))
    .pipe gulp.dest(cfg.pug.build)
  return
