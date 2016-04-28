'use strict';

var yeoman          = require('yeoman-generator'),
    fs              = require('fs'),
    path            = require('path'),
    chalk           = require('chalk'),
    mkdirp          = require('mkdirp'),
    jsonfile        = require('jsonfile'),
    generatorName   = path.basename(__dirname);

var greeting        = require('../app/helpers/greeting'),
    hasFeature      = require('../app/helpers/hasFeature'),
    printTitle      = require('../app/helpers/printTitle');

var init              = require('../app/config/init'),
    setConfigVars     = require('../app/config/setConfigVars'),
    setConfigFiles    = require('../app/config/setConfigFiles'),
    copyFiles         = require('../app/config/copyFiles'),
    installDep        = require('../app/config/installDep'),
    setStylesAnswers  = require('../app/config/setStylesAnswers');

var structureExistsPrompt     = require('../app/prompts/structureExistsPrompt'),
    gulpPrompt                = require('../app/prompts/gulpPrompt'),
    structurePrompt           = require('../app/prompts/structurePrompt'),
    baseStylesPrompt          = require('../app/prompts/baseStylesPrompt'),
    preprocessorsPrompt       = require('../app/prompts/preprocessorsPrompt'),
    scssPrompt                = require('../app/prompts/scssPrompt'),
    stylusPrompt              = require('../app/prompts/stylusPrompt'),
    lessPrompt                = require('../app/prompts/lessPrompt'),
    customPrecssPrompt        = require('../app/prompts/customPrecssPrompt'),
    customPrecssExtrasPrompt  = require('../app/prompts/customPrecssExtrasPrompt'),
    customPrecssMixinsPrompt  = require('../app/prompts/customPrecssMixinsPrompt'),
    customPrecssGridsPrompt   = require('../app/prompts/customPrecssGridsPrompt'),
    postcssPrompt             = require('../app/prompts/postcssPrompt');

var dirsToCheck = ['mainDir', 'assetsDir', 'cssDir', 'jsDir', 'libDir', 'fontDir'];

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

    baseStyles: function(){
      baseStylesPrompt(this);
    },

    preprocessors: function(){
      preprocessorsPrompt(this);
    },

    scss: function(){
      scssPrompt(this);
    },

    stylus: function(){
      stylusPrompt(this);
    },

    less: function(){
      lessPrompt(this);
    },

    customPrecss: function(){
      customPrecssPrompt(this);
    },

    customPrecssExtras: function(){
      customPrecssExtrasPrompt(this);
    },

    customPrecssMixins: function(){
      customPrecssMixinsPrompt(this);
    },

    customPrecssGrids: function(){
      customPrecssGridsPrompt(this);
    },

    postcss: function(){
      postcssPrompt(this);
    }
  },




  configuring: {

    answers: function(){
      var done = this.async();
      setStylesAnswers(this);
      done();
    },

    config: function(){
      var done = this.async();
      setConfigFiles(this, function(){
        // console.log('Config Files written...')
      });
      done();
    },
  },




  writing: function(){
    var done       = this.async(),
        destRoot   = this.destinationRoot(),
        gulpRoot   = destRoot,
        sourceRoot = this.sourceRoot();
    if(this.cfg.gulpDirOption) gulpRoot = destRoot + '/gulp';

    copyFiles.copyStyleFiles(this, destRoot, gulpRoot, sourceRoot, function(){
      // console.log('Scss files copied.');
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
