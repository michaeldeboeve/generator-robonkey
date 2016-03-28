/**
 * Generate files specific to h5bp files
 */

'use strict';
var mkdirp = require('mkdirp'),
    fs = require('fs');

var h5bpFiles = function h5bpFiles(destRoot, sourceRoot, templateContext, context) {
  var self = context;

  if(templateContext.htaccessOption) {
    self.fs.copy(sourceRoot + '/website/htaccess.txt', destRoot + '/website/.htaccess');
  }
  if(templateContext.browserconfigOption) {
    // Static
    self.fs.copy(sourceRoot + '/website/browserconfig.xml', destRoot + '/website/browserconfig.xml');
  }
  if(templateContext.customIconfontOption) {
    // Static
    self.fs.copy(sourceRoot + '/website/crossdomain.xml', destRoot + '/website/crossdomain.xml');
  }
  if(templateContext.robotsOption) {
    // Static
    self.fs.copy(sourceRoot + '/website/robots.txt', destRoot + '/website/robots.txt');
  }
  if(templateContext.humansOption) {
    // Dynamic
    self.fs.copyTpl(sourceRoot + '/website/humans.txt', destRoot + '/website/humans.txt', templateContext);
  }
};

module.exports = h5bpFiles;
