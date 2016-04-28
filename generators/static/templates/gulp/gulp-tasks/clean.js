var fs              = require('fs');
var cfg             = JSON.parse(fs.readFileSync('./config.json'));
var gulp            = require('gulp');
var clean           = require('gulp-clean');
var htmlreplace     = require("gulp-html-replace");

gulp.task('removeDevFiles', function(){
  return gulp.src([
    // cfg.scripts.build + 'script.js',
    // cfg.styles.build + 'style.css',
    // cfg.modernizr.build + 'modernizr.dev.js',
    cfg.styles.build + '*.css.map'
  ], {read: false})
    .pipe(clean({force: true}));
});
