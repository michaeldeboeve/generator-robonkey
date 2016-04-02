/**
 * Generate files specific to less files
 */

'use strict';
var mkdirp = require('mkdirp'),
    fs = require('fs');


var lessFiles = function lessFiles() {
  var destRoot = this.destinationRoot(),
      sourceRoot = this.sourceRoot();

  if(this.preproOption === 'less') {
    this.fs.copy(sourceRoot + '/src/less/base', destRoot + '/src/less/base');
    this.fs.copy(sourceRoot + '/src/less/modules', destRoot + '/src/less/modules');
    this.fs.copy(sourceRoot + '/src/less/pages', destRoot + '/src/less/pages');
    this.fs.copy(sourceRoot + '/src/less/playground', destRoot + '/src/less/playground');
    this.fs.copy(sourceRoot + '/src/less/themes', destRoot + '/src/less/themes');
    this.fs.copy(sourceRoot + '/src/less/views', destRoot + '/src/less/views');

    // Dynamic
    this.fs.copyTpl(sourceRoot + '/src-tpl/less/base/fonts.less', destRoot + '/src/less/base/fonts.less', this.templateContext);
    this.fs.copyTpl(sourceRoot + '/src-tpl/less/base/variables.less', destRoot + '/src/less/base/variables.less', this.templateContext);
    this.fs.copyTpl(sourceRoot + '/src-tpl/less/style.less', destRoot + '/src/less/style.less', this.templateContext);

    if(this.gridOption === 'semantic') {
      this.fs.copy(sourceRoot + '/src-tpl/less/base/semantic-grid.less', destRoot + '/src/less/base/grid.less');
    } else {
      this.fs.copyTpl(sourceRoot + '/src-tpl/less/base/grid.less', destRoot + '/src/less/base/grid.less', this.templateContext);
    }

    if(this.mixinOption === 'lesshat') {
      this.fs.copy(sourceRoot + '/src-tpl/less/mixins/lesshat.less', destRoot + '/src/less/base/mixins/lesshat.less');
      this.fs.copy(sourceRoot + '/src-tpl/less/mixins/lesshat-prefixed.less', destRoot + '/src/less/base/mixins/lesshat-prefixed.less');
    }

    if(this.mqOption === 'lessmq') {
      this.fs.copy(sourceRoot + '/src-tpl/less/mixins/mq.less', destRoot + '/src/less/base/mixins/mq.less');
      this.fs.copy(sourceRoot + '/src-tpl/less/mixins/mq-prefixed.less', destRoot + '/src/less/base/mixins/mq-prefixed.less');
    }

    if(this.customIconfontOption) {
      this.fs.copyTpl(sourceRoot + '/src-tpl/less/modules/icons.less', destRoot + '/src/less/modules/icons.less', this.templateContext);
      this.fs.copy(sourceRoot + '/src/iconfont/template/icons.less', destRoot + '/src/iconfont/template/icons.less');
    }

    switch (this.baseStyleOption){
      case 'reset': this.fs.copy(sourceRoot + '/src-tpl/less/reset/reset.less', destRoot + '/src/less/base/reset.less');
      break;

      case 'normalize': this.fs.copy(sourceRoot + '/src-tpl/less/reset/normalize.less', destRoot + '/src/less/base/normalize.less');
      break;

      case 'sanitize': this.fs.copy(sourceRoot + '/src-tpl/less/reset/sanitize.less', destRoot + '/src/less/base/sanitize.less');
      break;
    }
  }
};

module.exports = lessFiles;
