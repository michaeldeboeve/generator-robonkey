var fs              = require('fs');
var cfg             = JSON.parse(fs.readFileSync('./config.json'));
var paths           = JSON.parse(fs.readFileSync('./paths.json'));
var gulp            = require('gulp');
var plumber         = require('gulp-plumber');
var jade            = require('gulp-jade');




// Compile jade files
gulp.task('jade', function() {
  var jadeOptions = {
    pretty: true
  };
  gulp.src(paths.jade.src)
    .pipe(plumber(onJadeError))
    .pipe(jade(jadeOptions))
    .pipe(gulp.dest(paths.jade.build));
});



function onJadeError(e) {
  console.log('Jade Error:', e.message, 'lineNumber:', e.lineNumber);
}
