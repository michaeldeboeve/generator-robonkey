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
        }]
      }
      ,{
        type: 'confirm',
        name: 'includeJade',
        message: 'Would you like to use Jade?',
        default: true
      }
      ,{
        type: 'confirm',
        name: 'includeModernizr',
        message: 'Would you like to use Modernizr?',
        default: true
      }
      ,{
        type: 'confirm',
        name: 'includeCustomIcnFont',
        message: 'Would you like to include a custom icon font?',
        default: false
      }
      ,{
        when: function (answers) {
          return answers.includeCustomIcnFont === true;
        },
        name: 'customIconFontName',
        message: 'Name your custom icon font',
        default: 'robonky-glyphs'
      }
      ,{
        type: 'confirm',
        name: 'includePostCSS',
        message: 'Would you like to include postCSS?',
        default: true
      }
      ,{
        when: function (answers) {
          return answers.includePostCSS === true;
        },
        type: 'checkbox',
        name: 'postCSSPlugins',
        message: 'What PostCSS plugin to include?',
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
        }]
      }
      ,{
        type: 'confirm',
        name: 'includePcssClassPrefix',
        message: 'Prefix your selectors?',
        default: false,
        when: function (answers) {
          return answers.includePostCSS === true;
        }
      }
      ,{
        name: 'customClassPrefix',
        message: 'Name your prefix',
        default: 'prfx-',
        when: function (answers) {
          return answers.includePcssClassPrefix === true;
        }
      }
      ,{
        type: 'confirm',
        name: 'includePcssScopify',
        message: 'Scopify your selectors?',
        default: false,
        when: function (answers) {
          return answers.includePostCSS === true;
        }
      }
      ,{
        name: 'customScope',
        message: 'Name your scope',
        default: '#scope',
        when: function (answers) {
          return answers.includePcssScopify === true;
        }
      }
      ,{
        type: 'list',
        name: 'baseStyles',
        message: 'What base styles to include?',
        choices: [{
          name: 'Sanitize',
          value: 'includeSanitize',
          checked: true
        }
        ,{
          name: 'Reset',
          value: 'includeReset',
          checked: false
        }
        ,{
          name: 'Normalize',
          value: 'includeNormalize',
          checked: false
        }
        ,{
          name: 'None',
          value: 'noBaseStyles',
          checked: true
        }]
      }
      ,{
        type: 'list',
        name: 'mqLibs',
        message: 'What MediaQuery Library to use?',
        choices: [{
          name: 'Breakpoint',
          value: 'includeBreakpoint',
          checked: true
        }
        ,{
          name: 'Include Media',
          value: 'includeIncludeMedia',
          checked: false
        }
        ,{
          name: 'None',
          value: 'noMQLib',
          checked: true
        }]
      }
      ,{
        type: 'list',
        name: 'gridLibs',
        message: 'What Grids Library to use?',
        choices: [{
          name: 'Jeet',
          value: 'includeJeet',
          checked: true
        }
        ,{
          name: 'Susy',
          value: 'includeSusy',
          checked: false
        }
        ,{
          name: 'Neat (Will include Bourbon)',
          value: 'includeNeat',
          checked: false
        }
        ,{
          name: 'None',
          value: 'noGridLib',
          checked: false
        }]
      }
      ,{
        when: function (answers) {
          return answers.gridLibs.indexOf('includeNeat') === -1;
        },
        type: 'confirm',
        name: 'includeBourbon',
        message: 'Include Bourbon Mixin Library?',
        default: false
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
      ,{
        type: 'confirm',
        name: 'includeGA',
        message: 'Provide Google Analytics Script?',
        default: false
      }
      ,{
        type: 'confirm',
        name: 'runGulp',
        message: 'Run gulp command after install?',
        default: false
      }
    ];
    return prompts;
  },

  _saveAnswers: function(answers, callback) {
    var scriptsJS = answers.scriptsJS;
    var gulpTasks = answers.gulpTasks;
    var rootFiles = answers.rootFiles;
    var postCSSPlugins = answers.postCSSPlugins;
    var baseStyles = answers.baseStyles;
    var gridLibs = answers.gridLibs;
    var mqLibs = answers.mqLibs;

    function hasJSScript(feat) {
      return scriptsJS && scriptsJS.indexOf(feat) !== -1;
    };
    function hasBaseStyles(feat) {
      return baseStyles && baseStyles.indexOf(feat) !== -1;
    };
    function hasRootFile(feat) {
      return rootFiles && rootFiles.indexOf(feat) !== -1;
    };
    function hasMQLibrary(feat) {
      return mqLibs && mqLibs.indexOf(feat) !== -1;
    };
    function hasGridLibrary(feat) {
      return gridLibs && gridLibs.indexOf(feat) !== -1;
    };
    function hasPostCSSPlugins(feat) {
      return postCSSPlugins && postCSSPlugins.indexOf(feat) !== -1;
    };

    this.runGulp = answers.runGulp;

    this.appname = answers.name;
    this.appdescription = answers.description;
    this.appversion = answers.version;
    this.applicense = answers.license;
    this.appauthor = answers.yourname;
    this.appemail = answers.email;

    this.includeReset = hasBaseStyles('includeReset');
    this.includeNormalize = hasBaseStyles('includeNormalize');
    this.includeSanitize = hasBaseStyles('includeSanitize');

    this.includePcssClassPrefix = answers.includePcssClassPrefix;
    this.includePcssScopify = answers.includePcssScopify;
    this.customIconFontName = answers.customIconFontName;
    this.customClassPrefix = answers.customClassPrefix;
    this.customScope = answers.customScope;
    this.includeGA = answers.includeGA;
    this.includeBourbon = answers.includeBourbon;

    this.localUrl = answers.localUrl;
    this.includeJQuery = hasJSScript('includeJQuery');
    this.includeWaypoints = hasJSScript('includeWaypoints');
    this.includeSignals = hasJSScript('includeSignals');
    this.includeD3 = hasJSScript('includeD3');
    this.includeTweenmax = hasJSScript('includeTweenmax');
    this.includeEnquire = hasJSScript('includeEnquire');

    this.includeModernizr = answers.includeModernizr;
    this.includeJade = answers.includeJade;
    this.includeCustomIcnFont = answers.includeCustomIcnFont;
    this.includePostCSS = answers.includePostCSS;

    this.includePcssSelectorNot = hasPostCSSPlugins('includePcssSelectorNot');
    this.includePcssSelectorMatches = hasPostCSSPlugins('includePcssSelectorMatches');
    this.includePcssGradientFix = hasPostCSSPlugins('includePcssGradientFix');
    this.includePcssMQPacker = hasPostCSSPlugins('includePcssMQPacker');
    this.includePcssMQKeyframes = hasPostCSSPlugins('includePcssMQKeyframes');
    this.includePcssNano = hasPostCSSPlugins('includePcssNano');

    this.includeSusy = hasGridLibrary('includeSusy');
    this.includeJeet = hasGridLibrary('includeJeet');
    this.includeNeat = hasGridLibrary('includeNeat');

    this.includeBreakpoint = hasMQLibrary('includeBreakpoint');
    this.includeIncludeMedia = hasMQLibrary('includeIncludeMedia');

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
    if(!this.includeJade) {
      // Dynamic
      this.fs.copyTpl(sourceRoot + '/website/index.html', destRoot + '/website/index.html', templateContext);
    }
  },

  _h5bp: function(destRoot, sourceRoot, templateContext) {
    if(this.includeHtaccess) {
      // Static
      this.fs.copy(sourceRoot + '/website/htaccess.txt', destRoot + '/website/.htaccess');
    }
    if(this.includeBrowserconfig) {
      // Static
      this.fs.copy(sourceRoot + '/website/browserconfig.xml', destRoot + '/website/browserconfig.xml');
    }
    if(this.includeCustomIcnFont) {
      // Static
      this.fs.copy(sourceRoot + '/website/crossdomain.xml', destRoot + '/website/crossdomain.xml');
    }
    if(this.includeRobots) {
      // Dynamic
      this.fs.copyTpl(sourceRoot + '/website/humans.txt', destRoot + '/website/humans.txt', templateContext);

      // Static
      this.fs.copy(sourceRoot + '/website/robots.txt', destRoot + '/website/robots.txt');
    }
  },

  _editorconfig: function(destRoot, sourceRoot, templateContext) {
    // Static
    this.fs.copy(sourceRoot + '/project/editorconfig.txt', destRoot + '/.editorconfig');
    this.fs.copy(sourceRoot + '/project/README.md', destRoot + '/README.md');
  },

  _git: function(destRoot, sourceRoot, templateContext) {
    // Static
    this.fs.copy(sourceRoot + '/project/gitignore.txt', destRoot + '/.gitignore');
    this.fs.copy(sourceRoot + '/project/gitattributes.txt', destRoot + '/.gitattributes');
  },

  _readme: function(destRoot, sourceRoot, templateContext) {
    // Dynamic
    this.fs.copyTpl(sourceRoot + '/project/README.md', destRoot + '/README.md', templateContext);
  },

  _bower: function(destRoot, sourceRoot, templateContext) {
    // Static
    this.fs.copy(sourceRoot + '/bower/bowerrc.txt', destRoot + '/gulp/.bowerrc');

    // Dynamic
    this.fs.copyTpl(sourceRoot + '/bower/bower.json', destRoot + '/gulp/bower.json', templateContext);
  },

  _gulp: function(destRoot, sourceRoot, templateContext) {
    // Dynamic
    this.fs.copyTpl(sourceRoot + '/gulp/package.json', destRoot + '/gulp/package.json', templateContext);
    this.fs.copyTpl(sourceRoot + '/gulp/config.json', destRoot + '/gulp/config.json', templateContext);
    this.fs.copyTpl(sourceRoot + '/gulp/paths.json', destRoot + '/gulp/paths.json', templateContext);
    this.fs.copyTpl(sourceRoot + '/gulp/gulpfile.js', destRoot + '/gulp/gulpfile.js', templateContext);
    this.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/images.js', destRoot + '/gulp/gulp-tasks/images.js', templateContext);
    this.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/bower.js', destRoot + '/gulp/gulp-tasks/bower.js', templateContext);
    this.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/scripts.js', destRoot + '/gulp/gulp-tasks/scripts.js', templateContext);
    this.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/clean.js', destRoot + '/gulp/gulp-tasks/clean.js', templateContext);

    // Todo:
    // if sass/stylus/less
    this.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/sass.js', destRoot + '/gulp/gulp-tasks/styles.js', templateContext);
    // this.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/less.js', destRoot + '/gulp/gulp-tasks/styles.js', templateContext);
    // this.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/styl.js', destRoot + '/gulp/gulp-tasks/styles.js', templateContext);
    // endif
    if(this.includeCustomIcnFont) {
      this.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/iconfont.js', destRoot + '/gulp/gulp-tasks/iconfont.js', templateContext);
    }
    if(this.includeJade) {
      this.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/jade.js', destRoot + '/gulp/gulp-tasks/jade.js', templateContext);
    }
    
    // TODO: if handlebars
    // this.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/handlebars.js', destRoot + '/gulp/gulp-tasks/handlebars.js', templateContext);

    if(this.includeModernizr) {
      this.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/modernizr.js', destRoot + '/gulp/gulp-tasks/modernizr.js', templateContext);
    }
  },

  _iconfont: function(destRoot, sourceRoot, templateContext) {
    if(this.includeCustomIcnFont) {
      // Static
      this.fs.copy(sourceRoot + '/src/iconfont', destRoot + '/src/iconfont');
    }
  },

  _images: function(destRoot, sourceRoot, templateContext) {
    // Static
    this.fs.copy(sourceRoot + '/src/images', destRoot + '/src/images');
  },

  _js: function(destRoot, sourceRoot, templateContext) {
    // Static
    this.fs.copy(sourceRoot + '/src/js', destRoot + '/src/js');
    if(this.includeModernizr) {
      this.fs.copy(sourceRoot + '/src/modernizr', destRoot + '/src/modernizr');
    }
  },

  _scss: function(destRoot, sourceRoot, templateContext) {
    // Static
    this.fs.copy(sourceRoot + '/src/scss', destRoot + '/src/scss');

    // Dynamic
    this.fs.copyTpl(sourceRoot + '/src-tpl/scss/base/_fonts.scss', destRoot + '/src/scss/base/_fonts.scss', templateContext);
    this.fs.copyTpl(sourceRoot + '/src-tpl/scss/base/_variables.scss', destRoot + '/src/scss/base/_variables.scss', templateContext);
    this.fs.copyTpl(sourceRoot + '/src-tpl/scss/base/_grid.scss', destRoot + '/src/scss/base/_grid.scss', templateContext);
    this.fs.copyTpl(sourceRoot + '/src-tpl/scss/style.scss', destRoot + '/src/scss/style.scss', templateContext);

    if(this.includeCustomIcnFont) {
      this.fs.copyTpl(sourceRoot + '/src-tpl/scss/modules/_icons.scss', destRoot + '/src/scss/modules/_icons.scss', templateContext);
    }
    if(this.includeBreakpoint) {
      this.fs.copy(sourceRoot + '/src-tpl/scss/mixins/_mediaqueries.scss', destRoot + '/src/scss/mixins/_mediaqueries.scss');
    }
    if(this.includeReset) {
      this.fs.copy(sourceRoot + '/src-tpl/scss/reset/_reset.scss', destRoot + '/src/scss/base/_reset.scss');
    }
    if(this.includeNormalize) {
      this.fs.copy(sourceRoot + '/src-tpl/scss/reset/_normalize.scss', destRoot + '/src/scss/base/_normalize.scss');
    }
    if(this.includeSanitize) {
      this.fs.copy(sourceRoot + '/src-tpl/scss/reset/_sanitize.scss', destRoot + '/src/scss/base/_sanitize.scss');
    }
  },

  _jade: function(destRoot, sourceRoot, templateContext) {
    if(this.includeJade) {
      // Static
      this.fs.copy(sourceRoot + '/src/jade', destRoot + '/src/jade');

      // Dyanamic
      this.fs.copyTpl(sourceRoot + '/src-tpl/jade/templates/base.jade', destRoot + '/src/jade/templates/base.jade', templateContext);
    }
  },

  _endMsg: function() {
    var allDone =
      '\n.-------------------.' +
      '\n| Robonkey says:    |' +
      '\n| '+chalk.yellow.bold('ALL DONE!') + '         |' +
      '\n| ' + chalk.yellow.bold('Now fly, my pets!') + ' |' +
      '\n\'-------------------\'' +
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
          includeBourbon: this.includeBourbon,
          includeNeat: this.includeNeat,
          includeJeet: this.includeJeet,
          includeIncludeMedia: this.includeIncludeMedia,
          customIconFontName: this.customIconFontName,
          customClassPrefix: this.customClassPrefix,
          customScope: this.customScope,
          includeReset: this.includeReset,
          includeNormalize: this.includeNormalize,
          includeSanitize: this.includeSanitize,
        };
    this._folders(appDir);
    this._html(destRoot, sourceRoot, templateContext);
    this._h5bp(destRoot, sourceRoot, templateContext);
    this._images(destRoot, sourceRoot, templateContext);
    this._editorconfig(destRoot, sourceRoot, templateContext);
    this._git(destRoot, sourceRoot, templateContext);
    this._readme(destRoot, sourceRoot, templateContext);
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
    this._endMsg();
    if(this.runGulp) {
      this.spawnCommand('gulp', ['serve']);
    }
  }
});
