var fs              = require('fs');
var cfg             = JSON.parse(fs.readFileSync('./config.json'));
var paths           = JSON.parse(fs.readFileSync('./paths.json'));
var gulp            = require('gulp');
var changed         = require('gulp-changed');
var moveRepo        = "";
var bowerPath       = '../src/bower_components/'

<% if(underscoreOption){ %>
moveRepo += "moveUnderscore,";
gulp.task('moveUnderscore', function() {
  var src = bowerPath + 'underscore/underscore-min.js',
      dest = cfg.resrc.jsvendor;

  gulp.src(src)
    .pipe(changed(dest))
    .pipe(gulp.dest(dest));
});
<% } %>
<% if(backboneOption){ %>
moveRepo += "moveBackbone,";
gulp.task('moveBackbone', function() {
  var src = bowerPath + 'backbone/backbone-min.js',
      dest = cfg.resrc.jsvendor;

  gulp.src(src)
    .pipe(changed(dest))
    .pipe(gulp.dest(dest));
});
<% } %>
<% if(reactOption){ %>
moveRepo += "moveReact,";
gulp.task('moveReact', function() {
  var src = [bowerPath + 'react/react-dom.min.js', bowerPath + 'react/react-with-addons.min.js', bowerPath + 'react/react-dom-server.js', bowerPath + 'react/react.min.js'],
      dest = cfg.resrc.jsvendor;

  gulp.src(src)
    .pipe(changed(dest))
    .pipe(gulp.dest(dest));
});
<% } %>
<% if(modernizrOption){ %>
moveRepo += "moveModernizr,";
gulp.task('moveModernizr', function() {
  var src = '../src/modernizr/modernizr.dev.js',
      dest = cfg.resrc.jsvendor;

  gulp.src(src)
    .pipe(changed(dest))
    .pipe(gulp.dest(dest));
});
<% } %>
<% if(angularOption){ %>
moveRepo += "moveAngular,";
gulp.task('moveAngular', function() {
  var src = bowerPath + 'angular/angular.min.js',
      dest = cfg.resrc.jsvendor;

  gulp.src(src)
    .pipe(changed(dest))
    .pipe(gulp.dest(dest));
});
<% } %>
<% if(requireOption){ %>
moveRepo += "moveRequire,";
gulp.task('moveRequire', function() {
  var src = bowerPath + 'requirejs/require.js',
      dest = cfg.resrc.jsvendor;

  gulp.src(src)
    .pipe(changed(dest))
    .pipe(gulp.dest(dest));
});
<% } %>
<% if(jqueryOption){ %>
moveRepo += "moveJquery,";
gulp.task('moveJquery', function() {
  var src = bowerPath + 'jquery/dist/jquery.min.js',
      dest = cfg.resrc.jsvendor;

  gulp.src(src)
    .pipe(changed(dest))
    .pipe(gulp.dest(dest));
});
<% } %>
<% if(tweenmaxOption){ %>
moveRepo += "moveTweenMax,";
gulp.task('moveTweenMax', function() {
  var src = bowerPath + 'gsap/src/minified/TweenMax.min.js',
      dest = cfg.resrc.jsvendor;

  gulp.src(src)
    .pipe(gulp.dest(dest));
});
<% } %>
<% if(d3jsOption){ %>
moveRepo += "moveD3,";
gulp.task('moveD3', function() {
  var src = bowerPath + 'd3/d3.min.js',
      dest = cfg.resrc.jsvendor;

  gulp.src(src)
    .pipe(gulp.dest(dest));
});
<% } %>
<% if(enquireOption){ %>
moveRepo += "moveEnquire,";
gulp.task('moveEnquire', function() {
  var src = bowerPath + 'enquire/dist/enquire.min.js',
      dest = cfg.resrc.jsvendor;

  gulp.src(src)
    .pipe(gulp.dest(dest));
});
<% } %>
<% if(signalsOption){ %>
moveRepo += "moveSignals,";
gulp.task('moveSignals', function() {
  var src = bowerPath + 'js-signals/dist/signals.min.js',
      dest = cfg.resrc.jsvendor;

  gulp.src(src)
    .pipe(gulp.dest(dest));
});
<% } %>
<% if(waypointsOption && !jqueryOption){ %>
moveRepo += "moveWaypoints,";
gulp.task('moveWaypoints', function() {
  var src = [bowerPath + 'waypoints/lib/noframework.waypoints.min.js'],
      dest = cfg.resrc.jsvendor;

  gulp.src(src)
    .pipe(gulp.dest(dest));
});
<% } else if(waypointsOption && jqueryOption) { %>
moveRepo += "moveWaypoints,";
gulp.task('moveWaypoints', function() {
  var src = [bowerPath + 'waypoints/lib/jquery.waypoints.min.js'],
      dest = cfg.resrc.jsvendor;

  gulp.src(src)
    .pipe(gulp.dest(dest));
});
<% } %>

moveRepo = moveRepo.substr(0, moveRepo.length-1);
moveRepo = moveRepo.split(',');

if(moveRepo == "") {
  gulp.task('moveBower', function() {});
} else {
  gulp.task('moveBower', moveRepo, function() {});
}
