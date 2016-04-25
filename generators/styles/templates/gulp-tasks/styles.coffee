fs = require('fs')
cfg = JSON.parse(fs.readFileSync('./config.json'))
gulp = require('gulp')
notify = require('gulp-notify')
plumber = require('gulp-plumber')
concat = require('gulp-concat')
sourcemaps = require('gulp-sourcemaps')
rename = require('gulp-rename')<% if(preproOption === 'scss'){ %>
sass = require('gulp-sass')
sassGlob = require('gulp-sass-glob')<% } if(preproOption === 'stylus'){ %>
stylus = require('gulp-stylus')<% } if(preproOption === 'less'){ %>
less = require('gulp-less')
lessGlob = require('less-plugin-glob')
LessClean = require('less-plugin-clean-css')
cleancss = new LessClean({ advanced: true })<% } %>

<% if(postcssOption){ %>
postcss = require('gulp-postcss')<%
for (var i = 0; i < postcssPlugins.length; i++) { %>
<%= postcssPlugins[i]['key'] %> = require('<%= postcssPlugins[i]['req'] %>')<%
} %>


postcssConfigDev = [<%
for (var i = 0; i < postcssPlugins.length; i++) {
  if(!postcssPlugins[i]['excludeDev']) { %>
  <%= postcssPlugins[i]['call'] %>,<%
  }
} %>
];

postcssConfigBuild = [ <%
for (var i = 0; i < postcssPlugins.length; i++) { %>
  <%= postcssPlugins[i]['call'] %>,<%
} %>
];<% } %>


# Styles Dev
gulp.task 'styles', ->
  gulp.src(cfg.styles.src)<% if(preproOption === 'scss'){ %>
    .pipe(sassGlob())<% } %>
    .pipe(plumber(errorHandler: notify.onError(cfg.error)))
    .pipe(sourcemaps.init())<% if(preproOption === 'scss'){ %>
    .pipe(sass())<% } if(preproOption === 'stylus'){ %>
    .pipe(stylus())<% } if(preproOption === 'less'){ %>
    .pipe(less({ plugins: [lessGlob] }))<% } if(postcssOption){ %>
    .pipe(postcss(postcssConfigDev))<% } %>
    .pipe(sourcemaps.write('./'))
    .pipe gulp.dest(cfg.styles.build)
  return

# Styles Build
gulp.task 'styles-build', ->
  gulp.src(cfg.styles.src)<% if(preproOption === 'scss'){ %>
    .pipe(sassGlob())<% } %>
    .pipe(plumber(errorHandler: notify.onError(cfg.error)))<% if(preproOption === 'scss'){ %>
    .pipe(sass(<% if(!postcssCssNanoOption){ %>{outputStyle: 'compressed'}<% } %>))<% } if(preproOption === 'stylus'){ %>
    .pipe(stylus(<% if(!postcssOption){ %>{ compress: true }<% } %>))<% } if(preproOption === 'less'){ %>
    .pipe(less({ plugins: [lessGlob<% if(!postcssCssNanoOption){ %>, cleancss<% } %>] }))<% } if(postcssOption){ %>
    .pipe(postcss(postcssConfigBuild))<% } %>
    .pipe(rename('style.min.css'))
    .pipe gulp.dest(cfg.styles.build)
  return
