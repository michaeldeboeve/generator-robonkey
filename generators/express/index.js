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
      this.cfg.environmentOption ='express';
      if(this.calledFrom === 'app' || !this.calledFrom){
        var done = this.async(),
            self = this,
            destRoot = this.destinationRoot(),
            frameworks = ['wordpress', 'codeigniter', 'drupal', 'express', 'laravel'];

        isFramework(frameworks, destRoot, this.calledFrom, this, function(environmentOption){
          self.cfg.environmentOption = environmentOption;
          self.cfg.templateOption = 'jade';
        });
      }
    },

    gulp: function(){
      gulpPrompt(this, function(){})
    },

    express: function(){
      if(this.exit) return;

      var done = this.async(),
          self = this;

      this.prompt([{
        name: 'mainDir',
        message: 'Where to place Express?',
        default: function(answers) {
          if(self.cfg.mainDir) {
            return self.cfg.mainDir
          } else {
            return 'website'
          }
        }
      }], function (answers) {
        this.cfg.environmentOption = 'express';
        this.cfg.mainDir = answers.mainDir;

        done();
      }.bind(this));
    },

    static: function(){
      var self = this;
      self.composeWith('robonkey:static',{
        options: {
          calledFrom: generatorName,
          cfg: self.cfg
        }
      });

    },
  },

  configuring: function () {
    if(this.exit) return;

    this.gulpDirOption = this.cfg.gulpDirOption;
    this.gulpCmdOption = this.cfg.gulpCmdOption;
    this.environmentOption = this.cfg.environmentOption;
    this.mainDir = this.cfg.mainDir;


    var done = this.async();
    this.config.set(this.cfg);

    done();
  },

  install: function(){
    var done = this.async();
    installDep(this, function(){});
    done();
  }

});
