/**
 * Create prompts for google analytics
 */

'use strict';

var chalk       = require('chalk'),
    printTitle  = require('./../../helpers/printTitle');

var gaPrompt = function gaPrompt() {
  if (this.existingConfig) {
    return;
  }
  if(this.environmentOption === 'static'){
    this.log(printTitle('Google Analytics'))
    var done = this.async();
    this.prompt([{
      type: 'confirm',
      name: 'analyticsOption',
      message: 'Provide Google Analytics Script?',
      default: true
  }], function (answers) {
      this.gaPrompt = answers.analyticsOption;

      done();
    }.bind(this));
  }
};

module.exports = gaPrompt;
