/**
 * Generate files specific to script files
 */

'use strict';
var mkdirp = require('mkdirp'),
    fs = require('fs');


var scriptFiles = function scriptFiles() {
  var destRoot = this.destinationRoot(),
      sourceRoot = this.sourceRoot();

  switch (this.javascriptOption){
    case 'coffee':
      this.fs.copyTpl(sourceRoot + '/src-tpl/coffee/main.coffee', destRoot + '/src/coffee/main.coffee', this.templateContext);
    break;

    default:
      this.fs.copyTpl(sourceRoot + '/src-tpl/js/main.js', destRoot + '/src/js/main.js', this.templateContext);
  }

  if(this.modernizrOption) {
    this.fs.copy(sourceRoot + '/src/modernizr', destRoot + '/src/modernizr');
  }
};

module.exports = scriptFiles;
