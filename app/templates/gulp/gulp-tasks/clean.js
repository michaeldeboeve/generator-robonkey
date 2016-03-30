var fs              = require('fs');
var cfg             = JSON.parse(fs.readFileSync('./config.json'));
var paths           = JSON.parse(fs.readFileSync('./paths.json'));
var gulp            = require('gulp');
var clean           = require('gulp-clean');
var htmlreplace     = require("gulp-html-replace");

// console.log(moveRepo);
gulp.task('removeDevFiles', function() {
  return gulp.src([
    // paths.scripts.build + 'script.js',
    // paths.styles.build + 'style.css',
    // paths.modernizr.build + 'modernizr.dev.js',
    paths.styles.build + '*.css.map'
  ], {read: false})
    .pipe(clean({force: true}));
});
