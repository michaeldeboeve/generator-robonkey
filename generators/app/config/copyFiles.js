'use strict';
var fs          = require('fs'),
    jsonfile    = require('jsonfile'),
    mkdirp      = require('mkdirp'),
    printTitle  = require('../helpers/printTitle');




function copyFiles (self, destRoot, gulpRoot, sourceRoot, cb) {
  if(!self.calledFrom) console.log(printTitle('Copying Files'));

  copyProjectFiles(self, destRoot, gulpRoot, sourceRoot, function(){});
  copyWordpressFiles(self, destRoot, gulpRoot, sourceRoot, function(){});
  copyExpressFiles(self, destRoot, gulpRoot, sourceRoot, function(){});
  copyH5bpFiles(self, destRoot, gulpRoot, sourceRoot, function(){});
  copyHtmlFiles(self, destRoot, gulpRoot, sourceRoot, function(){});
  copyImageFiles(self, destRoot, gulpRoot, sourceRoot, function(){});
  copyIconFontFiles(self, destRoot, gulpRoot, sourceRoot, function(){});
  copyJsFiles(self, destRoot, gulpRoot, sourceRoot, function(){});
  copyStyleFiles(self, destRoot, gulpRoot, sourceRoot, function(){});
  copyGulpFiles(self, destRoot, gulpRoot, sourceRoot, function(){});

  cb()
}




function copyProjectFiles(self, destRoot, gulpRoot, sourceRoot, cb){
  // console.log(destRoot  + '/' +  self.templateDest + self.jsDirPath)
  mkdirp(destRoot + '/src');

  mkdirp(destRoot  + '/' +  self.templateDest + self.jsDirPath);
  mkdirp(destRoot  + '/' +  self.templateDest + self.jsLibDirPath);
  mkdirp(destRoot  + '/' +  self.templateDest + self.imgDirPath);
  mkdirp(destRoot  + '/' +  self.templateDest + self.cssDirPath);
  mkdirp(destRoot  + '/' +  self.templateDest + self.cssLibDirPath);
  mkdirp(destRoot  + '/' +  self.templateDest + self.fontDirPath);

  self.fs.copy(sourceRoot + '/project/_editorconfig', destRoot + '/.editorconfig');
  self.fs.copy(sourceRoot + '/project/_gitignore', destRoot + '/.gitignore');
  self.fs.copy(sourceRoot + '/project/_gitattributes', destRoot + '/.gitattributes');
  // self.fs.copyTpl(sourceRoot + '/project/README.md', destRoot + '/README.md', templateContext);

  cb()
}




function copyExpressFiles(self, destRoot, gulpRoot, sourceRoot, cb){
  if(self.environmentOption === 'express'){
    self.fs.copy(sourceRoot + '/express/bin', destRoot + '/' + self.templateDest + '/bin');
    self.fs.copy(sourceRoot + '/express/routes', destRoot + '/' + self.templateDest + '/routes');
    self.fs.copy(sourceRoot + '/express/views', destRoot + '/' + self.templateDest + '/views');
    self.fs.copy(sourceRoot + '/express/app.js', destRoot + '/' + self.templateDest + '/app.js');
    self.fs.copy(sourceRoot + '/express/package.json', destRoot + '/' + self.templateDest + '/package.json');
  }

  cb();
}




function copyWordpressFiles(self, destRoot, gulpRoot, sourceRoot, cb) {
  var wpRoot = sourceRoot + '/wordpress/blank-theme',
      wpDest  = destRoot + '/' + self.templateDest,
      templateContext = {
        themeAuthor: self.themeAuthor,
        themeAuthorURI: self.themeAuthorURI,
        themeName: self.themeName,
        themeNameSpace: self.themeNameSpace,
        jsDirPath: self.jsDirPath,
        jsLibDirPath: self.jsLibDirPath,
        cssDirPath: self.cssDirPath,
        cssLibDirPath: self.cssLibDirPath
      }


  if(self.environmentOption === 'wordpress' && self.wpBlankTheme === true) {
    self.fs.copy(wpRoot + '/_inc', wpDest + '/_inc');
    self.fs.copy(wpRoot + '/screenshot.png', wpDest + '/screenshot.png');

    self.fs.copyTpl(wpRoot + '/404.php', wpDest + '/404.php', templateContext);
    self.fs.copyTpl(wpRoot + '/archive.php', wpDest + '/archive.php', templateContext);
    self.fs.copyTpl(wpRoot + '/comments.php', wpDest + '/comments.php', templateContext);
    self.fs.copyTpl(wpRoot + '/footer.php', wpDest + '/footer.php', templateContext);
    self.fs.copyTpl(wpRoot + '/functions.php', wpDest + '/functions.php', templateContext);
    self.fs.copyTpl(wpRoot + '/header.php', wpDest + '/header.php', templateContext);
    self.fs.copyTpl(wpRoot + '/index.php', wpDest + '/index.php', templateContext);
    self.fs.copyTpl(wpRoot + '/options.php', wpDest + '/options.php', templateContext);
    self.fs.copyTpl(wpRoot + '/page.php', wpDest + '/page.php', templateContext);
    self.fs.copyTpl(wpRoot + '/search.php', wpDest + '/search.php', templateContext);
    self.fs.copyTpl(wpRoot + '/searchform.php', wpDest + '/searchform.php', templateContext);
    self.fs.copyTpl(wpRoot + '/sidebar.php', wpDest + '/sidebar.php', templateContext);
    self.fs.copyTpl(wpRoot + '/single.php', wpDest + '/single.php', templateContext);
    self.fs.copyTpl(wpRoot + '/style.css', wpDest + '/style.css', templateContext);
  }



  cb()
}




function copyH5bpFiles(self, destRoot, gulpRoot, sourceRoot, cb) {
  var templateContext = {
        imgDirPath: self.imgDirPath
      }
  if(self.gulpDirOption) gulpRoot = destRoot + '/gulp';

  if(self.environmentOption === 'static') {

    self.fs.copyTpl(sourceRoot + '/website/browserconfig.xml', destRoot + '/' + self.mainDir + '/browserconfig.xml', templateContext);
    self.fs.copy(sourceRoot + '/website/htaccess.txt', destRoot + '/' + self.mainDir + '/.htaccess');

    self.fs.copy(sourceRoot + '/website/crossdomain.xml', destRoot + '/' + self.mainDir + '/crossdomain.xml');
    self.fs.copy(sourceRoot + '/website/robots.txt', destRoot + '/' + self.mainDir + '/robots.txt');
  }

  cb();
}




function copyHtmlFiles(self, destRoot, gulpRoot, sourceRoot, cb) {
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
  if(self.gulpDirOption) gulpRoot = destRoot + '/gulp';

  if(self.environmentOption === 'static' || self.environmentOption === 'express') {
    switch (self.templateOption){
      case 'jade':
        if(self.environmentOption === 'express') {
          destRoot = destRoot + '/' + self.mainDir + '/views';
        } else {
          destRoot = destRoot + '/src/jade';
        }

        self.fs.copy(sourceRoot + '/jade', destRoot);
        self.fs.copyTpl(sourceRoot + '/tpl/jade/index.jade', destRoot + '/index.jade', templateContext);
        self.fs.copyTpl(sourceRoot + '/tpl/jade/templates/layout.jade', destRoot + '/templates/layout.jade', templateContext);
      break;

      case 'nunjucks':
      if(self.environmentOption === 'express') {
        destRoot = destRoot + '/' + self.mainDir + '/views';
      } else {
        destRoot = destRoot + '/src/nunjucks';
      }
        self.fs.copy(sourceRoot + '/nunjucks', destRoot);
        self.fs.copyTpl(sourceRoot + '/tpl/nunjucks/base/layout.html', destRoot + '/base/layout.html', templateContext);
      break;

      default:
        self.fs.copyTpl(sourceRoot + '/website/index.html', destRoot + '/' + self.mainDir + '/index.html', templateContext);
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
        javascriptOption: self.javascriptOption
      }
  if(self.gulpDirOption) gulpRoot = destRoot + '/gulp';

  if(self.gulpTypeOption === 'coffee') {
    self.fs.copyTpl(sourceRoot + '/gulp-tasks/bower.coffee', gulpRoot + '/gulp-tasks/bower.coffee', templateContext);
    self.fs.copyTpl(sourceRoot + '/gulp-tasks/scripts.coffee', gulpRoot + '/gulp-tasks/scripts.coffee', templateContext);
  } else {
    self.fs.copyTpl(sourceRoot + '/gulp-tasks/bower.js', gulpRoot + '/gulp-tasks/bower.js', templateContext);
    self.fs.copyTpl(sourceRoot + '/gulp-tasks/scripts.js', gulpRoot + '/gulp-tasks/scripts.js', templateContext);
  }

  switch (self.javascriptOption){
    case 'coffee':
      self.fs.copyTpl(sourceRoot + '/coffee/main.coffee', destRoot + '/src/coffee/main.coffee', templateContext);
    break;

    default:
      self.fs.copyTpl(sourceRoot + '/js/main.js', destRoot + '/src/js/main.js', templateContext);
  }

  if(self.modernizrOption) {
    self.fs.copy(sourceRoot + '/modernizr', destRoot + '/src/modernizr');

    if(self.gulpTypeOption === 'coffee') {
      self.fs.copy(sourceRoot + '/gulp-tasks/modernizr.coffee', gulpRoot + '/gulp-tasks/modernizr.coffee', templateContext);
    } else {
      self.fs.copy(sourceRoot + '/gulp-tasks/modernizr.js', gulpRoot + '/gulp-tasks/modernizr.js', templateContext);
    }
  }
}




function copyImageFiles(self, destRoot, gulpRoot, sourceRoot, cb) {
  self.fs.copy(sourceRoot + '/img', destRoot + '/src/img');

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

  if(self.gulpTypeOption === 'coffee') {
    self.fs.copy(sourceRoot + '/gulp/gulp-tasks/clean.coffee', gulpRoot + '/gulp-tasks/clean.coffee');
    self.fs.copy(sourceRoot + '/gulp/gulp-tasks/images.coffee', gulpRoot + '/gulp-tasks/images.coffee');

    self.fs.copyTpl(sourceRoot + '/gulp/coffee_gulpfile.js', gulpRoot + '/gulpfile.js', templateContext);
    self.fs.copyTpl(sourceRoot + '/gulp/gulpfile.coffee', gulpRoot + '/gulpfile.coffee', templateContext);
    self.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/browsersync.coffee', gulpRoot + '/gulp-tasks/browsersync.coffee', templateContext);


    switch (self.templateOption){
      case 'html':
        self.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/html.coffee', gulpRoot + '/gulp-tasks/html.coffee', templateContext);
      break;

      case 'jade':
        self.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/jade.coffee', gulpRoot + '/gulp-tasks/html.coffee', templateContext);
      break;

      case 'nunjucks':
        self.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/nunjucks.coffee', gulpRoot + '/gulp-tasks/html.coffee', templateContext);
      break;
    }
  } else {
    self.fs.copy(sourceRoot + '/gulp/gulp-tasks/clean.js', gulpRoot + '/gulp-tasks/clean.js');
    self.fs.copy(sourceRoot + '/gulp/gulp-tasks/images.js', gulpRoot + '/gulp-tasks/images.js');

    self.fs.copyTpl(sourceRoot + '/gulp/gulpfile.js', gulpRoot + '/gulpfile.js', templateContext);
    self.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/browsersync.js', gulpRoot + '/gulp-tasks/browsersync.js', templateContext);


    switch (self.templateOption){
      case 'html':
        self.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/html.js', gulpRoot + '/gulp-tasks/html.js', templateContext);
      break;

      case 'jade':
        self.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/jade.js', gulpRoot + '/gulp-tasks/html.js', templateContext);
      break;

      case 'nunjucks':
        self.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/nunjucks.js', gulpRoot + '/gulp-tasks/html.js', templateContext);
      break;
    }
  }

  cb();
};




function copyIconFontFiles(self, destRoot, gulpRoot, sourceRoot, cb) {
  var templateContext = {
        customIconFontName: self.customIconFontName
      }
  if(this.iconfontOption){
    self.fs.copy(sourceRoot + '/illustrator', destRoot + '/src/iconfont/illustrator');
    self.fs.copy(sourceRoot + '/svg', destRoot + '/src/iconfont/svg');

    // Template file
    switch(self.preproOption) {
        case 'scss':
        self.fs.copy(sourceRoot + '/template/_icons.scss', destRoot + '/src/iconfont/template/_icons.scss');
        self.fs.copy(sourceRoot + '/scss/_icons.scss', destRoot + '/src/scss/modules/_icons.scss');
        self.fs.copyTpl(sourceRoot + '/scss/_font-icn.scss', destRoot + '/src/scss/base/fonts/_font-icn.scss', templateContext);
      break;

      case 'stylus':
        self.fs.copy(sourceRoot + '/template/icons.styl', destRoot + '/src/iconfont/template/icons.styl');
        self.fs.copy(sourceRoot + '/stylus/icons.styl', destRoot + '/src/stylus/modules/icons.styl');
        self.fs.copyTpl(sourceRoot + '/stylus/font-icn.styl', destRoot + '/src/stylus/base/fonts/font-icn.styl', templateContext);
      break;

      case 'less':
        self.fs.copy(sourceRoot + '/template/icons.less', destRoot + '/src/iconfont/template/icons.less');
        self.fs.copy(sourceRoot + '/less/icons.less', destRoot + '/src/less/modules/icons.less');
        self.fs.copyTpl(sourceRoot + '/less/font-icn.less', destRoot + '/src/less/base/fonts/font-icn.less', templateContext);
      break;
    }

    if(self.gulpTypeOption === 'coffee') {
      self.fs.copy(sourceRoot + '/gulp-tasks/iconfont.coffee', gulpRoot + '/gulp-tasks/iconfont.coffee');
    } else {
      self.fs.copy(sourceRoot + '/gulp-tasks/iconfont.js', gulpRoot + '/gulp-tasks/iconfont.js');
    }
  }

  cb()
}




function copyStyleFiles(self, destRoot, gulpRoot, sourceRoot, cb) {
  var wpRoot = sourceRoot + '/wordpress/blank-theme',
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

  if(self.gulpTypeOption === 'coffee') {
    self.fs.copyTpl(sourceRoot + '/gulp-tasks/styles.coffee', gulpRoot + '/gulp-tasks/styles.coffee', templateContext);
  } else {
    self.fs.copyTpl(sourceRoot + '/gulp-tasks/styles.js', gulpRoot + '/gulp-tasks/styles.js', templateContext);
  }

  if(self.preproOption === 'scss') {

    self.fs.copy(sourceRoot + '/scss/base', destRoot + '/src/scss/base');
    self.fs.copy(sourceRoot + '/scss/modules', destRoot + '/src/scss/modules');
    self.fs.copy(sourceRoot + '/scss/pages', destRoot + '/src/scss/pages');
    self.fs.copy(sourceRoot + '/scss/playground', destRoot + '/src/scss/playground');
    self.fs.copy(sourceRoot + '/scss/themes', destRoot + '/src/scss/themes');
    self.fs.copy(sourceRoot + '/scss/views', destRoot + '/src/scss/views');
    self.fs.copy(sourceRoot + '/scss/tpl/base/_variables.scss', destRoot + '/src/scss/base/_variables.scss');

    self.fs.copyTpl(sourceRoot + '/scss/tpl/style.scss', destRoot + '/src/scss/style.scss', templateContext);

    switch (self.gridOption){
      case 'semantic':
        self.fs.copy(sourceRoot + '/scss/tpl/base/_semantic-grid.scss', destRoot + '/src/scss/base/_grid.scss');
      break;

      case 'jeet':
        self.fs.copy(sourceRoot + '/scss/tpl/base/jeet/', destRoot + '/src/scss/base/jeet/');
        self.fs.copyTpl(sourceRoot + '/scss/tpl/base/_grid.scss', destRoot + '/src/scss/base/_grid.scss', templateContext);
      break;

      default:
        self.fs.copyTpl(sourceRoot + '/scss/tpl/base/_grid.scss', destRoot + '/src/scss/base/_grid.scss', templateContext);
    }


    switch (self.baseStyleOption){
      case 'reset':
        self.fs.copy(sourceRoot + '/scss/tpl/reset/_reset.scss', destRoot + '/src/scss/base/_reset.scss');
      break;

      case 'normalize':
        self.fs.copy(sourceRoot + '/scss/tpl/reset/_normalize.scss', destRoot + '/src/scss/base/_normalize.scss');
      break;

      case 'sanitize':
        self.fs.copy(sourceRoot + '/scss/tpl/reset/_sanitize.scss', destRoot + '/src/scss/base/_sanitize.scss');
      break;
    }

  }


  if(self.preproOption === 'stylus') {

    self.fs.copy(sourceRoot + '/stylus/base', destRoot + '/src/stylus/base');
    self.fs.copy(sourceRoot + '/stylus/modules', destRoot + '/src/stylus/modules');
    self.fs.copy(sourceRoot + '/stylus/pages', destRoot + '/src/stylus/pages');
    self.fs.copy(sourceRoot + '/stylus/playground', destRoot + '/src/stylus/playground');
    self.fs.copy(sourceRoot + '/stylus/themes', destRoot + '/src/stylus/themes');
    self.fs.copy(sourceRoot + '/stylus/views', destRoot + '/src/stylus/views');
    self.fs.copy(sourceRoot + '/stylus/tpl/base/variables.styl', destRoot + '/src/stylus/base/variables.styl');

    self.fs.copyTpl(sourceRoot + '/stylus/tpl/style.styl', destRoot + '/src/stylus/style.styl', templateContext);


    switch (self.gridOption){
      case 'semantic':
        self.fs.copy(sourceRoot + '/stylus/tpl/base/semantic-grid.styl', destRoot + '/src/stylus/base/grid.styl');
      break;

      case 'jeet':
        self.fs.copy(sourceRoot + '/stylus/tpl/base/jeet/', destRoot + '/src/stylus/base/jeet/');
      break;

      default:
        self.fs.copyTpl(sourceRoot + '/stylus/tpl/base/grid.styl', destRoot + '/src/stylus/base/grid.styl', templateContext);
    }

    switch (self.baseStyleOption){
      case 'reset':
        self.fs.copy(sourceRoot + '/stylus/tpl/reset/reset.styl', destRoot + '/src/stylus/base/reset.styl');
      break;

      case 'normalize':
        self.fs.copy(sourceRoot + '/stylus/tpl/reset/normalize.styl', destRoot + '/src/stylus/base/normalize.styl');
      break;

      case 'sanitize':
        self.fs.copy(sourceRoot + '/stylus/tpl/reset/sanitize.styl', destRoot + '/src/stylus/base/sanitize.styl');
      break;
    }
  }


  if(self.preproOption === 'less') {

    self.fs.copy(sourceRoot + '/less/base', destRoot + '/src/less/base');
    self.fs.copy(sourceRoot + '/less/modules', destRoot + '/src/less/modules');
    self.fs.copy(sourceRoot + '/less/pages', destRoot + '/src/less/pages');
    self.fs.copy(sourceRoot + '/less/playground', destRoot + '/src/less/playground');
    self.fs.copy(sourceRoot + '/less/themes', destRoot + '/src/less/themes');
    self.fs.copy(sourceRoot + '/less/views', destRoot + '/src/less/views');
    self.fs.copy(sourceRoot + '/less/tpl/base/variables.less', destRoot + '/src/less/base/variables.less');

    self.fs.copyTpl(sourceRoot + '/less/tpl/style.less', destRoot + '/src/less/style.less', templateContext);


    switch (self.gridOption){
      case 'semantic':
        self.fs.copy(sourceRoot + '/less/tpl/base/semantic-grid.less', destRoot + '/src/less/base/grid.less');
      break;

      default:
        self.fs.copyTpl(sourceRoot + '/less/tpl/base/grid.less', destRoot + '/src/less/base/grid.less', templateContext);
    }

    switch (self.mixinOption){
      case 'lesshat':
        self.fs.copy(sourceRoot + '/less/tpl/mixins/lesshat.less', destRoot + '/src/less/base/mixins/lesshat.less');
        self.fs.copy(sourceRoot + '/less/tpl/mixins/lesshat-prefixed.less', destRoot + '/src/less/base/mixins/lesshat-prefixed.less');
      break;
    }

    switch (self.mqOption){
      case 'lessmq':
        self.fs.copy(sourceRoot + '/less/tpl/mixins/mq.less', destRoot + '/src/less/base/mixins/mq.less');
        self.fs.copy(sourceRoot + '/less/tpl/mixins/mq-prefixed.less', destRoot + '/src/less/base/mixins/mq-prefixed.less');
      break;
    }

    switch (self.baseStyleOption){
      case 'reset':
        self.fs.copy(sourceRoot + '/less/tpl/reset/reset.less', destRoot + '/src/less/base/reset.less');
      break;

      case 'normalize':
        self.fs.copy(sourceRoot + '/less/tpl/reset/normalize.less', destRoot + '/src/less/base/normalize.less');
      break;

      case 'sanitize':
        self.fs.copy(sourceRoot + '/less/tpl/reset/sanitize.less', destRoot + '/src/less/base/sanitize.less');
      break;
    }
  }

  if(self.wpBlankTheme){
    switch(self.preproOption) {
      case 'scss':
        self.fs.copy(wpRoot + '/wp-core.css', destRoot + '/src/scss/base/_wp-core.scss');
      break;
      case 'stylus':
        self.fs.copy(wpRoot + '/wp-core.css', destRoot + '/src/stylus/base/wp-core.styl');
      break;
      case 'less':
        self.fs.copy(wpRoot + '/wp-core.css', destRoot + '/src/less/base/wp-core.less');
      break;
    }
  }

  cb()
}





module.exports = {
  copyFiles: copyFiles,
  copyProjectFiles: copyProjectFiles,
  copyWordpressFiles: copyWordpressFiles,
  copyExpressFiles: copyExpressFiles,
  copyH5bpFiles: copyH5bpFiles,
  copyHtmlFiles: copyHtmlFiles,
  copyImageFiles: copyImageFiles,
  copyIconFontFiles: copyIconFontFiles,
  copyJsFiles: copyJsFiles,
  copyStyleFiles: copyStyleFiles,
  copyGulpFiles: copyGulpFiles
};
