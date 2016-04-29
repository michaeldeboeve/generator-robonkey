'use strict';

var chalk       = require('chalk'),
    printTitle  = require('../helpers/printTitle.js');

function scssPrompt(self, cb){

  if(self.cfg.preproOption === 'scss'){

    console.log(printTitle('Sass Libraries'));

    self.prompt([{
      type: 'list',
      name: 'mixinOption',
      message: 'What mixin libraries would you like to use?',
      choices: [{
        name: 'Default',
        value: 'default'
      }, {
        name: 'Bourbon',
        value: 'bourbon'
      }, {
        name: 'Compass Mixins',
        value: 'compassmixins'
      }],
      default: function(answers){
        if(self.cfg.mixinOption && self.cfg.preproOption === 'scss') return self.cfg.mixinOption
        else return 'default'
      }
    }


    // Media Query Libraries
    ,{
      type: 'list',
      name: 'mqOption',
      message: 'What MediaQuery Library to use?',
      choices: [{
        name: 'Default',
        value: 'default'
      }, {
        name: 'Breakpoint',
        value: 'breakpoint'
      }, {
        name: 'Include Media',
        value: 'includemedia'
      }],
      default: function(answers){
        if(self.cfg.mqOption && self.cfg.preproOption === 'scss') return self.cfg.mqOption
        else return 'default'
      }
    }


    // Grid Libraries
    ,{
      type: 'list',
      name: 'gridOption',
      message: 'What Grids Library to use?',
      choices: [{
        name: 'None',
        value: 'none'
      }, {
        name: 'Jeet',
        value: 'jeet'
      }, {
        name: 'Susy',
        value: 'susy'
      }, {
        name: 'Gridle',
        value: 'gridle'
      }, {
        name: 'Gridle Flex',
        value: 'gridleflex'
      }, {
        name: 'Neat (Will include Bourbon)',
        value: 'neat'
      }, {
        name: 'Semantic.gs',
        value: 'semantic'
      }],
      default: function(answers){
        if(self.cfg.gridOption && self.cfg.preproOption === 'scss') return self.cfg.gridOption
        else return 'none'
      }
    }], function (answers) {
      self.cfg.mixinOption = answers.mixinOption;
      self.cfg.mqOption = answers.mqOption;
      self.cfg.gridOption = answers.gridOption;

      cb();
    }.bind(self));
  } else {
    cb();
  }
}

module.exports = scssPrompt;
