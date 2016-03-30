/**
 * Create prompts for client info
 */

'use strict';

var environmentPrompt = function environmentPrompt(printTitle, context) {
  var self = context;

  self.log(printTitle('Environment'))
    var done = self.async();
    self.prompt([{
      type: 'list',
      name: 'environmentOption',
      message: 'Which environment are you using?\nThis will compile everything in the right directories.',
      choices: ['None, just a static website', 'Node + Express', 'Wordpress', 'Drupal', 'CodeIgniter'],
      filter: function(val) {
        var filterMap = {
          'None, just a static website': 'static',
          'Node + Express': 'express',
          'Wordpress': 'wordpress',
          'Drupal': 'drupal',
          'CodeIgniter': 'codeigniter'
        };

        return filterMap[val];
      }
    }, {
      when: function () {
        return this.environmentPrompt.environmentOption === 'wordpress';
      },
      type: 'input',
      name: 'themeName',
      message: 'What is the name of your Wordpress theme?',
      default: this.environmentPrompt.projectName + '-theme'
    }, {
      when: function () {
        return this.environmentPrompt.environmentOption === 'drupal';
      },
      type: 'input',
      name: 'themeName',
      message: 'What is the name of your Drupal theme?',
      default: answers.projectName + '-theme'
    }], function (answers) {
        this.environmentPrompt = answers;
        done();
      }.bind(self));
};

module.exports = environmentPrompt;
