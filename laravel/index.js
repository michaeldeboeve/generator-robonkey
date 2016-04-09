'use strict';

var yeoman        = require('yeoman-generator'),
    yosay         = require('yosay'),
    fs            = require('fs'),
    chalk         = require('chalk'),
    path          = require('path'),
    mkdirp        = require('mkdirp'),
    printTitle    = require('../app/helpers/printTitle'),
    createConfig  = require('../app/helpers/createConfig');

module.exports = yeoman.Base.extend({

  prompting: function(){
    this.log(printTitle('Configuring Laravel'));

    var done = this.async(),
        self = this;

    this.prompt([{
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
    }, {
      name: 'mainDir',
      message: 'Where to place Laravel?',
      default: 'website'
    }], function (answers) {
      self.mainDir = answers.mainDir;
      self.laravelVersion = answers.laravelVersion;

      done();
    }.bind(this));
  },

  configuring: function () {
    var done = this.async(),
        self = this,
        fileName = '.yo-rc.json',
        fileLocation = this.destinationRoot()+ '/' + fileName;

    createConfig(fileName, fileLocation, self.mainDir, 'laravel');

    done();
  },

  writing: function(){
    this.log(printTitle('Installing Laravel'));

    var done = this.async(),
        self = this;

    this.log('Downloading Laravel version ' + self.laravelVersion);
    this.extract('https://github.com/laravel/laravel/archive/' + self.laravelVersion + '.tar.gz', './', function(){
      fs.rename('laravel-' + self.laravelVersion, self.mainDir);
      done();
    });
  },

});
