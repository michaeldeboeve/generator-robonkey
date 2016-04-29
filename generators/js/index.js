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
    installDep      = require('../app/config/installDep'),
    copyFiles       = require('../app/config/copyFiles'),
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
      done();
    });
  },




  prompting: {
    gulp: function(){
      if(this.exit) return;
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
      if(this.exit) return;
      var done = this.async();
      if(!this.calledFrom && !this.continueStructure) {
        structurePrompt(this, dirsToCheck, function(){
          done();
        })
      } else {
        done();
      }
    },

    javascript: function(){
      if(this.exit) return;
      var done = this.async();
      javascriptPrompt(this, function(){
        done();
      })
    },

    javascriptLibs: function(){
      if(this.exit) return;
      var done = this.async();
      javascriptLibsPrompt(this, function(){
        done();
      })
    },
  },




  configuring: {
    answers: function(){
      if(this.exit) return;
      var done = this.async();
      setJSAnswers(this, function(){
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


    setbower: function(){
      if(this.exit) return;
      var done = this.async();
      writeBower(this, function(){
        done();
      });
    }
  },




  writing: function(){
    if(this.exit) return;
    var done       = this.async(),
        destRoot   = this.destinationRoot(),
        gulpRoot   = destRoot,
        sourceRoot = this.sourceRoot();

    if(this.cfg.gulpDirOption) gulpRoot = path.join(destRoot,'gulp')

    copyFiles.copyJsFiles(this, destRoot, gulpRoot, sourceRoot, function(){
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
