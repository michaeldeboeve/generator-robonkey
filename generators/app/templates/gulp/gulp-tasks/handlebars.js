var fs              = require('fs');
var cfg             = JSON.parse(fs.readFileSync('./config.json'));
var gulp            = require('gulp');
var notify          = require("gulp-notify");
var plumber         = require('gulp-plumber');
var handlebars      = require('handlebars');
var gulpHandlebars  = require('gulp-handlebars-html')(handlebars);
var prettify        = require('gulp-prettify');
var htmlreplace     = require("gulp-html-replace");

// Template Data
var templateData = JSON.parse(fs.readFileSync('../src/handlebars/data/data.json'));
var options = {
  partialsDirectory : ['../src/handlebars/partials'],
  allowedExtensions: ['hb', 'hbs', 'handlebars', 'html']
};

// Compile haml files
gulp.task('handlebars', function () {
  return gulp.src(cfg.handlebars.src)
    .pipe(plumber({errorHandler: notify.onError(cfg.error)}))
    .pipe(gulpHandlebars(templateData, options))
    .pipe(prettify({indent_size: 2}))
    .pipe(gulp.dest(cfg.handlebars.build));
});

gulp.task('handlebars-build', function () {
  return gulp.src(cfg.handlebars.src)
    .pipe(plumber({errorHandler: notify.onError(cfg.error)}))
    .pipe(gulpHandlebars(templateData, options))
    .pipe(htmlreplace({
      js: '<%= jsDirPath %>/script.min.js',
      css: '<%= cssDirPath %>/style.min.css'
    }))
    .pipe(prettify({indent_size: 2}))
    .pipe(gulp.dest(cfg.handlebars.build));
});
