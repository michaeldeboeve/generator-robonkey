fs = require('fs')
cfg = JSON.parse(fs.readFileSync('./config.json'))
gulp = require('gulp')
clean = require('gulp-clean')
htmlreplace = require('gulp-html-replace')

gulp.task 'removeDevFiles', ->
  gulp.src([ cfg.styles.build + '*.css.map' ], read: false)
    .pipe clean(force: true)
