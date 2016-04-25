fs = require('fs')
cfg = JSON.parse(fs.readFileSync('./config.json'))
gulp = require('gulp')
changed = require('gulp-changed')
imagemin = require('gulp-imagemin')

# minify new images
gulp.task 'images', ->
  imgSrc = cfg.images.src
  imgDst = cfg.images.build
  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin(
      progressive: true
      svgoPlugins: [
        { removeViewBox: false }
        { cleanupIDs: false }
      ]))
    .pipe gulp.dest(imgDst)
  return
