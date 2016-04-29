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
      this.cfg.environmentOption ='wordpress';
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

    wordpressVersion: function(){
      if(this.exit) return;

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
      if(this.exit) return;

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
        message: 'Remove built-in themes?',
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
    }
  },




  configuring: {
    answers: function () {
      if(this.exit) return;
      var done = this.async(),
          self = this;
      setBaseConfigVars(this, function(){
        self.themeName = self.cfg.themeName;
        self.wpBlankTheme = self.cfg.wpBlankTheme;
        self.themeDir = self.cfg.themeDir;
        self.themeNameSpace = self.cfg.themeNameSpace;
        self.wordpressVersion = self.cfg.wordpressVersion;
        self.removeDefaultThemes = self.cfg.removeDefaultThemes;

        self.config.set(self.cfg);
        done();
      });
    }
  },



  writing: {
    download: function(){
      if(this.exit) return;

      console.log(printTitle('Installing WordPress'));

      var done = this.async(),
          self = this;

      console.log('Downloading Wordpress version ' + this.wordpressVersion);

      try {
        fs.accessSync(self.mainDir, fs.F_OK);
        console.log('Folder ' + self.mainDir + ' exists');
        rimraf(self.mainDir, function(){
          getFramework.wordpress(self, function(){
            done();
          })
        });
      } catch (e) {
        console.log('Folder ' + self.mainDir + ' doesn\'t exist');
        getFramework.wordpress(self, function(){
          done();
        })
      }
    },

    themes: function(){
      if(this.exit) return;

      var done = this.async(),
          self = this;

      var wpThemes = path.join(this.mainDir, 'wp-content/themes/');

      // Remove redundant themes
      if(this.removeDefaultThemes === true) {

        console.log(printTitle('Remove built-in themes'));

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

      // Create the theme directory
      mkdirp(path.join(wpThemes, self.themeDir));

      done();
    },
  },

  end: function(){
    console.log(printTitle('Wordpress is installed'));
    console.log('You can now run ' + chalk.yellow.bold('yo robonkey') + ' to continue installing your project.\n\n')
  }

});
