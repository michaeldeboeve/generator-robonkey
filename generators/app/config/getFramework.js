'use strict';
var fs              = require('fs'),
    path            = require('path');


function wordpress(self, cb) {
  self.extract('https://github.com/WordPress/WordPress/archive/' + self.wordpressVersion + '.tar.gz', './', function(){
    fs.rename('WordPress-' + self.wordpressVersion, self.mainDir);
  });

  cb();
};

function drupal(self, cb) {
  self.extract('https://github.com/drupal/drupal/archive/' + self.drupalVersion + '.tar.gz', './', function(){
    fs.rename('drupal-' + self.drupalVersion, self.mainDir);
  });

  cb();
};

function codeigniter(self, cb){
  console.log(self.mainDir)
  self.extract('https://github.com/bcit-ci/CodeIgniter/archive/' + self.codeigniterVersion + '.tar.gz', './', function(){
    fs.rename('Codeigniter-' + self.codeigniterVersion, self.mainDir);

    cb();
  });

};

function laravel(self, cb) {
  self.extract('https://github.com/laravel/laravel/archive/' + self.laravelVersion + '.tar.gz', './', function(){
    fs.rename('laravel-' + self.laravelVersion, self.cfg.mainDir);
  });

  cb();
};

module.exports = {
  wordpress: wordpress,
  drupal: drupal,
  codeigniter: codeigniter,
  laravel: laravel
};
