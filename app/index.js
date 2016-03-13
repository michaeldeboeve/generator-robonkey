'use strict';

var generators = require('yeoman-generator'),
    mkdirp = require('mkdirp'),
    yosay = require('yosay'),
    chalk = require('chalk');

module.exports = generators.Base.extend({

  _createProjectFileSystem: function(){
    var destRoot = this.destinationRoot(),
        sourceRoot = this.sourceRoot(),
        appDir = destRoot,
        templateContext = {
          appname: this.appname,
          appdescription: this.appdescription,
          appversion: this.appversion,
          applicense: this.applicense,
          appauthor: this.appauthor,
          appemail: this.appemail
        };

    // Create Folders
    mkdirp(appDir + '/gulp');
    mkdirp(appDir + '/src');
    mkdirp(appDir + '/website');
    mkdirp(appDir + '/website/assets');
    mkdirp(appDir + '/website/assets/js');
    mkdirp(appDir + '/website/assets/js/libs');
    mkdirp(appDir + '/website/assets/images');
    mkdirp(appDir + '/website/assets/fonts');

    // Copy Website Files
    this.fs.copy(sourceRoot + '/website/.htaccess', destRoot + '/website/.htaccess');
    this.fs.copy(sourceRoot + '/website/index.html', destRoot + '/website/index.html');
    // this.fs.copy(sourceRoot + '/website/browserconfig.xml', destRoot + '/website/browserconfig.xml');
    // this.fs.copy(sourceRoot + '/website/crossdomain.xml', destRoot + '/website/crossdomain.xml');
    // this.fs.copyTpl(sourceRoot + '/website/humans.txt', destRoot + '/website/humans.txt', templateContext);
    // this.fs.copy(sourceRoot + '/website/robots.txt', destRoot + '/website/robots.txt');

    // Copy Bower Files
    this.fs.copy(sourceRoot + '/bower/.bowerrc', destRoot + '/gulp/.bowerrc');
    this.fs.copyTpl(sourceRoot + '/bower/bower.json', destRoot + '/gulp/bower.json', templateContext);

    // Copy Gulp Files
    this.fs.copyTpl(sourceRoot + '/gulp/package.json', destRoot + '/gulp/package.json', templateContext);
    this.fs.copy(sourceRoot + '/gulp/gulpfile.js', destRoot + '/gulp/gulpfile.js');
    this.fs.copy(sourceRoot + '/gulp/csscomb.json', destRoot + '/gulp/csscomb.json');
    this.fs.copy(sourceRoot + '/gulp/config.json', destRoot + '/gulp/config.json');

    // Copy Src Files
    this.fs.copy(sourceRoot + '/src', destRoot + '/src');
  },

  _copyBowerComponents: function() {
    var bowerRoot = this.destinationRoot() + '/../src/bower_components';
    var destRoot = this.destinationRoot() + '/../website/assets/js/libs';
    var srcsRoot = this.destinationRoot() + '/../src';

    // jQuery JS
    this.fs.copy(bowerRoot + '/jquery/dist/jquery.min.js', destRoot + '/jquery.min.js');

    // Waypoints JS
    this.fs.copy(bowerRoot + '/waypoints/lib/jquery.waypoints.min.js', destRoot + '/waypoints/jquery.waypoints.min.js');
    this.fs.copy(bowerRoot + '/waypoints/lib/noframework.waypoints.min.js', destRoot + '/waypoints/noframework.waypoints.min.js');
    this.fs.copy(bowerRoot + '/waypoints/lib/waypoints.debug.js', destRoot + '/waypoints/waypoints.debug.js');
    this.fs.copy(bowerRoot + '/waypoints/lib/waypoints.debug.js', destRoot + '/waypoints/waypoints.debug.js');
    this.fs.copy(bowerRoot + '/waypoints/lib/shortcuts', destRoot + '/waypoints/shortcuts');

    // Enquire JS
    this.fs.copy(bowerRoot + '/enquire/dist/enquire.min.js', destRoot + '/enquire.min.js');

    // Signals JS
    this.fs.copy(bowerRoot + '/js-signals/dist/signals.min.js', destRoot + '/signals.min.js');

    // TweenMax JS
    this.fs.copy(bowerRoot + '/gsap/src/minified', destRoot + '/gsap');

    // Reset SCSS
    this.fs.copy(bowerRoot + '/reset-css/_reset.scss', srcsRoot + '/scss/base/_reset.scss');

    // Breakpoint SCSS
    this.fs.copy(bowerRoot + '/breakpoint/breakpoint', srcsRoot + '/scss/libs/breakpoint');

    // Susy Grid SCSS
    this.fs.copy(bowerRoot + '/susy/sass/_su.scss', srcsRoot + '/scss/libs/susy/_su.scss');
    this.fs.copy(bowerRoot + '/susy/sass/_susy.scss', srcsRoot + '/scss/libs/susy/_susy.scss');
    this.fs.copy(bowerRoot + '/susy/sass/_susyone.scss', srcsRoot + '/scss/libs/susy/_susyone.scss');
    this.fs.copy(bowerRoot + '/susy/sass/susy', srcsRoot + '/scss/libs/susy/susy');

    // Animate SCSS
    // this.fs.copy(bowerRoot + '/animate.scss/scss/animate.scss', srcsRoot + '/scss/libs/animate/animate.scss');
    // this.fs.copy(bowerRoot + '/animate.scss/scss/animations', srcsRoot + '/scss/libs/animate/animations');
  },

  _getPrompts: function(){
    var prompts = [
      {
        name: 'name',
        message: 'What is the name of your project?',
        default: this.appname
      },
      {
        name: 'description',
        message: 'What is the description of your project?'
      },
      {
        name: 'version',
        message: 'What is the version of your project?',
        default: '0.0.0'
      },
      {
        name: 'license',
        message: 'How is your project licenced?',
        default: 'MIT'
      },
      {
        name: 'yourname',
        message: 'What is your name?'
      },
      {
        name: 'email',
        message: 'What is your email address?'
      }
    ];
    return prompts;
  },

  _saveAnswers: function(answers, callback) {
    this.appname = answers.name;
    this.appdescription = answers.description;
    this.appversion = answers.version;
    this.applicense = answers.license;
    this.appauthor = answers.yourname;
    this.appemail = answers.email;
    callback();
  },

  initializing: function() {
    var message = chalk.yellow.bold('Welcome to Chimp ') + chalk.yellow('\'Cause we lazy monkeyz');
    this.log(yosay(message, {maxLength: 19}));
  },
  prompting: function() {
    var done = this.async();
    this.prompt(this._getPrompts(), function(answers) {
      this._saveAnswers(answers, done);
    }.bind(this));
  },
  configuring: function(){
    this.config.save();
  },
  writing: function(){
    this._createProjectFileSystem();
  },
  install: function() {
    // Change working directory to 'gulp' for dependency install
    var npmdir = process.cwd() + '/gulp';
    process.chdir(npmdir);
    this.bowerInstall();
    this.npmInstall();
    this.on('end', function () {
      this._copyBowerComponents();
    });
  }

});
