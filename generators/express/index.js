'use strict';

var yeoman          = require('yeoman-generator'),
    yosay           = require('yosay'),
    fs              = require('fs'),
    path            = require('path'),
    util            = require('util'),
    chalk           = require('chalk'),
    rimraf          = require('rimraf'),
    semver          = require('semver'),
    mkdirp          = require('mkdirp'),
    generatorName   = path.basename(__dirname);

var exec            = require('child_process').exec;
var spawn           = require('child_process').spawn;

var greeting        = require('../app/helpers/greeting'),
    walk            = require('../app/helpers/walk'),
    printTitle      = require('../app/helpers/printTitle'),
    hasFeature      = require('../app/helpers/hasFeature'),
    createJson      = require('../app/helpers/createJson');

var init            = require('../app/config/init'),
    setConfigVars   = require('../app/config/setConfigVars'),
    setConfigFiles  = require('../app/config/setConfigFiles'),
    copyFiles       = require('../app/config/copyFiles'),
    installDep      = require('../app/config/installDep'),
    setBaseConfigVars  = require('../app/config/setBaseConfigVars');

var structureExistsPrompt = require('../app/prompts/structureExistsPrompt'),
    frameworkPrompt       = require('../app/prompts/frameworkPrompt'),
    gulpPrompt            = require('../app/prompts/gulpPrompt'),
    staticPrompt          = require('../app/prompts/staticPrompt');


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

        frameworkPrompt(frameworks, destRoot, this.calledFrom, this, function(environmentOption){
          self.cfg.environmentOption = environmentOption;
          self.cfg.templateOption = 'pug';
        });
      }
    },

    gulp: function(){
      gulpPrompt(this)
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

    // static: function(){
    //   var self = this;
    //   this.composeWith('robonkey:static',{
    //     options: {
    //       calledFrom: generatorName,
    //       cfg: this.cfg
    //     }
    //   });
    //
    // },
  },

  configuring: function () {
    if(this.exit) return;

    var done = this.async();

    setBaseConfigVars(this);

    this.mainDir = this.cfg.mainDir;

    this.config.set(this.cfg);

    done();
  },

  writing: function(){
    var done       = this.async(),
        self       = this,
        destRoot   = this.destinationRoot(),
        gulpRoot   = destRoot,
        sourceRoot = this.sourceRoot();
    console.log(sourceRoot)
    copyFiles.copyExpressFiles(this, destRoot, gulpRoot, sourceRoot, function(){
      // copyFiles.copyHtmlFiles(self, destRoot, gulpRoot, sourceRoot, function(){
      //   // console.log('Html files copied.');
      // });
    });

  },

  install: function(){
    var done = this.async();

    var appDir = process.cwd() + '/' + this.mainDir;
    process.chdir(appDir);

    this.npmInstall();

    done();
  }

});
