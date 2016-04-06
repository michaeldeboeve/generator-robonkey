'use strict';

var yeoman        = require('yeoman-generator'),
    yosay         = require('yosay'),
    fs            = require('fs'),
    chalk         = require('chalk'),
    path          = require('path'),
    mkdirp        = require('mkdirp');

module.exports = yeoman.Base.extend({

  drupalPrompt: function(){
    var done = this.async(),
        self = this;

    var drupal6 = '6.38',
        drupal7 = '7.43',
        drupal8 = '8.0.6';

    this.prompt([{
      name: 'mainDir',
      message: 'Where to place Drupal?',
      default: 'website'
    }, {
      name: 'themeName',
      message: 'Name of the theme you want to use',
      default: 'mytheme'
    },
    // {
    //   name: 'themeBoilerplate',
    //   message: 'Starter theme (please provide an archive link)',
    //   filter: function (input) {
    //     return input.replace(/\ /g, '').toLowerCase()
    //   }
    // },
    {
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
      self.drupalVersion = answers.drupalVersion;

      // var tarballLink = (/[.]*archive\/[.]*.*.tar.gz/).test(answers.themeBoilerplate)
      // if (!tarballLink) {
      //   // if the user gave the repo url we add the end of the url. we assume he wants the master branch
      //   var lastChar = answers.themeBoilerplate.substring(answers.themeBoilerplate.length - 1)
      //   if (lastChar === '/') {
      //     answers.themeBoilerplate = answers.themeBoilerplate+'archive/master.tar.gz'
      //   }
      //   else {
      //     answers.themeBoilerplate = answers.themeBoilerplate+'/archive/master.tar.gz'
      //   }
      // }

      done();
    }.bind(this));
  },

  drupalInstall: function(){
    var done = this.async(),
        self = this;

    this.log.writeln('Let\'s download the framework, shall we?');
    this.log.writeln('Downloading Drupal version ' + self.drupalVersion);
    this.extract('https://github.com/drupal/drupal/archive/' + self.drupalVersion + '.tar.gz', './', function(){
      fs.rename('drupal-' + self.drupalVersion, self.mainDir);
      done();
    });
  },

  drupalInstallTheme: function(){
    var done = this.async(),
        self = this;

    var drupalThemes = self.mainDir + '/themes/';
    var themeLocation = drupalThemes + self.themeName;
    mkdirp(themeLocation + '/' + self.assetsDir + '/' + self.jsDir + '/' + self.libDir);
    mkdirp(themeLocation + '/' + self.assetsDir + '/' + self.cssDir + '/' + self.libDir);
    mkdirp(themeLocation + '/' + self.assetsDir + '/' + self.imgDir);
    mkdirp(themeLocation + '/' + self.assetsDir + '/' + self.fontDir);
    // this.log.writeln('First let\'s remove the built-in themes we will not use')
    // // remove the existing themes
    // fs.readdir(drupalThemes, function(err, files) {
    //   if (typeof files != 'undefined' && files.length !== 0) {
    //     files.forEach(function(file) {
    //       var pathFile = fs.realpathSync(drupalThemes + file),
    //           isDirectory = fs.statSync(pathFile).isDirectory()
    //
    //       if (isDirectory) {
    //           rimraf.sync(pathFile)
    //           self.log.writeln('Removing ' + pathFile)
    //       }
    //     })
    //   }
    //
    //   self.log.writeln('')
    //   self.log.writeln('Now we download the theme')
    //
    //   // create the theme
    //   self.extract(self.themeBoilerplate + '/archive/master.tar.gz', drupalThemes, function(){
    //     fs.rename(drupalThemes + 'bones-master', drupalThemes + self.themeName);
    //     done();
    //   });
    // })
  }

});
