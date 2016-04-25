fs = require('fs')
cfg = JSON.parse(fs.readFileSync('./config.json'))
gulp = require('gulp')
notify = require('gulp-notify')
plumber = require('gulp-plumber')
concat = require('gulp-concat')
uglify = require('gulp-uglify')
sourcemaps = require('gulp-sourcemaps')<% if(javascriptOption === 'coffee') { %>
coffee = require('gulp-coffee');<% } %>

# JS Dev Task
gulp.task 'scripts', ->
  gulp.src(cfg.scripts.src)
    .pipe(plumber(errorHandler: notify.onError(cfg.error)))<% if(javascriptOption === 'coffee') { %>
    .pipe(coffee({bare: true}))<% } %>
    .pipe(concat('script.js'))
    .pipe gulp.dest(cfg.scripts.build)
  return

# JS Build Task
gulp.task 'scripts-build', ->
  gulp.src(cfg.scripts.src)
    .pipe(plumber(errorHandler: notify.onError(cfg.error)))<% if(javascriptOption === 'coffee') { %>
    .pipe(coffee({bare: true}))<% } %>
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe gulp.dest(cfg.scripts.build)
  return
