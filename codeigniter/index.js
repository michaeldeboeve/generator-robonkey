'use strict';

var yeoman        = require('yeoman-generator'),
    yosay         = require('yosay'),
    fs            = require('fs'),
    chalk         = require('chalk'),
    path          = require('path'),
    mkdirp        = require('mkdirp');

module.exports = yeoman.Base.extend({

  codeigniterPrompt: function(){
    var done = this.async(),
        self = this;
    var codeigniter2 = '2.2.6',
        codeigniter3 = '3.0.6';

    this.prompt([{
      name: 'mainDir',
      message: 'Where to place CodeIgniter?',
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
      name: 'codeigniterVersion',
      message: 'Which version of CodeIgniter do you want?',
      choices: [codeigniter2, codeigniter3, 'Specify a version'],
      default: codeigniter3
    }, {
      when: function(answers){
        return answers.codeigniterVersion === 'Specify a version'
      },
      name: 'codeigniterVersion',
      message: 'Specify a Codigniter version (0.0.0)',
      default: '0.0.0'
    }], function (answers) {
      self.mainDir = answers.mainDir;
      self.assetsDir = answers.assetsDir;
      self.jsDir = answers.jsDir;
      self.cssDir = answers.cssDir;
      self.imgDir = answers.imgDir;
      self.fontDir = answers.fontDir;
      self.libDir = answers.libDir;
      self.codeigniterVersion = answers.codeigniterVersion;

      done();
    }.bind(this));
  },

  codeigniterInstall: function(){
    var done = this.async(),
        self = this;

    this.log.writeln('Let\'s download the framework, shall we?');
    this.log.writeln('Downloading CodeIgniter version ' + self.codeigniterVersion);
    this.extract('https://github.com/bcit-ci/CodeIgniter/archive/' + self.codeigniterVersion + '.tar.gz', './', function(){
      fs.rename('Codeigniter-' + self.codeigniterVersion, self.mainDir);
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
