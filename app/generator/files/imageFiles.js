/**
 * Generate files specific to image files
 */

'use strict';
var mkdirp = require('mkdirp'),
    fs = require('fs');


var imageFiles = function imageFiles() {
  var destRoot = this.destinationRoot(),
      sourceRoot = this.sourceRoot();

  this.fs.copy(sourceRoot + '/src/img', destRoot + '/src/img');
};

module.exports = imageFiles;
