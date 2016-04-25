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
      this.cfg.environmentOption ='drupal';
      if(this.calledFrom === 'app' || !this.calledFrom){
        var done = this.async(),
            self = this,
            destRoot = this.destinationRoot(),
            frameworks = ['wordpress', 'codeigniter', 'drupal', 'express', 'laravel'];

        isFramework(frameworks, destRoot, this.calledFrom, this, function(environmentOption){
          self.cfg.environmentOption = environmentOption;
        });
      }
    },

    gulp: function(){
      if (this.exit) return;
      if(!this.cfg.gulpDirOption) {
        var done = this.async(),
            self = this;

        console.log(printTitle('Gulp'));

        this.prompt([{
          type: 'confirm',
          name: 'gulpDirOption',
          message: 'Place Gulp files in a subfolder?',
          default: function(answers) {
            if(self.cfg.gulpDirOption) {
              return self.cfg.gulpDirOption
            } else {
              return true
            }
          }
        }
        // , {
        //   type: 'confirm',
        //   name: 'gulpCmdOption',
        //   message: 'Run gulp command after install?',
        //   default: function(answers) {
        //     if(self.cfg.gulpCmdOption) {
        //       return self.cfg.gulpCmdOption
        //     } else {
        //       return false
        //     }
        //   }
        // }
      ], function (answers) {
          if(!this.cfg.gulpDirOption){
            this.cfg.gulpDirOption = answers.gulpDirOption;
            this.cfg.gulpCmdOption = answers.gulpCmdOption;
          }

          done();
        }.bind(this));
      }
    },

    drupal: function(){
      if (this.exit) return;

      var done = this.async(),
          self = this;

      var drupal6 = '6.38',
          drupal7 = '7.43',
          drupal8 = '8.0.6';

      this.prompt([{
        type: 'list',
        name: 'drupalVersion',
        message: 'Which version of Drupal do you want?',
        choices: [drupal6, drupal7, drupal8, 'Specify a version'],
        default: drupal7
      }, {
        when: function(answers){
          return answers.drupalVersion === 'Specify a version'
        },
        name: 'drupalVersion',
        message: 'Specify a Drupal version (0.0.0)',
        default: '0.0.0'
      }, {
        name: 'mainDir',
        message: 'Where to place Drupal?',
        default: function(answers) {
          if(self.cfg.mainDir) {
            return self.cfg.mainDir
          } else {
            return 'website'
          }
        }
      }, {
        type: 'input',
        name: 'themeName',
        message: 'What is the name of your theme?',
        default: function(answers) {
          if(self.cfg.themeName) {
            return self.cfg.themeName
          } else {
            return 'My Theme'
          }
        }
      }], function (answers) {
        this.cfg.environmentOption = 'drupal';
        this.cfg.mainDir = answers.mainDir;
        this.cfg.themeName = answers.themeName;
        this.cfg.themeDir = answers.themeName.replace(/\W/g, '').toLowerCase();
        this.cfg.themeNameSpace = answers.themeNameSpace;
        this.cfg.drupalVersion = answers.drupalVersion;
        // this.cfg.removeDefaultThemes = answers.removeDefaultThemes;

        done();
      }.bind(this));
    },

    static: function(){
      this.composeWith('robonkey:static',{
        options: {
          calledFrom: generatorName,
          cfg: this.cfg
        }
      });
    },
  },


  configuring: function () {
    if (this.exit) return;

    this.gulpDirOption = this.cfg.gulpDirOption;
    this.gulpCmdOption = this.cfg.gulpCmdOption;
    this.environmentOption = this.cfg.environmentOption;
    this.mainDir = this.cfg.mainDir;
    this.themeName = this.cfg.themeName;
    this.themeDir = this.cfg.themeDir;
    this.themeNameSpace = this.cfg.themeNameSpace;
    this.drupalVersion = this.cfg.drupalVersion;


    var done = this.async();
    this.config.set(this.cfg);

    done();
  },

  writing: {
    downloading: function() {
      if (this.exit) return;
      var done = this.async(),
          self = this;

      var downloadDrupal = function () {
        self.extract('https://github.com/drupal/drupal/archive/' + self.drupalVersion + '.tar.gz', './', function(){
          fs.rename('drupal-' + self.drupalVersion, self.mainDir);
          done();
        });
      }

      console.log(printTitle('Installing Drupal'));

      console.log('Downloading Drupal version ' + this.drupalVersion);

      try {
        fs.accessSync(self.mainDir, fs.F_OK);
        console.log('Folder ' + self.mainDir + ' exists');
        rimraf(self.mainDir, function(){
          self.extract('https://github.com/drupal/drupal/archive/' + self.cfg.drupalVersion + '.tar.gz', './', function(){
            fs.rename('drupal-' + self.cfg.drupalVersion, self.cfg.mainDir);
            done();
          });
        });
      } catch (e) {
        console.log('Folder ' + self.mainDir + ' doesn\'t exist');
        self.extract('https://github.com/drupal/drupal/archive/' + self.cfg.drupalVersion + '.tar.gz', './', function(){
          fs.rename('drupal-' + self.cfg.drupalVersion, self.cfg.mainDir);
          done();
        });
      }
    }
  },

  install: function(){
    var done = this.async();
    installDep(this, function(){});
    done();
  }

});
