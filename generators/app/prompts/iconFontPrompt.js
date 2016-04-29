'use strict';

var chalk       = require('chalk'),
    printTitle  = require('../helpers/printTitle.js');

function iconFontPrompt(self, cb){

  console.log(printTitle('Icon Font'));

  self.prompt([{
      type: 'confirm',
      name: 'customIconfontOption',
      message: 'Would you like to include a custom icon font?',
      default: false
  }, {
    when: function (answers) {
      return answers.customIconfontOption === true;
    },
    name: 'customIconFontName',
    message: 'Name your custom icon font',
    default: 'robonky-glyphs'
  }], function (answers) {
    self.cfg.customIconfontOption = answers.customIconfontOption;
    self.cfg.customIconFontName = answers.customIconFontName;

    cb();
  }.bind(self));
}

module.exports = iconFontPrompt;
