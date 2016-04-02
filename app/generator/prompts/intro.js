/**
 * Create prompts for icon font
 */

'use strict';

var chalk       = require('chalk'),
    yosay       = require('yosay'),
    printTitle  = require('./../../helpers/printTitle');

var introPrompt = function introPrompt() {
  var message = chalk.yellow.bold('Welcome to Robonkey ') + chalk.yellow('\'Cause everyone needs a Robotic Monkey');
  this.log(yosay(message, {maxLength: 19}));
};

module.exports = introPrompt;
