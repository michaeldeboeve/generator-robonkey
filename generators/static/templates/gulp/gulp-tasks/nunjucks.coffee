fs = require('fs')
cfg = JSON.parse(fs.readFileSync('./config.json'))
gulp = require('gulp')
notify = require('gulp-notify')
plumber = require('gulp-plumber')
nunjucks = require('gulp-nunjucks-render')
prettify = require('gulp-prettify')
htmlreplace = require('gulp-html-replace')

# Compile Nunjucks files
gulp.task 'html', ['moveBower'], ->
  gulp.src(cfg.nunjucks.src)
    .pipe(plumber(errorHandler: notify.onError(cfg.error)))
    .pipe(nunjucks(path: [ cfg.nunjucks.templates ]))
    .pipe(inject(gulp.src(cfg.scripts.build_lib + 'modernizr-custom.js', read: false),
      starttag: '<!-- inject:head:{{ext}} -->'
      relative: true))
    .pipe(inject(gulp.src([
      cfg.scripts.build_lib + '**/*.js'
      '!' + cfg.scripts.build_lib + 'modernizr-custom.js'
    ], read: false), relative: true))
    .pipe(prettify(indent_size: 2))
    .pipe gulp.dest(cfg.nunjucks.build)

gulp.task 'html-build', ['moveBower'], ->
  gulp.src(cfg.nunjucks.src)
    .pipe(plumber(errorHandler: notify.onError(cfg.error)))
    .pipe(nunjucks(path: [ cfg.nunjucks.templates ]))
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
    .pipe gulp.dest(cfg.nunjucks.build)
