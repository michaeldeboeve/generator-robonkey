/**
 * Create prompts for h5bp extra's
 */

'use strict';

var chalk       = require('chalk'),
    printTitle  = require('./../../helpers/printTitle');

var h5bpPrompt = function h5bpPrompt() {
  this.log(printTitle('h5bp Extra\'s'))
  var done = this.async();
  this.prompt([{
    type: 'checkbox',
    name: 'h5bpOption',
    message: 'What h5bp extra\'s to include?',
    choices: [{
      name: '.htaccess',
      value: 'htaccess',
      checked: true
    }, {
      name: 'browserconfig.xml (for windows 10 tiles)',
      value: 'browserconfig',
      checked: true
    }, {
      name: 'crossdomain.xml',
      value: 'crossdomain',
      checked: false
    }, {
      name: 'robots.txt',
      value: 'robots',
      checked: false
    }, {
      name: 'humans.txt',
      value: 'humans',
      checked: false
    }]
  }], function (answers) {
    this.h5bpPrompt = answers;

    done();
  }.bind(this));
};

module.exports = h5bpPrompt;
