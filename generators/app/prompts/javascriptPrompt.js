'use strict';

var chalk       = require('chalk'),
    printTitle  = require('../helpers/printTitle.js');

function javascriptsPrompt(self, cb){

  console.log(printTitle('Javascript'));

  self.prompt([{
    type: 'list',
    name: 'javascriptOption',
    message: 'How would you like to write javascript?',
    choices: [{
      name: 'Vanilla',
      value: 'vanilla'
    }, {
      name: 'CoffeeScript',
      value: 'coffee'
    }],
    default: function(){
      if(self.cfg.javascriptOption) return self.cfg.javascriptOption
      else return 'vanilla'
    }
  }], function (answers) {

    self.cfg.javascriptOption = answers.javascriptOption;

    cb();
  }.bind(self));
}

module.exports = javascriptsPrompt;
