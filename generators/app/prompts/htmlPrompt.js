var chalk           = require('chalk'),
    printTitle      = require('../helpers/printTitle');

'use strict';

var htmlPrompt = function(self){
  if(self.exit) return;

  if(self.cfg.environmentOption === 'static'){
    var done = self.async();

    console.log(printTitle('HTML Templating'))

    self.prompt([{
      type: 'list',
      name: 'templateOption',
      message: 'How to generate html?',
      choices: [{
        name: 'None, just use plain old html',
        value: 'html'
      }, {
        name: 'Pug (was Jade)',
        value: 'pug'
      }, {
        name: 'Nunjucks',
        value: 'nunjucks'
      }, {
        name: 'Jade (Will be deprecated)',
        value: 'jade'
      }],
      default: function(){
        if(self.cfg.templateOption) return self.cfg.templateOption
        else return 'html'
      }
    }], function (answers) {

      if(self.cfg.environmentOption === 'express') self.cfg.templateOption = 'jade';
      self.cfg.templateOption = answers.templateOption;

      done();
    }.bind(self));
  }
}

module.exports = htmlPrompt;
