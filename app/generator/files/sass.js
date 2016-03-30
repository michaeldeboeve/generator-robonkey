/**
 * Generate files specific to sass files
 */

'use strict';
var mkdirp = require('mkdirp'),
    fs = require('fs');

var sassFiles = function sassFiles(destRoot, sourceRoot, templateContext, context) {
  var self = context;
  var is = templateContext;

  if(is.preproOption === 'sass') {
    // Static
    self.fs.copy(sourceRoot + '/src/scss/base', destRoot + '/src/scss/base');
    self.fs.copy(sourceRoot + '/src/scss/modules', destRoot + '/src/scss/modules');
    self.fs.copy(sourceRoot + '/src/scss/pages', destRoot + '/src/scss/pages');
    self.fs.copy(sourceRoot + '/src/scss/playground', destRoot + '/src/scss/playground');
    self.fs.copy(sourceRoot + '/src/scss/themes', destRoot + '/src/scss/themes');
    self.fs.copy(sourceRoot + '/src/scss/views', destRoot + '/src/scss/views');

    // Dynamic
    self.fs.copyTpl(sourceRoot + '/src-tpl/scss/base/_fonts.scss', destRoot + '/src/scss/base/_fonts.scss', templateContext);
    self.fs.copyTpl(sourceRoot + '/src-tpl/scss/base/_variables.scss', destRoot + '/src/scss/base/_variables.scss', templateContext);
    self.fs.copyTpl(sourceRoot + '/src-tpl/scss/style.scss', destRoot + '/src/scss/style.scss', templateContext);

    switch (is.gridOption){
      case 'semantic': self.fs.copy(sourceRoot + '/src-tpl/scss/base/_semantic-grid.scss', destRoot + '/src/scss/base/_grid.scss');
      break;

      case 'jeet': self.fs.copy(sourceRoot + '/src/scss/base/jeet/', destRoot + '/src/scss/base/jeet/');
      break;

      default: self.fs.copyTpl(sourceRoot + '/src-tpl/scss/base/_grid.scss', destRoot + '/src/scss/base/_grid.scss', templateContext);
    }

    if(is.customIconfontOption) {
      self.fs.copyTpl(sourceRoot + '/src-tpl/scss/modules/_icons.scss', destRoot + '/src/scss/modules/_icons.scss', templateContext);
      self.fs.copy(sourceRoot + '/src/iconfont/template/_icons.scss', destRoot + '/src/iconfont/template/_icons.scss');
    }

    if(is.mqOption === 'breakpoint') {
      self.fs.copy(sourceRoot + '/src-tpl/scss/mixins/_mediaqueries.scss', destRoot + '/src/scss/mixins/_mediaqueries.scss');
    }

    switch (is.baseStyleOption){
      case 'reset': self.fs.copy(sourceRoot + '/src-tpl/scss/reset/_reset.scss', destRoot + '/src/scss/base/_reset.scss');
      break;

      case 'normalize': self.fs.copy(sourceRoot + '/src-tpl/scss/reset/_normalize.scss', destRoot + '/src/scss/base/_normalize.scss');
      break;

      case 'sanitize': self.fs.copy(sourceRoot + '/src-tpl/scss/reset/_sanitize.scss', destRoot + '/src/scss/base/_sanitize.scss');
      break;
    }

  }
};

module.exports = sassFiles;
