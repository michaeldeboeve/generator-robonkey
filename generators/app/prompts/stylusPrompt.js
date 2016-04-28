'use strict';

var chalk       = require('chalk'),
    printTitle  = require('../helpers/printTitle.js');

function stylusPrompt(self){
  if(self.exit) return;

  if(self.cfg.preproOption === 'stylus'){
    var done = self.async();

    console.log(printTitle('Stylus Libraries'));

    self.prompt([{
      type: 'list',
      name: 'mixinOption',
      message: 'What mixin libraries would you like to use?',
      choices: [{
        name: 'Default',
        value: 'default'
      }, {
        name: 'Nib',
        value: 'nib'
      }, {
        name: 'Kouto Swiss',
        value: 'koutoswiss'
      }],
      default: function(answers){
        if(self.cfg.mixinOption && self.cfg.preproOption === 'stylus') return self.cfg.mixinOption
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
        name: 'Rupture',
        value: 'rupture'
      }],
      default: function(answers){
        if(self.cfg.mqOption && self.cfg.preproOption === 'stylus') return self.cfg.mqOption
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
        name: 'sGrid',
        value: 'sgrid'
      }, {
        name: 'Semantic.gs',
        value: 'semantic'
      }],
      default: function(answers){
        if(self.cfg.gridOption && self.cfg.preproOption === 'stylus') return self.cfg.gridOption
        else return 'none'
      }
    }], function (answers) {
      self.cfg.mixinOption = answers.mixinOption;
      self.cfg.mqOption = answers.mqOption;
      self.cfg.gridOption = answers.gridOption;

      done();
    }.bind(self));
  }
}

module.exports = stylusPrompt;
