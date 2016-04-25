'use strict';

var yeoman          = require('yeoman-generator'),
    fs              = require('fs'),
    path            = require('path'),
    mkdirp          = require('mkdirp'),
    jsonfile        = require('jsonfile'),
    generatorName   = path.basename(__dirname);

var greeting        = require('../app/helpers/greeting'),
    printTitle      = require('../app/helpers/printTitle'),
    hasFeature      = require('../app/helpers/hasFeature'),
    createJson      = require('../app/helpers/createJson');

var init            = require('../app/config/init'),
    setConfigVars   = require('../app/config/setConfigVars'),
    setConfigFiles  = require('../app/config/setConfigFiles'),
    writeBower      = require('../app/config/writeBower'),
    copyFiles       = require('../app/config/copyFiles'),
    installDep      = require('../app/config/installDep');

var structureExists = require('../app/prompts/structureExists');

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

    existingStructure: function(){
      if (this.exit) return;
      structureExists(this, ['mainDir', 'assetsDir', 'jsDir', 'gulpDirOption'], function(){});
    },

    structure: function(){
      if(!this.calledFrom && !this.continueStructure) {
        var done = this.async(),
            self = this;

        console.log(printTitle('Folder structure'));

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
          name: 'jsDir',
          message: 'Name your javascript directory:',
          default: function(answers) {
            if(self.cfg.jsDir) {
              return self.cfg.jsDir
            } else {
              return 'js'
            }
          }
        }, {
          type: 'input',
          name: 'libDir',
          message: 'Name your javascript directory:',
          default: function(answers) {
            if(self.cfg.libDir) {
              return self.cfg.libDir
            } else {
              return 'lib'
            }
          }
        }], function (answers) {
          this.cfg.mainDir = answers.mainDir;
          this.cfg.assetsDir = answers.assetsDir;
          this.cfg.jsDir = answers.jsDir;
          this.cfg.libDir = answers.libDir;

          done();
        }.bind(this));
      }
    },

    javascript: function() {
      console.log(printTitle('Javascript'));

      var done = this.async(),
          self = this;

      this.prompt([{
        type: 'list',
        name: 'javascriptOption',
        message: 'How would you like to write javascript?',
        choices: [{
          name: 'Vanilla',
          value: 'vanilla'
        }, {
          name: 'CoffeeScript',
          value: 'coffee'
        }],
        default: function(){
          if(self.cfg.javascriptOption) return self.cfg.javascriptOption
          else return 'vanilla'
        }
      }], function (answers) {

        this.cfg.javascriptOption = answers.javascriptOption;

        done();
      }.bind(this));

    },

    jslibs: function() {
      console.log(printTitle('Javascript Libraries'));

      var done = this.async(),
          self = this;

      this.prompt([{
        type: 'checkbox',
        name: 'scriptsOption',
        message: 'What Javascript libraries to include?',
        choices: [{
          name: 'Modernizr',
          value: 'modernizr',
          checked: hasFeature('modernizr', self.cfg.scriptsOption)
        }, {
          name: 'jQuery',
          value: 'jquery',
          checked: hasFeature('jquery', self.cfg.scriptsOption)
        }, {
          name: 'Zepto',
          value: 'zepto',
          checked: hasFeature('zepto', self.cfg.scriptsOption)
        }, {
          name: 'Snap.svg',
          value: 'snap',
          checked: hasFeature('snap', self.cfg.scriptsOption)
        }, {
          name: 'Requirejs',
          value: 'require',
          checked: hasFeature('require', self.cfg.scriptsOption)
        }, {
          name: 'Waypoints',
          value: 'waypoints',
          checked: hasFeature('waypoints', self.cfg.scriptsOption)
        }, {
          name: 'Signals',
          value: 'signals',
          checked: hasFeature('signals', self.cfg.scriptsOption)
        }, {
          name: 'D3js',
          value: 'dthreejs',
          checked: hasFeature('dthreejs', self.cfg.scriptsOption)
        }, {
          name: 'TweenMax',
          value: 'tweenmax',
          checked: hasFeature('tweenmax', self.cfg.scriptsOption)
        }, {
          name: 'Enquire',
          value: 'enquire',
          checked: hasFeature('enquire', self.cfg.scriptsOption)
        }, {
          name: 'Angular',
          value: 'angular',
          checked: hasFeature('angular', self.cfg.scriptsOption)
        }, {
          name: 'Backbone',
          value: 'backbone',
          checked: hasFeature('backbone', self.cfg.scriptsOption)
        }, {
          name: 'Underscore',
          value: 'underscore',
          checked: hasFeature('underscore', self.cfg.scriptsOption)
        }, {
          name: 'Scrollreveal',
          value: 'scrollreveal',
          checked: hasFeature('scrollreveal', self.cfg.scriptsOption)
        }]
      }], function (answers) {

        this.cfg.scriptsOption = answers.scriptsOption;

        done();
      }.bind(this));
    },

  },



  configuring: {

    answers: function() {
      var done = this.async(),
          self = this;

      setConfigVars(this, function(result){});

      this.gulpDirOption = this.cfg.gulpDirOption;
      this.gulpCmdOption = this.cfg.gulpCmdOption;
      var scriptsOption = this.cfg.scriptsOption;
      this.scriptsOption = this.cfg.scriptsOption;
      this.javascriptOption = this.cfg.javascriptOption;

      this.jsScripts = [];

      for (var i = 0; i < this.scriptsOption.length; i++) {
        switch(this.scriptsOption[i]) {
          case 'jquery':
            this.jsScripts.push({
              key: 'jquery',
              file: 'jquery.min.js',
              main: 'dist/jquery.min.js',
              sort: 0
            });
          break;

          case 'zepto':
            this.jsScripts.push({
              key: 'zepto',
              file: 'zepto.min.js',
              main: 'zepto.min.js',
              sort: 0
            });
          break;

          case 'underscore':
            this.jsScripts.push({
              key: 'underscore',
              file: 'underscore-min.js',
              main: 'underscore-min.js',
              sort: 1
            });
          break;

          case 'angular':
            this.jsScripts.push({
              key: 'angular',
              file: 'angular.min.js',
              main: 'angular.min.js',
              sort: 2
            });
          break;

          case 'waypoints':
            if(hasFeature('jquery', scriptsOption)){
              this.jsScripts.push({
                key: 'waypoints',
                file: 'jquery.waypoints.min.js',
                main: 'lib/jquery.waypoints.min.js',
                sort: 2
              });
            } else if(!hasFeature('jquery', scriptsOption) && hasFeature('zepto', scriptsOption)){
              this.jsScripts.push({
                key: 'waypoints',
                file: 'zepto.waypoints.min.js',
                main: 'lib/zepto.waypoints.min.js',
                sort: 2
              });
            } else {
              this.jsScripts.push({
                key: 'waypoints',
                file: 'noframework.waypoints.min.js',
                main: 'lib/noframework.waypoints.min.js',
                sort: 2
              });
            }
          break;

          case 'signals':
            this.jsScripts.push({
              key: 'js-signals',
              file: 'signals.min.js',
              main: 'dist/signals.min.js',
              sort: 3
            });
          break;

          case 'snap':
            this.jsScripts.push({
              key: 'snap',
              file: 'snap.svg-min.js',
              main: 'dist/snap.svg-min.js',
              sort: 3
            });
          break;

          case 'dthreejs':
            this.jsScripts.push({
              key: 'd3',
              file: 'd3.min.js',
              main: 'd3.min.js',
              sort: 4
            });
          break;

          case 'enquire':
            this.jsScripts.push({
              key: 'enquire',
              file: 'enquire.min.js',
              main: 'dist/enquire.min.js',
              sort: 5
            });
          break;

          case 'tweenmax':
            this.jsScripts.push({
              key: 'gsap',
              file: 'TweenMax.min.js',
              main: 'src/minified/TweenMax.min.js',
              sort: 6
            });
          break;


          case 'backbone':
            this.jsScripts.push({
              key: 'backbone',
              file: 'backbone-min.js',
              main: 'backbone-min.js',
              sort: 7
            });
          break;


          case 'scrollreveal':
            this.jsScripts.push({
              key: 'scrollreveal',
              file: 'scrollreveal.min.js',
              main: 'dist/scrollreveal.min.js',
              src:  'scrollreveal/dist/',
              sort: 10
            });
          break;
        }
      }

      this.jsScriptsBower = this.jsScripts;

      // Push extra scripts to bower list
      if(hasFeature('require', scriptsOption)) {
        this.jsScriptsBower.push({
          key: 'require',
          file: 'require.js',
          main: 'require.js',
          sort: 0
        });
      }

      // if(hasFeature('modernizr', scriptsOption)) {
      //   this.jsScriptsBower.push({
      //     file: 'modernizr-custom.js',
      //     src: this.rootFolder + 'src/modernizr/',
      //     main: this.rootFolder + 'src/modernizr/',
      //     sort: 8
      //   });
      // }

      if(hasFeature('react', scriptsOption)) {
        this.jsScriptsBower.push({
          file: 'react-with-addons.min.js',
          sort: 0
        });
      }


      // Overwrite this.jsScripts id Require option is true
      if(hasFeature('require', scriptsOption)) {
        this.jsScripts = [];
        this.jsScripts.push({
          file: 'require.js',
          sort: 0
        });
      }

      this.jsScripts = this.jsScripts.sort(function(a,b){return a.sort-b.sort});
      this.jsScriptsBower = this.jsScriptsBower.sort(function(a,b){return a.sort-b.sort});

      this.modernizrOption = hasFeature('modernizr', scriptsOption);
      this.jqueryOption = hasFeature('jquery', scriptsOption);
      this.snapOption = hasFeature('snap', scriptsOption);
      this.waypointsOption = hasFeature('waypoints', scriptsOption);
      this.signalsOption = hasFeature('signals', scriptsOption);
      this.dthreejsOption = hasFeature('dthreejs', scriptsOption);
      this.tweenmaxOption = hasFeature('tweenmax', scriptsOption);
      this.enquireOption = hasFeature('enquire', scriptsOption);
      this.requireOption = hasFeature('require', scriptsOption);
      this.modernizrOption = hasFeature('modernizr', scriptsOption);
      this.angularOption = hasFeature('angular', scriptsOption);
      this.backboneOption = hasFeature('backbone', scriptsOption);
      this.underscoreOption = hasFeature('underscore', scriptsOption);
      this.zeptoOption = hasFeature('zepto', scriptsOption);
      this.scrollrevealOption = hasFeature('scrollreveal', scriptsOption);

      done();
    },

    config: function(){
      var done = this.async();
      setConfigFiles(this, function(){
        // console.log('Config Files written...')
      });
      done();
    },


    setbower: function() {
      var done = this.async();

      writeBower(this);

      done();
    }


  },




  writing: function(){
    var done       = this.async(),
        destRoot   = this.destinationRoot(),
        gulpRoot   = destRoot,
        sourceRoot = this.sourceRoot();
    if(this.cfg.gulpDirOption) gulpRoot = destRoot + '/gulp';

    copyFiles.copyJsFiles(this, destRoot, gulpRoot, sourceRoot, function(){
      console.log('Javascript files copied.');
    });

    done();
  },




  install: function(){
    if (this.exit) return;

    var done = this.async();
    installDep(this, function(){});
    done();
  }



});
