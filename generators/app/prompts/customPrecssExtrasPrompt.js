'use strict';

var chalk       = require('chalk'),
    printTitle  = require('../helpers/printTitle.js');

function customPrecssExtrasPrompt(self, cb){

  if(self.cfg.preproOption === 'none'){

    self.prompt([{
      type: 'checkbox',
      name: 'customPreCssExtras',
      message: 'Extend your custom PreCSS build',
      choices: [{
        name: 'Short',
        value: 'short',
        checked: hasFeature('short', self.cfg.customPreCssExtras)
      }, {
        name: 'Property Lookup',
        value: 'propertylookup',
        checked: hasFeature('propertylookup', self.cfg.customPreCssExtras)
      }, {
        name: 'Quantity Queries',
        value: 'quantityqueries',
        checked: hasFeature('quantityqueries', self.cfg.customPreCssExtras)
      }, {
        name: 'Media MinMax',
        value: 'minmax',
        checked: hasFeature('minmax', self.cfg.customPreCssExtras)
      }]
    }], function(answers){
      self.cfg.customPreCssExtras = answers.customPreCssExtras

      cb();
    }.bind(self));
  } else {
    cb();
  }
}

module.exports = customPrecssExtrasPrompt;
