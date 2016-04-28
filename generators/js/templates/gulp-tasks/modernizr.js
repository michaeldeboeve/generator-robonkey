var fs              = require('fs');
var cfg             = JSON.parse(fs.readFileSync('./config.json'));
var gulp            = require('gulp');
var uglify          = require('gulp-uglify');
var modernizr       = require('gulp-modernizr');



gulp.task('modernizr', function(){
  gulp.src([cfg.styles.src_files, cfg.scripts.src])
    .pipe(modernizr(cfg.modernizr.output, {
      cache: true,
      options:  cfg.modernizr.options,
      excludeTests: cfg.modernizr.excludeTests,
      tests: cfg.modernizr.tests
    }))
    .pipe(uglify())
    .pipe(gulp.dest(cfg.modernizr.build));
});
