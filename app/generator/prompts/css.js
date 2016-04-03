/**
 * Create prompts for css
 */

'use strict';

var chalk       = require('chalk'),
    printTitle  = require('./../../helpers/printTitle');

var cssPrompt = function cssPrompt() {
  console.log(this.environmentOption);
  this.log(printTitle('Preprocessors'))
  var done = this.async();
  this.prompt([{
    type: 'list',
    name: 'preproOption',
    message: 'What preprocessor would you like to use?',
    choices: ['Sass', 'Stylus', 'Less'],
    filter: function(val) {
      var filterMap = {
        'Sass': 'sass',
        'Stylus': 'stylus',
        'Less': 'less'
      };

      return filterMap[val];
    }
  } ,{
    when: function (answers) {
      return answers.preproOption === 'sass';
    },
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
  ,{
    when: function (answers) {
      return answers.preproOption === 'stylus';
    },
    type: 'list',
    name: 'mixinOption',
    message: 'What mixin libraries would you like to use?',
    choices: ['Default', 'Nib', 'Kouto Swiss'],
    filter: function(val) {
      var filterMap = {
        'Default': 'default',
        'Nib': 'nib',
        'Kouto Swiss': 'koutoswiss'
      };

      return filterMap[val];
    }
  }
  ,{
    when: function (answers) {
      return answers.preproOption === 'less';
    },
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
    when: function (answers) {
      return answers.preproOption === 'sass';
    },
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
  ,{
    when: function (answers) {
      return answers.preproOption === 'stylus';
    },
    type: 'list',
    name: 'mqOption',
    message: 'What MediaQuery Library to use?',
    choices: ['Default', 'Rupture'],
    filter: function(val) {
      var filterMap = {
        'Default': 'default',
        'Rupture': 'rupture'
      };

      return filterMap[val];
    }
  }
  ,{
    when: function (answers) {
      return answers.preproOption === 'less';
    },
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
    when: function (answers) {
      return answers.preproOption === 'sass';
    },
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
  }
  ,{
    when: function (answers) {
      return answers.preproOption === 'stylus';
    },
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
  }
  ,{
    when: function (answers) {
      return answers.preproOption === 'less';
    },
    type: 'list',
    name: 'gridOption',
    message: 'What Grids Library to use?',
    choices: ['None', 'Gee', 'Semantic.gs'],
    filter: function(val) {
      var filterMap = {
        'None': 'none',
        'Gee': 'gee',
        'Semantic.gs': 'semanticLess'
      };

      return filterMap[val];
    }
  }], function (answers) {
    this.cssPrompt = answers;

    done();
  }.bind(this));
};

module.exports = cssPrompt;
