/**
 * Generate files specific to project files
 */

'use strict';
var mkdirp = require('mkdirp'),
    fs = require('fs');

var projectFiles = function projectFiles(destRoot, sourceRoot, templateContext, context) {
  var self = context;

  mkdirp(destRoot + '/src');
  mkdirp(destRoot + self.templateDest);

  if(templateContext.environmentOption === 'express') {
    mkdirp(destRoot + self.templateDest + '/javascripts');
    mkdirp(destRoot + self.templateDest + '/javascripts/libs');
    mkdirp(destRoot + self.templateDest + '/images');
    mkdirp(destRoot + self.templateDest + '/stylesheets');
    mkdirp(destRoot + self.templateDest + '/stylesheets/libs');
    mkdirp(destRoot + self.templateDest + '/fonts');
  } else {
    mkdirp(destRoot + self.templateDest + '/assets');
    mkdirp(destRoot + self.templateDest + '/assets/js');
    mkdirp(destRoot + self.templateDest + '/assets/js/libs');
    mkdirp(destRoot + self.templateDest + '/assets/images');
    mkdirp(destRoot + self.templateDest + '/assets/css');
    mkdirp(destRoot + self.templateDest + '/assets/css/libs');
    mkdirp(destRoot + self.templateDest + '/assets/fonts');
  }


    self.fs.copy(sourceRoot + '/project/editorconfig.txt', destRoot + '/.editorconfig');
    self.fs.copy(sourceRoot + '/project/gitignore.txt', destRoot + '/.gitignore');
    self.fs.copy(sourceRoot + '/project/gitattributes.txt', destRoot + '/.gitattributes');
    self.fs.copyTpl(sourceRoot + '/project/README.md', destRoot + '/README.md', templateContext);

};

module.exports = projectFiles;
