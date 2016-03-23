'use strict';

var generators  = require('yeoman-generator'),
    mkdirp      = require('mkdirp'),
    yosay       = require('yosay'),
    chalk       = require('chalk');
    //wordpress   = require('../util/wordpress.js');

module.exports = generators.Base.extend({

  _getPrompts: function(){
    var done = this.async();
    var prompts = [{
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

      // Preprocessors
      ,{
        type: 'list',
        name: 'preproType',
        message: 'What preprocessor would you like to use?',
        choices: [{
          name: 'SCSS',
          value: 'includeSCSS',
          checked: true
        }
        ,{
          name: 'Stylus',
          value: 'includeStylus',
          checked: false
        }
        ,{
          name: 'Less',
          value: 'includeLess',
          checked: false
        }]
      }

      ,{
        when: function (answers) {
          return answers.preproType.indexOf('includeSCSS') !== -1;
        },
        type: 'list',
        name: 'mixinLibsSCSS',
        message: 'What mixin libraries would you like to use?',
        choices: [{
          name: 'Bourbon',
          value: 'includeBourbon',
          checked: false
        }
        ,{
          name: 'Compass Mixins',
          value: 'includeCompass',
          checked: false
        }
        ,{
          name: 'None',
          value: 'noMixinLibSCSS',
          checked: true
        }]
      }
      ,{
        when: function (answers) {
          return answers.preproType.indexOf('includeStylus') !== -1;
        },
        type: 'list',
        name: 'mixinLibsStylus',
        message: 'What mixin libraries would you like to use?',
        choices: [{
          name: 'Nib',
          value: 'includeNib',
          checked: false
        }
        ,{
          name: 'Kouto Swiss',
          value: 'includeKoutoSwiss',
          checked: false
        }
        ,{
          name: 'None',
          value: 'noMixinLibStylus',
          checked: true
        }]
      }
      ,{
        when: function (answers) {
          return answers.preproType.indexOf('includeLess') !== -1;
        },
        type: 'list',
        name: 'mixinLibsLess',
        message: 'What mixin libraries would you like to use?',
        choices: [{
          name: 'Less Hat',
          value: 'includeLessHat',
          checked: false
        }
        ,{
          name: 'None',
          value: 'noMixinLibLess',
          checked: true
        }]
      }


      // Media Query Libraries
      ,{
        when: function (answers) {
          return answers.preproType.indexOf('includeSCSS') !== -1;
        },
        type: 'list',
        name: 'mqLibsSCSS',
        message: 'What MediaQuery Library to use?',
        choices: [{
          name: 'Breakpoint',
          value: 'includeBreakpoint',
          checked: false
        }
        ,{
          name: 'Include Media',
          value: 'includeIncludeMedia',
          checked: false
        }
        ,{
          name: 'None',
          value: 'noMQLibSCSS',
          checked: true
        }]
      }
      ,{
        when: function (answers) {
          return answers.preproType.indexOf('includeStylus') !== -1;
        },
        type: 'list',
        name: 'mqLibsStylus',
        message: 'What MediaQuery Library to use?',
        choices: [{
          name: 'Rupture',
          value: 'includeRupture',
          checked: false
        }
        ,{
          name: 'None',
          value: 'noMQLibStylus',
          checked: true
        }]
      }
      ,{
        when: function (answers) {
          return answers.preproType.indexOf('includeLess') !== -1;
        },
        type: 'list',
        name: 'mqLibsLess',
        message: 'What MediaQuery Library to use?',
        choices: [{
          name: 'Less-MQ',
          value: 'includeLessMQ',
          checked: false
        }
        ,{
          name: 'None',
          value: 'noMQLibLess',
          checked: true
        }]
      }


      // Grid Libraries
      ,{
        when: function (answers) {
          return answers.preproType.indexOf('includeSCSS') !== -1;
        },
        type: 'list',
        name: 'gridLibsSCSS',
        message: 'What Grids Library to use?',
        choices: [{
          name: 'Jeet',
          value: 'includeJeetSCSS',
          checked: false
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
          name: 'Semantic.gs',
          value: 'includeSemanticSCSS',
          checked: false
        }
        ,{
          name: 'None',
          value: 'noGridLibSCSS',
          checked: false
        }]
      }
      ,{
        when: function (answers) {
          return answers.preproType.indexOf('includeStylus') !== -1;
        },
        type: 'list',
        name: 'gridLibsStylus',
        message: 'What Grids Library to use?',
        choices: [{
          name: 'Jeet',
          value: 'includeJeetStylus',
          checked: false
        }
        ,{
          name: 'sGrid',
          value: 'includeSGrid',
          checked: false
        }
        ,{
          name: 'Semantic.gs',
          value: 'includeSemanticStylus',
          checked: false
        }
        ,{
          name: 'None',
          value: 'noGridLibStylus',
          checked: false
        }]
      }
      ,{
        when: function (answers) {
          return answers.preproType.indexOf('includeLess') !== -1;
        },
        type: 'list',
        name: 'gridLibsLess',
        message: 'What Grids Library to use?',
        choices: [{
          name: 'Gee',
          value: 'includeGee',
          checked: false
        }
        ,{
          name: 'Semantic.gs',
          value: 'includeSemanticLess',
          checked: false
        }
        ,{
          name: 'None',
          value: 'noGridLibLess',
          checked: false
        }]
      }

      // Base Styles
      ,{
        type: 'list',
        name: 'baseStyles',
        message: 'What base styles to include?',
        choices: [{
          name: 'Sanitize',
          value: 'includeSanitize',
          checked: false
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
          checked: false
        }]
      }

      // Templating
      ,{
        type: 'list',
        name: 'templateEngine',
        message: 'How to generate html?',
        choices: [{
          name: 'Jade',
          value: 'includeJade',
          checked: false
        }
        ,{
          name: 'Nunjucks',
          value: 'includeNunjucks',
          checked: false
        }
        ,{
          name: 'None, just use plain old html',
          value: 'noTemplateEngine',
          checked: true
        }]
      }

      // Javascript
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

      // Modernizr
      ,{
        type: 'confirm',
        name: 'includeModernizr',
        message: 'Would you like to use Modernizr?',
        default: true
      }

      // Icon Font
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

      // Post CSS
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

      // Root Files
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

      // Google Analytics
      ,{
        type: 'confirm',
        name: 'includeGA',
        message: 'Provide Google Analytics Script?',
        default: false
      }

      // Run Gulp
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
    var gulpTasks = answers.gulpTasks;
    var scriptsJS = answers.scriptsJS;
    var rootFiles = answers.rootFiles;
    var postCSSPlugins = answers.postCSSPlugins;
    var baseStyles = answers.baseStyles;
    var preproType = answers.preproType;
    var mixinLibsSCSS = answers.mixinLibsSCSS;
    var gridLibsSCSS = answers.gridLibsSCSS;
    var mqLibsSCSS = answers.mqLibsSCSS;
    var mixinLibsStylus = answers.mixinLibsStylus;
    var gridLibsStylus = answers.gridLibsStylus;
    var mqLibsStylus = answers.mqLibsStylus;
    var mixinLibsLess = answers.mixinLibsLess;
    var gridLibsLess = answers.gridLibsLess;
    var mqLibsLess = answers.mqLibsLess;
    var templateEngine = answers.templateEngine;

    function hasFeature(feat, answer) {
      return answer && answer.indexOf(feat) !== -1;
    };

    // Gulp
    this.runGulp = answers.runGulp;


    // Project Details
    this.localUrl = answers.localUrl;
    this.appname = answers.name;
    this.appdescription = answers.description;
    this.appversion = answers.version;
    this.applicense = answers.license;


    // Base Styles
    this.includeReset = hasFeature('includeReset', baseStyles);
    this.includeNormalize = hasFeature('includeNormalize', baseStyles);
    this.includeSanitize = hasFeature('includeSanitize', baseStyles);
    this.noBaseStyles = hasFeature('noBaseStyles', baseStyles);


    // JavaScript
    this.includeJQuery = hasFeature('includeJQuery', scriptsJS);
    this.includeWaypoints = hasFeature('includeWaypoints', scriptsJS);
    this.includeSignals = hasFeature('includeSignals', scriptsJS);
    this.includeD3 = hasFeature('includeD3', scriptsJS);
    this.includeTweenmax = hasFeature('includeTweenmax', scriptsJS);
    this.includeEnquire = hasFeature('includeEnquire', scriptsJS);
    this.includeModernizr = answers.includeModernizr;
    this.includeGA = answers.includeGA;


    // HTML Templating
    this.includeJade = hasFeature('includeJade', templateEngine);
    this.includeNunjucks = hasFeature('includeNunjucks', templateEngine);
    this.includeHaml = false;
    this.includeHandlebars = false;
    this.noTemplateEngine = hasFeature('noTemplateEngine', templateEngine);


    // Fonts
    this.includeCustomIcnFont = answers.includeCustomIcnFont;
    this.customIconFontName = answers.customIconFontName;


    // Project Root
    this.includeHtaccess = hasFeature('includeHtaccess', rootFiles);
    this.includeCrossdomain = hasFeature('includeCrossdomain', rootFiles);
    this.includeBrowserconfig = hasFeature('includeBrowserconfig', rootFiles);
    this.includeRobots = hasFeature('includeRobots', rootFiles);


    // PostCSS
    this.includePostCSS = answers.includePostCSS;
    this.includePcssSelectorNot = hasFeature('includePcssSelectorNot', postCSSPlugins);
    this.includePcssSelectorMatches = hasFeature('includePcssSelectorMatches', postCSSPlugins);
    this.includePcssGradientFix = hasFeature('includePcssGradientFix', postCSSPlugins);
    this.includePcssMQPacker = hasFeature('includePcssMQPacker', postCSSPlugins);
    this.includePcssMQKeyframes = hasFeature('includePcssMQKeyframes', postCSSPlugins);
    this.includePcssNano = hasFeature('includePcssNano', postCSSPlugins);
    this.includePcssClassPrefix = answers.includePcssClassPrefix;
    this.includePcssScopify = answers.includePcssScopify;
    this.customClassPrefix = answers.customClassPrefix;
    this.customScope = answers.customScope;


    // Sass
    this.includeSCSS = hasFeature('includeSCSS', preproType);
    this.includeBourbon = hasFeature('includeBourbon', mixinLibsSCSS);
    this.includeCompass = hasFeature('includeCompass', mixinLibsSCSS);
    this.noMixinLibSCSS = hasFeature('noMixinLibSCSS', mixinLibsSCSS);
    this.includeSusy = hasFeature('includeSusy', gridLibsSCSS);
    this.includeJeetSCSS = hasFeature('includeJeetSCSS', gridLibsSCSS);
    this.includeNeat = hasFeature('includeNeat', gridLibsSCSS);
    this.includeSemanticSCSS = hasFeature('includeSemanticSCSS', gridLibsSCSS);
    this.noGridLibSCSS = hasFeature('noGridLibSCSS', gridLibsSCSS);
    this.includeBreakpoint = hasFeature('includeBreakpoint', mqLibsSCSS);
    this.includeIncludeMedia = hasFeature('includeIncludeMedia', mqLibsSCSS);
    this.noMQLibSCSS = hasFeature('noMQLibSCSS', mqLibsSCSS);


    // Stylus
    this.includeStylus = hasFeature('includeStylus', preproType);
    this.includeNib = hasFeature('includeNib', mixinLibsStylus);
    this.includeKoutoSwiss = hasFeature('includeKoutoSwiss', mixinLibsStylus);
    this.noMixinLibStylus = hasFeature('noMixinLibStylus', mixinLibsStylus);
    this.includeJeetStylus = hasFeature('includeJeetStylus', gridLibsStylus);
    this.includeSGrid = hasFeature('includeSGrid', gridLibsStylus);
    this.includeSemanticStylus = hasFeature('includeSemanticStylus', gridLibsStylus);
    this.noGridLibStylus = hasFeature('noGridLibStylus', gridLibsStylus);
    this.includeRupture = hasFeature('includeRupture', mqLibsStylus);
    this.noMQLibStylus = hasFeature('noMQLibStylus', mqLibsStylus);


    // Less
    this.includeLess = hasFeature('includeLess', preproType);
    this.includeLessHat = hasFeature('includeLessHat', mixinLibsLess);
    this.noMixinLibLess = hasFeature('noMixinLibLess', mixinLibsLess);
    this.includeGee = hasFeature('includeGee', gridLibsLess);
    this.includeSemanticLess = hasFeature('includeSemanticLess', gridLibsLess);
    this.noGridLibLess = hasFeature('noGridLibLess', gridLibsLess);
    this.includeLessMQ = hasFeature('includeLessMQ', mqLibsLess);
    this.noMQLibLess = hasFeature('noMQLibLess', mqLibsLess);

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
    if(this.noTemplateEngine) {
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


    if(this.includeSCSS) {
      this.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/sass.js', destRoot + '/gulp/gulp-tasks/styles.js', templateContext);
    }
    if(this.includeStylus) {
      this.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/styl.js', destRoot + '/gulp/gulp-tasks/styles.js', templateContext);
    }
    if(this.includeLess) {
      this.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/less.js', destRoot + '/gulp/gulp-tasks/styles.js', templateContext);
    }

    if(this.includeCustomIcnFont) {
      this.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/iconfont.js', destRoot + '/gulp/gulp-tasks/iconfont.js', templateContext);
    }

    if(this.noTemplateEngine) {
      // Dynamic
      this.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/html.js', destRoot + '/gulp/gulp-tasks/html.js', templateContext);
    }

    if(this.includeJade) {
      this.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/jade.js', destRoot + '/gulp/gulp-tasks/jade.js', templateContext);
    }

    if(this.includeHaml) {
      this.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/haml.js', destRoot + '/gulp/gulp-tasks/haml.js', templateContext);
    }

    if(this.includeHandlebars) {
      this.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/handlebars.js', destRoot + '/gulp/gulp-tasks/handlebars.js', templateContext);
    }

    if(this.includeNunjucks) {
      this.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/nunjucks.js', destRoot + '/gulp/gulp-tasks/nunjucks.js', templateContext);
    }

    if(this.includeModernizr) {
      this.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/modernizr.js', destRoot + '/gulp/gulp-tasks/modernizr.js', templateContext);
    }
  },

  _iconfont: function(destRoot, sourceRoot, templateContext) {
    if(this.includeCustomIcnFont) {
      // Static
      this.fs.copy(sourceRoot + '/src/iconfont/illustrator', destRoot + '/src/iconfont/illustrator');
      this.fs.copy(sourceRoot + '/src/iconfont/svg', destRoot + '/src/iconfont/svg');
    }
    if(this.includeCustomIcnFont && this.includeSCSS) {
      this.fs.copy(sourceRoot + '/src/iconfont/template/_icons.scss', destRoot + '/src/iconfont/template/_icons.scss');
    }
    if(this.includeCustomIcnFont && this.includeStylus) {
      this.fs.copy(sourceRoot + '/src/iconfont/template/icons.styl', destRoot + '/src/iconfont/template/icons.styl');
    }
    if(this.includeCustomIcnFont && this.includeLess) {
      this.fs.copy(sourceRoot + '/src/iconfont/template/icons.less', destRoot + '/src/iconfont/template/icons.less');
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
    this.fs.copyTpl(sourceRoot + '/src-tpl/scss/style.scss', destRoot + '/src/scss/style.scss', templateContext);

    if(this.includeSemanticSCSS) {
      this.fs.copy(sourceRoot + '/src-tpl/scss/base/_semantic-grid.scss', destRoot + '/src/scss/base/_grid.scss');
    } else {
      this.fs.copyTpl(sourceRoot + '/src-tpl/scss/base/_grid.scss', destRoot + '/src/scss/base/_grid.scss', templateContext);
    }

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

  _stylus: function(destRoot, sourceRoot, templateContext) {
    // Static
    this.fs.copy(sourceRoot + '/src/stylus', destRoot + '/src/stylus');

    // Dynamic
    this.fs.copyTpl(sourceRoot + '/src-tpl/stylus/base/fonts.styl', destRoot + '/src/stylus/base/fonts.styl', templateContext);
    this.fs.copyTpl(sourceRoot + '/src-tpl/stylus/base/variables.styl', destRoot + '/src/stylus/base/variables.styl', templateContext);
    this.fs.copyTpl(sourceRoot + '/src-tpl/stylus/style.styl', destRoot + '/src/stylus/style.styl', templateContext);

    if(this.includeSemanticStylus) {
      this.fs.copy(sourceRoot + '/src-tpl/stylus/base/semantic-grid.styl', destRoot + '/src/stylus/base/grid.styl');
    } else {
      this.fs.copyTpl(sourceRoot + '/src-tpl/stylus/base/grid.styl', destRoot + '/src/stylus/base/grid.styl', templateContext);
    }

    if(this.includeCustomIcnFont) {
      this.fs.copyTpl(sourceRoot + '/src-tpl/stylus/modules/icons.styl', destRoot + '/src/stylus/modules/icons.styl', templateContext);
    }

    if(this.includeReset) {
      this.fs.copy(sourceRoot + '/src-tpl/stylus/reset/reset.styl', destRoot + '/src/stylus/base/reset.styl');
    }
    if(this.includeNormalize) {
      this.fs.copy(sourceRoot + '/src-tpl/stylus/reset/normalize.styl', destRoot + '/src/stylus/base/normalize.styl');
    }
    if(this.includeSanitize) {
      this.fs.copy(sourceRoot + '/src-tpl/stylus/reset/sanitize.styl', destRoot + '/src/stylus/base/sanitize.styl');
    }
  },

  _less: function(destRoot, sourceRoot, templateContext) {
    this.fs.copy(sourceRoot + '/src/less', destRoot + '/src/less');

    // Dynamic
    this.fs.copyTpl(sourceRoot + '/src-tpl/less/base/fonts.less', destRoot + '/src/less/base/fonts.less', templateContext);
    this.fs.copyTpl(sourceRoot + '/src-tpl/less/base/variables.less', destRoot + '/src/less/base/variables.less', templateContext);
    this.fs.copyTpl(sourceRoot + '/src-tpl/less/style.less', destRoot + '/src/less/style.less', templateContext);

    if(this.includeSemanticLess) {
      this.fs.copy(sourceRoot + '/src-tpl/less/base/semantic-grid.less', destRoot + '/src/less/base/grid.less');
    } else {
      this.fs.copyTpl(sourceRoot + '/src-tpl/less/base/grid.less', destRoot + '/src/less/base/grid.less', templateContext);
    }

    if(this.includeLessHat) {
      this.fs.copy(sourceRoot + '/src-tpl/less/mixins/lesshat.less', destRoot + '/src/less/base/mixins/lesshat.less');
      this.fs.copy(sourceRoot + '/src-tpl/less/mixins/lesshat-prefixed.less', destRoot + '/src/less/base/mixins/lesshat-prefixed.less');
    }

    if(this.includeLessMQ) {
      this.fs.copy(sourceRoot + '/src-tpl/less/mixins/mq.less', destRoot + '/src/less/base/mixins/mq.less');
      this.fs.copy(sourceRoot + '/src-tpl/less/mixins/mq-prefixed.less', destRoot + '/src/less/base/mixins/mq-prefixed.less');
    }

    if(this.includeCustomIcnFont) {
      this.fs.copyTpl(sourceRoot + '/src-tpl/less/modules/icons.less', destRoot + '/src/less/modules/icons.less', templateContext);
    }

    if(this.includeReset) {
      this.fs.copy(sourceRoot + '/src-tpl/less/reset/reset.less', destRoot + '/src/less/base/reset.less');
    }
    if(this.includeNormalize) {
      this.fs.copy(sourceRoot + '/src-tpl/less/reset/normalize.less', destRoot + '/src/less/base/normalize.less');
    }
    if(this.includeSanitize) {
      this.fs.copy(sourceRoot + '/src-tpl/less/reset/sanitize.less', destRoot + '/src/less/base/sanitize.less');
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

  _handlebars: function(destRoot, sourceRoot, templateContext) {
    if(this.includeHandlebars) {
      this.fs.copy(sourceRoot + '/src/handlebars', destRoot + '/src/handlebars');
      this.fs.copyTpl(sourceRoot + '/src-tpl/handlebars/index.html', destRoot + '/src/handlebars/index.html', templateContext);
    }
  },

  _nunjucks: function(destRoot, sourceRoot, templateContext) {
    if(this.includeNunjucks) {
      this.fs.copy(sourceRoot + '/src/nunjucks', destRoot + '/src/nunjucks');
      this.fs.copyTpl(sourceRoot + '/src-tpl/nunjucks/base/base.html', destRoot + '/src/nunjucks/base/base.html', templateContext);
    }
  },

  _haml: function(destRoot, sourceRoot, templateContext) {
    if(this.includeHaml) {
      // Static
      this.fs.copyTpl(sourceRoot + '/src-tpl/haml/index.haml', destRoot + '/src/haml/index.haml', templateContext);
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
          customIconFontName: this.customIconFontName,
          customClassPrefix: this.customClassPrefix,
          customScope: this.customScope,
          includeReset: this.includeReset,
          includeNormalize: this.includeNormalize,
          includeSanitize: this.includeSanitize,
          includeSCSS: this.includeSCSS,
          includeSusy: this.includeSusy,
          includeBreakpoint: this.includeBreakpoint,
          includeBourbon: this.includeBourbon,
          includeNeat: this.includeNeat,
          includeJeetSCSS: this.includeJeetSCSS,
          includeIncludeMedia: this.includeIncludeMedia,
          includeCompass: this.includeCompass,
          includeSemanticSCSS: this.includeSemanticSCSS,
          includeStylus: this.includeStylus,
          includeNib: this.includeNib,
          includeKoutoSwiss: this.includeKoutoSwiss,
          includeJeetStylus: this.includeJeetStylus,
          includeSGrid: this.includeSGrid,
          includeSemanticStylus: this.includeSemanticStylus,
          includeRupture: this.includeRupture,
          includeLess: this.includeLess,
          includeGee: this.includeGee,
          includeSemanticLess: this.includeSemanticLess,
          includeLessHat: this.includeLessHat,
          includeLessMQ: this.includeLessMQ,
          noGridLibSCSS: this.noGridLibSCSS,
          noMixinLibSCSS: this.noMixinLibSCSS,
          noMQLibSCSS: this.noMQLibSCSS,
          noGridLibStylus: this.noGridLibStylus,
          noMixinLibStylus: this.noMixinLibStylus,
          noMQLibStylus: this.noMQLibStylus,
          noGridLibLess: this.noGridLibLess,
          noMixinLibLess: this.noMixinLibLess,
          noMQLibLess: this.noMQLibLess,
          noBaseStyles: this.noBaseStyles,
          includeJade: this.includeJade,
          includeHaml: this.includeHaml,
          includeHandlebars: this.includeHandlebars,
          includeNunjucks: this.includeNunjucks,
          noTemplateEngine: this.noTemplateEngine
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
    this._jade(destRoot, sourceRoot, templateContext);
    this._haml(destRoot, sourceRoot, templateContext);
    this._handlebars(destRoot, sourceRoot, templateContext);
    this._nunjucks(destRoot, sourceRoot, templateContext);

    if(this.includeSCSS) {
      this._scss(destRoot, sourceRoot, templateContext);
    }
    if(this.includeStylus) {
      this._stylus(destRoot, sourceRoot, templateContext);
    }
    if(this.includeLess) {
      this._less(destRoot, sourceRoot, templateContext);
    }
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
