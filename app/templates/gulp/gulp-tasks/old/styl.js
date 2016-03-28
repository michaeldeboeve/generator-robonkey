var fs              = require('fs');
var cfg             = JSON.parse(fs.readFileSync('./config.json'));
var paths           = JSON.parse(fs.readFileSync('./paths.json'));
var gulp            = require('gulp');
var plumber         = require('gulp-plumber');
var concat          = require('gulp-concat');
var sourcemaps      = require('gulp-sourcemaps');
var rename          = require('gulp-rename');

var stylus          = require('gulp-stylus');


<% if(includePostCSS){ %>// postprocessing<% } %><% if(includePostCSS){ %>
var postcss         = require('gulp-postcss');<% } %><% if(includePcssAutoprefixer){ %>
var autoprefixer    = require('autoprefixer');<% } %><% if(includePcssMQPacker){ %>
var mqPacker        = require('css-mqpacker');<% } %><% if(includePcssScopify){ %>
var scopify         = require('postcss-scopify');<% } %><% if(includePcssSelectorNot){ %>
var selectorNot     = require('postcss-selector-not');<% } %><% if(includePcssSelectorMatches){ %>
var selectorMatches = require('postcss-selector-matches');<% } %><% if(includePcssClassPrefix){ %>
var classPrfx       = require('postcss-class-prefix');<% } %><% if(includePcssGradientFix){ %>
var gradientFix     = require('postcss-gradient-transparency-fix');<% } %><% if(includePcssMQKeyframes){ %>
var mqKeyframes     = require('postcss-mq-keyframes');<% } %><% if(includePcssNano){ %>
var cssnano         = require('cssnano');<% } %><% if(includePcssSort){ %>
var sort            = require('postcss-sort');<% } %>

<% if(includePostCSS){ %>var postCssConfigDev = [<% } %><% if(includePcssSelectorNot){ %>
  selectorNot,<% } %><% if(includePcssSelectorMatches){ %>
  selectorMatches,<% } %><% if(includePcssGradientFix){ %>
  gradientFix,<% } %><% if(includePcssClassPrefix){ %>
  classPrfx(cfg.prefix),<% } %><% if(includePcssScopify){ %>
  scopify(cfg.scope),<% } %><% if(includePcssAutoprefixer){ %>
  autoprefixer({browsers: ['last 3 versions', '> 1%']}),<% } %><% if(includePcssSort){ %>
  sort<% } %><% if(includePostCSS){ %>
];<% } %>

<% if(includePostCSS){ %>var postCssConfigBuild = [<% } %><% if(includePcssSelectorNot){ %>
  selectorNot,<% } %><% if(includePcssSelectorMatches){ %>
  selectorMatches,<% } %><% if(includePcssGradientFix){ %>
  gradientFix,<% } %><% if(includePcssClassPrefix){ %>
  classPrfx(cfg.prefix),<% } %><% if(includePcssScopify){ %>
  scopify(cfg.scope),<% } %><% if(includePcssMQKeyframes){ %>
  mqKeyframes,<% } %><% if(includePcssMQPacker){ %>
  mqPacker,<% } %><% if(includePcssAutoprefixer){ %>
  autoprefixer({browsers: ['last 3 versions', '> 1%']}),<% } %><% if(includePcssSort){ %>
  sort,<% } %><% if(includePcssNano){ %>
  cssnano({autoprefixer: false, zindex: false}),<% } %><% if(includePostCSS){ %>
];<% } %>



// Styles Dev
gulp.task('styles', function() {
  gulp.src(paths.styles.src)
    .pipe(plumber(onStyleError))
    .pipe(sourcemaps.init())
    .pipe(stylus())<% if(includePostCSS){ %>
    .pipe(postcss(postCssConfigDev))<% } %>
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.styles.build));
});

// Styles Build
gulp.task('styles-build', function() {
  gulp.src(paths.styles.src)
    .pipe(plumber(onStyleError))
    .pipe(stylus(<% if(!includePostCSS){ %>{ compress: true }<% } %>))<% if(includePostCSS){ %>
    .pipe(postcss(postCssConfigBuild))<% } %>
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(paths.styles.build));
});




function onStyleError(e) {
  console.log('CSS Error:', e.message, 'lineNumber:', e.lineNumber);
}
