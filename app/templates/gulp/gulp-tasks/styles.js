var fs              = require('fs');
var cfg             = JSON.parse(fs.readFileSync('./config.json'));
var gulp            = require('gulp');
var plumber         = require('gulp-plumber');
var concat          = require('gulp-concat');
var sourcemaps      = require('gulp-sourcemaps');
var rename          = require('gulp-rename');
<% if(preproOption === 'sass'){ %>
var sass            = require('gulp-sass');
var sassGlob        = require('gulp-sass-glob');<% } if(preproOption === 'stylus'){ %>
var stylus          = require('gulp-stylus');<% } if(preproOption === 'less'){ %>
var less            = require('gulp-less');
var lessGlob        = require('less-plugin-glob');
var LessClean       = require('less-plugin-clean-css');
var cleancss        = new LessClean({ advanced: true });<% } %>

<% if(postCssOption){ %>
var postcss = require('gulp-postcss');<%
for (var i = 0; i < postCssPlugins.length; i++) { %>
var <%= postCssPlugins[i]['key'] %> = require('<%= postCssPlugins[i]['req'] %>');<%
} %>


var postCssConfigDev = [<%
for (var i = 0; i < postCssPlugins.length; i++) {
  if(!postCssPlugins[i]['excludeDev']) { %>
  <%= postCssPlugins[i]['call'] %>,<%
  }
} %>
];

var postCssConfigBuild = [ <%
for (var i = 0; i < postCssPlugins.length; i++) { %>
  <%= postCssPlugins[i]['call'] %>,<%
} %>
];<% } %>


// Styles Dev
gulp.task('styles', function() {
  gulp.src(cfg.styles.src)<% if(preproOption === 'sass'){ %>
    .pipe(sassGlob())<% } %>
    .pipe(plumber(onStyleError))
    .pipe(sourcemaps.init())<% if(preproOption === 'sass'){ %>
    .pipe(sass())<% } if(preproOption === 'stylus'){ %>
    .pipe(stylus())<% } if(preproOption === 'less'){ %>
    .pipe(less({ plugins: [lessGlob] }))<% } if(postCssOption){ %>
    .pipe(postcss(postCssConfigDev))<% } %>
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(cfg.styles.build));
});

// Styles Build
gulp.task('styles-build', function() {
  gulp.src(cfg.styles.src)<% if(preproOption === 'sass'){ %>
    .pipe(sassGlob())<% } %>
    .pipe(plumber(onStyleError))<% if(preproOption === 'sass'){ %>
    .pipe(sass(<% if(!cssnanoOption){ %>{outputStyle: 'compressed'}<% } %>))<% } if(preproOption === 'stylus'){ %>
    .pipe(stylus(<% if(!postCssOption){ %>{ compress: true }<% } %>))<% } if(preproOption === 'less'){ %>
    .pipe(less({ plugins: [lessGlob<% if(!cssnanoOption){ %>, cleancss<% } %>] }))<% } if(postCssOption){ %>
    .pipe(postcss(postCssConfigBuild))<% } %>
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(cfg.styles.build));
});




function onStyleError(e) {
  console.log('CSS Error:', e.message, 'lineNumber:', e.lineNumber);
}
