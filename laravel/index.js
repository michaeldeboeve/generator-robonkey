'use strict';

var yeoman        = require('yeoman-generator'),
    yosay         = require('yosay'),
    fs            = require('fs'),
    chalk         = require('chalk'),
    path          = require('path'),
    mkdirp        = require('mkdirp');

module.exports = yeoman.Base.extend({

  laravelPrompt: function(){
    var done = this.async(),
        self = this;

    this.prompt([{
      name: 'mainDir',
      message: 'Where to place Laravel?',
      default: 'website'
    },
    {
      name: 'assetsDir',
      message: 'Name your public folder:',
      default: 'public'
    }, {
      name: 'jsDir',
      message: 'Name your javascript directory:',
      default: 'js'
    }, {
      name: 'cssDir',
      message: 'Name your styles directory:',
      default: 'css'
    }, {
      name: 'imgDir',
      message: 'Name your images directory:',
      default: 'img'
    }, {
      name: 'fontDir',
      message: 'Name your fonts directory:',
      default: 'fonts'
    }, {
      name: 'libDir',
      message: 'Name your libraries directory (css/js)',
      default: 'lib'
    }, {
      type: 'list',
      name: 'laravelVersion',
      message: 'Which version of Laravel do you want?',
      choices: ['master', 'Specify a version'],
      default: 'master'
    }, {
      when: function(answers){
        return answers.laravelVersion === 'Specify a version'
      },
      name: 'laravelVersion',
      message: 'Specify a Laravel version (v0.0.0)',
      default: 'v0.0.0'
    }], function (answers) {
      self.mainDir = answers.mainDir;
      self.assetsDir = answers.assetsDir;
      self.jsDir = answers.jsDir;
      self.cssDir = answers.cssDir;
      self.imgDir = answers.imgDir;
      self.fontDir = answers.fontDir;
      self.libDir = answers.libDir;
      self.laravelVersion = answers.laravelVersion;

      done();
    }.bind(this));
  },

  laravelInstall: function(){
    var done = this.async(),
        self = this;

    this.log.writeln('Let\'s download the framework, shall we?');
    this.log.writeln('Downloading Laravel version ' + self.laravelVersion);
    this.extract('https://github.com/laravel/laravel/archive/' + self.laravelVersion + '.tar.gz', './', function(){
      fs.rename('laravel-' + self.laravelVersion, self.mainDir);
      done();
    });
  },

  codegniterWebsiteStructure: function(){
    var done = this.async(),
        self = this;

    var folderLocation = self.mainDir + '/' + self.assetsDir;
    mkdirp(folderLocation + '/' + self.jsDir + '/' + self.libDir);
    mkdirp(folderLocation + '/' + self.cssDir + '/' + self.libDir);
    mkdirp(folderLocation + '/' + self.imgDir);
    mkdirp(folderLocation + '/' + self.fontDir);
  }

});
