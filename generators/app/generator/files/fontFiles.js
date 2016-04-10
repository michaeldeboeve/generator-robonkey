/**
 * Generate files specific to icon font files
 */

'use strict';
var mkdirp = require('mkdirp'),
    fs = require('fs');


var iconfontFiles = function iconfontFiles() {
  var destRoot = this.destinationRoot(),
      sourceRoot = this.sourceRoot();

  if(this.customIconfontOption) {
    // Static
    this.fs.copy(sourceRoot + '/src/iconfont/illustrator', destRoot + '/src/iconfont/illustrator');
    this.fs.copy(sourceRoot + '/src/iconfont/svg', destRoot + '/src/iconfont/svg');
  }
};

module.exports = iconfontFiles;
