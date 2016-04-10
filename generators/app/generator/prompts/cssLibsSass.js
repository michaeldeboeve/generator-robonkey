/**
 * Create prompts for css
 */

'use strict';

var chalk       = require('chalk'),
    printTitle  = require('./../../helpers/printTitle');

var cssLibsSassPrompt = function cssLibsSassPrompt() {
  if(this.preproOption === 'sass') {
    if (this.existingConfig) {
      return;
    }
    this.log(printTitle('Sass Libraries'))
    var done = this.async();
    this.prompt([{
      type: 'list',
      name: 'mixinOption',
      message: 'What mixin libraries would you like to use?',
      choices: ['Default', 'Bourbon', 'Compass Mixins'],
      filter: function(val) {
        var filterMap = {
          'Default': 'default',
          'Bourbon': 'bourbon',
          'Compass Mixins': 'compassmixins'
        };

        return filterMap[val];
      }
    }


    // Media Query Libraries
    ,{
      type: 'list',
      name: 'mqOption',
      message: 'What MediaQuery Library to use?',
      choices: ['Default', 'Breakpoint', 'Include Media'],
      filter: function(val) {
        var filterMap = {
          'Default': 'default',
          'Breakpoint': 'breakpoint',
          'Include Media': 'includemedia'
        };

        return filterMap[val];
      }
    }


    // Grid Libraries
    ,{
      type: 'list',
      name: 'gridOption',
      message: 'What Grids Library to use?',
      choices: ['None', 'Jeet', 'Susy', 'Gridle', 'Gridle Flex', 'Neat (Will include Bourbon)', 'Semantic.gs'],
      filter: function(val) {
        var filterMap = {
          'None': 'none',
          'Jeet': 'jeet',
          'Susy': 'sysy',
          'Gridle': 'gridle',
          'Gridle Flex': 'gridleFlex',
          'Neat (Will include Bourbon)': 'neat',
          'Semantic.gs': 'semanticStylus'
        };

        return filterMap[val];
      }
    }], function (answers) {
      this.cssLibsSassPrompt = answers;

      done();
    }.bind(this));
  }
};

module.exports = cssLibsSassPrompt;
