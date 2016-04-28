var fs              = require('fs');
var cfg             = JSON.parse(fs.readFileSync('./config.json'));
var gulp            = require('gulp');
var notify          = require("gulp-notify");
var plumber         = require('gulp-plumber');
var concat          = require('gulp-concat');
var sourcemaps      = require('gulp-sourcemaps');
var rename          = require('gulp-rename');<% if(preproOption === 'scss'){ %>
var sass            = require('gulp-sass');
var sassGlob        = require('gulp-sass-glob');<% } if(preproOption === 'stylus'){ %>
var stylus          = require('gulp-stylus');<% } if(preproOption === 'less'){ %>
var less            = require('gulp-less');
var lessGlob        = require('less-plugin-glob');
var LessClean       = require('less-plugin-clean-css');
var cleancss        = new LessClean({ advanced: true });<% } %>

<% if(postcssOption){ %>
var postcss = require('gulp-postcss');<%
for (var i = 0; i < postcssPlugins.length; i++) { %>
var <%= postcssPlugins[i]['key'] %> = require('<%= postcssPlugins[i]['req'] %>');<%
} %>


var postcssConfigDev = [<%
for (var i = 0; i < postcssPlugins.length; i++) {
  if(!postcssPlugins[i]['excludeDev']) { %>
  <%= postcssPlugins[i]['call'] %>,<%
  }
} %>
];

var postcssConfigBuild = [ <%
for (var i = 0; i < postcssPlugins.length; i++) { %>
  <%= postcssPlugins[i]['call'] %>,<%
} %>
];<% } %>


// Styles Dev
gulp.task('styles', function(){
  gulp.src(cfg.styles.src)<% if(preproOption === 'scss'){ %>
    .pipe(sassGlob())<% } %>
    .pipe(plumber({errorHandler: notify.onError(cfg.error)}))
    .pipe(sourcemaps.init())<% if(preproOption === 'scss'){ %>
    .pipe(sass())<% } if(preproOption === 'stylus'){ %>
    .pipe(stylus())<% } if(preproOption === 'less'){ %>
    .pipe(less({ plugins: [lessGlob] }))<% } if(postcssOption){ %>
    .pipe(postcss(postcssConfigDev))<% } %>
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(cfg.styles.build));
});

// Styles Build
gulp.task('styles-build', function(){
  gulp.src(cfg.styles.src)<% if(preproOption === 'scss'){ %>
    .pipe(sassGlob())<% } %>
    .pipe(plumber({errorHandler: notify.onError(cfg.error)}))<% if(preproOption === 'scss'){ %>
    .pipe(sass(<% if(!postcssCssNanoOption){ %>{outputStyle: 'compressed'}<% } %>))<% } if(preproOption === 'stylus'){ %>
    .pipe(stylus(<% if(!postcssOption){ %>{ compress: true }<% } %>))<% } if(preproOption === 'less'){ %>
    .pipe(less({ plugins: [lessGlob<% if(!postcssCssNanoOption){ %>, cleancss<% } %>] }))<% } if(postcssOption){ %>
    .pipe(postcss(postcssConfigBuild))<% } %>
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(cfg.styles.build));
});
