'use strict';
var fs        = require('fs'),
    jsonfile  = require('jsonfile');

var download = function (fw, self) {
  switch(fw) {
    case 'wordpress':
      self.extract('https://github.com/WordPress/WordPress/archive/' + self.wordpressVersion + '.tar.gz', './', function(){
        fs.rename('WordPress-' + self.wordpressVersion, self.mainDir);
      });
    break;

    case 'drupal':
      self.extract('https://github.com/drupal/drupal/archive/' + self.drupalVersion + '.tar.gz', './', function(){
        fs.rename('drupal-' + self.drupalVersion, self.mainDir);
      });
    break;

    case 'codeigniter':
      self.extract('https://github.com/bcit-ci/CodeIgniter/archive/' + self.codeigniterVersion + '.tar.gz', './', function(){
        fs.rename('Codeigniter-' + self.codeigniterVersion, self.mainDir);
      });
    break;

    case 'laravel':
      self.extract('https://github.com/laravel/laravel/archive/' + self.laravelVersion + '.tar.gz', './', function(){
        fs.rename('laravel-' + self.laravelVersion, self.mainDir);
      });
    break;
  }
}

module.exports = download;
