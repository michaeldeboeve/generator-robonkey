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
      this.cfg.environmentOption ='wordpress';
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

    wordpressVersion: function(){
      if (this.exit) return;

      console.log(printTitle('Configuring WordPress'));

      var done = this.async(),
          self = this;

          console.log('Trying to get the latest stable version of Wordpress')
          // try to get the latest version using the git tags
      try {
        var version = exec('git ls-remote --tags git://github.com/WordPress/WordPress.git', function(err, stdout, stderr) {
          if (err !== null) {
            self.writeln('exec error: ' + err)
          } else {

            var pattern = /\d\.\d[\.\d]*/ig,
                match = stdout.match(pattern),
                patternShort = /^\d\.\d$/,
                latestVersion = match[match.length - 1],
                semverLatestString = latestVersion,
                semverVersionString = latestVersion
            if (semverLatestString.match(patternShort)) semverLatestString += '.0'
            if (semverVersionString.match(patternShort)) semverVersionString += '.0'

            if (semverLatestString !== null && typeof semverLatestString !== 'undefined') {
                self.latestVersion = latestVersion
                console.log('Latest version: ' + self.latestVersion)
              }
            }
          done()
        })
      } catch (e) {
        done()
      }
    },


    wordpress: function(){
      if (this.exit) return;

      var done = this.async(),
          self = this;

      this.prompt([{
          name: 'wordpressVersion',
          message: 'Which version of Wordpress do you want?',
          default: this.latestVersion
      }, {
        name: 'mainDir',
        message: 'Where to place WordPress?',
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
      }, {
        type: 'confirm',
        name: 'wpBlankTheme',
        message: 'Would you like to create a blank theme?',
        default: function(answers) {
          if(self.cfg.wpBlankTheme) {
            return self.cfg.wpBlankTheme
          } else {
            return true
          }
        }
      }, {
        when: function (answers) {
          return answers.wpBlankTheme === true;
        },
        name: 'themeNameSpace',
        message: 'Unique name-space for the theme (alphanumeric)?',
        default: function( answers ) {
            return answers.themeName.replace(/\W/g, '').toLowerCase();
        }
      }, {
        type: 'confirm',
        name: 'removeDefaultThemes',
        message: 'Remove default themes?',
        default: function(answers) {
          if(self.cfg.removeDefaultThemes) {
            return self.cfg.removeDefaultThemes
          } else {
            return true
          }
        }
      }], function (answers) {
        this.cfg.environmentOption = 'wordpress';
        this.cfg.mainDir = answers.mainDir;
        this.cfg.themeName = answers.themeName;
        this.cfg.wpBlankTheme = answers.wpBlankTheme;
        this.cfg.themeDir = answers.themeName.replace(/\W/g, '').toLowerCase();
        this.cfg.themeNameSpace = answers.themeNameSpace;
        this.cfg.wordpressVersion = answers.wordpressVersion;
        this.cfg.removeDefaultThemes = answers.removeDefaultThemes;

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
    this.wpBlankTheme = this.cfg.wpBlankTheme;
    this.themeDir = this.cfg.themeDir;
    this.themeNameSpace = this.cfg.themeNameSpace;
    this.wordpressVersion = this.cfg.wordpressVersion;
    this.removeDefaultThemes = this.cfg.removeDefaultThemes;


    var done = this.async();
    this.config.set(this.cfg);

    done();
  },

  writing: {
    downloading: function(){
      if (this.exit) return;

      console.log(printTitle('Installing WordPress'));

      var done = this.async(),
          self = this;

      console.log('Downloading Wordpress version ' + this.wordpressVersion);

      try {
        fs.accessSync(self.mainDir, fs.F_OK);
        console.log('Folder ' + self.mainDir + ' exists');
        rimraf(self.mainDir, function(){
          self.extract('https://github.com/WordPress/WordPress/archive/' + self.wordpressVersion + '.tar.gz', './', function(){
            fs.rename('WordPress-' + self.wordpressVersion, self.mainDir);
            done();
          });
        });
      } catch (e) {
        console.log('Folder ' + self.mainDir + ' doesn\'t exist');
        self.extract('https://github.com/WordPress/WordPress/archive/' + self.wordpressVersion + '.tar.gz', './', function(){
          fs.rename('WordPress-' + self.wordpressVersion, self.mainDir);
          done();
        });
      }


    },

    removing: function(){
      if (this.exit) return;

      var done = this.async(),
          self = this;

      var wpThemes = this.mainDir + '/wp-content/themes/';

      if(this.removeDefaultThemes === true) {
        console.log('First let\'s remove the built-in themes we will not use');
        // remove the existing themes
        fs.readdir(wpThemes, function(err, files) {
          if (typeof files != 'undefined' && files.length !== 0) {
            files.forEach(function(file) {
              var pathFile = fs.realpathSync(wpThemes + file),
                isDirectory = fs.statSync(pathFile).isDirectory()

              if (isDirectory) {
                rimraf.sync(pathFile);
                console.log('Removing ' + pathFile);
              }
            });
          }
        });
      }
      done();
    },
  },

  install: function(){
    var done = this.async();
    installDep(this, function(){});
    done();
  }

});
