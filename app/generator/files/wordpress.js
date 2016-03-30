/**
 * Generate files specific to Wordpress files
 */

'use strict';
var mkdirp = require('mkdirp'),
    fs = require('fs');

var wordpressFiles = function wordpressFiles(destRoot, sourceRoot, templateContext, context) {
  var self = context;
  var is = templateContext;

  if(is.environmentOption === 'wordpress' && self.customStyle === true) {
    self.fs.copyTpl(sourceRoot + '/wordpress/style.css', destRoot + '/' + self.templateDest + '/style.css', templateContext);
  }

};

module.exports = wordpressFiles;
