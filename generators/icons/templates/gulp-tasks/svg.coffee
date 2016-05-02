fs = require('fs')
cfg = JSON.parse(fs.readFileSync('./config.json'))
gulp = require('gulp')
notify = require('gulp-notify')
plumber = require('gulp-plumber')
changed = require('gulp-changed')
svgmin = require('gulp-imagemin')
svgstore = require('gulp-svgstore')

gulp.task 'svg', ->
  gulp.src(cfg.svgicons.src)
    .pipe(svgmin((file) ->
      prefix = path.basename(file.relative, path.extname(file.relative))
      { plugins: [ { cleanupIDs:
        prefix: prefix + '-'
        minify: true } ] }
    ))
    .pipe(svgstore())
    .pipe gulp.dest(cfg.svgicons.build)
