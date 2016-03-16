var fs              = require('fs');
var cfg             = JSON.parse(fs.readFileSync('./config.json'));
var paths           = JSON.parse(fs.readFileSync('./paths.json'));
var gulp            = require('gulp');
var changed         = require('gulp-changed');
var moveRepo        = "";

<% if(includeJQuery){ %>
moveRepo += "moveJquery,";
gulp.task('moveJquery', function() {
  var src = '../src/bower_components/jquery/dist/jquery.min.js',
      dest = '../website/assets/js/libs/';

  gulp.src(src)
    .pipe(changed(dest))
    .pipe(gulp.dest(dest));
});
<% } %>
<% if(includeTweenmax){ %>
moveRepo += "moveTweenMax,";
gulp.task('moveTweenMax', function() {
  var src = '../src/bower_components/gsap/src/minified/TweenMax.min.js',
      dest = '../website/assets/js/libs/';

  gulp.src(src)
    .pipe(gulp.dest(dest));
});
<% } %>
<% if(includeD3){ %>
moveRepo += "moveD3,";
gulp.task('moveD3', function() {
  var src = '../src/bower_components/d3/d3.min.js',
      dest = '../website/assets/js/libs/';

  gulp.src(src)
    .pipe(gulp.dest(dest));
});
<% } %>
<% if(includeEnquire){ %>
moveRepo += "moveEnquire,";
gulp.task('moveEnquire', function() {
  var src = '../src/bower_components/enquire/dist/enquire.min.js',
      dest = '../website/assets/js/libs/';

  gulp.src(src)
    .pipe(gulp.dest(dest));
});
<% } %>
<% if(includeSignals){ %>
moveRepo += "moveSignals,";
gulp.task('moveSignals', function() {
  var src = '../src/bower_components/js-signals/dist/signals.min.js',
      dest = '../website/assets/js/libs/';

  gulp.src(src)
    .pipe(gulp.dest(dest));
});
<% } %>
<% if(includeWaypoints && !includeJQuery){ %>
moveRepo += "moveWaypoints,";
gulp.task('moveWaypoints', function() {
  var src = ['../src/bower_components/waypoints/lib/noframework.waypoints.min.js'],
      dest = '../website/assets/js/libs/';

  gulp.src(src)
    .pipe(gulp.dest(dest));
});
<% } else if(includeWaypoints && includeJQuery) { %>
moveRepo += "moveWaypoints,";
gulp.task('moveWaypoints', function() {
  var src = ['../src/bower_components/waypoints/lib/jquery.waypoints.min.js'],
      dest = '../website/assets/js/libs/';

  gulp.src(src)
    .pipe(gulp.dest(dest));
});
<% } %>

moveRepo = moveRepo.substr(0, moveRepo.length-1);
moveRepo = moveRepo.split(',');
// console.log(moveRepo);
gulp.task('moveBower', moveRepo, function() {});
