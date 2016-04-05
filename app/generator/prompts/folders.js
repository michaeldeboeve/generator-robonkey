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
    when: function (answers) {
      return self.environmentOption === 'wordpress' || self.environmentOption === 'drupal';
    },
    type: 'input',
    name: 'themeName',
    message: 'What is the name of your theme?',
    default: 'My Theme'
  }, {
    when: function (answers) {
      return self.environmentOption === 'wordpress';
    },
    type: 'confirm',
    name: 'customStyle',
    message: 'Create a custom style.css in your theme directory?\n' + chalk.bgRed.white(' Warning: ') + chalk.red(' This will delete the existing file!'),
    default: false
  }, {
    type: 'confirm',
    name: 'defaultDirs',
    message: 'Use default output directory?',
    default: true
  }, {
    when: function (answers) {
      return answers.defaultDirs === false;
    },
    name: 'mainDir',
    message: 'Name your output directory:',
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
      return answers.defaultDirs === false;
    },
    name: 'assetsDir',
    message: function (answers) {
      switch (self.environmentOption){
         case 'express':
          return 'Name your public folder:'
         break;

         case 'codeigniter':
          return 'Name your public folder:'
         break;

         default:
          return 'Name your assets folder:'
      };
    },
    default: function (answers) {
      switch (self.environmentOption){
         case 'express':
          return 'public'
         break;

         case 'codeigniter':
          return 'public'
         break;

         case 'laravel':
          return 'public'
         break;

         default:
          return 'assets'
      };
    }
  }, {
    when: function (answers) {
      return answers.defaultDirs === false;
    },
    type: 'input',
    name: 'jsDir',
    message: 'Name your javascript directory:',
    default: function (answers) {
      switch (self.environmentOption){
         case 'express':
          return 'javascripts'
         break;

         default:
          return 'js'
      };
    }
  }, {
    when: function (answers) {
      return answers.defaultDirs === false;
    },
    type: 'input',
    name: 'cssDir',
    message: 'Name your styles directory:',
    default: function (answers) {
      switch (self.environmentOption){
         case 'express':
          return 'stylesheets'
         break;

         default:
          return 'css'
      };
    }
  }, {
    when: function (answers) {
      return answers.defaultDirs === false;
    },
    type: 'input',
    name: 'imgDir',
    message: 'Name your images directory:',
    default: function (answers) {
      switch (self.environmentOption){
         case 'express':
          return 'images'
         break;

         default:
          return 'img'
      };
    }
  }, {
    when: function (answers) {
      return answers.defaultDirs === false;
    },
    type: 'input',
    name: 'fontDir',
    message: 'Name your fonts directory:',
    default: 'fonts'
  }, {
    when: function (answers) {
      return answers.defaultDirs === false;
    },
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
