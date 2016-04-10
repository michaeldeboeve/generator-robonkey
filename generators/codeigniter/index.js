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
    this.log(printTitle('Configuring CodeIgniter'));

    var done = this.async(),
        self = this;
    var codeigniter2 = '2.2.6',
        codeigniter3 = '3.0.6';

    this.prompt([{
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
    }, {
      name: 'mainDir',
      message: 'Where to place CodeIgniter?',
      default: 'website'
    }], function (answers) {
      this.mainDir = answers.mainDir;
      this.codeigniterVersion = answers.codeigniterVersion;
      answers.environmentOption = 'codeigniter';
      this.codeigniterPrompt = answers;

      done();
    }.bind(this));
  },

  configuring: function () {
    var done = this.async();
    this.config.set(this.codeigniterPrompt);

    done();
  },

  writing: function(){
    this.log(printTitle('Installing CodeIgniter'));

    var done = this.async(),
        self = this;

    this.log('Downloading CodeIgniter version ' + this.codeigniterVersion);
    this.extract('https://github.com/bcit-ci/CodeIgniter/archive/' + this.codeigniterVersion + '.tar.gz', './', function(){
      fs.rename('Codeigniter-' + self.codeigniterVersion, self.mainDir);
      done();
    });
  }

});
