/**
 * Create prompts for css base styles
 */

'use strict';

var chalk       = require('chalk'),
    printTitle  = require('./../../helpers/printTitle');

var cssbasePrompt = function cssbasePrompt() {
  if (this.existingConfig) {
    return;
  }
  this.log(printTitle('CSS Base Styles'))
  var done = this.async();
  this.prompt([{
    type: 'list',
    name: 'baseStyleOption',
    message: 'What base styles to include?',
    choices: ['None', 'Sanitize', 'Reset', 'Normalize'],
    filter: function(val) {
      var filterMap = {
        'None': 'none',
        'Sanitize': 'sanitize',
        'Reset': 'reset',
        'Normalize': 'normalize'
      };

      return filterMap[val];
    }
  }], function (answers) {
    this.cssbasePrompt = answers.baseStyleOption;

    done();
  }.bind(this));
};

module.exports = cssbasePrompt;
