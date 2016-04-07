/**
 * Generate files specific to Wordpress files
 */

'use strict';
var mkdirp = require('mkdirp'),
    fs = require('fs');


var wordpressFiles = function wordpressFiles() {
  var destRoot = this.destinationRoot(),
      sourceRoot = this.sourceRoot();
  var wpRoot = sourceRoot + '/wordpress/blank-theme';
  var wpDest  = destRoot + '/' + this.templateDest;
  if(this.environmentOption === 'wordpress' && this.wpBlankTheme === true) {
    this.fs.copy(wpRoot + '/_inc', wpDest + '/_inc', this.templateContext);
    this.fs.copy(wpRoot + '/screenshot.png', wpDest + '/screenshot.png');

    this.fs.copyTpl(wpRoot + '/404.php', wpDest + '/404.php', this.templateContext);
    this.fs.copyTpl(wpRoot + '/archive.php', wpDest + '/archive.php', this.templateContext);
    this.fs.copyTpl(wpRoot + '/comments.php', wpDest + '/comments.php', this.templateContext);
    this.fs.copyTpl(wpRoot + '/footer.php', wpDest + '/footer.php', this.templateContext);
    this.fs.copyTpl(wpRoot + '/functions.php', wpDest + '/functions.php', this.templateContext);
    this.fs.copyTpl(wpRoot + '/header.php', wpDest + '/header.php', this.templateContext);
    this.fs.copyTpl(wpRoot + '/index.php', wpDest + '/index.php', this.templateContext);
    this.fs.copyTpl(wpRoot + '/options.php', wpDest + '/options.php', this.templateContext);
    this.fs.copyTpl(wpRoot + '/page.php', wpDest + '/page.php', this.templateContext);
    this.fs.copyTpl(wpRoot + '/search.php', wpDest + '/search.php', this.templateContext);
    this.fs.copyTpl(wpRoot + '/searchform.php', wpDest + '/searchform.php', this.templateContext);
    this.fs.copyTpl(wpRoot + '/sidebar.php', wpDest + '/sidebar.php', this.templateContext);
    this.fs.copyTpl(wpRoot + '/single.php', wpDest + '/single.php', this.templateContext);
    this.fs.copyTpl(wpRoot + '/style.css', wpDest + '/style.css', this.templateContext);
    
  }

};

module.exports = wordpressFiles;
