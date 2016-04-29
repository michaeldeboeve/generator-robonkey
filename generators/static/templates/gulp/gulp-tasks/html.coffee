fs = require('fs')
cfg = JSON.parse(fs.readFileSync('./config.json'))
gulp = require('gulp')
notify = require('gulp-notify')
plumber = require('gulp-plumber')
prettify = require('gulp-prettify')
htmlreplace = require('gulp-html-replace')

# Compile jade files
gulp.task 'html', ->
  gulp.src(cfg.html.src)
    .pipe(plumber(errorHandler: notify.onError(cfg.error)))
    .pipe(prettify(indent_size: 2))
    .pipe gulp.dest(cfg.html.build)
  return

gulp.task 'html-build', ->
  gulp.src(cfg.html.src)
    .pipe(plumber(errorHandler: notify.onError(cfg.error)))
    .pipe(htmlreplace(
      js: '<%= jsDirPath %>/script.min.js'
      css: '<%= cssDirPath %>/style.min.css'))
    .pipe(prettify(indent_size: 2))
    .pipe gulp.dest(cfg.html.build)
  return
