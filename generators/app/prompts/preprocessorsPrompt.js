'use strict';

var chalk       = require('chalk'),
    printTitle  = require('../helpers/printTitle.js');

function preprocessorsPrompt(self, cb){

  console.log(printTitle('CSS Preprocessor'));

  self.prompt([{
    type: 'list',
    name: 'preproOption',
    message: 'How would you like to write css?',
    choices: [
    //   {
    //   name: 'None, or I\'ll build my own with postcss',
    //   value: 'none'
    // },
    //   {
    //   name: 'PreCss',
    //   value: 'precss'
    // },
     {
      name: 'SCSS',
      value: 'scss'
    }, {
      name: 'Stylus',
      value: 'stylus'
    }, {
      name: 'Less',
      value: 'less'
    }],
    default: function(){
      if(self.cfg.preproOption) return self.cfg.preproOption
      else return 'scss'
    }
  }], function (answers) {
    self.cfg.preproOption = answers.preproOption;

    cb();
  }.bind(self));
}

module.exports = preprocessorsPrompt;
