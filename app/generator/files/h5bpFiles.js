/**
 * Generate files specific to h5bp files
 */

'use strict';
var mkdirp = require('mkdirp'),
    fs = require('fs');


var h5bpFiles = function h5bpFiles() {
  var destRoot = this.destinationRoot(),
      sourceRoot = this.sourceRoot();
  if(this.environmentOption === 'static') {

    if(this.htaccessOption) {
      this.fs.copy(sourceRoot + '/website/htaccess.txt', destRoot + '/.htaccess');
    }
    if(this.browserconfigOption) {
      // Static
      this.fs.copyTpl(sourceRoot + '/website/browserconfig.xml', destRoot + '/browserconfig.xml', this.templateContext);
    }
    if(this.customIconfontOption) {
      // Static
      this.fs.copy(sourceRoot + '/website/crossdomain.xml', destRoot + '/crossdomain.xml');
    }
    if(this.robotsOption) {
      // Static
      this.fs.copy(sourceRoot + '/website/robots.txt', destRoot + '/robots.txt');
    }
    if(this.humansOption) {
      // Dynamic
      this.fs.copyTpl(sourceRoot + '/website/humans.txt', destRoot + '/humans.txt', this.templateContext);
    }

  }
};

module.exports = h5bpFiles;
