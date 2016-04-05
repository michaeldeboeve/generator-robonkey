var fs              = require('fs');
var cfg             = JSON.parse(fs.readFileSync('./config.json'));
var paths           = JSON.parse(fs.readFileSync('./paths.json'));
var gulp            = require('gulp');
var changed         = require('gulp-changed');
var uglify          = require('gulp-uglify');

var moveFiles = [];
var bowerPath = '../src/bower_components/';

<% if(zeptoOption){ %>moveFiles.push(bowerPath + 'zepto/zepto.min.js');<% } %><% if(underscoreOption){ %>
moveFiles.push(bowerPath + 'underscore/underscore-min.js');<% } %><% if(backboneOption){ %>
moveFiles.push(bowerPath + 'backbone/backbone-min.js');<% } %><% if(reactOption){ %>
moveFiles.push(bowerPath + 'react/react-dom.min.js', bowerPath + 'react/react-with-addons.min.js', bowerPath + 'react/react-dom-server.js', bowerPath + 'react/react.min.js');<% } %><% if(modernizrOption){ %>
moveFiles.push('../src/modernizr/modernizr.dev.js');<% } %><% if(angularOption){ %>
moveFiles.push(bowerPath + 'angular/angular.min.js');<% } %><% if(requireOption){ %>
moveFiles.push(bowerPath + 'requirejs/require.js');<% } %><% if(jqueryOption){ %>
moveFiles.push(bowerPath + 'jquery/dist/jquery.min.js');<% } %><% if(tweenmaxOption){ %>
moveFiles.push(bowerPath + 'gsap/src/minified/TweenMax.min.js');<% } %><% if(dthreejsOption){ %>
moveFiles.push(bowerPath + 'd3/d3.min.js');<% } %><% if(enquireOption){ %>
moveFiles.push(bowerPath + 'enquire/dist/enquire.min.js');<% } %><% if(signalsOption){ %>
moveFiles.push(bowerPath + 'js-signals/dist/signals.min.js');<% } %><% if(waypointsOption && jqueryOption && !zeptoOption){ %>
moveFiles.push(bowerPath + 'waypoints/lib/jquery.waypoints.min.js');<% } %><% if(waypointsOption && !jqueryOption && !zeptoOption){ %>
moveFiles.push(bowerPath + 'waypoints/lib/noframework.waypoints.min.js');<% } %><% if(waypointsOption && !jqueryOption && zeptoOption){ %>moveFiles.push(bowerPath + 'waypoints/lib/zepto.waypoints.min.js');<% } %>


if(moveFiles.length > 0) {
  gulp.task('moveBower', function() {
    var src = moveFiles,
        dest = paths.scripts.build_lib;

    gulp.src(src)
      // .pipe(uglify())
      .pipe(gulp.dest(dest));
  });
} else {
  gulp.task('moveBower', function() {});
}
