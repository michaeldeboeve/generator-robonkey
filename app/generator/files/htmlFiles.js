/**
 * Generate files specific to html files
 */

'use strict';
var mkdirp = require('mkdirp'),
    fs = require('fs');


var htmlFiles = function htmlFiles() {
  var destRoot = this.destinationRoot(),
      sourceRoot = this.sourceRoot();
  if(this.environmentOption === 'static' || this.environmentOption === 'express') {
    switch (this.templateOption){
      case 'jade':
      console.log(this.environmentOption);
      console.log(this.templateOption);
        if(this.environmentOption === 'express') {
          destRoot = destRoot + '/' + this.mainDir + '/views';
        } else {
          destRoot = destRoot + '/src/jade';
        }

        this.fs.copy(sourceRoot + '/src/jade', destRoot);
        this.fs.copyTpl(sourceRoot + '/src-tpl/jade/index.jade', destRoot + '/index.jade', this.templateContext);
        this.fs.copyTpl(sourceRoot + '/src-tpl/jade/templates/layout.jade', destRoot + '/templates/layout.jade', this.templateContext);
      break;

      case 'nunjucks':
      if(this.environmentOption === 'express') {
        destRoot = destRoot + '/' + this.mainDir + '/views';
      } else {
        destRoot = destRoot + '/src/nunjucks';
      }
        this.fs.copy(sourceRoot + '/src/nunjucks', destRoot);
        this.fs.copyTpl(sourceRoot + '/src-tpl/nunjucks/base/layout.html', destRoot + '/base/layout.html', this.templateContext);
      break;

      case 'handlebars':
      if(this.environmentOption === 'express') {
        destRoot = destRoot + '/' + this.mainDir + '/views';
      } else {
        destRoot = destRoot + '/src/handlebars';
      }
        this.fs.copy(sourceRoot + '/src/handlebars', destRoot);
        this.fs.copyTpl(sourceRoot + '/src-tpl/handlebars/index.html', destRoot + '/index.html', this.templateContext);
      break;

      case 'haml':
      if(this.environmentOption === 'express') {
        destRoot = destRoot + '/' + this.mainDir + '/views';
      } else {
        destRoot = destRoot + '/src/haml';
      }
        this.fs.copyTpl(sourceRoot + '/src-tpl/haml/index.haml', destRoot, this.templateContext);
      break;

      default:
        this.fs.copyTpl(sourceRoot + '/website/index.html', destRoot + '/' + this.mainDir + '/index.html', this.templateContext);
    }
  }
};

module.exports = htmlFiles;
