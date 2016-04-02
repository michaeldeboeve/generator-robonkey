/**
 * Generate files specific to script files
 */

'use strict';
var mkdirp = require('mkdirp'),
    fs = require('fs');


var scriptFiles = function scriptFiles() {
  var destRoot = this.destinationRoot(),
      sourceRoot = this.sourceRoot();

  this.fs.copy(sourceRoot + '/src/js', destRoot + '/src/js');
  if(this.modernizrOption) {
    this.fs.copy(sourceRoot + '/src/modernizr', destRoot + '/src/modernizr');
  }
};

module.exports = scriptFiles;
