/**
 * Generate files specific to gulp files
 */

'use strict';
var mkdirp = require('mkdirp'),
    fs = require('fs');

var gulpFiles = function gulpFiles(destRoot, sourceRoot, templateContext, context) {
  var self = context;
  var is = templateContext;

  if(is.gulpDirOption) {
    destRoot = destRoot + '/gulp';
  }
  // Dynamic
  self.fs.copyTpl(sourceRoot + '/gulp/package.json', destRoot + '/package.json', templateContext);
  self.fs.copyTpl(sourceRoot + '/gulp/config.json', destRoot + '/config.json', templateContext);
  self.fs.copyTpl(sourceRoot + '/gulp/paths.json', destRoot + '/paths.json', templateContext);
  self.fs.copyTpl(sourceRoot + '/gulp/gulpfile.js', destRoot + '/gulpfile.js', templateContext);
  self.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/images.js', destRoot + '/gulp-tasks/images.js', templateContext);
  self.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/bower.js', destRoot + '/gulp-tasks/bower.js', templateContext);
  self.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/scripts.js', destRoot + '/gulp-tasks/scripts.js', templateContext);
  self.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/clean.js', destRoot + '/gulp-tasks/clean.js', templateContext);
  self.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/styles.js', destRoot + '/gulp-tasks/styles.js', templateContext);

  if(is.customIconfontOption) {
    self.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/iconfont.js', destRoot + '/gulp-tasks/iconfont.js', templateContext);
  }

  switch (self.templateOption){
    case 'html': self.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/html.js', destRoot + '/gulp-tasks/html.js', templateContext);
    break;

    case 'jade': self.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/jade.js', destRoot + '/gulp-tasks/html.js', templateContext);
    break;

    case 'nunjucks': self.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/nunjucks.js', destRoot + '/gulp-tasks/html.js', templateContext);
    break;

    case 'haml': self.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/haml.js', destRoot + '/gulp-tasks/html.js', templateContext);
    break;

    case 'handlebars': self.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/handlebars.js', destRoot + '/gulp-tasks/html.js', templateContext);
    break;
  }

  if(is.modernizrOption) {
    self.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/modernizr.js', destRoot + '/gulp-tasks/modernizr.js', templateContext);
  }

};

module.exports = gulpFiles;
