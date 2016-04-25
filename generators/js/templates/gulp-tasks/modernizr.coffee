fs = require('fs')
cfg = JSON.parse(fs.readFileSync('./config.json'))
gulp = require('gulp')
uglify = require('gulp-uglify')
modernizr = require('gulp-modernizr')

gulp.task 'modernizr', ->
  gulp.src([
    cfg.styles.src_files
    cfg.scripts.src
  ])
    .pipe(modernizr(cfg.modernizr.output,
      cache: true
      options: cfg.modernizr.options
      excludeTests: cfg.modernizr.excludeTests
      tests: cfg.modernizr.tests))
    .pipe(uglify())
    .pipe gulp.dest(cfg.modernizr.build)
  return
