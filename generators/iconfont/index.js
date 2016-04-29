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
    installDep          = require('../app/config/installDep'),
    copyFiles           = require('../app/config/copyFiles'),
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
      done();
    });
  },



  prompting: {
    gulp: function(){
      var done = this.async();
      gulpPrompt(this, function(){
        done();
      })
    },

    // existingStructure: function(){
    //   if(this.exit) return;
    //   var done = this.async();
    //   structureExistsPrompt(this, dirsToCheck, function(){
    //     done();
    //   })
    // },

    structure: function(){
      var done = this.async();
      if(!this.calledFrom && !this.continueStructure) {
        structurePrompt(this, dirsToCheck, function(){
          done();
        })
      } else {
        done();
      }
    },

    preprocessors: function(){
      var done = this.async();
      if(!this.calledFrom){
        preprocessorsPrompt(this, function(){
          done();
        })
      } else {
        done();
      }
    },

    iconFont: function(){
      var done = this.async();
      iconFontPrompt(this, function(){
        done();
      })
    }

  },




  configuring: {

    answers: function(){
      if(this.exit) return;
      var done = this.async();
      setIconFontAnswers(this, function(){
        done();
      });
    },

    config: function(){
      if(this.exit) return;
      var done = this.async();
      setConfigFiles(this, function(){
        done();
      });
    },

  },




  writing: function(){
    if(this.exit) return;
    var done       = this.async(),
        destRoot   = this.destinationRoot(),
        gulpRoot   = destRoot,
        sourceRoot = this.sourceRoot();

    if(this.cfg.gulpDirOption) gulpRoot = destRoot + '/gulp';

    copyFiles.copyIconFontFiles(this, destRoot, gulpRoot, sourceRoot, function(){
      done();
    });
  },




  install: function(){
    if(this.exit) return;
    if(!this.calledFrom) {
      var done = this.async();
      installDep(this);
      done();
    }
  }

});
