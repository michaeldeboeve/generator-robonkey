/**
 * Generate files specific to html files
 */

'use strict';
var mkdirp = require('mkdirp'),
    fs = require('fs');

var htmlFiles = function htmlFiles(destRoot, sourceRoot, templateContext, context) {
  var self = context;
  var is = templateContext;

  // Html
  if(is.templateOption === 'html') {
    // Dynamic
    self.fs.copyTpl(sourceRoot + '/website/index.html', destRoot + '/' + self.mainDir + '/index.html', templateContext);
  }

  // Jade
  if(is.templateOption === 'jade') {
    // Static
    self.fs.copy(sourceRoot + '/src/jade', destRoot + '/src/jade');

    // Dyanamic
    self.fs.copyTpl(sourceRoot + '/src-tpl/jade/templates/base.jade', destRoot + '/src/jade/templates/base.jade', templateContext);
  }

  if(is.templateOption === 'handlebars') {
    self.fs.copy(sourceRoot + '/src/handlebars', destRoot + '/src/handlebars');
    self.fs.copyTpl(sourceRoot + '/src-tpl/handlebars/index.html', destRoot + '/src/handlebars/index.html', templateContext);
  }

  // Nunjucks
  if(is.templateOption === 'nunjucks') {
    self.fs.copy(sourceRoot + '/src/nunjucks', destRoot + '/src/nunjucks');
    self.fs.copyTpl(sourceRoot + '/src-tpl/nunjucks/base/base.html', destRoot + '/src/nunjucks/base/base.html', templateContext);
  }

  // Haml
  if(is.templateOption === 'haml') {
    // Static
    self.fs.copyTpl(sourceRoot + '/src-tpl/haml/index.haml', destRoot + '/src/haml/index.haml', templateContext);
  }
};

module.exports = htmlFiles;
