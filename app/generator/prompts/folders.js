/**
 * Create prompts for environments
 */

'use strict';

var chalk       = require('chalk'),
    printTitle  = require('./../../helpers/printTitle'),
    walk        = require('./../../helpers/walk');

var foldersPrompt = function foldersPrompt() {
  this.log(printTitle(this.environmentName + ' Folder Structure'))
  var done = this.async();

  var destRoot = this.destinationRoot();
  var self = this;

  this.prompt([{
    name: 'mainDir',
    message: 'Name your main directory:',
    default: function (answers) {
      switch (self.environmentOption){
         case 'express':
          return 'app'
         break;

         default:
          return 'website'
      };
    }
  }, {
    when: function (answers) {
      return self.environmentOption === 'wordpress' || self.environmentOption === 'drupal';
    },
    type: 'input',
    name: 'themeName',
    message: 'What is the name of your theme?',
    default: 'mytheme'
  }, {
    when: function (answers) {
      return self.environmentOption === 'wordpress';
    },
    type: 'confirm',
    name: 'customStyle',
    message: 'Create a custom style.css in your theme directory?\n' + chalk.bgRed.white(' Warning: ') + chalk.red(' This will delete the existing file!'),
    default: false
  }, {
    name: 'assetsDir',
    message: 'Name your assets folder:',
    default: 'assets'
  }, {
    type: 'input',
    name: 'jsDir',
    message: 'Name your javascript directory:',
    default: 'js'
  }, {
    type: 'input',
    name: 'cssDir',
    message: 'Name your styles directory:',
    default: 'css'
  }, {
    type: 'input',
    name: 'imgDir',
    message: 'Name your images directory:',
    default: 'img'
  }, {
    type: 'input',
    name: 'fontDir',
    message: 'Name your fonts directory:',
    default: 'fonts'
  }, {
    type: 'input',
    name: 'libDir',
    message: 'Name your libraries directory (css/js):',
    default: 'lib'
  }], function (answers) {
    this.foldersPrompt = answers;
    if(this.skipEnvironment) {
      this.environmentInstalled = self.environmentOption;
    }
    done();
  }.bind(this));
};

module.exports = foldersPrompt;
