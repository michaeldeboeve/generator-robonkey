var fs              = require('fs');
var cfg             = JSON.parse(fs.readFileSync('./config.json'));
var paths           = JSON.parse(fs.readFileSync('./paths.json'));
var gulp            = require('gulp');
var iconfont        = require('gulp-iconfont');
var iconfontCss     = require('gulp-iconfont-css');
var runTimestamp    = Math.round(Date.now()/1000);


var paths = {
  font: {
    src: './../src/iconfont/svg/*.svg',
    build: './../website/assets/fonts/' + cfg.iconFont.name,
    templateInput: '../src/iconfont/template/_icons.scss',
    templateOutput: '../../../../src/scss/modules/_icons.scss',
    templateFontpath: '../fonts/' + cfg.iconFont.name + '/'
  }
};

// Create icon font
gulp.task('iconfont', function(){
  return gulp.src(paths.font.src)
    .pipe(iconfontCss({
      fontName: cfg.iconFont.name,
      path: paths.font.templateInput,
      targetPath: paths.font.templateOutput,
      fontPath: paths.font.templateFontpath,
    }))
    .pipe(iconfont({
      fontName: cfg.iconFont.name,
      prependUnicode: true,
      formats: cfg.iconFont.types,
      timestamp: runTimestamp,
      normalize: true,
      fontHeight: 512,
      descent: 50,
    }))
    .pipe(gulp.dest(paths.font.build));
});
