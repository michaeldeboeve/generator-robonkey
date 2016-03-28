/**
 * Generate files specific to image files
 */

'use strict';
var mkdirp = require('mkdirp'),
    fs = require('fs');

var imageFiles = function imageFiles(destRoot, sourceRoot, templateContext, context) {
  var self = context;

  self.fs.copy(sourceRoot + '/src/images', destRoot + '/src/images');
};

module.exports = imageFiles;
