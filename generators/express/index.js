'use strict';

var yeoman        = require('yeoman-generator'),
    yosay         = require('yosay'),
    fs            = require('fs'),
    chalk         = require('chalk'),
    mkdirp        = require('mkdirp'),
    printTitle    = require('../app/helpers/printTitle');

module.exports = yeoman.Base.extend({

  prompting: function(){
    this.log(printTitle('Configuring Express'));

    var done = this.async(),
        self = this;

    this.prompt([{
      name: 'mainDir',
      message: 'Where to place the Express app?',
      default: 'app'
    }], function (answers) {
      this.mainDir = answers.mainDir;
      answers.environmentOption = 'express';
      this.expressPrompt = answers;

      done();
    }.bind(this));
  },

  configuring: function () {
    var done = this.async();
    this.config.set(this.expressPrompt);

    done();
  },

  writing: function(){
    this.log(printTitle('Installing Express'));

    var done = this.async(),
        destRoot = this.mainDir,
        sourceRoot = this.sourceRoot();
        
    this.fs.copy(sourceRoot+ '/bin', destRoot + '/bin');
    this.fs.copy(sourceRoot+ '/routes', destRoot + '/routes');
    this.fs.copy(sourceRoot+ '/views', destRoot + '/views');
    this.fs.copy(sourceRoot+ '/app.js', destRoot + '/app.js');
    this.fs.copy(sourceRoot+ '/package.json', destRoot + '/package.json');
    done();
  },

  install: function(){
    var done = this.async(),
        npmdir = process.cwd() + '/' + this.mainDir;

    process.chdir(npmdir);
    this.npmInstall();

    done();
  }



});
