'use strict';

var yeoman        = require('yeoman-generator'),
    yosay         = require('yosay'),
    fs            = require('fs'),
    util          = require('util'),
    chalk         = require('chalk'),
    path          = require('path'),
    rimraf        = require('rimraf'),
    exec          = require('child_process').exec,
    semver        = require('semver'),
    mkdirp        = require('mkdirp'),
    printTitle    = require('../app/helpers/printTitle'),
    download      = require('../app/helpers/download');

module.exports = yeoman.generators.Base.extend({
  initializing: function(){
    this.log(printTitle('Configuring WordPress'));


    var done = this.async(),
        self = this;

        this.log('Trying to get the latest stable version of Wordpress')
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
              self.log('Latest version: ' + self.latestVersion)
            }
          }
        done()
      })
    } catch (e) {
      done()
    }
  },


  prompting: function(){
    var done = this.async();

    this.prompt([{
        name: 'wordpressVersion',
        message: 'Which version of Wordpress do you want?',
        default: this.latestVersion
    }, {
      name: 'mainDir',
      message: 'Where to place WordPress?',
      default: 'website'
    }, {
      type: 'confirm',
      name: 'removeDefaultThemes',
      message: 'Remove default themes?',
      default: false
    }], function (answers) {
      answers.environmentOption = 'wordpress';
      this.wordpressVersion = answers.wordpressVersion;
      this.mainDir = answers.mainDir;
      this.removeDefaultThemes = answers.removeDefaultThemes;
      this.wordpressPrompt = answers;

      done();
    }.bind(this));
  },


  configuring: function () {
    var done = this.async();
    this.config.set(this.wordpressPrompt);

    done();
  },

  writing: {
    downloading: function(){

      this.log(printTitle('Installing WordPress'));

      var done = this.async(),
          self = this;

      this.log('Downloading Wordpress version ' + this.wordpressVersion);

      try {
        fs.accessSync(self.mainDir, fs.F_OK);
        console.log('Folder ' + self.mainDir + ' exists');
        rimraf(self.mainDir, function(){
          download('wordpress', self);
        });
      } catch (e) {
        console.log('Folder ' + self.mainDir + ' doesn\'t exist');
        download('wordpress', self);
      }

      done();
    },

    removing: function(){
      var done = this.async(),
          self = this;

      var wpThemes = this.mainDir + '/wp-content/themes/';

      if(this.removeDefaultThemes === true) {
        this.log('First let\'s remove the built-in themes we will not use');
        // remove the existing themes
        fs.readdir(wpThemes, function(err, files) {
          if (typeof files != 'undefined' && files.length !== 0) {
            files.forEach(function(file) {
              var pathFile = fs.realpathSync(wpThemes + file),
                isDirectory = fs.statSync(pathFile).isDirectory()

              if (isDirectory) {
                rimraf.sync(pathFile);
                this.log.writeln('Removing ' + pathFile);
              }
            });
          }
        });
      }
      done();
    },
  }
});
