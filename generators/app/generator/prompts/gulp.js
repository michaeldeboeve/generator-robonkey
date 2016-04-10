/**
 * Create prompts for gulp
 */

'use strict';

var chalk       = require('chalk'),
    printTitle  = require('./../../helpers/printTitle');

var gulpPrompt = function gulpPrompt() {
  if (this.existingConfig) {
    return;
  }
  this.log(printTitle('Gulp'))
  var done = this.async();
  this.prompt([{
    type: 'confirm',
    name: 'gulpDirOption',
    message: 'Place Gulp files in a subfolder?',
    default: true
  }, {
    type: 'confirm',
    name: 'gulpCmdOption',
    message: 'Run gulp command after install?',
    default: false
  }], function (answers) {
    this.gulpPrompt = answers;

    done();
  }.bind(this));
};

module.exports = gulpPrompt;
