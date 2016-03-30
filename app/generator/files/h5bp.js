/**
 * Generate files specific to h5bp files
 */

'use strict';
var mkdirp = require('mkdirp'),
    fs = require('fs');

var h5bpFiles = function h5bpFiles(destRoot, sourceRoot, templateContext, context) {
  var self = context;
  var is = templateContext;

  if(is.htaccessOption) {
    self.fs.copy(sourceRoot + '/website/htaccess.txt', destRoot + '/' + self.mainDir + '/.htaccess');
  }
  if(is.browserconfigOption) {
    // Static
    self.fs.copyTpl(sourceRoot + '/website/browserconfig.xml', destRoot + '/' + self.mainDir + '/browserconfig.xml', templateContext);
  }
  if(is.customIconfontOption) {
    // Static
    self.fs.copy(sourceRoot + '/website/crossdomain.xml', destRoot + '/' + self.mainDir + '/crossdomain.xml');
  }
  if(is.robotsOption) {
    // Static
    self.fs.copy(sourceRoot + '/website/robots.txt', destRoot + '/' + self.mainDir + '/robots.txt');
  }
  if(is.humansOption) {
    // Dynamic
    self.fs.copyTpl(sourceRoot + '/website/humans.txt', destRoot + '/' + self.mainDir + '/humans.txt', templateContext);
  }
};

module.exports = h5bpFiles;
