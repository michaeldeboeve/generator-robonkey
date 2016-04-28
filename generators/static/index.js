'use strict';

var yeoman          = require('yeoman-generator'),
    fs              = require('fs'),
    path            = require('path'),
    chalk           = require('chalk'),
    mkdirp          = require('mkdirp'),
    jsonfile        = require('jsonfile'),
    generatorName   = path.basename(__dirname);

var greeting        = require('../app/helpers/greeting'),
    walk            = require('../app/helpers/walk'),
    printTitle      = require('../app/helpers/printTitle'),
    hasFeature      = require('../app/helpers/hasFeature'),
    createJson      = require('../app/helpers/createJson');

var init            = require('../app/config/init'),
    setConfigVars   = require('../app/config/setConfigVars'),
    setConfigFiles  = require('../app/config/setConfigFiles'),
    copyFiles       = require('../app/config/copyFiles'),
    installDep      = require('../app/config/installDep');

var structureExistsPrompt = require('../app/prompts/structureExistsPrompt'),
    frameworkPrompt       = require('../app/prompts/frameworkPrompt'),
    gulpPrompt            = require('../app/prompts/gulpPrompt'),
    staticPrompt          = require('../app/prompts/staticPrompt'),
    projectPrompt         = require('../app/prompts/projectPrompt'),
    structurePrompt       = require('../app/prompts/structurePrompt'),
    htmlPrompt            = require('../app/prompts/htmlPrompt');

var dirsToCheck       = ['mainDir', 'assetsDir', 'cssDir', 'jsDir', 'libDir', 'fontDir'],
    frameworksToCheck = ['wordpress', 'codeigniter', 'drupal', 'express', 'laravel'];


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

    existingEnvironment: function(){
      if(this.calledFrom === 'app' || !this.calledFrom){
        this.cfg.environmentOption ='static';
        var done = this.async(),
            self = this,
            destRoot = this.destinationRoot();

        frameworkPrompt(frameworksToCheck, destRoot, this.calledFrom, this, function(environmentOption){
          self.cfg.environmentOption = environmentOption;
        });
      }
    },

    gulp: function(){
      gulpPrompt(this)
    },

    environment: function(){
      staticPrompt(this);
    },

    project: function(){
      projectPrompt(this);
    },

    // existingStructure: function(){
    //   structureExistsPrompt(this, dirsToCheck);
    // },

    structure: function(){
      structurePrompt(this, dirsToCheck);
    },

    html: function(){
      htmlPrompt(this);
    },


    stylesOptions: function(){
      if(this.exit) return;

      var done = this.async(),
          self = this;

      this.composeWith('robonkey:styles',{
        options: {
          calledFrom: generatorName,
          cfg: this.cfg
        }
      });

      done();
    },

    scripts: function(){
      if(this.exit) return;

      var done = this.async(),
          self = this;

      this.composeWith('robonkey:js',{
        options: {
          calledFrom: generatorName,
          cfg: this.cfg
        }
      });

      done();
    },

    font: function(){
      if(this.exit) return;

      var done = this.async(),
          self = this;

      this.composeWith('robonkey:iconfont',{
        options: {
          calledFrom: generatorName,
          cfg: this.cfg
        }
      });

      done();
    },

  },




  configuring: {

    answers: function(){
      if(this.exit) return;

      var done = this.async();

      setConfigVars(this);

      done();
    },


    config: function(){
      if(this.exit) return;

      var done = this.async();

      setConfigFiles(this, function(){
        // console.log('Config Files written...')
      });

      done();
    },

  },




  writing: function(){
    if(this.exit) return;

    var done       = this.async(),
        destRoot   = this.destinationRoot(),
        gulpRoot   = destRoot,
        sourceRoot = this.sourceRoot();

    if(this.cfg.gulpDirOption) gulpRoot = destRoot + '/gulp';

    copyFiles.copyGulpFiles(this, destRoot, gulpRoot, sourceRoot, function(){
      // console.log('Main Gulp files copied.');
    });
    copyFiles.copyProjectFiles(this, destRoot, gulpRoot, sourceRoot, function(){
      // console.log('Project files copied.');
    });
    copyFiles.copyWordpressFiles(this, destRoot, gulpRoot, sourceRoot, function(){
      // console.log('WordPress theme files copied.');
    });
    // copyFiles.copyExpressFiles(this, destRoot, gulpRoot, sourceRoot, function(){
    //   // console.log('Express files copied.');
    // });
    copyFiles.copyH5bpFiles(this, destRoot, gulpRoot, sourceRoot, function(){
      // console.log('hp5b files copied.');
    });
    copyFiles.copyHtmlFiles(this, destRoot, gulpRoot, sourceRoot, function(){
      // console.log('Html files copied.');
    });
    copyFiles.copyImageFiles(this, destRoot, gulpRoot, sourceRoot, function(){
      // console.log('Image files copied.');
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
