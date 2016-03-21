var fs              = require('fs');
var cfg             = JSON.parse(fs.readFileSync('./config.json'));
var paths           = JSON.parse(fs.readFileSync('./paths.json'));
var gulp            = require('gulp');
var plumber         = require('gulp-plumber');
var concat          = require('gulp-concat');
var stylus          = require('gulp-stylus');
// var sassGlob        = require('gulp-sass-glob');
var sourcemaps      = require('gulp-sourcemaps');
var rename          = require('gulp-rename');


<% if(includePostCSS){ %>// postprocessing<% } %><% if(includePostCSS){ %>
var postcss         = require('gulp-postcss');<% } %><% if(includePostCSS){ %>
var autoprefixer    = require('autoprefixer');<% } %><% if(includePostCSS && includePcssMQPacker){ %>
var mqPacker        = require('css-mqpacker');<% } %><% if(includePostCSS && includePcssScopify){ %>
var scopify         = require('postcss-scopify');<% } %><% if(includePostCSS && includePcssSelectorNot){ %>
var selectorNot     = require('postcss-selector-not');<% } %><% if(includePostCSS && includePcssSelectorMatches){ %>
var selectorMatches = require('postcss-selector-matches');<% } %><% if(includePostCSS && includePcssClassPrefix){ %>
var classPrfx       = require('postcss-class-prefix');<% } %><% if(includePostCSS && includePcssGradientFix){ %>
var gradientFix     = require('postcss-gradient-transparency-fix');<% } %><% if(includePostCSS && includePcssMQKeyframes){ %>
var mqKeyframes     = require('postcss-mq-keyframes');<% } %><% if(includePostCSS && includePcssNano){ %>
var cssnano         = require('cssnano');<% } %>

<% if(includePostCSS){ %>var postCssConfigDev = [<% } %><% if(includePostCSS && includePcssSelectorNot){ %>
  selectorNot,<% } %><% if(includePostCSS && includePcssSelectorMatches){ %>
  selectorMatches,<% } %><% if(includePostCSS && includePcssGradientFix){ %>
  gradientFix,<% } %><% if(includePostCSS && includePcssClassPrefix){ %>
  classPrfx(cfg.prefix),<% } %><% if(includePostCSS && includePcssScopify){ %>
  scopify(cfg.scope),<% } %><% if(includePostCSS){ %>
  autoprefixer({browsers: ['last 3 versions', '> 1%']})<% } %><% if(includePostCSS){ %>
];<% } %>

<% if(includePostCSS){ %>var postCssConfigBuild = [<% } %><% if(includePostCSS && includePcssSelectorNot){ %>
  selectorNot,<% } %><% if(includePostCSS && includePcssSelectorMatches){ %>
  selectorMatches,<% } %><% if(includePostCSS && includePcssGradientFix){ %>
  gradientFix,<% } %><% if(includePostCSS && includePcssClassPrefix){ %>
  classPrfx(cfg.prefix),<% } %><% if(includePostCSS && includePcssScopify){ %>
  scopify(cfg.scope),<% } %><% if(includePostCSS && includePcssMQKeyframes){ %>
  mqKeyframes,<% } %><% if(includePostCSS && includePcssMQPacker){ %>
  mqPacker,<% } %><% if(includePostCSS && includePcssNano){ %>
  cssnano({autoprefixer: false, zindex: false}),<% } %><% if(includePostCSS){ %>
  autoprefixer({browsers: ['last 3 versions', '> 1%']})<% } %><% if(includePostCSS){ %>
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
