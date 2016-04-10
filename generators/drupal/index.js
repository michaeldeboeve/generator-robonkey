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
    this.log(printTitle('Configuring Drupal'));

    var done = this.async(),
        self = this;

    var drupal6 = '6.38',
        drupal7 = '7.43',
        drupal8 = '8.0.6';

    this.prompt([{
      type: 'list',
      name: 'drupalVersion',
      message: 'Which version of Drupal do you want?',
      choices: [drupal6, drupal7, drupal8, 'Specify a version'],
      default: drupal7
    }, {
      when: function(answers){
        return answers.drupalVersion === 'Specify a version'
      },
      name: 'drupalVersion',
      message: 'Specify a Drupal version (0.0.0)',
      default: '0.0.0'
    }, {
      name: 'mainDir',
      message: 'Where to place Drupal?',
      default: 'website'
    }], function (answers) {
      answers.environmentOption = 'drupal';
      this.mainDir = answers.mainDir;
      this.drupalVersion = answers.drupalVersion;
      this.drupalPrompt = answers;

      done();
    }.bind(this));
  },

  configuring: function () {
    var done = this.async();
    this.config.set(this.drupalPrompt);

    done();
  },

  writing: function(){
    this.log(printTitle('Installing Drupal'));

    var done = this.async(),
        self = this;

    this.log('Downloading Drupal version ' + this.drupalVersion);
    this.extract('https://github.com/drupal/drupal/archive/' + this.drupalVersion + '.tar.gz', './', function(){
      fs.rename('drupal-' + self.drupalVersion, self.mainDir);
      done();
    });
    done();
  }

});
