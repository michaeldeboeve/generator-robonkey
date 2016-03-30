/**
 * Generate files specific to bower files
 */

'use strict';
var mkdirp = require('mkdirp'),
    fs = require('fs');

var bowerFiles = function bowerFiles(destRoot, sourceRoot, templateContext, context) {
  var self = context;
  var is = templateContext;

  if(is.gulpDirOption) {
    destRoot = destRoot + '/gulp';
  }
  // Static
  self.fs.copyTpl(sourceRoot + '/bower/bowerrc.txt', destRoot + '/.bowerrc', templateContext);

  // Dynamic
  self.fs.copyTpl(sourceRoot + '/bower/bower.json', destRoot + '/bower.json', templateContext);

};

module.exports = bowerFiles;
