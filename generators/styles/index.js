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
    installDep        = require('../app/config/installDep'),
    copyFiles         = require('../app/config/copyFiles'),
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

    baseStyles: function(){
      if(this.exit) return;
      var done = this.async();
      baseStylesPrompt(this, function(){
        done();
      })
    },

    preprocessors: function(){
      if(this.exit) return;
      var done = this.async();
      preprocessorsPrompt(this, function(){
        done();
      })
    },

    scss: function(){
      if(this.exit) return;
      var done = this.async();
      scssPrompt(this, function(){
        done();
      })
    },

    stylus: function(){
      if(this.exit) return;
      var done = this.async();
      stylusPrompt(this, function(){
        done();
      })
    },

    less: function(){
      if(this.exit) return;
      var done = this.async();
      lessPrompt(this, function(){
        done();
      })
    },

    customPrecss: function(){
      if(this.exit) return;
      var done = this.async();
      customPrecssPrompt(this, function(){
        done();
      })
    },

    customPrecssExtras: function(){
      if(this.exit) return;
      var done = this.async();
      customPrecssExtrasPrompt(this, function(){
        done();
      })
    },

    customPrecssMixins: function(){
      if(this.exit) return;
      var done = this.async();
      customPrecssMixinsPrompt(this, function(){
        done();
      })
    },

    customPrecssGrids: function(){
      if(this.exit) return;
      var done = this.async();
      customPrecssGridsPrompt(this, function(){
        done();
      })
    },

    postcss: function(){
      if(this.exit) return;
      var done = this.async();
      postcssPrompt(this, function(){
        done();
      })
    }
  },




  configuring: {

    answers: function(){
      if(this.exit) return;
      var done = this.async();
      setStylesAnswers(this, function(){
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

    copyFiles.copyStyleFiles(this, destRoot, gulpRoot, sourceRoot, function(){
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
