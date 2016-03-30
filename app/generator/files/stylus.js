/**
 * Generate files specific to stylus files
 */

'use strict';
var mkdirp = require('mkdirp'),
    fs = require('fs');

var stylusFiles = function stylusFiles(destRoot, sourceRoot, templateContext, context) {
  var self = context;
  var is = templateContext;

  if(is.preproOption === 'stylus') {
    // Static
    self.fs.copy(sourceRoot + '/src/stylus/base', destRoot + '/src/stylus/base');
    self.fs.copy(sourceRoot + '/src/stylus/modules', destRoot + '/src/stylus/modules');
    self.fs.copy(sourceRoot + '/src/stylus/pages', destRoot + '/src/stylus/pages');
    self.fs.copy(sourceRoot + '/src/stylus/playground', destRoot + '/src/stylus/playground');
    self.fs.copy(sourceRoot + '/src/stylus/themes', destRoot + '/src/stylus/themes');
    self.fs.copy(sourceRoot + '/src/stylus/views', destRoot + '/src/stylus/views');

    // Dynamic
    self.fs.copyTpl(sourceRoot + '/src-tpl/stylus/base/fonts.styl', destRoot + '/src/stylus/base/fonts.styl', templateContext);
    self.fs.copyTpl(sourceRoot + '/src-tpl/stylus/base/variables.styl', destRoot + '/src/stylus/base/variables.styl', templateContext);
    self.fs.copyTpl(sourceRoot + '/src-tpl/stylus/style.styl', destRoot + '/src/stylus/style.styl', templateContext);

    switch (is.gridOption){
      case 'semantic': self.fs.copy(sourceRoot + '/src-tpl/stylus/base/_semantic-grid.styl', destRoot + '/src/stylus/base/_grid.styl');
      break;

      case 'jeet': self.fs.copy(sourceRoot + '/src/stylus/base/jeet/', destRoot + '/src/stylus/base/jeet/');
      break;

      default: self.fs.copyTpl(sourceRoot + '/src-tpl/stylus/base/grid.styl', destRoot + '/src/stylus/base/grid.styl', templateContext);
    }


    if(is.customIconfontOption) {
      self.fs.copyTpl(sourceRoot + '/src-tpl/stylus/modules/icons.styl', destRoot + '/src/stylus/modules/icons.styl', templateContext);
      self.fs.copy(sourceRoot + '/src/iconfont/template/icons.styl', destRoot + '/src/iconfont/template/icons.styl');
    }

    switch (is.baseStyleOption){
      case 'reset': self.fs.copy(sourceRoot + '/src-tpl/stylus/reset/reset.styl', destRoot + '/src/stylus/base/reset.styl');
      break;

      case 'normalize': self.fs.copy(sourceRoot + '/src-tpl/stylus/reset/normalize.styl', destRoot + '/src/stylus/base/normalize.styl');
      break;

      case 'sanitize': self.fs.copy(sourceRoot + '/src-tpl/stylus/reset/sanitize.styl', destRoot + '/src/stylus/base/sanitize.styl');
      break;
    }
  }
};

module.exports = stylusFiles;
