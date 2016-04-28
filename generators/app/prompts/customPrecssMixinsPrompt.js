'use strict';

var chalk       = require('chalk'),
    printTitle  = require('../helpers/printTitle.js');

function customPrecssMixinsPrompt(self){
  if(self.exit) return;

  if(self.cfg.preproOption === 'none'){
    var done = self.async();

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

      done();
    }.bind(self));
  }
}

module.exports = customPrecssMixinsPrompt;
