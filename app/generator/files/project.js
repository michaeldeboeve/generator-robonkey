/**
 * Generate files specific to project files
 */

'use strict';
var mkdirp = require('mkdirp'),
    fs = require('fs');

var projectFiles = function projectFiles(destRoot, sourceRoot, templateContext, context) {
  var self = context;
  var is = templateContext;

  mkdirp(destRoot + '/src');
  mkdirp(destRoot + is.templateDest + '/' + is.jsDirPath);
  mkdirp(destRoot + is.templateDest + '/' + is.jsLibDirPath);
  mkdirp(destRoot + is.templateDest + '/' + is.imgDirPath);
  mkdirp(destRoot + is.templateDest + '/' + is.cssDirPath);
  mkdirp(destRoot + is.templateDest + '/' + is.cssLibDirPath);
  mkdirp(destRoot + is.templateDest + '/' + is.fontDirPath);


  self.fs.copy(sourceRoot + '/project/editorconfig.txt', destRoot + '/.editorconfig');
  self.fs.copy(sourceRoot + '/project/gitignore.txt', destRoot + '/.gitignore');
  self.fs.copy(sourceRoot + '/project/gitattributes.txt', destRoot + '/.gitattributes');
  self.fs.copyTpl(sourceRoot + '/project/README.md', destRoot + '/README.md', templateContext);

};

module.exports = projectFiles;
