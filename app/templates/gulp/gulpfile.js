// include config
var fs              = require('fs');
var cfg             = JSON.parse(fs.readFileSync('./config.json'));



// include gulp
var gulp            = require('gulp');
var plumber         = require('gulp-plumber');
var concat          = require('gulp-concat');




// sass
var sass            = require('gulp-sass');
var sassGlob        = require('gulp-sass-glob');



// watch
var changed         = require('gulp-changed');
var watch           = require('gulp-watch');
var browserSync     = require('browser-sync');



// html
<% if(includeJade){ %>var jade            = require('gulp-jade');<% } %>



// javascript
var jshint          = require('gulp-jshint');
var uglify          = require('gulp-uglify');
<% if(includeModernizr){ %>var modernizr       = require('gulp-modernizr');<% } %>


// images
var imagemin        = require('gulp-imagemin');



// postprocessing
var postcss         = require('gulp-postcss');
var autoprefixer    = require('autoprefixer');
var mqpacker        = require('css-mqpacker');
var scopify         = require('postcss-scopify');
var selectorNot     = require('postcss-selector-not');
var selectorMatches = require('postcss-selector-matches');
var pseudoElements  = require('postcss-pseudoelements');
var classPrfx       = require('postcss-class-prefix');
var gradientFix     = require('postcss-gradient-transparency-fix');
var cssnano         = require('cssnano');


// Fonts
var iconfont        = require('gulp-iconfont');
var iconfontCss     = require('gulp-iconfont-css');
var runTimestamp    = Math.round(Date.now()/1000);



// Sourcemaps
var sourcemaps      = require('gulp-sourcemaps'); // should use another concat plugin: https://github.com/floridoo/gulp-concat/tree/sourcemap_pipe2



var postCssConfig = [
  selectorNot,
  selectorMatches,
  pseudoElements,
  gradientFix,
  //classPrfx('dc-'),
  //scopify('#scope'),
  mqpacker,
  autoprefixer({browsers: ['last 3 versions', '> 1%']}),
  cssnano({autoprefixer: false, zindex: false})
];




// set the paths to the source files and build directories
var path_src                = cfg.src; // where we keep the source files
var path_html               = cfg.dest; // where the html resides
var path_build              = cfg.resrc.main; // where the assets are stored
var path_build_js           = cfg.resrc.js; // where the scripts are stored
var path_build_js_vendor    = cfg.resrc.jsvendor; // where the vendor scripts are stored
var path_build_css          = cfg.resrc.css; // where the styles are stored
var path_build_css_vendor   = cfg.resrc.jsvendor; // where the vendor styles are stored
var path_build_img          = cfg.resrc.img; // where the images are stored
var path_build_fonts        = cfg.resrc.fonts; // where the fonts are stored
<% if(includeJade){ %>var path_build_jade         = cfg.resrc.jade; // where teh HTML is generated<% } %>


// Settings
var iconFontName      = cfg.iconFont.name;
var projectURL        = cfg.projectURL;


/*
Declare your paths here - proposed directory structure:
root
  ├── gulp
  ├── src/
    ├── images
    ├── jade
    ├── js
    ├── scss
  ├── website/
    ├── assets/
      ├── css
      ├── fonts
      ├── images
      ├── js
*/

var paths = {
  scripts: {
    src: path_src + 'js/**/*.js', // paths could also be an array: ['client/js/**/*.coffee', '!client/external/**/*.coffee']
    build: path_build_js
  },
  modernizr: {
    build: path_build_js_vendor
  },
  html: {
    src: path_html + '*.html'
  },
  images: {
    src: path_src + 'images/**/*',
    build: path_build_img
  },
  styles: {
    src: path_src + 'scss/style.scss',
    src_files: path_src + 'scss/**/*.scss',
    build_srcsmap: path_build_css,
    build: path_build_css
  },
  <% if(includeJade){ %>jade: {
    src: path_src + 'jade/*.jade',
    watch: path_src + 'jade/**/*.jade',
    build: path_build_jade
  },<% } %>
  postcss: {
    src: path_build_css + 'style.css',
    build: path_build_css
  },
  font: {
    src: path_src + 'iconfont/svg/*.svg',
    build: path_build_fonts + iconFontName,
    templateInput: '../src/iconfont/template/_icons.scss',
    templateOutput: '../../../../src/scss/modules/_icons.scss',
    templateFontpath: '../fonts/' + iconFontName + '/'
  }
};






gulp.task('browser-sync', function() {
    browserSync({
      files: [paths.styles.build + '/**/*.css'],
      open: 'external',
      proxy: projectURL,
      host: projectURL
    });
});



<% if(includeModernizr){ %>
// modernizr
gulp.task('modernizr', function() {
  gulp.src([paths.styles.src_files, paths.scripts.src])
    .pipe(modernizr(cfg.modernizr.output, {
      cache: true,
      options:  cfg.modernizr.options,
      excludeTests: cfg.modernizr.excludeTests,
      tests: cfg.modernizr.tests
    }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.modernizr.build));
});
<% } %>


// JS hint task -NOTE-: deze is voor de liefhebbers, runnen we niet per default
gulp.task('jshint', function() {
  gulp.src(paths.scripts.src)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('default'));
});




// minify new images
gulp.task('images', function() {
  var imgSrc = paths.images.src,
    imgDst = paths.images.build;

  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});




// JS concat
gulp.task('scripts', function() {
  gulp.src(paths.scripts.src)
    .pipe(plumber(onScriptError))
    .pipe(concat('script.js'))
    .pipe(gulp.dest(paths.scripts.build));
});




// JS concat and minify
gulp.task('scripts-min', function() {
  gulp.src(paths.scripts.src)
    .pipe(plumber(onScriptError))
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.build));
});




// SCSS convert to CSS, CSS concat, create sourcefile and minify
gulp.task('styles', function() {
  gulp.src(paths.styles.src)
    .pipe(sassGlob())
    .pipe(plumber(onStyleError))
    .pipe(sourcemaps.init())
    .pipe(sass()) // Compile sass to css
    .pipe(postcss(postCssConfig)) // Perform postcss tasks
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.styles.build));
});




<% if(includeJade){ %>
// Compile jade files
gulp.task('jade', function() {
  var jadeOptions = {
    pretty: true
  };
  gulp.src(paths.jade.src)
    .pipe(plumber(onJadeError))
    .pipe(jade(jadeOptions))
    .pipe(gulp.dest(paths.jade.build));
});
<% } %>




// Create icon font
gulp.task('iconfont', function(){
  return gulp.src(paths.font.src)
    .pipe(iconfontCss({
      fontName: iconFontName,
      path: paths.font.templateInput,
      targetPath: paths.font.templateOutput,
      fontPath: paths.font.templateFontpath,
    }))
    .pipe(iconfont({
      fontName: iconFontName,
      appendUnicode: true,
      formats: cfg.iconFont.types,
      timestamp: runTimestamp,
      normalize: true,
      fontHeight: 512,
      descent: 50,
    }))
    .pipe(gulp.dest(paths.font.build));
});




// default gulp task
gulp.task('default', [<% if(includeJade){ %>'jade',<% } %> 'images', 'scripts-min', 'styles', 'browser-sync'], function() {

  // watch for JS changes
  // gulp.watch(paths.scripts.src, ['scripts', 'scripts-min']).on('change', browserSync.reload);
  gulp.watch(paths.scripts.src, ['scripts-min']).on('change', browserSync.reload);

  // watch for SASS changes
  gulp.watch(paths.styles.src_files, ['styles']);

  // watch for image changes
  gulp.watch(paths.images.src, ['images']);

  <% if(includeJade){ %>// watch for Jade changes
  gulp.watch(paths.jade.watch, ['jade']).on('change', browserSync.reload);<% } %>

});




function onScriptError(e) {
  console.log('JavaScript Error:', e.message, 'lineNumber:', e.lineNumber);
}

function onStyleError(e) {
  console.log('CSS Error:', e.message, 'lineNumber:', e.lineNumber);
}

<% if(includeJade){ %>function onJadeError(e) {
  console.log('Jade Error:', e.message, 'lineNumber:', e.lineNumber);
}<% } %>
