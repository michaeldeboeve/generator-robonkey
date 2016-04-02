/**
 * Generate files specific to sass files
 */

'use strict';
var mkdirp = require('mkdirp'),
    fs = require('fs');


var sassFiles = function sassFiles() {
  var destRoot = this.destinationRoot(),
      sourceRoot = this.sourceRoot();

  if(this.preproOption === 'sass') {
    // Static
    this.fs.copy(sourceRoot + '/src/scss/base', destRoot + '/src/scss/base');
    this.fs.copy(sourceRoot + '/src/scss/modules', destRoot + '/src/scss/modules');
    this.fs.copy(sourceRoot + '/src/scss/pages', destRoot + '/src/scss/pages');
    this.fs.copy(sourceRoot + '/src/scss/playground', destRoot + '/src/scss/playground');
    this.fs.copy(sourceRoot + '/src/scss/themes', destRoot + '/src/scss/themes');
    this.fs.copy(sourceRoot + '/src/scss/views', destRoot + '/src/scss/views');

    // Dynamic
    this.fs.copyTpl(sourceRoot + '/src-tpl/scss/base/_fonts.scss', destRoot + '/src/scss/base/_fonts.scss', this.templateContext);
    this.fs.copyTpl(sourceRoot + '/src-tpl/scss/base/_variables.scss', destRoot + '/src/scss/base/_variables.scss', this.templateContext);
    this.fs.copyTpl(sourceRoot + '/src-tpl/scss/style.scss', destRoot + '/src/scss/style.scss', this.templateContext);

    switch (this.gridOption){
      case 'semantic': this.fs.copy(sourceRoot + '/src-tpl/scss/base/_semantic-grid.scss', destRoot + '/src/scss/base/_grid.scss');
      break;

      case 'jeet': this.fs.copy(sourceRoot + '/src-tpl/scss/base/jeet/', destRoot + '/src/scss/base/jeet/');
      break;

      default: this.fs.copyTpl(sourceRoot + '/src-tpl/scss/base/_grid.scss', destRoot + '/src/scss/base/_grid.scss', this.templateContext);
    }

    if(this.customIconfontOption) {
      this.fs.copyTpl(sourceRoot + '/src-tpl/scss/modules/_icons.scss', destRoot + '/src/scss/modules/_icons.scss', this.templateContext);
      this.fs.copy(sourceRoot + '/src/iconfont/template/_icons.scss', destRoot + '/src/iconfont/template/_icons.scss');
    }

    if(this.mqOption === 'breakpoint') {
      this.fs.copy(sourceRoot + '/src-tpl/scss/mixins/_mediaqueries.scss', destRoot + '/src/scss/mixins/_mediaqueries.scss');
    }

    switch (this.baseStyleOption){
      case 'reset': this.fs.copy(sourceRoot + '/src-tpl/scss/reset/_reset.scss', destRoot + '/src/scss/base/_reset.scss');
      break;

      case 'normalize': this.fs.copy(sourceRoot + '/src-tpl/scss/reset/_normalize.scss', destRoot + '/src/scss/base/_normalize.scss');
      break;

      case 'sanitize': this.fs.copy(sourceRoot + '/src-tpl/scss/reset/_sanitize.scss', destRoot + '/src/scss/base/_sanitize.scss');
      break;
    }

  }
};

module.exports = sassFiles;
