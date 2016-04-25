var chalk           = require('chalk'),
    detectFeatures  = require('../helpers/detectFeatures'),
    printTitle      = require('../helpers/printTitle');

'use strict';

// It does what it says
var isStatic = function(self, cb){

  if(self.cfg.environmentOption === 'static' && (self.calledFrom === 'app' || !self.calledFrom)){
    var done = self.async();

    console.log(printTitle('Static Website'));

    var environmentMessage =  "This will install a static website setup.\n" +
                              "If you want a framework, exit and run yo robonkey:<framework>.\n" +
                              "The available options are express, wordpress, drupal, codeigniter, laravel.";
    console.log(environmentMessage);
    var done = self.async();
    self.prompt([{
      type: 'confirm',
      name: 'continueStatic',
      message: 'Continue?',
      default: true
    }], function (answers) {

      if(!answers.continueStatic) {
        self.exit = true;
      }

      done();
    }.bind(self));
  }

  cb();
}

module.exports = isStatic;
