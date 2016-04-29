'use strict';

var chalk       = require('chalk'),
    printTitle  = require('../helpers/printTitle.js');

function gulpPrompt(self, cb){
  if(self.cfg.gulpDirOption === undefined) {

    console.log(printTitle('Gulp'));

    self.prompt([{
      type: 'confirm',
      name: 'gulpDirOption',
      message: 'Place Gulp files in a subfolder?',
      default: function(answers) {
        if(self.cfg.gulpDirOption) {
          return self.cfg.gulpDirOption
        } else {
          return true
        }
      }
    }, {
      type: 'confirm',
      name: 'gulpTypeOption',
      message: 'Use CoffeeScript for Gulpfiles?',
      default: function(answers) {
        if(self.cfg.gulpTypeOption) {
          return self.cfg.gulpTypeOption
        } else {
          return false
        }
      }
    }
    // , {
    //   type: 'confirm',
    //   name: 'gulpCmdOption',
    //   message: 'Run gulp command after install?',
    //   default: function(answers) {
    //     if(self.cfg.gulpCmdOption) {
    //       return self.cfg.gulpCmdOption
    //     } else {
    //       return false
    //     }
    //   }
    // }
  ], function (answers) {
      self.cfg.gulpDirOption = answers.gulpDirOption;
      self.cfg.gulpCmdOption = false;
      self.cfg.gulpTypeOption = answers.gulpTypeOption;
      if(answers.gulpTypeOption) {
        self.cfg.gulpTypeOption = 'coffee';
      }


      cb();
    }.bind(self));
  } else {
    cb();
  }
}

module.exports = gulpPrompt;
