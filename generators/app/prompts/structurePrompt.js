var chalk           = require('chalk'),
    printTitle      = require('../helpers/printTitle'),
    hasFeature      = require('../helpers/hasFeature');

'use strict';

var structurePrompt = function(self, dirs, cb){

  console.log(printTitle('Folder structure'));

  self.prompt([{
    when: function(){
      return !self.cfg.mainDir && hasFeature('mainDir', dirs)
    },
    name: 'mainDir',
    message: 'What is your main directory?',
    default: function(answers) {
      if(self.cfg.mainDir) {
        return self.cfg.mainDir
      } else {
        return 'website'
      }
    }
  }, {
    when: function(){
      return !self.cfg.themeDir && (self.cfg.environmentOption === 'wordpress' || self.cfg.environmentOption === 'drupal') && hasFeature('themeDir', dirs)
    },
    name: 'themeDir',
    message: 'What is your theme folder?',
    default: function(answers) {
      if(self.cfg.themeDir) {
        return self.cfg.themeDir
      } else {
        return 'mytheme'
      }
    }
  }, {
    when: function(){
      return hasFeature('assetsDir', dirs)
    },
    name: 'assetsDir',
    message: 'Name your assets folder:',
    default: function(answers) {
      if(self.cfg.assetsDir) {
        return self.cfg.assetsDir
      } else {
        return 'assets'
      }
    }
  }, {
    when: function(){
      return hasFeature('cssDir', dirs)
    },
    type: 'input',
    name: 'cssDir',
    message: 'Name your css directory:',
    default: function(answers) {
      if(self.cfg.cssDir) {
        return self.cfg.cssDir
      } else {
        return 'css'
      }
    }
  }, {
    when: function(){
      return hasFeature('imgDir', dirs)
    },
    type: 'input',
    name: 'imgDir',
    message: 'Name your images directory:',
    default: function(answers) {
      if(self.cfg.imgDir) {
        return self.cfg.imgDir
      } else {
        return 'img'
      }
    }
  }, {
    when: function(){
      return hasFeature('jsDir', dirs)
    },
    type: 'input',
    name: 'jsDir',
    message: 'Name your javascript directory:',
    default: function(answers) {
      if(self.cfg.jsDir) {
        return self.cfg.jsDir
      } else {
        return 'js'
      }
    }
  }, {
    when: function(){
      return hasFeature('libDir', dirs)
    },
    type: 'input',
    name: 'libDir',
    message: 'Name your javascript library directory:',
    default: function(answers) {
      if(self.cfg.libDir) {
        return self.cfg.libDir
      } else {
        return 'lib'
      }
    }
  }, {
    when: function(){
      return hasFeature('fontDir', dirs)
    },
    type: 'input',
    name: 'fontDir',
    message: 'Name your fonts directory:',
    default: function(answers) {
      if(self.cfg.fontDir) {
        return self.cfg.fontDir
      } else {
        return 'fonts'
      }
    }
  }], function (answers) {

    if(!self.cfg.mainDir) self.cfg.mainDir = answers.mainDir;
    if(!self.cfg.themeDir && (self.cfg.environmentOption === 'wordpress' || self.cfg.environmentOption === 'drupal')) {
      self.cfg.themeDir = answers.themeDir;
    }
    self.cfg.assetsDir = answers.assetsDir;
    self.cfg.cssDir = answers.cssDir;
    self.cfg.imgDir = answers.imgDir;
    self.cfg.jsDir = answers.jsDir;
    self.cfg.libDir = answers.libDir;
    self.cfg.fontDir = answers.fontDir;

    cb();
  }.bind(self));
}

module.exports = structurePrompt;
