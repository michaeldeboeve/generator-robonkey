/**
 * Create prompts for environments
 */

'use strict';

var chalk       = require('chalk'),
    printTitle  = require('./../../helpers/printTitle');

var environmentPrompt = function environmentPrompt() {
  this.log(printTitle('Environment'))
  var done = this.async();
  this.prompt([{
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
    when: function (answers) {
      return answers.environmentOption === 'wordpress' || answers.environmentOption === 'drupal';
    },
    type: 'input',
    name: 'themeName',
    message: 'What is the name of your theme?',
    default: 'My Theme'
  }, {
    when: function (answers) {
      return answers.environmentOption === 'wordpress';
    },
    type: 'confirm',
    name: 'customStyle',
    message: 'Create a custom style.css in your theme directory?\n' + chalk.bgRed.white(' Warning: ') + chalk.red(' This will delete the existing file!'),
    default: false
  }, {
    when: function (answers) {
      return answers.environmentOption !== 'express';
    },
    type: 'confirm',
    name: 'customDirs',
    message: 'Use default output directory? (website, assets, js, css, img, lib, fonts)',
    default: true
  }, {
    when: function (answers) {
      return answers.environmentOption === 'express';
    },
    type: 'confirm',
    name: 'customDirs',
    message: 'Use default output directory? (app, public, javascripts, stylesheets, images, lib, fonts)',
    default: true
  }, {
    when: function (answers) {
      return answers.customDirs === false && answers.environmentOption !== 'express';
    },
    name: 'mainDir',
    message: 'Name your output directory:',
    default: 'website'
  }, {
    when: function (answers) {
      return answers.customDirs === false && answers.environmentOption === 'express';
    },
    name: 'mainDir',
    message: 'Name your output directory:',
    default: 'app'
  }, {
    when: function (answers) {
      return answers.customDirs === false && answers.environmentOption !== 'express';
    },
    name: 'assetsDir',
    message: 'Name your assets directory (css/fonts/js/images):',
    default: 'assets'
  }, {
    when: function (answers) {
      return answers.customDirs === false && answers.environmentOption === 'express';
    },
    name: 'assetsDir',
    message: 'Name your assets directory (css/fonts/js/images):',
    default: 'public'
  }, {
    when: function (answers) {
      return answers.customDirs === false && answers.environmentOption !== 'express';
    },
    type: 'input',
    name: 'jsDir',
    message: 'Name your js directory:',
    default: 'js'
  }, {
    when: function (answers) {
      return answers.customDirs === false && answers.environmentOption === 'express';
    },
    type: 'input',
    name: 'jsDir',
    message: 'Name your js directory:',
    default: 'javascripts'
  }, {
    when: function (answers) {
      return answers.customDirs === false && answers.environmentOption !== 'express';
    },
    type: 'input',
    name: 'cssDir',
    message: 'Name your css directory:',
    default: 'css'
  }, {
    when: function (answers) {
      return answers.customDirs === false && answers.environmentOption === 'express';
    },
    type: 'input',
    name: 'cssDir',
    message: 'Name your css directory:',
    default: 'stylesheets'
  }, {
    when: function (answers) {
      return answers.customDirs === false && answers.environmentOption !== 'express';
    },
    type: 'input',
    name: 'imgDir',
    message: 'Name your images directory:',
    default: 'img'
  }, {
    when: function (answers) {
      return answers.customDirs === false && answers.environmentOption === 'express';
    },
    type: 'input',
    name: 'imgDir',
    message: 'Name your images directory:',
    default: 'images'
  }, {
    when: function (answers) {
      return answers.customDirs === false;
    },
    type: 'input',
    name: 'fontDir',
    message: 'Name your fonts directory:',
    default: 'fonts'
  }, {
    when: function (answers) {
      return answers.customDirs === false;
    },
    type: 'input',
    name: 'libDir',
    message: 'Name your libraries directory (css/js):',
    default: 'lib'
  }], function (answers) {
    this.environmentPrompt = answers;
    this.environmentOption = answers.environmentOption;

    done();
  }.bind(this));
};

module.exports = environmentPrompt;
