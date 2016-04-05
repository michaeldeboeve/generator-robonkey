/**
 * Generate files specific to html files
 */

'use strict';
var mkdirp = require('mkdirp'),
    fs = require('fs');


var htmlFiles = function htmlFiles() {
  var destRoot = this.destinationRoot(),
      sourceRoot = this.sourceRoot();

  switch (this.templateOption){
    case 'jade':
    this.fs.copy(sourceRoot + '/src/jade', destRoot + '/src/jade');
    this.fs.copyTpl(sourceRoot + '/src-tpl/jade/templates/base.jade', destRoot + '/src/jade/templates/base.jade', this.templateContext);
    break;

    case 'nunjucks':
      this.fs.copy(sourceRoot + '/src/nunjucks', destRoot + '/src/nunjucks');
      this.fs.copyTpl(sourceRoot + '/src-tpl/nunjucks/base/base.html', destRoot + '/src/nunjucks/base/base.html', this.templateContext);
    break;

    case 'handlebars':
    this.fs.copy(sourceRoot + '/src/handlebars', destRoot + '/src/handlebars');
    this.fs.copyTpl(sourceRoot + '/src-tpl/handlebars/index.html', destRoot + '/src/handlebars/index.html', this.templateContext);
    break;

    case 'haml':
      this.fs.copyTpl(sourceRoot + '/src-tpl/haml/index.haml', destRoot + '/src/haml/index.haml', this.templateContext);
    break;

    default:
      this.fs.copyTpl(sourceRoot + '/website/index.html', destRoot + '/' + this.mainDir + '/index.html', this.templateContext);
  }
};

module.exports = htmlFiles;
