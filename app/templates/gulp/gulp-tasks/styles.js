var fs              = require('fs');
var cfg             = JSON.parse(fs.readFileSync('./config.json'));
var paths           = JSON.parse(fs.readFileSync('./paths.json'));
var gulp            = require('gulp');
var plumber         = require('gulp-plumber');
var concat          = require('gulp-concat');
var sourcemaps      = require('gulp-sourcemaps');
var rename          = require('gulp-rename');<% if(includeSCSS){ %>
var sass            = require('gulp-sass');
var sassGlob        = require('gulp-sass-glob');<% } %><% if(includeStylus){ %>
var stylus          = require('gulp-stylus');<% } %><% if(includeLess){ %>
var less            = require('gulp-less');
var lessGlob        = require('less-plugin-glob');
var LessClean       = require('less-plugin-clean-css');
var cleancss        = new LessClean({ advanced: true });<% } %>


<% if(includePostCSS){ %>// postprocessing<% } %><% if(includePostCSS){ %>
var postcss         = require('gulp-postcss');<% } %><% if(includePcssAutoprefixer && !includePcssCssGrace){ %>
var autoprefixer    = require('autoprefixer');<% } %><% if(includePcssMQPacker){ %>
var mqPacker        = require('css-mqpacker');<% } %><% if(includePcssScopify){ %>
var scopify         = require('postcss-scopify');<% } %><% if(includePcssClassPrefix){ %>
var classPrfx       = require('postcss-class-prefix');<% } %><% if(includePcssGradientFix){ %>
var gradientFix     = require('postcss-gradient-transparency-fix');<% } %><% if(includePcssMQKeyframes){ %>
var mqKeyframes     = require('postcss-mq-keyframes');<% } %><% if(includePcssCsso){ %>
var csso            = require('postcss-csso');<% } %><% if(includePcssDeclsort){ %>
var cssdeclsort     = require('css-declaration-sorter');<% } %><% if(includePcssRucksack){ %>
var rucksack        = require('rucksack-css');<% } %><% if(includePcssCssNext){ %>
var next            = require('postcss-cssnext');<% } %><% if(includePcssCssGrace){ %>
var grace           = require('cssgrace');<% } %>

<% if(includePcssAutoprefixer || includePcssCssNext){ %>var browserSupport  = ['last 3 versions', '> 1%'];<% } %><% if(includePcssDeclsort){ %>
var cssSortOrder    = 'smacss';<% } %>

<% if(includePostCSS){ %>var postCssConfigDev = [<% } %><% if(includePcssGradientFix){ %>
  gradientFix,<% } %><% if(includePcssRucksack){ %>
  rucksack,<% } %><% if(includePcssCssNext){ %>
  next({browsers: browserSupport}),<% } %><% if(includePcssCssGrace){ %>
  grace,<% } %><% if(includePcssClassPrefix){ %>
  classPrfx(cfg.prefix),<% } %><% if(includePcssScopify){ %>
  scopify(cfg.scope),<% } %><% if(includePcssDeclsort){ %>
  cssdeclsort({order: cssSortOrder}),<% } %><% if(includePcssMQKeyframes){ %>
  mqKeyframes,<% } %><% if(includePcssMQPacker){ %>
  mqPacker,<% } %><% if(includePcssAutoprefixer && !includePcssCssGrace){ %>
  autoprefixer({browsers: browserSupport})<% } %><% if(includePostCSS){ %>
];<% } %>

<% if(includePostCSS){ %>var postCssConfigBuild = [<% } %><% if(includePcssGradientFix){ %>
  gradientFix,<% } %><% if(includePcssRucksack){ %>
  rucksack,<% } %><% if(includePcssCssNext){ %>
  next({browsers: browserSupport}),<% } %><% if(includePcssCssGrace){ %>
  grace,<% } %><% if(includePcssClassPrefix){ %>
  classPrfx(cfg.prefix),<% } %><% if(includePcssScopify){ %>
  scopify(cfg.scope),<% } %><% if(includePcssDeclsort){ %>
  cssdeclsort({order: cssSortOrder}),<% } %><% if(includePcssMQKeyframes){ %>
  mqKeyframes,<% } %><% if(includePcssMQPacker){ %>
  mqPacker,<% } %><% if(includePcssAutoprefixer && !includePcssCssGrace){ %>
  autoprefixer({browsers: browserSupport}),<% } %><% if(includePcssCsso){ %>
  csso<% } %><% if(includePostCSS){ %>
];<% } %>



// Styles Dev
gulp.task('styles', function() {
  gulp.src(paths.styles.src)<% if(includeSCSS){ %>
    .pipe(sassGlob())<% } %>
    .pipe(plumber(onStyleError))
    .pipe(sourcemaps.init())<% if(includeSCSS){ %>
    .pipe(sass())<% } %><% if(includeStylus){ %>
    .pipe(stylus())<% } %><% if(includeLess){ %>
    .pipe(less({ plugins: [lessGlob] }))<% } %><% if(includePostCSS){ %>
    .pipe(postcss(postCssConfigDev))<% } %>
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.styles.build));
});

// Styles Build
gulp.task('styles-build', function() {
  gulp.src(paths.styles.src)<% if(includeSCSS){ %>
    .pipe(sassGlob())<% } %>
    .pipe(plumber(onStyleError))<% if(includeSCSS){ %>
    .pipe(sass(<% if(!includePcssCsso){ %>{outputStyle: 'compressed'}<% } %>))<% } %><% if(includeStylus){ %>
    .pipe(stylus(<% if(!includePostCSS){ %>{ compress: true }<% } %>))<% } %><% if(includeLess){ %>
    .pipe(less({ plugins: [lessGlob<% if(!includePcssCsso){ %>, cleancss<% } %>] }))<% } %><% if(includePostCSS){ %>
    .pipe(postcss(postCssConfigBuild))<% } %>
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(paths.styles.build));
});




function onStyleError(e) {
  console.log('CSS Error:', e.message, 'lineNumber:', e.lineNumber);
}
