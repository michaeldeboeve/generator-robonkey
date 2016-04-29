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
      var done = this.async();
      gulpPrompt(this, function(){
        done();
      })
    },

    codeigniter: function(){
      if(this.exit) return;

      var done = this.async(),
          self = this;

      var codeigniter2 = '2.2.6',
          codeigniter3 = '3.0.6';

      this.prompt([{
        type: 'list',
        name: 'codeigniterVersion',
        message: 'Which version of CodeIgniter do you want?',
        choices: [codeigniter2, codeigniter3, 'Specify a version'],
        default: codeigniter3
      }, {
        when: function(answers){
          return answers.codeigniterVersion === 'Specify a version'
        },
        name: 'codeigniterVersion',
        message: 'Specify a Codigniter version (0.0.0)',
        default: '0.0.0'
      }, {
        name: 'mainDir',
        message: 'Where to place CodeIgniter?',
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
        this.cfg.codeigniterVersion = answers.codeigniterVersion;

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
        self.codeigniterVersion = self.cfg.codeigniterVersion;

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

      console.log(printTitle('Installing CodeIgniter'));

      console.log('Downloading CodeIgniter version ' + this.codeigniterVersion);

      try {
        fs.accessSync(self.mainDir, fs.F_OK);
        console.log('Folder ' + self.mainDir + ' exists');
        rimraf(self.mainDir, function(){
          getFramework.Codeigniter(self, function(){
            done();
          })
        });
      } catch (e) {
        console.log('Folder ' + self.mainDir + ' doesn\'t exist');
        getFramework.codeigniter(self, function(){
          done();
        })
      }
    }
  }

});
