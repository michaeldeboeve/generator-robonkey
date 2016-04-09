/**
 * Create prompts for environments
 */

'use strict';

var chalk       = require('chalk'),
    printTitle  = require('./../../helpers/printTitle'),
    walk        = require('./../../helpers/walk');

var environmentPrompt = function environmentPrompt() {
  if (this.existingConfig) {
    return;
  }
  var self = this;
  if(!this.skipEnvironment) {
    this.log(printTitle('Environment'));

    var environmentMessage =  "This will install a static website setup.\n" +
                              "If you want a framework, exit and run yo robonkey:<framework> first.\n" +
                              "The available options are express, wordpress, drupal, codeigniter, laravel.";
    this.log(environmentMessage);
    var done = this.async();
    this.prompt([{
      type: 'confirm',
      name: 'continueSetup',
      message: 'Continue?',
      default: true
    }], function (answers) {

      if(!answers.continueSetup) {
        throw new Error('user cancelled');
      } else {
        self.environmentOption = 'static';
        self.environmentName = 'Static Website';
      }

      done();
    }.bind(this));
  }
};

module.exports = environmentPrompt;
