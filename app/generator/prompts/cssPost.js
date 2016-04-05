/**
 * Create prompts for postcss options
 */

'use strict';

var chalk       = require('chalk'),
    printTitle  = require('./../../helpers/printTitle');

var cssPostPrompt = function cssPostPrompt() {
  this.log(printTitle('postCSS'))
  var done = this.async();
  var self = this;
  console.log(self.gridOption);
  this.prompt([{
    type: 'checkbox',
    name: 'postCssOption',
    message: 'What postCSS plugins to include?',
    choices: [{
      name: 'Autoprefixer',
      value: 'autoprefixer',
      checked: true
    }, {
      name: 'Lost Grid',
      value: 'lostgrid',
      checked: false
    }, {
      name: 'CSS Nano (Css Optimalization)',
      value: 'cssnano',
      checked: false
    }, {
      name: 'Gradient Transparency Fix',
      value: 'gradientfix',
      checked: false
    }, {
      name: 'Css Declaration Sorter',
      value: 'csssorter',
      checked: false
    }, {
      name: 'MQ Packer',
      value: 'mqpacker',
      checked: false
    }, {
      name: 'MQ Keyframes',
      value: 'mqkeyframes',
      checked: false
    }, {
      name: 'CSS Next',
      value: 'cssnext',
      checked: false
    }, {
      name: 'Rucksack',
      value: 'rucksack',
      checked: false
    }, {
      name: 'CSS Grace',
      value: 'cssgrace',
      checked: false
    }, {
      name: 'Class Prefix',
      value: 'classprefix',
      checked: false
    }, {
      name: 'Scopify',
      value: 'scopify',
      checked: false
    }]
  }], function (answers) {
    this.cssPostPrompt = answers;

    done();
  }.bind(this));
};

module.exports = cssPostPrompt;
