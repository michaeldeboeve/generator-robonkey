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
      self.mainDir = answers.mainDir;
      self.drupalVersion = answers.drupalVersion;

      done();
    }.bind(this));
  },

  writing: {
    drupalInstall: function(){
      this.log(printTitle('Installing Drupal'));

      var done = this.async(),
          self = this;

      this.log('Downloading Drupal version ' + self.drupalVersion);
      this.extract('https://github.com/drupal/drupal/archive/' + self.drupalVersion + '.tar.gz', './', function(){
        fs.rename('drupal-' + self.drupalVersion, self.mainDir);
        done();
      });
    }
  }

});
