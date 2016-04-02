/**
 * Generate files specific to html files
 */

'use strict';
var mkdirp = require('mkdirp'),
    fs = require('fs');


var htmlFiles = function htmlFiles() {
  var destRoot = this.destinationRoot(),
      sourceRoot = this.sourceRoot();

  // Html
  if(this.templateOption === 'html') {
    // Dynamic
    this.fs.copyTpl(sourceRoot + '/website/index.html', destRoot + '/' + this.mainDir + '/index.html', this.templateContext);
  }

  // Jade
  if(this.templateOption === 'jade') {
    // Static
    this.fs.copy(sourceRoot + '/src/jade', destRoot + '/src/jade');

    // Dyanamic
    this.fs.copyTpl(sourceRoot + '/src-tpl/jade/templates/base.jade', destRoot + '/src/jade/templates/base.jade', this.templateContext);
  }

  if(this.templateOption === 'handlebars') {
    this.fs.copy(sourceRoot + '/src/handlebars', destRoot + '/src/handlebars');
    this.fs.copyTpl(sourceRoot + '/src-tpl/handlebars/index.html', destRoot + '/src/handlebars/index.html', this.templateContext);
  }

  // Nunjucks
  if(this.templateOption === 'nunjucks') {
    this.fs.copy(sourceRoot + '/src/nunjucks', destRoot + '/src/nunjucks');
    this.fs.copyTpl(sourceRoot + '/src-tpl/nunjucks/base/base.html', destRoot + '/src/nunjucks/base/base.html', this.templateContext);
  }

  // Haml
  if(this.templateOption === 'haml') {
    // Static
    this.fs.copyTpl(sourceRoot + '/src-tpl/haml/index.haml', destRoot + '/src/haml/index.haml', this.templateContext);
  }
};

module.exports = htmlFiles;
