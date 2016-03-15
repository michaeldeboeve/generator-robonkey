var fs              = require('fs');
var cfg             = JSON.parse(fs.readFileSync('./config.json'));
var paths           = JSON.parse(fs.readFileSync('./paths.json'));
var gulp            = require('gulp');
var plumber         = require('gulp-plumber');
var concat          = require('gulp-concat');
var jshint          = require('gulp-jshint');
var uglify          = require('gulp-uglify');
var sourcemaps      = require('gulp-sourcemaps');




// JS hint task -NOTE-: deze is voor de liefhebbers, runnen we niet per default
gulp.task('jshint', function() {
  gulp.src(paths.scripts.src)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('default'));
});



// JS concat
gulp.task('scripts', function() {
  gulp.src(paths.scripts.src)
    .pipe(plumber(onScriptError))
    .pipe(concat('script.js'))
    .pipe(gulp.dest(paths.scripts.build));
});




// JS concat and minify
gulp.task('scripts-min', function() {
  gulp.src(paths.scripts.src)
    .pipe(plumber(onScriptError))
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.build));
});




function onScriptError(e) {
  console.log('JavaScript Error:', e.message, 'lineNumber:', e.lineNumber);
}
