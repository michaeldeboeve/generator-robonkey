'use strict';

var yeoman          = require('yeoman-generator'),
    fs              = require('fs'),
    path            = require('path'),
    chalk           = require('chalk'),
    mkdirp          = require('mkdirp'),
    jsonfile        = require('jsonfile'),
    generatorName   = path.basename(__dirname);

var greeting        = require('../app/helpers/greeting'),
    printTitle      = require('../app/helpers/printTitle');

var init                = require('../app/config/init'),
    setConfigVars       = require('../app/config/setConfigVars'),
    setConfigFiles      = require('../app/config/setConfigFiles'),
    copyFiles           = require('../app/config/copyFiles'),
    installDep          = require('../app/config/installDep'),
    setIconFontAnswers  = require('../app/config/setIconFontAnswers');

var structureExistsPrompt = require('../app/prompts/structureExistsPrompt'),
    gulpPrompt            = require('../app/prompts/gulpPrompt'),
    structurePrompt       = require('../app/prompts/structurePrompt'),
    iconFontPrompt        = require('../app/prompts/iconFontPrompt');

var dirsToCheck = ['mainDir', 'assetsDir', 'fontDir'];

module.exports = yeoman.Base.extend({

  initializing: function(){
    var done = this.async(),
        self = this;
    init(this, function(){
      greeting(self);
    });
    done();
  },



  prompting: {
    gulp: function(){
      gulpPrompt(this)
    },

    // existingStructure: function(){
    //   structureExistsPrompt(this, dirsToCheck);
    // },

    structure: function(){
      if(!this.calledFrom && !this.continueStructure) {
        structurePrompt(this, dirsToCheck);
      }
    },

    preprocessors: function(){
      if(!this.calledFrom){
        preprocessorsPrompt(this);
      }
    },

    iconFont: function(){
      iconFontPrompt(this);
    }

  },




  configuring: {

    answers: function(){
      setIconFontAnswers(this);
    },

    config: function(){
      var done = this.async();
      
      setConfigFiles(this, function(){
        done();
      });

    },

  },




  writing: function(){
    var done       = this.async(),
        destRoot   = this.destinationRoot(),
        gulpRoot   = destRoot,
        sourceRoot = this.sourceRoot();
    if(this.cfg.gulpDirOption) gulpRoot = destRoot + '/gulp';

    copyFiles.copyIconFontFiles(this, destRoot, gulpRoot, sourceRoot, function(){
      // console.log('Icon font files copied.');
    });

    done();
  },




  install: function(){
    if(this.exit) return;

    var done = this.async();
    installDep(this);
    done();
  }



});
