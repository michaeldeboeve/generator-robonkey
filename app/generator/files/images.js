/**
 * Generate files specific to image files
 */

'use strict';
var mkdirp = require('mkdirp'),
    fs = require('fs');

var imageFiles = function imageFiles(destRoot, sourceRoot, templateContext, context) {
  var self = context;
  var is = templateContext;

  self.fs.copy(sourceRoot + '/src/img', destRoot + '/src/img');
};

module.exports = imageFiles;
