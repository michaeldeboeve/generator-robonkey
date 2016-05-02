'use strict';
var fs          = require('fs'),
    path        = require('path'),
    jsonfile    = require('jsonfile'),
    mkdirp      = require('mkdirp'),
    printTitle  = require('../helpers/printTitle');






function copyProjectFiles(self, destRoot, sourceRoot, cb){
  mkdirp(path.join(destRoot, 'src', 'bower_components'));
  mkdirp(path.join(destRoot, self.templateDest, self.jsDirPath));
  mkdirp(path.join(destRoot, self.templateDest, self.jsLibDirPath));
  mkdirp(path.join(destRoot, self.templateDest, self.imgDirPath));
  mkdirp(path.join(destRoot, self.templateDest, self.cssDirPath));
  mkdirp(path.join(destRoot, self.templateDest, self.cssLibDirPath));
  mkdirp(path.join(destRoot, self.templateDest, self.fontDirPath));

  self.fs.copy(
    path.join(sourceRoot, 'project/_editorconfig'),
    path.join(destRoot, '.editorconfig')
  );
  self.fs.copy(
    path.join(sourceRoot, 'project/_gitignore'),
    path.join(destRoot, '.gitignore')
  );
  self.fs.copy(
    path.join(sourceRoot, 'project/_gitattributes'),
    path.join(destRoot, '.gitattributes')
  );
  // self.fs.copyTpl(
  //   path.join(sourceRoot, 'project/README.md'),
  //   path.join(destRoot, 'README.md'),
  //   templateContext
  // );

  cb();
}




function copyExpressFiles(self, destRoot, sourceRoot, cb){
  if(self.environmentOption === 'express'){
    self.fs.copy(
      path.join(sourceRoot, 'bin'),
      path.join(destRoot, self.mainDir, 'bin')
    );
    self.fs.copy(
      path.join(sourceRoot, 'routes'),
      path.join(destRoot, self.mainDir, 'routes')
    );
    self.fs.copy(
      path.join(sourceRoot, 'views'),
      path.join(destRoot, self.mainDir, 'views')
    );
    self.fs.copy(
      path.join(sourceRoot, 'app.js'),
      path.join(destRoot, self.mainDir, 'app.js')
    );
    self.fs.copy(
      path.join(sourceRoot, 'package.json'),
      path.join(destRoot, self.mainDir, 'package.json')
    );
  }

  cb();
}




function copyWordpressFiles(self, destRoot, sourceRoot, cb) {
  var wpRoot = path.join(sourceRoot, 'wordpress/blank-theme'),
      wpDest  = path.join(destRoot, self.templateDest),
      templateContext = {
        themeAuthor: self.themeAuthor,
        themeAuthorEmail: self.themeAuthorEmail,
        themeName: self.themeName,
        themeNameSpace: self.themeNameSpace,
        jsDirPath: self.jsDirPath,
        jsLibDirPath: self.jsLibDirPath,
        cssDirPath: self.cssDirPath,
        cssLibDirPath: self.cssLibDirPath
      }


  if(self.environmentOption === 'wordpress' && self.wpBlankTheme === true) {
    self.fs.copy(
      path.join(wpRoot, '_inc'),
      path.join(wpDest, '_inc')
    );
    self.fs.copy(
      path.join(wpRoot, 'screenshot.png'),
      path.join(wpDest, 'screenshot.png')
    );

    self.fs.copyTpl(
      path.join(wpRoot, '404.php'),
      path.join(wpDest, '404.php'),
      templateContext
    );
    self.fs.copyTpl(
      path.join(wpRoot, 'archive.php'),
      path.join(wpDest, 'archive.php'),
      templateContext
    );
    self.fs.copyTpl(
      path.join(wpRoot, 'comments.php'),
      path.join(wpDest, 'comments.php'),
      templateContext
    );
    self.fs.copyTpl(
      path.join(wpRoot, 'footer.php'),
      path.join(wpDest, 'footer.php'),
      templateContext
    );
    self.fs.copyTpl(
      path.join(wpRoot, 'functions.php'),
      path.join(wpDest, 'functions.php'),
      templateContext
    );
    self.fs.copyTpl(
      path.join(wpRoot, 'header.php'),
      path.join(wpDest, 'header.php'),
      templateContext
    );
    self.fs.copyTpl(
      path.join(wpRoot, 'index.php'),
      path.join(wpDest, 'index.php'),
      templateContext
    );
    self.fs.copyTpl(
      path.join(wpRoot, 'options.php'),
      path.join(wpDest, 'options.php'),
      templateContext
    );
    self.fs.copyTpl(
      path.join(wpRoot, 'page.php'),
      path.join(wpDest, 'page.php'),
      templateContext
    );
    self.fs.copyTpl(
      path.join(wpRoot, 'search.php'),
      path.join(wpDest, 'search.php'),
      templateContext
    );
    self.fs.copyTpl(
      path.join(wpRoot, 'searchform.php'),
      path.join(wpDest, 'searchform.php'),
      templateContext
    );
    self.fs.copyTpl(
      path.join(wpRoot, 'sidebar.php'),
      path.join(wpDest, 'sidebar.php'),
      templateContext
    );
    self.fs.copyTpl(
      path.join(wpRoot, 'single.php'),
      path.join(wpDest, 'single.php'),
      templateContext
    );
    self.fs.copyTpl(
      path.join(wpRoot, 'style.css'),
      path.join(wpDest, 'style.css'),
      templateContext
    );
  }

  cb();
}




function copyH5bpFiles(self, destRoot, sourceRoot, cb) {
  var templateContext = {
        imgDirPath: self.imgDirPath
      }

  if(self.environmentOption === 'static') {

    self.fs.copyTpl(
      path.join(sourceRoot, 'website/browserconfig.xml'),
      path.join(destRoot, self.mainDir, 'browserconfig.xml'),
      templateContext
    );
    self.fs.copy(
      path.join(sourceRoot, 'website/htaccess.txt'),
      path.join(destRoot, self.mainDir, '.htaccess')
    );

    self.fs.copy(
      path.join(sourceRoot, 'website/crossdomain.xml'),
      path.join(destRoot, self.mainDir, 'crossdomain.xml')
    );
    self.fs.copy(
      path.join(sourceRoot, 'website/robots.txt'),
      path.join(destRoot, self.mainDir, 'robots.txt')
    );
  }

  cb();
}




function copyHtmlFiles(self, destRoot, sourceRoot, cb) {
  var templateContext = {
        environmentOption: self.environmentOption,
        imgDirPath: self.imgDirPath,
        cssDirPath: self.cssDirPath,
        jsDirPath: self.jsDirPath,
        jsLibDirPath: self.jsLibDirPath,
        modernizrOption: self.modernizrOption,
        analyticsOption: self.analyticsOption,
        jsScripts: self.jsScripts
      }

  if(self.environmentOption === 'static' || self.environmentOption === 'express') {
    switch (self.templateOption){
      case 'jade':
        if(self.environmentOption === 'express') {
          destRoot = path.join(destRoot, self.mainDir, 'views');
        } else {
          destRoot = path.join(destRoot, 'src/jade');
        }
        self.fs.copy(
          path.join(sourceRoot, 'jade'),
          destRoot
        );
        self.fs.copyTpl(
          path.join(sourceRoot, 'tpl/jade/index.jade'),
          path.join(destRoot, 'index.jade'),
          templateContext
        );
        self.fs.copyTpl(
          path.join(sourceRoot, 'tpl/jade/templates/layout.jade'),
          path.join(destRoot,'templates/layout.jade'),
          templateContext
        );
      break;

      case 'pug':
        if(self.environmentOption === 'express') {
          destRoot = path.join(destRoot, self.mainDir, 'views');
        } else {
          destRoot = path.join(destRoot, 'src/pug');
        }

        self.fs.copy(
          path.join(sourceRoot, 'pug'),
          destRoot);
        self.fs.copyTpl(
          path.join(sourceRoot, 'tpl/pug/index.pug'),
          path.join(destRoot, 'index.pug'),
          templateContext
        );
        self.fs.copyTpl(
          path.join(sourceRoot, 'tpl/pug/templates/layout.pug'),
          path.join(destRoot,'templates/layout.pug'),
          templateContext
        );
      break;

      case 'nunjucks':
        if(self.environmentOption === 'express') {
          destRoot = path.join(destRoot, self.mainDir, 'views');
        } else {
          destRoot = path.join(destRoot, 'src/nunjucks');
        }
        self.fs.copy(
          path.join(sourceRoot, 'nunjucks'),
          destRoot
        );
        self.fs.copyTpl(
          path.join(sourceRoot, 'tpl/nunjucks/base/layout.html'),
          path.join(destRoot,'base/layout.html'),
          templateContext
        );
        self.fs.copy(
          path.join(sourceRoot, 'nunjucks'),
          destRoot
        );
      break;

      default:
        self.fs.copyTpl(
          path.join(sourceRoot, 'website/index.html'),
          path.join(destRoot, self.mainDir, 'index.html'),
          templateContext
        );
    }
  }

  cb();
}




function copyJsFiles(self, destRoot, gulpRoot, sourceRoot, cb){
  var templateContext = {
        requireOption: self.requireOption,
        jqueryOption: self.jqueryOption,
        jsLibDirPath: self.jsLibDirPath,
        jsScriptsBower: self.jsScriptsBower,
        rootFolder: self.rootFolder,
        javascriptOption: self.javascriptOption,
        modernizrOption: self.modernizrOption,
        scriptsOption: self.scriptsOption
      }

  var ext = '.js';
  if(self.gulpTypeOption === 'coffee') ext = '.coffee';

  self.fs.copyTpl(
    path.join(sourceRoot, 'gulp-tasks/bower' + ext),
    path.join(gulpRoot, 'gulp-tasks/bower' + ext),
    templateContext
  );
  self.fs.copyTpl(
    path.join(sourceRoot, 'gulp-tasks/scripts' + ext),
    path.join(gulpRoot, 'gulp-tasks/scripts' + ext),
    templateContext
  );

  switch (self.javascriptOption){
    case 'coffee':
      self.fs.copyTpl(
        path.join(sourceRoot, 'coffee/main.coffee'),
        path.join(destRoot, 'src/coffee/main.coffee'),
        templateContext
      );
    break;

    default:
      self.fs.copyTpl(
        path.join(sourceRoot, 'js/main.js'),
        path.join(destRoot, 'src/js/main.js'),
        templateContext
      );
  }

  if(self.modernizrOption) {
    self.fs.copy(
      path.join(sourceRoot, 'modernizr'),
      path.join(destRoot, 'src/modernizr')
    );

    var ext = '.js';
    if(self.gulpTypeOption === 'coffee') {
      ext = '.coffee';
    }
    self.fs.copy(
      path.join(sourceRoot, 'gulp-tasks/modernizr' + ext),
      path.join(gulpRoot, 'gulp-tasks/modernizr' + ext),
      templateContext
    );
  }

  cb();
}




function copyImageFiles(self, destRoot, sourceRoot, cb) {
  self.fs.copy(
    path.join(sourceRoot, 'img'),
    path.join(destRoot, 'src/img')
  );

  cb();
};




function copyGulpFiles(self, destRoot, gulpRoot, sourceRoot, cb) {
  var templateContext = {
    environmentOption: self.environmentOption,
    templateOption: self.templateOption,
    jsDirPath: self.jsDirPath,
    cssDirPath: self.cssDirPath,
    mainDir: self.mainDir
  }

  var ext = '.js';
  if(self.gulpTypeOption === 'coffee') {
    ext = '.coffee';

    self.fs.copyTpl(
      path.join(sourceRoot, 'gulp/coffee_gulpfile.js'),
      path.join(gulpRoot, 'gulpfile.js'),
      templateContext
    );
  }
  self.fs.copy(
    path.join(sourceRoot, 'gulp/gulp-tasks/clean' + ext),
    path.join(gulpRoot, 'gulp-tasks/clean' + ext)
  );
  self.fs.copy(
    path.join(sourceRoot, 'gulp/gulp-tasks/images' + ext),
    path.join(gulpRoot, 'gulp-tasks/images' + ext)
  );
  self.fs.copyTpl(
    path.join(sourceRoot, 'gulp/gulpfile' + ext),
    path.join(gulpRoot, 'gulpfile' + ext),
    templateContext
  );
  self.fs.copyTpl(
    path.join(sourceRoot, 'gulp/gulp-tasks/browsersync' + ext),
    path.join(gulpRoot, 'gulp-tasks/browsersync' + ext),
    templateContext
  );


  switch (self.templateOption){
    case 'html':
      self.fs.copyTpl(
        path.join(sourceRoot, 'gulp/gulp-tasks/html' + ext),
        path.join(gulpRoot, 'gulp-tasks/html' + ext),
        templateContext
      );
    break;

    case 'jade':
      self.fs.copyTpl(
        path.join(sourceRoot, 'gulp/gulp-tasks/jade' + ext),
        path.join(gulpRoot, 'gulp-tasks/html' + ext),
        templateContext
      );
    break;

    case 'pug':
      self.fs.copyTpl(
        path.join(sourceRoot, 'gulp/gulp-tasks/pug' + ext),
        path.join(gulpRoot, 'gulp-tasks/html' + ext),
        templateContext
      );
    break;

    case 'nunjucks':
      self.fs.copyTpl(
        path.join(sourceRoot, 'gulp/gulp-tasks/nunjucks' + ext),
        path.join(gulpRoot, 'gulp-tasks/html' + ext),
        templateContext
      );
    break;
  }

  cb();
};




function copySvgIconsFiles(self, destRoot, gulpRoot, sourceRoot, cb) {

  if(self.svgiconsOption){
    self.fs.copy(
      path.join(sourceRoot, 'illustrator'),
      path.join(destRoot, 'src/icons/illustrator')
    );
    self.fs.copy(
      path.join(sourceRoot, 'svg'),
      path.join(destRoot, 'src/icons', self.svgIconSpriteName)
    );

    var ext = '.js';
    if(self.gulpTypeOption === 'coffee') {
      ext = '.coffee';
    }
    self.fs.copy(
      path.join(sourceRoot, 'gulp-tasks/svg' + ext),
      path.join(gulpRoot, 'gulp-tasks/svg' + ext)
    );
  }

  cb();
}




function copyIconFontFiles(self, destRoot, gulpRoot, sourceRoot, cb) {
  var templateContext = {
        customIconfontName: self.customIconfontName
      }
  if(self.customIconfontOption){
    self.fs.copy(
      path.join(sourceRoot, 'illustrator'),
      path.join(destRoot, 'src/iconfont/illustrator')
    );
    self.fs.copy(
      path.join(sourceRoot, 'svg'),
      path.join(destRoot, 'src/iconfont/svg')
    );

    // Template file
    switch(self.preproOption) {
        case 'scss':
        self.fs.copy(
          path.join(sourceRoot, 'template/_icons.scss'),
          path.join(destRoot, 'src/iconfont/template/_icons.scss')
        );
        self.fs.copy(
          path.join(sourceRoot, 'scss/_icons.scss'),
          path.join(destRoot, 'src/scss/modules/_icons.scss')
        );
        self.fs.copyTpl(
          path.join(sourceRoot, 'scss/_font-icn.scss'),
          path.join(destRoot, 'src/scss/base/fonts/_font-icn.scss'),
          templateContext
        );
      break;

      case 'stylus':
        self.fs.copy(
          path.join(sourceRoot, 'template/icons.styl'),
          path.join(destRoot, 'src/iconfont/template/icons.styl')
        );
        self.fs.copy(
          path.join(sourceRoot, 'stylus/icons.styl'),
          path.join(destRoot, 'src/stylus/modules/icons.styl')
        );
        self.fs.copyTpl(
          path.join(sourceRoot, 'stylus/font-icn.styl'),
          path.join(destRoot, 'src/stylus/base/fonts/font-icn.styl'),
          templateContext
        );
      break;

      case 'less':
        self.fs.copy(
          path.join(sourceRoot, 'template/icons.less'),
          path.join(destRoot, 'src/iconfont/template/icons.less')
        );
        self.fs.copy(
          path.join(sourceRoot, 'less/icons.less'),
          path.join(destRoot, 'src/less/modules/icons.less')
        );
        self.fs.copyTpl(
          path.join(sourceRoot, 'less/font-icn.less'),
          path.join(destRoot, 'src/less/base/fonts/font-icn.less'),
          templateContext
        );
      break;
    }

    var ext = '.js';
    if(self.gulpTypeOption === 'coffee') {
      ext = '.coffee';
    }
    self.fs.copy(
      path.join(sourceRoot, 'gulp-tasks/iconfont' + ext),
      path.join(gulpRoot, 'gulp-tasks/iconfont' + ext)
    );
  }

  cb();
}




function copyStyleFiles(self, destRoot, gulpRoot, sourceRoot, cb) {
  var wpRoot = path.join(sourceRoot, 'wordpress/blank-theme'),
      templateContext = {
        preproOption: self.preproOption,
        baseStyleOption: self.baseStyleOption,
        mqOption: self.mqOption,
        gridOption: self.gridOption,
        mixinOption: self.mixinOption,
        nodeModules: self.nodeModules,
        imgDir: self.imgDir,
        fontDir: self.fontDir,
        assetsDir: self.assetsDir,
        wpBlankTheme: self.wpBlankTheme,
        postcssOption: self.postcssOption,
        postcssPlugins: self.postcssPlugins,
        postcssCssNanoOption: self.postcssCssNanoOption
      }

  var ext = '.js';
  if(self.gulpTypeOption === 'coffee') {
    ext = '.coffee';
  }
  self.fs.copyTpl(
    path.join(sourceRoot, 'gulp-tasks/styles' + ext),
    path.join(gulpRoot, 'gulp-tasks/styles' + ext),
    templateContext
  );

  if(self.preproOption === 'scss') {

    self.fs.copy(
      path.join(sourceRoot, 'scss/base'),
      path.join(destRoot, 'src/scss/base')
    );
    self.fs.copy(
      path.join(sourceRoot, 'scss/modules'),
      path.join(destRoot, 'src/scss/modules')
    );
    self.fs.copy(
      path.join(sourceRoot, 'scss/pages'),
      path.join(destRoot, 'src/scss/pages')
    );
    self.fs.copy(
      path.join(sourceRoot, 'scss/playground'),
      path.join(destRoot, 'src/scss/playground')
    );
    self.fs.copy(
      path.join(sourceRoot, 'scss/themes'),
      path.join(destRoot, 'src/scss/themes')
    );
    self.fs.copy(
      path.join(sourceRoot, 'scss/views'),
      path.join(destRoot, 'src/scss/views')
    );
    self.fs.copy(
      path.join(sourceRoot, 'scss/tpl/base/_variables.scss'),
      path.join(destRoot, 'src/scss/base/_variables.scss')
    );

    self.fs.copyTpl(
      path.join(sourceRoot, 'scss/tpl/style.scss'),
      path.join(destRoot, 'src/scss/style.scss'),
      templateContext
  );

    switch (self.gridOption){
      case 'semantic':
        self.fs.copy(
          path.join(sourceRoot, 'scss/tpl/base/_semantic-grid.scss'),
          path.join(destRoot, 'src/scss/base/_grid.scss')
        );
      break;

      case 'jeet':
        self.fs.copy(
          path.join(sourceRoot, 'scss/tpl/base/jeet/'),
          path.join(destRoot, 'src/scss/base/jeet/')
        );
        self.fs.copyTpl(
          path.join(sourceRoot, 'scss/tpl/base/_grid.scss'),
          path.join(destRoot, 'src/scss/base/_grid.scss'),
          templateContext
      );
      break;

      default:
        self.fs.copyTpl(
          path.join(sourceRoot, 'scss/tpl/base/_grid.scss'),
          path.join(destRoot, 'src/scss/base/_grid.scss'),
          templateContext
      );
    }


    switch (self.baseStyleOption){
      case 'reset':
        self.fs.copy(
          path.join(sourceRoot, 'scss/tpl/reset/_reset.scss'),
          path.join(destRoot, 'src/scss/base/_reset.scss')
        );
      break;

      case 'normalize':
        self.fs.copy(
          path.join(sourceRoot, 'scss/tpl/reset/_normalize.scss'),
          path.join(destRoot, 'src/scss/base/_normalize.scss')
        );
      break;

      case 'sanitize':
        self.fs.copy(
          path.join(sourceRoot, 'scss/tpl/reset/_sanitize.scss'),
          path.join(destRoot, 'src/scss/base/_sanitize.scss')
        );
      break;
    }

  }


  if(self.preproOption === 'stylus') {

    self.fs.copy(
      path.join(sourceRoot, 'stylus/base'),
      path.join(destRoot, 'src/stylus/base')
    );
    self.fs.copy(
      path.join(sourceRoot, 'stylus/modules'),
      path.join(destRoot, 'src/stylus/modules')
    );
    self.fs.copy(
      path.join(sourceRoot, 'stylus/pages'),
      path.join(destRoot, 'src/stylus/pages')
    );
    self.fs.copy(
      path.join(sourceRoot, 'stylus/playground'),
      path.join(destRoot, 'src/stylus/playground')
    );
    self.fs.copy(
      path.join(sourceRoot, 'stylus/themes'),
      path.join(destRoot, 'src/stylus/themes')
    );
    self.fs.copy(
      path.join(sourceRoot, 'stylus/views'),
      path.join(destRoot, 'src/stylus/views')
    );
    self.fs.copy(
      path.join(sourceRoot, 'stylus/tpl/base/variables.styl'),
      path.join(destRoot, 'src/stylus/base/variables.styl')
    );

    self.fs.copyTpl(
      path.join(sourceRoot, 'stylus/tpl/style.styl'),
      path.join(destRoot, 'src/stylus/style.styl'),
      templateContext
  );


    switch (self.gridOption){
      case 'semantic':
        self.fs.copy(
          path.join(sourceRoot, 'stylus/tpl/base/semantic-grid.styl'),
          path.join(destRoot, 'src/stylus/base/grid.styl')
        );
      break;

      case 'jeet':
        self.fs.copy(
          path.join(sourceRoot, 'stylus/tpl/base/jeet/'),
          path.join(destRoot, 'src/stylus/base/jeet/')
        );
      break;

      default:
        self.fs.copyTpl(
          path.join(sourceRoot, 'stylus/tpl/base/grid.styl'),
          path.join(destRoot, 'src/stylus/base/grid.styl'),
          templateContext
      );
    }

    switch (self.baseStyleOption){
      case 'reset':
        self.fs.copy(
          path.join(sourceRoot, 'stylus/tpl/reset/reset.styl'),
          path.join(destRoot, 'src/stylus/base/reset.styl')
        );
      break;

      case 'normalize':
        self.fs.copy(
          path.join(sourceRoot, 'stylus/tpl/reset/normalize.styl'),
          path.join(destRoot, 'src/stylus/base/normalize.styl')
        );
      break;

      case 'sanitize':
        self.fs.copy(
          path.join(sourceRoot, 'stylus/tpl/reset/sanitize.styl'),
          path.join(destRoot, 'src/stylus/base/sanitize.styl')
        );
      break;
    }
  }


  if(self.preproOption === 'less') {

    self.fs.copy(
      path.join(sourceRoot, 'less/base'),
      path.join(destRoot, 'src/less/base')
    );
    self.fs.copy(
      path.join(sourceRoot, 'less/modules'),
      path.join(destRoot, 'src/less/modules')
    );
    self.fs.copy(
      path.join(sourceRoot, 'less/pages'),
      path.join(destRoot, 'src/less/pages')
    );
    self.fs.copy(
      path.join(sourceRoot, 'less/playground'),
      path.join(destRoot, 'src/less/playground')
    );
    self.fs.copy(
      path.join(sourceRoot, 'less/themes'),
      path.join(destRoot, 'src/less/themes')
    );
    self.fs.copy(
      path.join(sourceRoot, 'less/views'),
      path.join(destRoot, 'src/less/views')
    );
    self.fs.copy(
      path.join(sourceRoot, 'less/tpl/base/variables.less'),
      path.join(destRoot, 'src/less/base/variables.less')
    );

    self.fs.copyTpl(
      path.join(sourceRoot, 'less/tpl/style.less'),
      path.join(destRoot, 'src/less/style.less'),
      templateContext
  );


    switch (self.gridOption){
      case 'semantic':
        self.fs.copy(
          path.join(sourceRoot, 'less/tpl/base/semantic-grid.less'),
          path.join(destRoot, 'src/less/base/grid.less')
        );
      break;

      default:
        self.fs.copyTpl(
          path.join(sourceRoot, 'less/tpl/base/grid.less'),
          path.join(destRoot, 'src/less/base/grid.less'),
          templateContext
      );
    }

    switch (self.mixinOption){
      case 'lesshat':
        self.fs.copy(
          path.join(sourceRoot, 'less/tpl/mixins/lesshat.less'),
          path.join(destRoot, 'src/less/base/mixins/lesshat.less')
        );
        self.fs.copy(
          path.join(sourceRoot, 'less/tpl/mixins/lesshat-prefixed.less'),
          path.join(destRoot, 'src/less/base/mixins/lesshat-prefixed.less')
        );
      break;
    }

    switch (self.mqOption){
      case 'lessmq':
        self.fs.copy(
          path.join(sourceRoot, 'less/tpl/mixins/mq.less'),
          path.join(destRoot, 'src/less/base/mixins/mq.less')
        );
        self.fs.copy(
          path.join(sourceRoot, 'less/tpl/mixins/mq-prefixed.less'),
          path.join(destRoot, 'src/less/base/mixins/mq-prefixed.less')
        );
      break;
    }

    switch (self.baseStyleOption){
      case 'reset':
        self.fs.copy(
          path.join(sourceRoot, 'less/tpl/reset/reset.less'),
          path.join(destRoot, 'src/less/base/reset.less')
        );
      break;

      case 'normalize':
        self.fs.copy(
          path.join(sourceRoot, 'less/tpl/reset/normalize.less'),
          path.join(destRoot, 'src/less/base/normalize.less')
        );
      break;

      case 'sanitize':
        self.fs.copy(
          path.join(sourceRoot, 'less/tpl/reset/sanitize.less'),
          path.join(destRoot, 'src/less/base/sanitize.less')
        );
      break;
    }
  }

  if(self.wpBlankTheme){
    switch(self.preproOption) {
      case 'scss':
        self.fs.copy(
          path.join(wpRoot, 'wp-core.css'),
          path.join(destRoot, 'src/scss/base/_wp-core.scss')
      );
      break;
      case 'stylus':
        self.fs.copy(
          path.join(wpRoot, 'wp-core.css'),
          path.join(destRoot, 'src/stylus/base/wp-core.styl')
      );
      break;
      case 'less':
        self.fs.copy(
          path.join(wpRoot, 'wp-core.css'),
          path.join(destRoot, 'src/less/base/wp-core.less')
      );
      break;
    }
  }

  cb();
}





module.exports = {
  copyProjectFiles: copyProjectFiles,
  copyWordpressFiles: copyWordpressFiles,
  copyExpressFiles: copyExpressFiles,
  copyH5bpFiles: copyH5bpFiles,
  copyHtmlFiles: copyHtmlFiles,
  copyImageFiles: copyImageFiles,
  copySvgIconsFiles: copySvgIconsFiles,
  copyIconFontFiles: copyIconFontFiles,
  copyJsFiles: copyJsFiles,
  copyStyleFiles: copyStyleFiles,
  copyGulpFiles: copyGulpFiles
};
