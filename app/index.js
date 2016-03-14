'use strict';

var generators = require('yeoman-generator'),
    mkdirp = require('mkdirp'),
    yosay = require('yosay'),
    chalk = require('chalk');

module.exports = generators.Base.extend({

  _folders: function(appDir){
    mkdirp(appDir + '/gulp');
    mkdirp(appDir + '/src');
    mkdirp(appDir + '/website');
    mkdirp(appDir + '/website/assets');
    mkdirp(appDir + '/website/assets/js');
    mkdirp(appDir + '/website/assets/js/libs');
    mkdirp(appDir + '/website/assets/images');
    mkdirp(appDir + '/website/assets/fonts');
  },

  _html: function(destRoot, sourceRoot, templateContext) {
    this.fs.copy(sourceRoot + '/website/.htaccess', destRoot + '/website/.htaccess');
    this.fs.copyTpl(sourceRoot + '/website/index.html', destRoot + '/website/index.html', templateContext);
    // this.fs.copy(sourceRoot + '/website/browserconfig.xml', destRoot + '/website/browserconfig.xml');
    // this.fs.copy(sourceRoot + '/website/crossdomain.xml', destRoot + '/website/crossdomain.xml');
    // this.fs.copyTpl(sourceRoot + '/website/humans.txt', destRoot + '/website/humans.txt', templateContext);
    // this.fs.copy(sourceRoot + '/website/robots.txt', destRoot + '/website/robots.txt');
  },

  _config: function(destRoot, sourceRoot, templateContext) {
    this.fs.copy(sourceRoot + '/project/.editorconfig', destRoot + '/.editorconfig');
    this.fs.copy(sourceRoot + '/project/.gitignore', destRoot + '/.gitignore');
    this.fs.copy(sourceRoot + '/project/.gitattributes', destRoot + '/.gitattributes');
    this.fs.copy(sourceRoot + '/project/README.md', destRoot + '/README.md');
  },

  _bower: function(destRoot, sourceRoot, templateContext) {
    this.fs.copy(sourceRoot + '/bower/.bowerrc', destRoot + '/gulp/.bowerrc');
    this.fs.copyTpl(sourceRoot + '/bower/bower.json', destRoot + '/gulp/bower.json', templateContext);
  },

  _gulp: function(destRoot, sourceRoot, templateContext) {
    this.fs.copyTpl(sourceRoot + '/gulp/package.json', destRoot + '/gulp/package.json', templateContext);
    this.fs.copyTpl(sourceRoot + '/gulp/gulpfile.js', destRoot + '/gulp/gulpfile.js', templateContext);
    this.fs.copyTpl(sourceRoot + '/gulp/config.json', destRoot + '/gulp/config.json', templateContext);
  },

  _iconfont: function(destRoot, sourceRoot, templateContext) {
    if(this.includeCustomIcnFont) {
      this.fs.copy(sourceRoot + '/src/iconfont', destRoot + '/src/iconfont');
    }
  },

  _js: function(destRoot, sourceRoot, templateContext) {
    this.fs.copy(sourceRoot + '/src/js', destRoot + '/src/js');
  },

  _scss: function(destRoot, sourceRoot, templateContext) {
    this.fs.copy(sourceRoot + '/src/scss/base', destRoot + '/src/scss/base');
    this.fs.copy(sourceRoot + '/src/scss/layout', destRoot + '/src/scss/layout');
    this.fs.copy(sourceRoot + '/src/scss/libs', destRoot + '/src/scss/libs');
    this.fs.copy(sourceRoot + '/src/scss/playground', destRoot + '/src/scss/playground');
    this.fs.copy(sourceRoot + '/src/scss/views', destRoot + '/src/scss/views');
    this.fs.copy(sourceRoot + '/src/scss/libs', destRoot + '/src/scss/libs');
    this.fs.copy(sourceRoot + '/src/scss/modules/_buttons.scss', destRoot + '/src/scss/modules/_buttons.scss');
    this.fs.copy(sourceRoot + '/src/scss/modules/_forms.scss', destRoot + '/src/scss/modules/_forms.scss');
    this.fs.copyTpl(sourceRoot + '/src/scss/style.scss', destRoot + '/src/scss/styles.css', templateContext);

    if(this.includeCustomIcnFont) {
      this.fs.copy(sourceRoot + '/src/scss/modules/_icons.scss', destRoot + '/src/scss/modules/_icons.scss');
    }
  },

  _jade: function(destRoot, sourceRoot, templateContext) {
    if(this.includeJade) {
      this.fs.copy(sourceRoot + '/src/jade/index.jade', destRoot + '/src/jade/index.jade');
      this.fs.copy(sourceRoot + '/src/jade/tools', destRoot + '/src/jade/tools');
      this.fs.copy(sourceRoot + '/src/jade/templates', destRoot + '/src/jade/templates');
      this.fs.copyTpl(sourceRoot + '/src/jade/templates/base.jade', destRoot + '/src/jade/templates/base.jade', templateContext);
      this.fs.copy(sourceRoot + '/src/jade/templates/views', destRoot + '/src/jade/templates/views');
    }
  },

  _copyBowerComponents: function() {
    var bowerRoot = this.destinationRoot() + '/../src/bower_components',
        destRoot = this.destinationRoot() + '/../website/assets/js/libs',
        srcsRoot = this.destinationRoot() + '/../src';

    // jQuery JS
    if(this.includeJQuery) {
      this.fs.copy(bowerRoot + '/jquery/dist/jquery.min.js', destRoot + '/jquery.min.js');
    }

    // Waypoints JS
    if(this.includeWaypoints) {
      this.fs.copy(bowerRoot + '/waypoints/lib/jquery.waypoints.min.js', destRoot + '/waypoints/jquery.waypoints.min.js');
      this.fs.copy(bowerRoot + '/waypoints/lib/noframework.waypoints.min.js', destRoot + '/waypoints/noframework.waypoints.min.js');
      this.fs.copy(bowerRoot + '/waypoints/lib/waypoints.debug.js', destRoot + '/waypoints/waypoints.debug.js');
      this.fs.copy(bowerRoot + '/waypoints/lib/waypoints.debug.js', destRoot + '/waypoints/waypoints.debug.js');
      this.fs.copy(bowerRoot + '/waypoints/lib/shortcuts', destRoot + '/waypoints/shortcuts');
    }

    // Enquire JS
    if(this.includeEnquire) {
      this.fs.copy(bowerRoot + '/enquire/dist/enquire.min.js', destRoot + '/enquire.min.js');
    }

    // Signals JS
    if(this.includeSignals) {
      this.fs.copy(bowerRoot + '/js-signals/dist/signals.min.js', destRoot + '/signals.min.js');
    }

    // TweenMax JS
    if(this.includeTweenmax) {
      this.fs.copy(bowerRoot + '/gsap/src/minified', destRoot + '/gsap');
    }

    // D3 JS
    if(this.includeD3) {
      this.fs.copy(bowerRoot + '/d3/d3.min.js', destRoot + '/d3.min.js');
    }

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
    this.fs.copy(bowerRoot + '/animate.scss/scss/animate.scss', srcsRoot + '/scss/libs/animate/animate.scss');
    this.fs.copy(bowerRoot + '/animate.scss/scss/animations', srcsRoot + '/scss/libs/animate/animations');
  },

  _endMsg: function() {
    var allDone =
      '\n.----------------.' +
      '\n| Robonkey says: |' +
      '\n| '+chalk.yellow.bold('ALL DONE!') + '      |' +
      '\n| ' + chalk.yellow.bold('Happy coding!') + '  |' +
      '\n\'----------------\'' +
      '\n';

    this.log(allDone);
  },

  _getPrompts: function(){
    var prompts = [
      {
        name: 'localUrl',
        message: 'Local URL to use:',
        default: 'localhost'
      }
      ,{
        type: 'list',
        name: 'setup',
        message: 'What is your setup?',
        choices: [{
          name: 'basic',
          value: 'isBasic',
          checked: true
        },
        {
          name: 'Wordpress',
          value: 'isWordpress',
          checked: false
        }, {
          name: 'Drupal',
          value: 'isDrupal',
          checked: false
        }, {
          name: 'CodeIgniter',
          value: 'isCodeigniter',
          checked: false
        }]
      }
      ,{
        type: 'checkbox',
        name: 'featuresJS',
        message: 'What Javascript libraries to include?',
        choices: [{
          name: 'jQuery',
          value: 'includeJQuery',
          checked: true
        }
        ,{
          name: 'Waypoints',
          value: 'includeWaypoints',
          checked: false
        }
        ,{
          name: 'Signals',
          value: 'includeSignals',
          checked: false
        }
        ,{
          name: 'D3js',
          value: 'includeD3',
          checked: false
        }
        ,{
          name: 'TweenMax',
          value: 'includeTweenmax',
          checked: false
        }
        ,{
          name: 'Enquire',
          value: 'includeEnquire',
          checked: false
        }
        ,{
          name: 'Google Analytics',
          value: 'includeGA',
          checked: false
        }]
      }
      ,{
        type: 'checkbox',
        name: 'featuresGulp',
        message: 'What Gulp tasks to include?',
        choices: [{
          name: 'Jade',
          value: 'includeJade',
          checked: true
        },
        {
          name: 'Modernizr',
          value: 'includeModernizr',
          checked: true
        },
        ,{
          name: 'Custom Icon Font',
          value: 'includeCustomIcnFont',
          checked: false
        },
        {
          name: 'PostCSS',
          value: 'includePostCSS',
          checked: false
        }]
      }
      ,{
        name: 'name',
        message: 'Name your project:',
        default: this.appname
      }
      ,{
        name: 'description',
        message: 'Describe your project:',
        default: 'My new awesome app'
      }
      ,{
        name: 'version',
        message: 'Project version:',
        default: '0.0.0'
      }
      ,{
        name: 'license',
        message: 'Project licence:',
        default: 'MIT'
      }
      ,{
        name: 'yourname',
        message: 'Who the devil are you?',
        default: 'Robonkey Team'
      }
      ,{
        name: 'email',
        message: 'Your electronic mail address:',
        default: 'robonkey@thegalaxy.com'
      }
    ];
    return prompts;
  },

  _saveAnswers: function(answers, callback) {
    var features = answers.features;

    function hasFeature(feat, list) {
      return list && list.indexOf(feat) !== -1;
    };

    this.appname = answers.name;
    this.appdescription = answers.description;
    this.appversion = answers.version;
    this.applicense = answers.license;
    this.appauthor = answers.yourname;
    this.appemail = answers.email;

    this.localUrl = answers.localUrl;
    this.includeJQuery = hasFeature('includeJQuery', 'feauturesJS');
    this.includeWaypoints = hasFeature('includeWaypoints', 'feauturesJS');
    this.includeSignals = hasFeature('includeSignals', 'feauturesJS');
    this.includeD3 = hasFeature('includeD3', 'feauturesJS');
    this.includeTweenmax = hasFeature('includeTweenmax', 'feauturesJS');
    this.includeEnquire = hasFeature('includeEnquire', 'feauturesJS');
    this.includeGA = hasFeature('includeGA');

    this.includeModernizr = hasFeature('includeModernizr', 'featuresGulp');
    this.includeJade = hasFeature('includeJade', 'featuresGulp');
    this.includeCustomIcnFont = hasFeature('includeCustomIcnFont', 'featuresGulp');

    callback();
  },

  initializing: function() {
    var message = chalk.yellow.bold('Welcome to Robonkey ') + chalk.yellow('\'Cause everyone needs a Robotic Monkey');
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
    var destRoot = this.destinationRoot(),
        sourceRoot = this.sourceRoot(),
        appDir = destRoot,
        templateContext = {
          localUrl: this.localUrl,
          appname: this.appname,
          appdescription: this.appdescription,
          appversion: this.appversion,
          applicense: this.applicense,
          appauthor: this.appauthor,
          appemail: this.appemail,
          includeJQuery: this.includeJQuery,
          includeWaypoints: this.includeWaypoints,
          includeSignals: this.includeSignals,
          includeD3: this.includeD3,
          includeTweenmax: this.includeTweenmax,
          includeEnquire: this.includeEnquire,
          includeModernizr: this.includeModernizr,
          includeGA: this.includeGA,
          includeJade: this.includeJade,
          includeCustomIcnFont: this.includeCustomIcnFont
        };
    this._folders(appDir);
    this._html(destRoot, sourceRoot, templateContext);
    this._config(destRoot, sourceRoot, templateContext);
    this._bower(destRoot, sourceRoot, templateContext);
    this._gulp(destRoot, sourceRoot, templateContext);
    this._iconfont(destRoot, sourceRoot, templateContext);
    this._js(destRoot, sourceRoot, templateContext);
    this._scss(destRoot, sourceRoot, templateContext);
    this._jade(destRoot, sourceRoot, templateContext);
  },

  install: function() {
    // Change working directory to 'gulp' for dependency install
    var npmdir = process.cwd() + '/gulp';
    process.chdir(npmdir);
    this.bowerInstall();
    this.npmInstall();
  },
  end: function() {
    this._copyBowerComponents();
    this._endMsg();
  }
});
