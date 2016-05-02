var fs              = require('fs');
var cfg             = JSON.parse(fs.readFileSync('./config.json'));
var gulp            = require('gulp');
var notify          = require('gulp-notify');
var plumber         = require('gulp-plumber');
var changed         = require('gulp-changed');
var svgmin          = require('gulp-imagemin');
var svgstore        = require('gulp-svgstore');



gulp.task('svg', function () {
  return gulp.src(cfg.svgicons.src)
    .pipe(svgmin(function (file) {
      var prefix = path.basename(file.relative, path.extname(file.relative));
      return {
        plugins: [{
          cleanupIDs: {
            prefix: prefix + '-',
            minify: true
          }
        }]
      }
    }))
    .pipe(svgstore())
    .pipe(gulp.dest(cfg.svgicons.build));
});
