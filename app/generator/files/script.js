/**
 * Generate files specific to script files
 */

'use strict';
var mkdirp = require('mkdirp'),
    fs = require('fs');

var scriptFiles = function scriptFiles(destRoot, sourceRoot, templateContext, context) {
  var self = context;
  var is = templateContext;

  self.fs.copy(sourceRoot + '/src/js', destRoot + '/src/js');
  if(is.modernizrOption) {
    self.fs.copy(sourceRoot + '/src/modernizr', destRoot + '/src/modernizr');
  }
};

module.exports = scriptFiles;
