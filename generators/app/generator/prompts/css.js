/**
 * Create prompts for css
 */

'use strict';

var chalk       = require('chalk'),
    printTitle  = require('./../../helpers/printTitle');

var cssPrompt = function cssPrompt() {
  if (this.existingConfig) {
    return;
  }
  this.log(printTitle('Preprocessors'))
  var done = this.async();
  this.prompt([{
    type: 'list',
    name: 'preproOption',
    message: 'What preprocessor would you like to use?',
    // choices: ['None! (Maybe I\'ll try me some Postcss)', 'Scss', 'Stylus', 'Less'],
    choices: ['Sass', 'Stylus', 'Less'],
    filter: function(val) {
      var filterMap = {
        'Sass': 'sass',
        'Stylus': 'stylus',
        'Less': 'less'
      };

      return filterMap[val];
    }
  }], function (answers) {
    this.cssPrompt = answers;
    this.preproOption = answers.preproOption;

    done();
  }.bind(this));
};

module.exports = cssPrompt;
