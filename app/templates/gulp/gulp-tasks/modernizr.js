var fs              = require('fs');
var cfg             = JSON.parse(fs.readFileSync('./config.json'));
var paths           = JSON.parse(fs.readFileSync('./paths.json'));
var gulp            = require('gulp');
var uglify          = require('gulp-uglify');
var modernizr       = require('gulp-modernizr');



gulp.task('modernizr', function() {
  gulp.src([paths.styles.src_files, paths.scripts.src])
    .pipe(modernizr(cfg.modernizr.output, {
      cache: true,
      options:  cfg.modernizr.options,
      excludeTests: cfg.modernizr.excludeTests,
      tests: cfg.modernizr.tests
    }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.modernizr.build));
});
