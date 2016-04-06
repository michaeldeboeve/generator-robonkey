/**
 * Create prompts for environments
 */

'use strict';

var chalk       = require('chalk'),
    printTitle  = require('./../../helpers/printTitle'),
    walk        = require('./../../helpers/walk');

var environmentPrompt = function environmentPrompt() {
  var self = this;
  if(!this.skipEnvironment) {
    this.log(printTitle('Environment'))
    var done = this.async();
    self.prompt([{
      type: 'list',
      name: 'environmentOption',
      message: 'Which environment are you using?\nThis will compile everything in the right directories.',
      choices: ['None, just a static website', 'Node + Express', 'Wordpress', 'Drupal', 'CodeIgniter', 'Laravel'],
      filter: function(val) {
        var filterMap = {
          'None, just a static website': 'static',
          'Node + Express': 'express',
          'Wordpress': 'wordpress',
          'Drupal': 'drupal',
          'CodeIgniter': 'codeigniter',
          'Laravel': 'laravel'
        };

        return filterMap[val];
      }
    }], function (answers) {
      this.environmentOption = answers.environmentOption;
      this.environmentPrompt = answers;

      switch (answers.environmentOption) {
        case 'static':
          this.environmentName = 'Static Website';
        break;

        case 'express':
          this.environmentName = 'Express';
        break;

        case 'wordpress':
          this.environmentName = 'Wordpress';
        break;

        case 'drupal':
          this.environmentName = 'Drupal';
        break;

        case 'codeigniter':
          this.environmentName = 'CodeIgniter';
        break;

        case 'laravel':
          this.environmentName = 'Laravel';
        break;
      }
      done();
    }.bind(this));
  }
};

module.exports = environmentPrompt;
