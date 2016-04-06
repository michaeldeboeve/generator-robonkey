'use strict';

var yeoman        = require('yeoman-generator'),
    yosay         = require('yosay'),
    fs            = require('fs'),
    chalk         = require('chalk'),
    path          = require('path'),
    rimraf        = require('rimraf'),
    exec          = require('child_process').exec,
    semver        = require('semver'),
    mkdirp        = require('mkdirp');

module.exports = yeoman.Base.extend({

  wpCheckVersion: function(){
    var done = this.async(),
        self = this;

        this.log.writeln('')
        this.log.writeln('Trying to get the latest stable version of Wordpress')
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
              self.log.writeln('Latest version: ' + self.latestVersion)
            }
          }
        done()
      })
    } catch (e) {
      done()
    }
  },

  wpPrompt: function(){
    var done = this.async(),
        self = this

    this.prompt([{
      name: 'mainDir',
      message: 'Where to place Drupal?',
      default: 'website'
    }, {
      name: 'themeName',
      message: 'Name of the theme you want to use',
      default: 'mytheme'
    }, {
      name: 'themeBoilerplate',
      message: 'Starter theme (please provide a github link)',
      default: 'https://github.com/eddiemachado/bones',
      filter: function (input) {
        return input.replace(/\ /g, '').toLowerCase()
      }
    }, {
      name: 'assetsDir',
      message: 'Name your assets folder:',
      default: 'assets'
    }, {
      name: 'jsDir',
      message: 'Name your javascript directory:',
      default: 'js'
    }, {
      name: 'cssDir',
      message: 'Name your styles directory:',
      default: 'css'
    }, {
      name: 'imgDir',
      message: 'Name your images directory:',
      default: 'img'
    }, {
      name: 'fontDir',
      message: 'Name your fonts directory:',
      default: 'fonts'
    }, {
      name: 'libDir',
      message: 'Name your libraries directory (css/js)',
      default: 'lib'
    }, {
        name: 'wordpressVersion',
        message: 'Which version of Wordpress do you want?',
        default: self.latestVersion
    }], function (answers) {
      self.mainDir = answers.mainDir;
      self.assetsDir = answers.assetsDir;
      self.jsDir = answers.jsDir;
      self.cssDir = answers.cssDir;
      self.imgDir = answers.imgDir;
      self.fontDir = answers.fontDir;
      self.libDir = answers.libDir;
      self.themeNameOriginal = answers.themeName;
      self.themeName = answers.themeName;
      self.themeOriginalURL = answers.themeBoilerplate;
      self.themeBoilerplate = answers.themeBoilerplate;
      self.wordpressVersion = answers.wordpressVersion;


      var tarballLink = (/[.]*archive\/[.]*.*.tar.gz/).test(answers.themeBoilerplate)
      if (!tarballLink) {
        // if the user gave the repo url we add the end of the url. we assume he wants the master branch
        var lastChar = answers.themeBoilerplate.substring(answers.themeBoilerplate.length - 1)
        if (lastChar === '/') {
          answers.themeBoilerplate = answers.themeBoilerplate+'archive/master.tar.gz'
        }
        else {
          answers.themeBoilerplate = answers.themeBoilerplate+'/archive/master.tar.gz'
        }
      }

      done();
    }.bind(this));
  },

  wpInstall: function(){
    var done = this.async(),
        self = this

    this.log.writeln('Let\'s download the framework, shall we?');
    this.log.writeln('Downloading Wordpress version ' + self.wordpressVersion);
    this.extract('https://github.com/WordPress/WordPress/archive/' + self.wordpressVersion + '.tar.gz', './', function(){
      fs.rename('WordPress-' + self.wordpressVersion, self.mainDir);
      done();
    });
  },

  wpInstallTheme: function(){
    var done = this.async(),
        self = this

    var wpThemes = self.mainDir + '/wp-content/themes/';
    var themeLocation = wpThemes + self.themeName;

    this.log.writeln('First let\'s remove the built-in themes we will not use')
    // remove the existing themes
    fs.readdir(wpThemes, function(err, files) {
      if (typeof files != 'undefined' && files.length !== 0) {
        files.forEach(function(file) {
          var pathFile = fs.realpathSync(wpThemes + file),
              isDirectory = fs.statSync(pathFile).isDirectory()

          if (isDirectory) {
              rimraf.sync(pathFile)
              self.log.writeln('Removing ' + pathFile)
          }
        })
      }

      self.log.writeln('')
      self.log.writeln('Now we download the theme')

      // create the theme
      self.extract(self.themeBoilerplate + '/archive/master.tar.gz', wpThemes, function(){
        fs.rename(wpThemes + '/bones-master', wpThemes + self.themeName, function(){
          mkdirp(themeLocation + '/' + self.assetsDir + '/' + self.jsDir + '/' + self.libDir);
          mkdirp(themeLocation + '/' + self.assetsDir + '/' + self.cssDir + '/' + self.libDir);
          mkdirp(themeLocation + '/' + self.assetsDir + '/' + self.imgDir);
          mkdirp(themeLocation + '/' + self.assetsDir + '/' + self.fontDir);
        });
        done();
      });
    })
  }

});
