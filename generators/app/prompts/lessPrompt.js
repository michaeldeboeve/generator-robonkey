'use strict';

var chalk       = require('chalk'),
    printTitle  = require('../helpers/printTitle.js');

function lessPrompt(self){
  if(self.exit) return;

  if(self.cfg.preproOption === 'less'){
    var done = self.async();

    console.log(printTitle('Less Libraries'));

    self.prompt([{
      type: 'list',
      name: 'mixinOption',
      message: 'What mixin libraries would you like to use?',
      choices: [{
        name: 'Default',
        value: 'default'
      }, {
        name: 'Less Hat',
        value: 'lesshat'
      }],
      default: function(answers){
        if(self.cfg.mixinOption && self.cfg.preproOption === 'less') return self.cfg.mixinOption
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
        name: 'Less-MQ',
        value: 'lessmq'
      }],
      default: function(answers){
        if(self.cfg.mqOption && self.cfg.preproOption === 'less') return self.cfg.mqOption
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
        name: 'Gee',
        value: 'gee'
      }, {
        name: 'Semantic.gs',
        value: 'semantic'
      }],
      default: function(answers){
        if(self.cfg.gridOption && self.cfg.preproOption === 'less') return self.cfg.gridOption
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

module.exports = lessPrompt;
