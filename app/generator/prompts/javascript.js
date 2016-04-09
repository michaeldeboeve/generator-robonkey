/**
 * Create prompts for javascript
 */

'use strict';

var chalk       = require('chalk'),
    printTitle  = require('./../../helpers/printTitle');

var javascriptPrompt = function javascriptPrompt() {
  if (this.existingConfig) {
    return;
  }
  this.log(printTitle('Javascripts'))
  var done = this.async();
  this.prompt([{
    type: 'list',
    name: 'javascriptOption',
    message: 'How would you like to write javascript?',
    choices: ['Vanilla', 'CoffeeScript'],
    filter: function(val) {
      var filterMap = {
        'Vanilla': 'vanilla',
        'CoffeeScript': 'coffee'
      };

      return filterMap[val];
    }
  }], function (answers) {
    this.javascriptPrompt = answers;

    done();
  }.bind(this));
};

module.exports = javascriptPrompt;
