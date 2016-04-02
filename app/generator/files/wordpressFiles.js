/**
 * Generate files specific to Wordpress files
 */

'use strict';
var mkdirp = require('mkdirp'),
    fs = require('fs');


var wordpressFiles = function wordpressFiles() {
  var destRoot = this.destinationRoot(),
      sourceRoot = this.sourceRoot();

  if(this.environmentOption === 'wordpress' && this.customStyle === true) {
    this.fs.copyTpl(sourceRoot + '/wordpress/style.css', destRoot + '/' + this.templateDest + '/style.css', this.templateContext);
  }

};

module.exports = wordpressFiles;
