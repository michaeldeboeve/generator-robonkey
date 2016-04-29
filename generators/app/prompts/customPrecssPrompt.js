'use strict';

var chalk       = require('chalk'),
    printTitle  = require('../helpers/printTitle.js');

function customPrecssPrompt(self, cb){

  if(self.cfg.preproOption === 'none'){

    self.prompt([{
      type: 'checkbox',
      name: 'customPreCss',
      message: 'What syntax plugin to use?',
      choices: [{
        name: 'SugarSS (Indented syntax like Stylus)',
        value: 'sugarss',
        checked: hasFeature('sugarss', self.cfg.customPreCss)
      }, {
        name: 'Partial Import',
        value: 'import',
        checked: hasFeature('import', self.cfg.customPreCss)
      }, {
        name: 'Advanced Variables',
        value: 'variables',
        checked: hasFeature('variables', self.cfg.customPreCss)
      }, {
        name: 'Nested',
        value: 'nested',
        checked: hasFeature('nested', self.cfg.customPreCss)
      }, {
        name: 'Extend',
        value: 'extend',
        checked: hasFeature('extend', self.cfg.customPreCss)
      }, {
        name: 'Custom Media',
        value: 'custommedia',
        checked: hasFeature('custommedia', self.cfg.customPreCss)
      }, {
        name: 'Custom Properties',
        value: 'customproperties',
        checked: hasFeature('customproperties', self.cfg.customPreCss)
      }, {
        name: 'Custom Selectors',
        value: 'customselectors',
        checked: hasFeature('customselectors', self.cfg.customPreCss)
      }, {
        name: 'At-Root',
        value: 'atroot',
        checked: hasFeature('atroot', self.cfg.customPreCss)
      }, {
        name: 'Color Function',
        value: 'colorfunction',
        checked: hasFeature('colorfunction', self.cfg.customPreCss)
      }
      // , {
      //   name: 'Modules Values',
      //   value: 'modulesvalues',
      //   checked: hasFeature('modulesvalues', self.cfg.customPreCss)
      // }
    ]
    }], function(answers){
      self.cfg.customPreCss = answers.customPreCss

      cb();
    }.bind(self));
  } else {
    cb();
  }
}

module.exports = customPrecssPrompt;
