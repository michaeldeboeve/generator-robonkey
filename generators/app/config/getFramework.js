'use strict';
var fs        = require('fs'),
    path      = require('path'),
    mkdirp    = require('mkdirp'),
    github    = 'https://github.com',
    ext       = '.tar.gz';


function wordpress(self, cb) {
  var link = github + '/WordPress/WordPress/archive/' + self.wordpressVersion + ext;
  self.extract(link, './', function(){
    fs.rename('WordPress-' + self.wordpressVersion, self.mainDir, function(){
      cb();
    });
  });
};

function drupal(self, cb) {
  var link = github + '/drupal/drupal/archive/' + self.drupalVersion + ext;
  self.extract(link, './', function(){
    fs.rename('drupal-' + self.drupalVersion, self.mainDir, function(){
      cb();
    });
  });
};

function codeigniter(self, cb){
  var link = github + '/bcit-ci/CodeIgniter/archive/' + self.codeigniterVersion + ext;
  self.extract(link, './', function(){
    fs.rename('Codeigniter-' + self.codeigniterVersion, self.mainDir, function(){
      cb();
    });
  });

};

function laravel(self, cb) {
  var link = github + '/laravel/laravel/archive/' + self.laravelVersion + ext;
  self.extract(link, './', function(){
    fs.rename('laravel-' + self.laravelVersion, self.cfg.mainDir, function(){
      cb();
    });
  });
};

module.exports = {
  wordpress: wordpress,
  drupal: drupal,
  codeigniter: codeigniter,
  laravel: laravel
};
