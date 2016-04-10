'use strict';

var yeoman        = require('yeoman-generator'),
    yosay         = require('yosay'),
    fs            = require('fs'),
    chalk         = require('chalk'),
    path          = require('path'),
    mkdirp        = require('mkdirp'),
    printTitle    = require('../app/helpers/printTitle');

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
      this.mainDir = answers.mainDir;
      this.laravelVersion = answers.laravelVersion;
      answers.environmentOption = 'laravel';
      this.laravelPrompt = answers;

      done();
    }.bind(this));
  },

  configuring: function () {
    var done = this.async();
    this.config.set(this.laravelPrompt);

    done();
  },

  writing: function(){
    this.log(printTitle('Installing Laravel'));

    var done = this.async(),
        self = this;

    this.log('Downloading Laravel version ' + this.laravelVersion);
    this.extract('https://github.com/laravel/laravel/archive/' + this.laravelVersion + '.tar.gz', './', function(){
      fs.rename('laravel-' + self.laravelVersion, self.mainDir);
      done();
    });
    done();
  },

});
