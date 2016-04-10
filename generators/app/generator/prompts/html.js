/**
 * Create prompts for client info
 */

'use strict';

var chalk       = require('chalk'),
    printTitle  = require('./../../helpers/printTitle');

var htmlPrompt = function htmlPrompt() {
  if (this.existingConfig) {
    return;
  }
  if(this.environmentOption === 'static'){
    this.log(printTitle('HTML Templating'))
    var done = this.async();
    this.prompt([{
      type: 'list',
      name: 'templateOption',
      message: 'How to generate html?',
      choices: ['None, just use plain old html', 'Jade', 'Nunjucks'],
      filter: function(val) {
        var filterMap = {
          'None, just use plain old html': 'html',
          'Jade': 'jade',
          'Nunjucks': 'nunjucks'
        };

        return filterMap[val];
      }

    }], function (answers) {
      this.htmlPrompt = answers;

      done();
    }.bind(this));
  }
};

module.exports = htmlPrompt;
