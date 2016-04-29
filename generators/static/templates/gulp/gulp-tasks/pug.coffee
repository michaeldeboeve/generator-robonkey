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
gulp.task 'html', ['moveBower'], ->
  gulp.src(cfg.pug.src)
    .pipe(plumber(errorHandler: notify.onError(cfg.error)))
    .pipe(pug(pugOptions))
    .pipe(inject(gulp.src(cfg.scripts.build_lib + 'modernizr-custom.js', read: false),
      starttag: '<!-- inject:head:{{ext}} -->'
      relative: true))
    .pipe(inject(gulp.src([
      cfg.scripts.build_lib + '**/*.js'
      '!' + cfg.scripts.build_lib + 'modernizr-custom.js'
    ], read: false), relative: true))
    .pipe(prettify(indent_size: 2))
    .pipe gulp.dest(cfg.pug.build)
  return

gulp.task 'html-build', ['moveBower'], ->
  gulp.src(cfg.pug.src)
    .pipe(plumber(errorHandler: notify.onError(cfg.error)))
    .pipe(pug(pugOptions))
    .pipe(inject(gulp.src(cfg.scripts.build_lib + 'modernizr-custom.js', read: false),
      starttag: '<!-- inject:head:{{ext}} -->'
      relative: true))
    .pipe(inject(gulp.src([
      cfg.scripts.build_lib + '**/*.js'
      '!' + cfg.scripts.build_lib + 'modernizr-custom.js'
    ], read: false), relative: true))
    .pipe(htmlreplace(
      js: '<%= jsDirPath %>/script.min.js'
      css: '<%= cssDirPath %>/style.min.css'))
    .pipe(prettify(indent_size: 2))
    .pipe gulp.dest(cfg.pug.build)
  return
