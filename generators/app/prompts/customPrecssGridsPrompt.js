'use strict';

var chalk       = require('chalk'),
    printTitle  = require('../helpers/printTitle.js');

function customPrecssGridsPrompt(self){
  if(self.exit) return;

  if(self.cfg.preproOption === 'none' || self.cfg.preproOption === 'precss'){
    var done = self.async();

    self.prompt([{
      type: 'list',
      name: 'customPreCssGrids',
      message: 'What grid plugin to use?',
      choices: [{
        name: 'None',
        value: 'none',
        checked: hasFeature('none', self.cfg.customPreCssGrids)
      }, {
        name: 'Grid',
        value: 'grid',
        checked: hasFeature('grid', self.cfg.customPreCssGrids)
      }, {
        name: 'Lost Grid',
        value: 'lostgrid',
        checked: hasFeature('lostgrid', self.cfg.customPreCssGrids)
      }, {
        name: 'Neat',
        value: 'neat',
        checked: hasFeature('neat', self.cfg.customPreCssGrids)
      }]
    }], function(answers){
      self.cfg.customPreCssGrids = answers.customPreCssGrids

      done();
    }.bind(self));
  }
}

module.exports = customPrecssGridsPrompt;
