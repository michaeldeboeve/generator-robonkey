'use strict';

var yeoman          = require('yeoman-generator'),
    yosay           = require('yosay'),
    fs              = require('fs'),
    path            = require('path'),
    util            = require('util'),
    chalk           = require('chalk'),
    rimraf          = require('rimraf'),
    exec            = require('child_process').exec,
    semver          = require('semver'),
    mkdirp          = require('mkdirp'),
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

var structureExists = require('../app/prompts/structureExists'),
    isFramework     = require('../app/prompts/isFramework'),
    gulpPrompt      = require('../app/prompts/gulpPrompt'),
    isStatic        = require('../app/prompts/isStatic');


module.exports = yeoman.generators.Base.extend({

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
    this.cfg.environmentOption ='static';
      var done = this.async(),
          self = this,
          destRoot = this.destinationRoot(),
          frameworks = ['wordpress', 'codeigniter', 'drupal', 'express', 'laravel'];

      isFramework(frameworks, destRoot, this.calledFrom, this, function(environmentOption){
        self.cfg.environmentOption = environmentOption;
      });
    },

    gulp: function(){
      gulpPrompt(this, function(){})
    },

    static: function(){
      console.log(this.cfg.gulpDirOption);
      this.composeWith('robonkey:static',{
        options: {
          calledFrom: generatorName,
          cfg: this.cfg
        }
      });
    },
  },


  configuring: function(){
    this.gulpDirOption = this.cfg.gulpDirOption;
    this.gulpCmdOption = this.cfg.gulpCmdOption;
    this.gulpTypeOption = his.cfg.gulpTypeOption;
  },

  install: function(){
    var done = this.async();
    installDep(this, function(){});
    done();
  }

});
