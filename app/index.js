'use strict';

var generators  = require('yeoman-generator'),
    mkdirp      = require('mkdirp'),
    yosay       = require('yosay'),
    chalk       = require('chalk');
    //wordpress   = require('../util/wordpress.js');

module.exports = generators.Base.extend({

  _getPrompts: function(){
    var prompts = [
      {
        name: 'localUrl',
        message: 'Local URL to use:',
        default: 'mynewawesomeapp.localhost'
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
        message: 'Your name',
        default: 'Robonkey Team'
      }
      ,{
        name: 'email',
        message: 'Your email address:'
      }
      ,{
        type: 'checkbox',
        name: 'scriptsJS',
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
        name: 'gulpTasks',
        message: 'What Gulp tasks to include?',
        choices: [{
          name: 'Jade',
          value: 'includeJade',
          checked: true
        }
        ,{
          name: 'Modernizr',
          value: 'includeModernizr',
          checked: true
        }
        ,{
          name: 'Custom Icon Font',
          value: 'includeCustomIcnFont',
          checked: false
        }
        ,{
          name: 'PostCSS (Will use autoprefixer by default)',
          value: 'includePostCSS',
          checked: true
        }]
      }
      ,{
        name: 'customIconFontName',
        message: 'Name your custom icon font',
        default: 'robonky-glyphs',
        when: function (answers) {
          return answers.gulpTasks.indexOf('includeCustomIcnFont') !== -1;
        },
      }
      ,{
        type: 'checkbox',
        name: 'postCSSPlugins',
        message: 'What PostCSS plugin to include?',
        when: function (answers) {
          return answers.gulpTasks.indexOf('includePostCSS') !== -1;
        },
        choices: [{
          name: 'CSSNano',
          value: 'includePcssNano',
          checked: true
        }
        ,{
          name: 'GradientTransparencyFix',
          value: 'includePcssGradientFix',
          checked: true
        }
        ,{
          name: 'MQPacker',
          value: 'includePcssMQPacker',
          checked: true
        }
        ,{
          name: 'MQKeyframes',
          value: 'includePcssMQKeyframes',
          checked: false
        }
        ,{
          name: 'SelectorNot',
          value: 'includePcssSelectorNot',
          checked: false
        }
        ,{
          name: 'SelectorMatches',
          value: 'includePcssSelectorMatches',
          checked: false
        }
        ,{
          name: 'ClassPrefix',
          value: 'includePcssClassPrefix',
          checked: false
        }
        ,{
          name: 'Scopify',
          value: 'includePcssScopify',
          checked: false
        }]
      }
      ,{
        name: 'customClassPrefix',
        message: 'Name your prefix',
        default: '.prfx',
        when: function (answers) {
          return answers.postCSSPlugins.indexOf('includePcssClassPrefix') !== -1;
        }
      }
      ,{
        name: 'customScope',
        message: 'Name your scope',
        default: '#scope',
        when: function (answers) {
          return answers.postCSSPlugins.indexOf('includePcssScopify') !== -1;
        }
      }
      ,{
        type: 'checkbox',
        name: 'scssLibraries',
        message: 'What SCSS libraries to include?',
        choices: [{
          name: 'Susy (Grids)',
          value: 'includeSusy',
          checked: true
        }
        ,{
          name: 'Breakpoint (Mediaqueries)',
          value: 'includeBreakpoint',
          checked: true
        }
        ,{
          name: 'Animate (Animations… duh)',
          value: 'includeAnimate',
          checked: false
        }]
      }
      ,{
        type: 'checkbox',
        name: 'rootFiles',
        message: 'What extra\'s to include?',
        choices: [{
          name: '.htaccess',
          value: 'includeHtaccess',
          checked: true
        }
        ,{
          name: 'browserconfig.xml (for windows 10 tiles)',
          value: 'includeBrowserconfig',
          checked: true
        }
        ,{
          name: 'crossdomain.xml',
          value: 'includeCrossdomain',
          checked: false
        }
        ,{
          name: 'robots.txt and humans.txt',
          value: 'includeRobots',
          checked: false
        }]
      }
    ];
    return prompts;
  },

  _saveAnswers: function(answers, callback) {
    var scriptsJS = answers.scriptsJS;
    var gulpTasks = answers.gulpTasks;
    var rootFiles = answers.rootFiles;
    var scssLibraries = answers.scssLibraries;
    var postCSSPlugins = answers.postCSSPlugins;

    function hasJSScript(feat) {
      return scriptsJS && scriptsJS.indexOf(feat) !== -1;
    };
    function hasGulpFeature(feat) {
      return gulpTasks && gulpTasks.indexOf(feat) !== -1;
    };
    function hasRootFile(feat) {
      return rootFiles && rootFiles.indexOf(feat) !== -1;
    };
    function hasSCSSLibrary(feat) {
      return scssLibraries && scssLibraries.indexOf(feat) !== -1;
    };
    function hasPostCSSPlugins(feat) {
      return postCSSPlugins && postCSSPlugins.indexOf(feat) !== -1;
    };

    this.appname = answers.name;
    this.appdescription = answers.description;
    this.appversion = answers.version;
    this.applicense = answers.license;
    this.appauthor = answers.yourname;
    this.appemail = answers.email;

    this.customIconFontName = answers.customIconFontName;
    this.customClassPrefix = answers.customClassPrefix;
    this.customScope = answers.customScope;

    this.localUrl = answers.localUrl;
    this.includeJQuery = hasJSScript('includeJQuery');
    this.includeWaypoints = hasJSScript('includeWaypoints');
    this.includeSignals = hasJSScript('includeSignals');
    this.includeD3 = hasJSScript('includeD3');
    this.includeTweenmax = hasJSScript('includeTweenmax');
    this.includeEnquire = hasJSScript('includeEnquire');
    this.includeGA = hasJSScript('includeGA');

    this.includeModernizr = hasGulpFeature('includeModernizr');
    this.includeJade = hasGulpFeature('includeJade');
    this.includeCustomIcnFont = hasGulpFeature('includeCustomIcnFont');
    this.includePostCSS = hasGulpFeature('includePostCSS');

    this.includePcssSelectorNot = hasPostCSSPlugins('includePcssSelectorNot');
    this.includePcssSelectorMatches = hasPostCSSPlugins('includePcssSelectorMatches');
    this.includePcssGradientFix = hasPostCSSPlugins('includePcssGradientFix');
    this.includePcssMQPacker = hasPostCSSPlugins('includePcssMQPacker');
    this.includePcssMQKeyframes = hasPostCSSPlugins('includePcssMQKeyframes');
    this.includePcssClassPrefix = hasPostCSSPlugins('includePcssClassPrefix');
    this.includePcssScopify = hasPostCSSPlugins('includePcssScopify');
    this.includePcssNano = hasPostCSSPlugins('includePcssNano');

    this.includeSusy = hasSCSSLibrary('includeSusy');
    this.includeBreakpoint = hasSCSSLibrary('includeBreakpoint');
    this.includeAnimate = hasSCSSLibrary('includeAnimate');

    this.includeHtaccess = hasRootFile('includeHtaccess');
    this.includeCrossdomain = hasRootFile('includeCrossdomain');
    this.includeBrowserconfig = hasRootFile('includeBrowserconfig');
    this.includeRobots = hasRootFile('includeRobots');

    callback();
  },

  _folders: function(appDir){
    mkdirp(appDir + '/gulp');
    mkdirp(appDir + '/src');
    mkdirp(appDir + '/website');
    mkdirp(appDir + '/website/assets');
    mkdirp(appDir + '/website/assets/js');
    mkdirp(appDir + '/website/assets/js/libs');
    mkdirp(appDir + '/website/assets/images');
    mkdirp(appDir + '/website/assets/css');
    mkdirp(appDir + '/website/assets/css/libs');
    mkdirp(appDir + '/website/assets/fonts');
  },

  _html: function(destRoot, sourceRoot, templateContext) {
    this.fs.copyTpl(sourceRoot + '/website/index.html', destRoot + '/website/index.html', templateContext);

    if(this.includeHtaccess) {
      this.fs.copy(sourceRoot + '/website/.htaccess', destRoot + '/website/.htaccess');
    }
    if(this.includeBrowserconfig) {
      this.fs.copy(sourceRoot + '/website/browserconfig.xml', destRoot + '/website/browserconfig.xml');
    }
    if(this.includeCustomIcnFont) {
      this.fs.copy(sourceRoot + '/website/crossdomain.xml', destRoot + '/website/crossdomain.xml');
    }
    if(this.includeRobots) {
      this.fs.copyTpl(sourceRoot + '/website/humans.txt', destRoot + '/website/humans.txt', templateContext);
      this.fs.copy(sourceRoot + '/website/robots.txt', destRoot + '/website/robots.txt');
    }
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

  _images: function(destRoot, sourceRoot, templateContext) {
    this.fs.copy(sourceRoot + '/src/images', destRoot + '/src/images');
  },

  _js: function(destRoot, sourceRoot, templateContext) {
    this.fs.copy(sourceRoot + '/src/js', destRoot + '/src/js');
    if(this.includeModernizr) {
      this.fs.copy(sourceRoot + '/src/modernizr/modernizr-custom.js', destRoot + '/website/assets/js/libs/modernizr-custom.js');
    }
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
    this.fs.copyTpl(sourceRoot + '/src/scss/style.scss', destRoot + '/src/scss/style.scss', templateContext);

    if(this.includeCustomIcnFont) {
      this.fs.copyTpl(sourceRoot + '/src/scss/modules/_icons.scss', destRoot + '/src/scss/modules/_icons.scss', templateContext);
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

  _copyJQueryJS: function(bowerRoot, destRoot, srcsRoot){
    if(this.includeJQuery) {
      this.fs.copy(bowerRoot + '/jquery/dist/jquery.min.js', destRoot + '/jquery.min.js');
    }
  },

  _copyWaypointsJS: function(bowerRoot, destRoot, srcsRoot){
    if(this.includeWaypoints) {
      this.fs.copy(bowerRoot + '/waypoints/lib/jquery.waypoints.min.js', destRoot + '/waypoints/jquery.waypoints.min.js');
      this.fs.copy(bowerRoot + '/waypoints/lib/noframework.waypoints.min.js', destRoot + '/waypoints/noframework.waypoints.min.js');
      this.fs.copy(bowerRoot + '/waypoints/lib/waypoints.debug.js', destRoot + '/waypoints/waypoints.debug.js');
      this.fs.copy(bowerRoot + '/waypoints/lib/waypoints.debug.js', destRoot + '/waypoints/waypoints.debug.js');
      this.fs.copy(bowerRoot + '/waypoints/lib/shortcuts', destRoot + '/waypoints/shortcuts');
    }
  },

  _copyEnquireJS: function(bowerRoot, destRoot, srcsRoot){
    if(this.includeEnquire) {
      this.fs.copy(bowerRoot + '/enquire/dist/enquire.min.js', destRoot + '/enquire.min.js');
    }
  },

  _copySignalsJS: function(bowerRoot, destRoot, srcsRoot){
    if(this.includeSignals) {
      this.fs.copy(bowerRoot + '/js-signals/dist/signals.min.js', destRoot + '/signals.min.js');
    }
  },

  _copyTweenMaxJS: function(bowerRoot, destRoot, srcsRoot){
    if(this.includeTweenmax) {
      this.fs.copy(bowerRoot + '/gsap/src/minified', destRoot + '/gsap');
    }
  },

  _copyD3JS: function(bowerRoot, destRoot, srcsRoot){
    if(this.includeD3) {
      this.fs.copy(bowerRoot + '/d3/d3.min.js', destRoot + '/d3.min.js');
    }
  },

  _copyResetSCSS: function(bowerRoot, destRoot, srcsRoot){
    this.fs.copy(bowerRoot + '/reset-css/_reset.scss', srcsRoot + '/scss/base/_reset.scss');
  },

  _copyBreakpointSCSS: function(bowerRoot, destRoot, srcsRoot){
    if(this.includeBreakpoint) {
      this.fs.copy(bowerRoot + '/breakpoint/breakpoint', srcsRoot + '/scss/libs/breakpoint');
    }
  },

  _copySusySCSS: function(bowerRoot, destRoot, srcsRoot){
    if(this.includeSusy) {
      this.fs.copy(bowerRoot + '/susy/sass/_su.scss', srcsRoot + '/scss/libs/susy/_su.scss');
      this.fs.copy(bowerRoot + '/susy/sass/_susy.scss', srcsRoot + '/scss/libs/susy/_susy.scss');
      this.fs.copy(bowerRoot + '/susy/sass/_susyone.scss', srcsRoot + '/scss/libs/susy/_susyone.scss');
      this.fs.copy(bowerRoot + '/susy/sass/susy', srcsRoot + '/scss/libs/susy/susy');
    }
  },

  _copyAnimateSCSS: function(bowerRoot, destRoot, srcsRoot){
    if(this.includeAnimate) {
      this.fs.copy(bowerRoot + '/animate.scss/scss/animate.scss', srcsRoot + '/scss/libs/animate/animate.scss');
      this.fs.copy(bowerRoot + '/animate.scss/scss/animations', srcsRoot + '/scss/libs/animate/animations');
    }
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
          includePostCSS: this.includePostCSS,
          includeCustomIcnFont: this.includeCustomIcnFont,
          includeHtaccess: this.includeHtaccess,
          includeCrossdomain: this.includeCrossdomain,
          includeBrowserconfig: this.includeBrowserconfig,
          includeRobots: this.includeRobots,
          includePcssSelectorNot: this.includePcssSelectorNot,
          includePcssSelectorMatches: this.includePcssSelectorMatches,
          includePcssGradientFix: this.includePcssGradientFix,
          includePcssMQPacker: this.includePcssMQPacker,
          includePcssMQKeyframes: this.includePcssMQKeyframes,
          includePcssClassPrefix: this.includePcssClassPrefix,
          includePcssScopify: this.includePcssScopify,
          includePcssNano: this.includePcssNano,
          includeSusy: this.includeSusy,
          includeBreakpoint: this.includeBreakpoint,
          includeAnimate: this.includeAnimate,
          customIconFontName: this.customIconFontName,
          customClassPrefix: this.customClassPrefix,
          customScope: this.customScope
        };
    this._folders(appDir);
    this._html(destRoot, sourceRoot, templateContext);
    this._images(destRoot, sourceRoot, templateContext);
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
    var bowerRoot = this.destinationRoot() + '/../src/bower_components',
        destRoot = this.destinationRoot() + '/../website/assets/js/libs',
        srcsRoot = this.destinationRoot() + '/../src';

    this._copyJQueryJS(bowerRoot, destRoot, srcsRoot);
    this._copyWaypointsJS(bowerRoot, destRoot, srcsRoot);
    this._copyEnquireJS(bowerRoot, destRoot, srcsRoot);
    this._copySignalsJS(bowerRoot, destRoot, srcsRoot);
    this._copyTweenMaxJS(bowerRoot, destRoot, srcsRoot);
    this._copyD3JS(bowerRoot, destRoot, srcsRoot);
    this._copyResetSCSS(bowerRoot, destRoot, srcsRoot);
    this._copyBreakpointSCSS(bowerRoot, destRoot, srcsRoot);
    this._copySusySCSS(bowerRoot, destRoot, srcsRoot);
    this._copyAnimateSCSS(bowerRoot, destRoot, srcsRoot);
    // this._endMsg();
  }
});
