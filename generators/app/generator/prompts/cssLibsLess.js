/**
 * Create prompts for css
 */

'use strict';

var chalk       = require('chalk'),
    printTitle  = require('./../../helpers/printTitle');

var cssLibsStylusPrompt = function cssLibsStylusPrompt() {
  if(this.preproOption === 'less') {
    if (this.existingConfig) {
      return;
    }
    this.log(printTitle('Less Libraries'))
    var done = this.async();
    this.prompt([{
      type: 'list',
      name: 'mixinOption',
      message: 'What mixin libraries would you like to use?',
      choices: ['Default', 'Less Hat'],
      filter: function(val) {
        var filterMap = {
          'none': 'default',
          'Less Hat': 'lesshat'
        };

        return filterMap[val];
      }
    }


    // Media Query Libraries
    ,{
      type: 'list',
      name: 'mqOption',
      message: 'What MediaQuery Library to use?',
      choices: ['Default', 'Less-MQ'],
      filter: function(val) {
        var filterMap = {
          'Default': 'default',
          'Less-MQ': 'lessmq'
        };

        return filterMap[val];
      }
    }


    // Grid Libraries
    ,{
      type: 'list',
      name: 'gridOption',
      message: 'What Grids Library to use?',
      choices: ['None', 'Jeet', 'sGrid', 'Semantic.gs'],
      filter: function(val) {
        var filterMap = {
          'None': 'none',
          'Jeet': 'jeet',
          'sGrid': 'sgrid',
          'Semantic.gs': 'semanticStylus'
        };

        return filterMap[val];
      }
    }], function (answers) {
      this.cssLibsStylusPrompt = answers;

      done();
    }.bind(this));
  }
};

module.exports = cssLibsStylusPrompt;
