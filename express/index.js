'use strict';

var yeoman        = require('yeoman-generator'),
    yosay         = require('yosay'),
    fs            = require('fs'),
    chalk         = require('chalk'),
    mkdirp        = require('mkdirp');

module.exports = yeoman.Base.extend({

  expressPrompt: function(){
    var done = this.async(),
        self = this;

    this.prompt([{
      name: 'mainDir',
      message: 'Where to place the Express app?',
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
    }], function (answers) {
      this.mainDir = answers.mainDir;
      this.assetsDir = answers.assetsDir;
      this.jsDir = answers.jsDir;
      this.cssDir = answers.cssDir;
      this.imgDir = answers.imgDir;
      this.fontDir = answers.fontDir;
      this.libDir = answers.libDir;

      done();
    }.bind(this));
  },

  expressFiles: function(){
    var destRoot = this.mainDir,
        sourceRoot = this.sourceRoot(),
        folderLocation = destRoot + '/' + this.assetsDir;

    mkdirp(folderLocation + '/' + this.jsDir + '/' + this.libDir);
    mkdirp(folderLocation + '/' + this.cssDir + '/' + this.libDir);
    mkdirp(folderLocation + '/' + this.imgDir);
    mkdirp(folderLocation + '/' + this.fontDir);

    this.fs.copy(sourceRoot+ '/bin', destRoot + '/bin');
    this.fs.copy(sourceRoot+ '/routes', destRoot + '/routes');
    this.fs.copy(sourceRoot+ '/views', destRoot + '/views');
    this.fs.copy(sourceRoot+ '/app.js', destRoot + '/app.js');
    this.fs.copy(sourceRoot+ '/package.json', destRoot + '/package.json');
  },

  expressInstall: function(){
    var npmdir = process.cwd() + '/' + this.mainDir;
    process.chdir(npmdir);
    this.npmInstall();
  }


});
