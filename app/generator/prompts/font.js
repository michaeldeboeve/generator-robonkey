/**
 * Create prompts for icon font
 */

'use strict';

var chalk       = require('chalk'),
    printTitle  = require('./../../helpers/printTitle');

var fontPrompt = function fontPrompt() {
  this.log(printTitle('Custom Icon Font'))
  var done = this.async();
  this.prompt([{
      type: 'confirm',
      name: 'customIconfontOption',
      message: 'Would you like to include a custom icon font?',
      default: false
  }, {
    when: function (answers) {
      return answers.customIconfontOption === true;
    },
    name: 'customIconFontName',
    message: 'Name your custom icon font',
    default: 'robonky-glyphs'
  }], function (answers) {
    this.fontPrompt = answers;

    done();
  }.bind(this));
};

module.exports = fontPrompt;
