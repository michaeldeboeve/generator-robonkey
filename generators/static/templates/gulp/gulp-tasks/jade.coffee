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
gulp.task 'html', ['moveBower'], ->
  gulp.src(cfg.jade.src)
    .pipe(plumber(errorHandler: notify.onError(cfg.error)))
    .pipe(jade(jadeOptions))
    .pipe(inject(gulp.src(cfg.scripts.build_lib + 'modernizr-custom.js', read: false),
      starttag: '<!-- inject:head:{{ext}} -->'
      relative: true))
    .pipe(inject(gulp.src([
      cfg.scripts.build_lib + '**/*.js'
      '!' + cfg.scripts.build_lib + 'modernizr-custom.js'
    ], read: false), relative: true))
    .pipe(prettify(indent_size: 2))
    .pipe gulp.dest(cfg.jade.build)
  return

gulp.task 'html-build', ['moveBower'], ->
  gulp.src(cfg.jade.src)
    .pipe(plumber(errorHandler: notify.onError(cfg.error)))
    .pipe(jade(jadeOptions))
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
    .pipe gulp.dest(cfg.jade.build)
  return
