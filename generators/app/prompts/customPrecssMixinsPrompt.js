'use strict';

var chalk       = require('chalk'),
    printTitle  = require('../helpers/printTitle.js');

function customPrecssMixinsPrompt(self, cb){

  if(self.cfg.preproOption === 'none'){

    self.prompt([{
      type: 'list',
      name: 'customPreCssMixins',
      message: 'What mixin plugin to use?',
      choices: [{
        name: 'None',
        value: 'none',
        checked: hasFeature('none', self.cfg.customPreCssMixins)
      }, {
        name: 'Mixins',
        value: 'mixins',
        checked: hasFeature('mixins', self.cfg.customPreCssMixins)
      }, {
        name: 'Sassy mixins',
        value: 'sassymixins',
        checked: hasFeature('sassymixins', self.cfg.customPreCssMixins)
      }]
    }], function(answers){
      self.cfg.customPreCssMixins = answers.customPreCssMixins

      cb();
    }.bind(self));
  } else {
    cb();
  }
}

module.exports = customPrecssMixinsPrompt;
