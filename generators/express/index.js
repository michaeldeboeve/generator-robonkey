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

var init              = require('../app/config/init'),
    setConfigVars     = require('../app/config/setConfigVars'),
    setConfigFiles    = require('../app/config/setConfigFiles'),
    copyFiles         = require('../app/config/copyFiles'),
    setBaseConfigVars = require('../app/config/setBaseConfigVars');

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
      done();
    });
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
      var done = this.async();
      gulpPrompt(this, function(){
        done();
      })
    },

    express: function(){
      if(this.exit) return;

      var done = this.async(),
          self = this;

      console.log(printTitle('Configuring Express'));

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
    }
  },




  configuring: function () {
    if(this.exit) return;
    var done = this.async(),
        self = this;
    setBaseConfigVars(this, function(){
      self.mainDir = self.cfg.mainDir;
      self.config.set(self.cfg);
      done();
    });
  },




  writing: function(){
    if(this.exit) return;

    console.log(printTitle('Installing Express'));

    var done       = this.async(),
        destRoot   = this.destinationRoot(),
        sourceRoot = this.sourceRoot();

    copyFiles.copyExpressFiles(this, destRoot, sourceRoot, function(){
      done();
    });
  },




  install: function(){
    var done = this.async(),
        appDir = process.cwd() + '/' + this.mainDir;
    process.chdir(appDir);
    this.npmInstall();
    done();
  },

  end: function(){
    console.log(printTitle('Express is installed'));
    console.log('You can now run ' + chalk.yellow.bold('yo robonkey') + ' to continue installing your project.\n\n')
  }

});
