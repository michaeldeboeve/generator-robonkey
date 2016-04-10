var fs              = require('fs');
var cfg             = JSON.parse(fs.readFileSync('./config.json'));
var gulp            = require('gulp');
var changed         = require('gulp-changed');
var uglify          = require('gulp-uglify');

var moveFiles = [];
var bowerPath = '<%= rootFolder %>src/bower_components/';

<%
for (var i = 0; i < jsScriptsBower.length; i++) { %>
moveFiles.push(bowerPath + '<%= jsScriptsBower[i]['src'] + jsScriptsBower[i]['file'] %>');<%
} %>


if(moveFiles.length > 0) {
  gulp.task('moveBower', function() {
    var src = moveFiles,
        dest = cfg.scripts.build_lib;

    gulp.src(src)
      // .pipe(uglify())
      .pipe(gulp.dest(dest));
  });
} else {
  gulp.task('moveBower', function() {});
}
