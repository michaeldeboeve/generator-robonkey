var fs              = require('fs');
var cfg             = JSON.parse(fs.readFileSync('./config.json'));
var paths           = JSON.parse(fs.readFileSync('./paths.json'));
var gulp            = require('gulp');
var plumber         = require('gulp-plumber');
var jade            = require('gulp-jade');
var htmlreplace     = require("gulp-html-replace");

var jadeOptions = {
  pretty: true
};

// Compile jade files
gulp.task('jade', function() {
  gulp.src(paths.jade.src)
    .pipe(plumber(onJadeError))
    .pipe(jade(jadeOptions))
    .pipe(gulp.dest(paths.jade.build));
});

gulp.task('jade-build', function() {
  gulp.src(paths.jade.src)
    .pipe(plumber(onJadeError))
    .pipe(jade(jadeOptions))
    .pipe(htmlreplace({
      js: 'assets/js/script.min.js',
      css: 'assets/css/style.min.css',
      modernizr: 'assets/js/libs/modernizr.custom.js'
    }))
    .pipe(gulp.dest(paths.jade.build));
});

function onJadeError(e) {
  console.log('Jade Error:', e.message, 'lineNumber:', e.lineNumber);
}
