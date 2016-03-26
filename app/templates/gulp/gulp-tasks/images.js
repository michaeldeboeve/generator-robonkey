var fs              = require('fs');
var cfg             = JSON.parse(fs.readFileSync('./config.json'));
var paths           = JSON.parse(fs.readFileSync('./paths.json'));
var gulp            = require('gulp');
var changed         = require('gulp-changed');
var imagemin        = require('gulp-imagemin');



// minify new images
gulp.task('images', function() {
  var imgSrc = paths.images.src,
    imgDst = paths.images.build;

  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin({
          progressive: true,
          svgoPlugins: [
            {removeViewBox: false},
            {cleanupIDs: false}
          ]
        }))
    .pipe(gulp.dest(imgDst));
});
