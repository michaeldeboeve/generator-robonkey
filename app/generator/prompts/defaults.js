/**
 * Create prompts for default settings
 */

'use strict';

var chalk       = require('chalk'),
    printTitle  = require('./../../helpers/printTitle');

var defaultPrompt = function defaultPrompt() {
  // this.log(printTitle('Defaults'))
  //   var done = this.async();
  //   this.prompt([{
  //     type: 'list',
  //     name: 'defaultOption',
  //     message: 'Want choices?',
  //     choices: ['No, just give me static HTML, Sass, Autoprefixer and jQuery', 'Yes, choices are good!'],
  //     filter: function(val) {
  //       var filterMap = {
  //         'No, just give me static HTML, Sass, Autoprefixer and jQuery!': 'gimmeDefault',
  //         'Yes, choices are good!': 'gimmeChoices'
  //       };
  //
  //       return filterMap[val];
  //     }
  //   }, {
  //     type: 'confirm',
  //     name: 'skipInstall',
  //     message: 'Skip the installation of Bower and npm dependencies?',
  //     default: false
  //   }], function (answers) {
  //     this.defaultPrompt = answers;
  //
  //     done();
  //   }.bind(this));
};

module.exports = defaultPrompt;
