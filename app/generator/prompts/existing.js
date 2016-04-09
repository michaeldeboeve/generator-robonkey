/**
 * Check for existing yo-rc.json configuration file
 */

'use strict';

var chalk       = require('chalk'),
    printTitle  = require('./../../helpers/printTitle');

var existingConfigPrompt = function existingConfigPrompt() {
  var done = this.async();

  if (this.config.get('installedMain')) {
    this.prompt([{
      type: 'confirm',
      name: 'existingConfig',
      message: 'Existing .yo-rc configuration found, would you like to use it?',
      default: true
    }], function(answers) {
      this.existingConfig = answers.existingConfig;
      done();
    }.bind(this));
  } else {
    done();
  }
};

module.exports = existingConfigPrompt;
