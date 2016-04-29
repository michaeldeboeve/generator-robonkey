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
    setBaseConfigVars  = require('../app/config/setBaseConfigVars'),
    getFramework    = require('../app/config/getFramework');

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
      this.cfg.environmentOption ='codeigniter';
      if(this.calledFrom === 'app' || !this.calledFrom){
        var done = this.async(),
            self = this,
            destRoot = this.destinationRoot(),
            frameworks = ['wordpress', 'codeigniter', 'drupal', 'express', 'laravel'];

        frameworkPrompt(frameworks, destRoot, this.calledFrom, this, function(environmentOption){
          self.cfg.environmentOption = environmentOption;
        });
      }
    },

    gulp: function(){
      if(this.exit) return;
      var done = this.async();
      gulpPrompt(this, function(){
        done();
      })
    },

    laravel: function(){
      if(this.exit) return;

      console.log(printTitle('Configuring Laravel'));
      
      var done = this.async(),
          self = this;

      this.prompt([{
        type: 'list',
        name: 'laravelVersion',
        message: 'Which version of Laravel do you want?',
        choices: ['master', 'Specify a version'],
        default: 'master'
      }, {
        when: function(answers){
          return answers.laravelVersion === 'Specify a version'
        },
        name: 'laravelVersion',
        message: 'Specify a Laravel version (v0.0.0)',
        default: 'v0.0.0'
      }, {
        name: 'mainDir',
        message: 'Where to place Laravel?',
        default: function(answers) {
          if(self.cfg.mainDir) {
            return self.cfg.mainDir
          } else {
            return 'website'
          }
        }
      }, ], function (answers) {
        this.cfg.environmentOption = 'codeigniter';
        this.cfg.mainDir = answers.mainDir;
        this.cfg.laravelVersion = answers.laravelVersion;

        done();
      }.bind(this));
    },

  },




  configuring: {
    answers: function () {
      if(this.exit) return;
      var done = this.async(),
          self = this;
      setBaseConfigVars(this, function(){
        self.laravelVersion = self.cfg.laravelVersion;

        self.config.set(self.cfg);
        done();
      });
    }
  },




  writing: {
    downloading: function(){
      if(this.exit) return;

      var done = this.async(),
          self = this;

      console.log(printTitle('Installing Laravel'));

      console.log('Downloading Laravel version ' + this.laravelVersion);

      try {
        fs.accessSync(self.mainDir, fs.F_OK);
        console.log('Folder ' + self.mainDir + ' exists');
        rimraf(self.mainDir, function(){
          getFramework.laravel(self, function(){
            done();
          })
        });
      } catch (e) {
        console.log('Folder ' + self.mainDir + ' doesn\'t exist');
        getFramework.laravel(self, function(){
          done();
        })
      }
    },

    end: function(){
      console.log(printTitle('Laravel is installed'));
      console.log('You can now run ' + chalk.yellow.bold('yo robonkey') + ' to continue installing your project.\n\n');
    }
  }

});
