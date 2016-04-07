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
    default: 'My Theme'
  }, {
    when: function (answers) {
      return self.environmentOption === 'wordpress';
    },
    type: 'confirm',
    name: 'wpBlankTheme',
    message: 'Would you like to create a blank theme?',
    default: true
  }, {
    when: function (answers) {
      return answers.wpBlankTheme === true;
    },
    name: 'themeNameSpace',
    message: 'Unique name-space for the theme (alphanumeric)?',
    default: function( answers ) {
        return answers.themeName.replace(/\W/g, '').toLowerCase();
    }
  }, {
    when: function (answers) {
      return answers.wpBlankTheme === true;
    },
    name: 'themeAuthor',
    message: 'Theme Author',
    default: self.projectAuthor
  }, {
    when: function (answers) {
      return answers.wpBlankTheme === true;
    },
    name: 'themeAuthorURI',
    message: 'Theme Author URI',
    default: self.authorURI
  }, {
    when: function (answers) {
      return self.environmentOption !== 'express';
    },
    name: 'assetsDir',
    message: 'Name your assets folder:',
    default: function(answers) {
      if (self.environmentOption === 'express') {
        return 'public'
      } else {
        return 'assets'
      }
    }
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
