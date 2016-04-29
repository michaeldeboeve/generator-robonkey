var chalk           = require('chalk'),
    detectFeatures  = require('../helpers/detectFeatures'),
    printTitle      = require('../helpers/printTitle');

'use strict';

// It does what it says
var structureExistsPrompt = function(self, options, cb){
  if(!self.calledFrom) {

    console.log('Checking ' + chalk.bold.yellow('.yo-rc.json') + ' for configurations\n');

    // Check .yo-rc.json for setting
    detectFeatures(self, options);

    console.log('\n');

    self.prompt([{
      type: 'confirm',
      name: 'continueStructure',
      message: 'Continue with self folder structure?',
      default: true
    }], function (answers) {
      self.continueStructure = answers.continueStructure;

      cb();
    }.bind(self));
  } else {
    cb();
  }
}

module.exports = structureExistsPrompt;
