/**
 * Generate files specific to less files
 */

'use strict';
var mkdirp = require('mkdirp'),
    fs = require('fs');

var lessFiles = function lessFiles(destRoot, sourceRoot, templateContext, context) {
  var self = context;
  var is = templateContext;

  if(is.preproOption === 'less') {
    self.fs.copy(sourceRoot + '/src/less/base', destRoot + '/src/less/base');
    self.fs.copy(sourceRoot + '/src/less/modules', destRoot + '/src/less/modules');
    self.fs.copy(sourceRoot + '/src/less/pages', destRoot + '/src/less/pages');
    self.fs.copy(sourceRoot + '/src/less/playground', destRoot + '/src/less/playground');
    self.fs.copy(sourceRoot + '/src/less/themes', destRoot + '/src/less/themes');
    self.fs.copy(sourceRoot + '/src/less/views', destRoot + '/src/less/views');

    // Dynamic
    self.fs.copyTpl(sourceRoot + '/src-tpl/less/base/fonts.less', destRoot + '/src/less/base/fonts.less', templateContext);
    self.fs.copyTpl(sourceRoot + '/src-tpl/less/base/variables.less', destRoot + '/src/less/base/variables.less', templateContext);
    self.fs.copyTpl(sourceRoot + '/src-tpl/less/style.less', destRoot + '/src/less/style.less', templateContext);

    if(is.gridOption === 'semantic') {
      self.fs.copy(sourceRoot + '/src-tpl/less/base/semantic-grid.less', destRoot + '/src/less/base/grid.less');
    } else {
      self.fs.copyTpl(sourceRoot + '/src-tpl/less/base/grid.less', destRoot + '/src/less/base/grid.less', templateContext);
    }

    if(is.mixinOption === 'lesshat') {
      self.fs.copy(sourceRoot + '/src-tpl/less/mixins/lesshat.less', destRoot + '/src/less/base/mixins/lesshat.less');
      self.fs.copy(sourceRoot + '/src-tpl/less/mixins/lesshat-prefixed.less', destRoot + '/src/less/base/mixins/lesshat-prefixed.less');
    }

    if(is.mqOption === 'lessmq') {
      self.fs.copy(sourceRoot + '/src-tpl/less/mixins/mq.less', destRoot + '/src/less/base/mixins/mq.less');
      self.fs.copy(sourceRoot + '/src-tpl/less/mixins/mq-prefixed.less', destRoot + '/src/less/base/mixins/mq-prefixed.less');
    }

    if(is.customIconfontOption) {
      self.fs.copyTpl(sourceRoot + '/src-tpl/less/modules/icons.less', destRoot + '/src/less/modules/icons.less', templateContext);
      self.fs.copy(sourceRoot + '/src/iconfont/template/icons.less', destRoot + '/src/iconfont/template/icons.less');
    }

    switch (is.baseStyleOption){
      case 'reset': self.fs.copy(sourceRoot + '/src-tpl/less/reset/reset.less', destRoot + '/src/less/base/reset.less');
      break;

      case 'normalize': self.fs.copy(sourceRoot + '/src-tpl/less/reset/normalize.less', destRoot + '/src/less/base/normalize.less');
      break;

      case 'sanitize': self.fs.copy(sourceRoot + '/src-tpl/less/reset/sanitize.less', destRoot + '/src/less/base/sanitize.less');
      break;
    }
  }
};

module.exports = lessFiles;
