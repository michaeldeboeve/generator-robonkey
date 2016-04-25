'use strict';

var yeoman          = require('yeoman-generator'),
    fs              = require('fs'),
    path            = require('path'),
    chalk           = require('chalk'),
    mkdirp          = require('mkdirp'),
    jsonfile        = require('jsonfile'),
    generatorName   = path.basename(__dirname);

var greeting        = require('../app/helpers/greeting'),
    printTitle      = require('../app/helpers/printTitle');

var init            = require('../app/config/init'),
    setConfigVars   = require('../app/config/setConfigVars'),
    setConfigFiles  = require('../app/config/setConfigFiles'),
    copyFiles       = require('../app/config/copyFiles'),
    installDep      = require('../app/config/installDep');

var structureExists = require('../app/prompts/structureExists'),
    gulpPrompt      = require('../app/prompts/gulpPrompt');


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
      gulpPrompt(this, function(){})
    },

    existingStructure: function(){
      if(this.exit) return;
      structureExists(this, ['mainDir', 'assetsDir', 'cssDir', 'gulpDirOption'], function(){});
    },

    structure: function(){
      if(!this.calledFrom && !this.continueStructure) {
        var done = this.async(),
            self = this;

        console.log(printTitle('Folder Structure'));

        this.prompt([{
          name: 'mainDir',
          message: 'What is your main directory?',
          default: function(answers) {
            if(self.cfg.mainDir) {
              return self.cfg.mainDir
            } else {
              return 'website'
            }
          }
        }, {
          name: 'assetsDir',
          message: 'Name your assets folder:',
          default: function(answers) {
            if(self.cfg.assetsDir) {
              return self.cfg.assetsDir
            } else {
              return 'assets'
            }
          }
        }, {
          type: 'input',
          name: 'cssDir',
          message: 'Name your css directory:',
          default: function(answers) {
            if(self.cfg.cssDir) {
              return self.cfg.cssDir
            } else {
              return 'css'
            }
          }
        }], function (answers) {
          this.cfg.mainDir = answers.mainDir;
          this.cfg.assetsDir = answers.assetsDir;
          this.cfg.cssDir = answers.cssDir;
          this.cfg.fontDir = answers.fontDir;



          done();
        }.bind(this));
      }
    },


    preprocessor: function(){
      if(!this.calledFrom){
        var done = this.async(),
            self = this;

        console.log(printTitle('Styles'));

        this.prompt([{
          type: 'list',
          name: 'preproOption',
          message: 'What preprocessor would you like to use?',
          choices: [{
            name: 'Sass',
            value: 'scss'
          }, {
            name: 'Stylus',
            value: 'stylus'
          }, {
            name: 'Less',
            value: 'less'
          }],
          default: this.cfg.preproOption
        }], function (answers) {
          this.cfg.preproOption = answers.preproOption;


          done();
        }.bind(this));
      }
    },

    font: function(){
      var done = this.async(),
          self = this;

      console.log(printTitle('Icon Font'));

      this.prompt([{
          type: 'confirm',
          name: 'customIconfontOption',
          message: 'Would you like to include a custom icon font?',
          default: false
      }, {
        when: function (answers) {
          return answers.customIconfontOption === true;
        },
        name: 'customIconFontName',
        message: 'Name your custom icon font',
        default: 'robonky-glyphs'
      }], function (answers) {
        this.cfg.customIconfontOption = answers.customIconfontOption;
        this.cfg.customIconFontName = answers.customIconFontName;

        done();
      }.bind(this));
    },
  },




  configuring: {

    answers: function(){
      var done = this.async();

      setConfigVars(this, function(result){})

      this.gulpDirOption = this.cfg.gulpDirOption;
      this.gulpCmdOption = this.cfg.gulpCmdOption;
      this.preproOption = this.cfg.preproOption;
      this.customIconfontOption = this.cfg.customIconfontOption;
      this.customIconFontName = this.cfg.customIconFontName;

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

    copyFiles.copyIconFontFiles(this, destRoot, gulpRoot, sourceRoot, function(){
      // console.log('Icon font files copied.');
    });

    done();
  },




  install: function(){
    if(this.exit) return;

    var done = this.async();
    installDep(this, function(){});
    done();
  }



});
