/**
 * Generate files specific to stylus files
 */

'use strict';
var mkdirp = require('mkdirp'),
    fs = require('fs');


var stylusFiles = function stylusFiles() {
  var destRoot = this.destinationRoot(),
      sourceRoot = this.sourceRoot();

  if(this.preproOption === 'stylus') {
    // Static
    this.fs.copy(sourceRoot + '/src/stylus/base', destRoot + '/src/stylus/base');
    this.fs.copy(sourceRoot + '/src/stylus/modules', destRoot + '/src/stylus/modules');
    this.fs.copy(sourceRoot + '/src/stylus/pages', destRoot + '/src/stylus/pages');
    this.fs.copy(sourceRoot + '/src/stylus/playground', destRoot + '/src/stylus/playground');
    this.fs.copy(sourceRoot + '/src/stylus/themes', destRoot + '/src/stylus/themes');
    this.fs.copy(sourceRoot + '/src/stylus/views', destRoot + '/src/stylus/views');

    // Dynamic
    this.fs.copyTpl(sourceRoot + '/src-tpl/stylus/base/fonts.styl', destRoot + '/src/stylus/base/fonts.styl', this.templateContext);
    this.fs.copyTpl(sourceRoot + '/src-tpl/stylus/base/variables.styl', destRoot + '/src/stylus/base/variables.styl', this.templateContext);
    this.fs.copyTpl(sourceRoot + '/src-tpl/stylus/style.styl', destRoot + '/src/stylus/style.styl', this.templateContext);

    switch (this.gridOption){
      case 'semantic':
        this.fs.copy(sourceRoot + '/src-tpl/stylus/base/_semantic-grid.styl', destRoot + '/src/stylus/base/_grid.styl');
      break;

      case 'jeet':
        this.fs.copy(sourceRoot + '/src-tpl/stylus/base/jeet/', destRoot + '/src/stylus/base/jeet/');
      break;

      default:
        this.fs.copyTpl(sourceRoot + '/src-tpl/stylus/base/grid.styl', destRoot + '/src/stylus/base/grid.styl', this.templateContext);
    }


    if(this.customIconfontOption) {
      this.fs.copyTpl(sourceRoot + '/src-tpl/stylus/modules/icons.styl', destRoot + '/src/stylus/modules/icons.styl', this.templateContext);
      this.fs.copy(sourceRoot + '/src/iconfont/template/icons.styl', destRoot + '/src/iconfont/template/icons.styl');
    }

    switch (this.baseStyleOption){
      case 'reset':
        this.fs.copy(sourceRoot + '/src-tpl/stylus/reset/reset.styl', destRoot + '/src/stylus/base/reset.styl');
      break;

      case 'normalize':
        this.fs.copy(sourceRoot + '/src-tpl/stylus/reset/normalize.styl', destRoot + '/src/stylus/base/normalize.styl');
      break;

      case 'sanitize':
        this.fs.copy(sourceRoot + '/src-tpl/stylus/reset/sanitize.styl', destRoot + '/src/stylus/base/sanitize.styl');
      break;
    }
  }
};

module.exports = stylusFiles;
