'use strict';

var yeoman          = require('yeoman-generator'),
    fs              = require('fs'),
    path            = require('path'),
    mkdirp          = require('mkdirp'),
    jsonfile        = require('jsonfile'),
    generatorName   = path.basename(__dirname);

var greeting        = require('../app/helpers/greeting'),
    printTitle      = require('../app/helpers/printTitle'),
    hasFeature      = require('../app/helpers/hasFeature'),
    createJson      = require('../app/helpers/createJson');

var init            = require('../app/config/init'),
    setConfigVars   = require('../app/config/setConfigVars'),
    setConfigFiles  = require('../app/config/setConfigFiles'),
    writeBower      = require('../app/config/writeBower'),
    copyFiles       = require('../app/config/copyFiles'),
    installDep      = require('../app/config/installDep'),
    setJSAnswers    = require('../app/config/setJSAnswers');

var structureExistsPrompt = require('../app/prompts/structureExistsPrompt'),
    gulpPrompt            = require('../app/prompts/gulpPrompt'),
    structurePrompt       = require('../app/prompts/structurePrompt'),
    javascriptPrompt      = require('../app/prompts/javascriptPrompt'),
    javascriptLibsPrompt  = require('../app/prompts/javascriptLibsPrompt');

var dirsToCheck = ['mainDir', 'assetsDir', 'jsDir', 'libDir'];

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

    javascript: function(){
      javascriptPrompt(this);
    },

    javascriptLibs: function(){
      javascriptLibsPrompt(this);
    },

  },



  configuring: {

    answers: function(){
      var done = this.async();
      setJSAnswers(this);
      done();
    },

    config: function(){
      var done = this.async();
      setConfigFiles(this, function(){
        // console.log('Config Files written...')
      });
      done();
    },


    setbower: function(){
      var done = this.async();

      writeBower(this);

      done();
    }


  },




  writing: function(){
    var done       = this.async(),
        destRoot   = this.destinationRoot(),
        gulpRoot   = destRoot,
        sourceRoot = this.sourceRoot();
    if(this.cfg.gulpDirOption) gulpRoot = destRoot + '/gulp';

    copyFiles.copyJsFiles(this, destRoot, gulpRoot, sourceRoot, function(){
      console.log('Javascript files copied.');
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
