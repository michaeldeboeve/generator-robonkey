/**
 * Generate files specific to icon font files
 */

'use strict';
var mkdirp = require('mkdirp'),
    fs = require('fs');

var iconfontFiles = function iconfontFiles(destRoot, sourceRoot, templateContext, context) {
  var self = context;

  if(templateContext.customIconfontOption) {
    // Static
    self.fs.copy(sourceRoot + '/src/iconfont/illustrator', destRoot + '/src/iconfont/illustrator');
    self.fs.copy(sourceRoot + '/src/iconfont/svg', destRoot + '/src/iconfont/svg');
  }
};

module.exports = iconfontFiles;
