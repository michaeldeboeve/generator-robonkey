var fs              = require('fs');
var cfg             = JSON.parse(fs.readFileSync('./config.json'));
var paths           = JSON.parse(fs.readFileSync('./paths.json'));
var gulp            = require('gulp');
var plumber         = require('gulp-plumber');
var handlebars      = require('handlebars');
var gulpHandlebars  = require('gulp-handlebars-html')(handlebars);
var htmlreplace     = require("gulp-html-replace");

// Template Data
var templateData = JSON.parse(fs.readFileSync('../src/handlebars/data/data.json'));
var options = {
  partialsDirectory : ['../src/handlebars/partials'],
  allowedExtensions: ['hb', 'hbs', 'handlebars', 'html']
};

// Compile haml files
gulp.task('handlebars', function () {
  return gulp.src(paths.handlebars.src)
    .pipe(plumber(onHtmlError))
    .pipe(gulpHandlebars(templateData, options))
    .pipe(gulp.dest(paths.handlebars.build));
});

gulp.task('handlebars-build', function () {
  return gulp.src(paths.handlebars.src)
    .pipe(plumber(onHtmlError))
    .pipe(gulpHandlebars(templateData, options))
    .pipe(htmlreplace({
      js: 'assets/js/script.min.js',
      css: 'assets/css/style.min.css',
      modernizr: 'assets/js/libs/modernizr.custom.js'
    }))
    .pipe(gulp.dest(paths.handlebars.build));
});

function onHtmlError(e) {
  console.log('Html Error:', e.message, 'lineNumber:', e.lineNumber);
}
