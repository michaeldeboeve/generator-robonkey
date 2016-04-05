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
var postcss         = require('gulp-postcss');<% if(autoprefixerOption && !cssnextOption){ %>
var autoprefixer    = require('autoprefixer');<% } if(mqpackerOption){ %>
var mqPacker        = require('css-mqpacker');<% } if(scopifyOption){ %>
var scopify         = require('postcss-scopify');<% } if(classprefixOption){ %>
var classPrfx       = require('postcss-class-prefix');<% } if(gradientfixOption){ %>
var gradientFix     = require('postcss-gradient-transparency-fix');<% } if(mqkeyframesOption){ %>
var mqKeyframes     = require('postcss-mq-keyframes');<% } if(cssnanoOption){ %>
var cssnano         = require('cssnano');<% } if(csssorterOption){ %>
var cssdeclsort     = require('css-declaration-sorter');<% } if(rucksackOption){ %>
var rucksack        = require('rucksack-css');<% } if(cssnextOption){ %>
var next            = require('postcss-cssnext');<% } if(cssgraceOption){ %>
var grace           = require('cssgrace');<% } if(lostgridOption){ %>
var lostGrid        = require('lost');<% } %>

var postCssConfigDev = [<% if(lostgridOption){ %>
  lostGrid,<% } if(gradientfixOption){ %>
  gradientFix,<% } if(rucksackOption){ %>
  rucksack,<% } if(cssnextOption){ %>
  next({browsers: cfg.browsers}),<% } if(cssgraceOption){ %>
  grace,<% } if(classprefixOption){ %>
  classPrfx(cfg.prefix),<% } if(scopifyOption){ %>
  scopify(cfg.scope),<% } if(csssorterOption){ %>
  cssdeclsort({order: cfg.cssSortOrder}),<% } if(mqkeyframesOption){ %>
  mqKeyframes,<% } if(mqpackerOption){ %>
  mqPacker,<% } if(autoprefixerOption && !cssnextOption){ %>
  autoprefixer({browsers: cfg.browsers})<% } %>
];

var postCssConfigBuild = [<% if(lostgridOption){ %>
  lostGrid,<% } if(gradientfixOption){ %>
  gradientFix,<% } if(rucksackOption){ %>
  rucksack,<% } if(cssnextOption){ %>
  next({browsers: cfg.browsers}),<% } if(cssgraceOption){ %>
  grace,<% } if(classprefixOption){ %>
  classPrfx(cfg.prefix),<% } if(scopifyOption){ %>
  scopify(cfg.scope),<% } if(csssorterOption){ %>
  cssdeclsort({order: cfg.cssSortOrder}),<% } if(mqkeyframesOption){ %>
  mqKeyframes,<% } if(mqpackerOption){ %>
  mqPacker,<% } if(autoprefixerOption && !cssnextOption){ %>
  autoprefixer({browsers: cfg.browsers}),<% } if(cssnanoOption){ %>
  cssnano({autoprefixer: false})<% } %>
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
