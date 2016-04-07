/**
 * Generate files specific to project files
 */

'use strict';
var mkdirp = require('mkdirp'),
    fs = require('fs');


var projectFiles = function projectFiles() {
  var destRoot = this.destinationRoot(),
      sourceRoot = this.sourceRoot();

  mkdirp(destRoot + '/src');
  mkdirp(destRoot  + '/' +  this.templateDest + '/' + this.jsDirPath);
  mkdirp(destRoot  + '/' +  this.templateDest + '/' + this.jsLibDirPath);
  mkdirp(destRoot  + '/' +  this.templateDest + '/' + this.imgDirPath);
  mkdirp(destRoot  + '/' +  this.templateDest + '/' + this.cssDirPath);
  mkdirp(destRoot  + '/' +  this.templateDest + '/' + this.cssLibDirPath);
  mkdirp(destRoot  + '/' +  this.templateDest + '/' + this.fontDirPath);


  this.fs.copy(sourceRoot + '/project/editorconfig.txt', destRoot + '/.editorconfig');
  this.fs.copy(sourceRoot + '/project/gitignore.txt', destRoot + '/.gitignore');
  this.fs.copy(sourceRoot + '/project/gitattributes.txt', destRoot + '/.gitattributes');
  this.fs.copyTpl(sourceRoot + '/project/README.md', destRoot + '/README.md', this.templateContext);

};

module.exports = projectFiles;
