/**
 * Generate files specific to bower files
 */

'use strict';
var mkdirp = require('mkdirp'),
    fs = require('fs');


var bowerFiles = function bowerFiles() {
  var destRoot = this.destinationRoot(),
      sourceRoot = this.sourceRoot();

  if(this.gulpDirOption) {
    destRoot = destRoot + '/gulp';
  }
  // Static
  this.fs.copyTpl(sourceRoot + '/bower/bowerrc.txt', destRoot + '/.bowerrc', this.templateContext);

  // Dynamic
  this.fs.copyTpl(sourceRoot + '/bower/bower.json', destRoot + '/bower.json', this.templateContext);

};

exports = module.exports = bowerFiles;
