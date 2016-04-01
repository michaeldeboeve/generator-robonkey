'use strict';

var generators    = require('yeoman-generator'),
    mkdirp        = require('mkdirp'),
    yosay         = require('yosay'),
    chalk         = require('chalk'),
    path          = require('path'),
    partialsPath  = './generator/',
    filesPath     = partialsPath + 'files/',
    promptsPath   = partialsPath + 'prompts/',
    configPath    = partialsPath + 'config/';
    //wordpress   = require('../util/wordpress.js');

var projectFiles        = require(filesPath + 'project.js'),
    gulpFiles           = require(filesPath + 'gulp.js'),
    bowerFiles          = require(filesPath + 'bower.js'),
    h5bpFiles           = require(filesPath + 'h5bp.js'),
    htmlFiles           = require(filesPath + 'html.js'),
    sassFiles           = require(filesPath + 'sass.js'),
    stylusFiles         = require(filesPath + 'stylus.js'),
    lessFiles           = require(filesPath + 'less.js'),
    scriptFiles         = require(filesPath + 'script.js'),
    imageFiles          = require(filesPath + 'images.js'),
    iconfontFiles       = require(filesPath + 'iconfont.js'),
    wordpressFiles      = require(filesPath + 'wordpress.js');



var printTitle = function(title){
  return '\n\n\n\n---- ' + chalk.bgWhite.black(' ' + title + ' ') + ' ----\n';
}
function hasFeature(feat, query) {
  return query && query.indexOf(feat) !== -1;
};

module.exports = generators.Base.extend({

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

  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  initializing: function() {
    this.pkg = require('../package.json');
    var message = chalk.yellow.bold('Welcome to Robonkey ') + chalk.yellow('\'Cause everyone needs a Robotic Monkey');
    this.log(yosay(message, {maxLength: 19}));
  },

  project: function() {
    this.log(printTitle('Project Details'))
    var done = this.async();
    this.prompt([{
      name: 'projectUrl',
      message: 'Local URL to use:',
      default: 'mynewawesomeapp.localhost'
    }, {
      name: 'projectName',
      message: 'Name your project:',
      default: this.appname,
    }, {
      name: 'projectDescription',
      message: 'Describe your project:',
      default: 'My new awesome app',
    }, {
      name: 'projectVersion',
      message: 'Project version:',
      default: '0.0.0'
    }, {
      name: 'projectAuthor',
      message: 'Author:',
      default: ''
    }, {
      name: 'authorEmail',
      message: 'Author\'s Email Address:',
      default: ''
    }], function (answers) {
        this.projectUrl = answers.projectUrl;
        this.projectName = answers.projectName;
        this.projectDescription = answers.projectDescription;
        this.projectVersion = answers.projectVersion;
        this.projectAuthor = answers.projectAuthor;
        this.authorEmail = answers.authorEmail;
        this.projectLicense = 'MIT';
        done();
      }.bind(this));
  },

  environment: function() {
    this.log(printTitle('Environment'))
    var done = this.async();
    this.prompt([{
      type: 'list',
      name: 'environmentOption',
      message: 'Which environment are you using?\nThis will compile everything in the right directories.',
      choices: ['None, just a static website', 'Node + Express', 'Wordpress', 'Drupal', 'CodeIgniter'],
      filter: function(val) {
        var filterMap = {
          'None, just a static website': 'static',
          'Node + Express': 'express',
          'Wordpress': 'wordpress',
          'Drupal': 'drupal',
          'CodeIgniter': 'codeigniter'
        };

        return filterMap[val];
      }
    }, {
      when: function (answers) {
        return answers.environmentOption === 'wordpress' || answers.environmentOption === 'drupal';
      },
      type: 'input',
      name: 'themeName',
      message: 'What is the name of your theme?',
      default: 'My Theme'
    }, {
      when: function (answers) {
        return answers.environmentOption === 'wordpress';
      },
      type: 'confirm',
      name: 'customStyle',
      message: 'Create a custom style.css in your theme directory?\n' + chalk.bgRed.white(' Warning: ') + chalk.red(' This will delete the existing file!'),
      default: false
    }, {
      when: function (answers) {
        return answers.environmentOption !== 'express';
      },
      type: 'confirm',
      name: 'customDirs',
      message: 'Use default output directory? (website, assets, js, css, lib, img)',
      default: true
    }, {
      when: function (answers) {
        return answers.customDirs === false;
      },
      name: 'mainDir',
      message: 'Name your output directory:',
      default: 'website'
    }, {
      when: function (answers) {
        return answers.customDirs === false;
      },
      name: 'assetsDir',
      message: 'Name your assets directory (css/fonts/js/images):',
      default: 'assets'
    }, {
      when: function (answers) {
        return answers.customDirs === false;
      },
      type: 'input',
      name: 'jsDir',
      message: 'Name your js directory:',
      default: 'js'
    }, {
      when: function (answers) {
        return answers.customDirs === false;
      },
      type: 'input',
      name: 'cssDir',
      message: 'Name your css directory:',
      default: 'css'
    }, {
      when: function (answers) {
        return answers.customDirs === false;
      },
      type: 'input',
      name: 'imgDir',
      message: 'Name your images directory:',
      default: 'img'
    }, {
      when: function (answers) {
        return answers.customDirs === false;
      },
      type: 'input',
      name: 'fontDir',
      message: 'Name your fonts directory:',
      default: 'fonts'
    }, {
      when: function (answers) {
        return answers.customDirs === false;
      },
      type: 'input',
      name: 'libDir',
      message: 'Name your libraries directory (css/js):',
      default: 'lib'
    }], function (answers) {
        this.environmentOption = answers.environmentOption;
        this.themeName = answers.themeName;
        if(this.themeName) {
          this.themeFolder = this.themeName.replace(/\s/g,'').toLowerCase();
        } else {
          this.themeFolder = this.themeName;
        }
        this.customStyle = answers.customStyle;

        if(answers.customDirs) {
          this.mainDir = 'website';
          this.assetsDir = 'assets';
          this.cssDir = 'css';
          this.jsDir = 'js';
          this.imgDir = 'img';
          this.libDir = 'lib';
          this.fontDir = 'fonts';
        } else {
          this.mainDir = answers.mainDir;
          this.assetsDir = answers.assetsDir;
          this.cssDir = answers.cssDir;
          this.jsDir = answers.jsDir;
          this.imgDir = answers.imgDir;
          this.libDir = answers.libDir;
          this.fontDir = answers.fontDir;
        }

        switch (this.environmentOption){
           case 'wordpress': this.templateDest = '/' + this.mainDir + '/wp-content/themes/' + this.themeFolder;
           break;

           case 'drupal': this.templateDest = '/' + this.mainDir + '/themes/' + this.themeFolder;
           break;

           case 'express':
              this.mainDir = 'app';
              this.assetsDir = 'public';
              this.templateDest = '/' + this.mainDir + '/' + this.assetsDir;
           break;

           default: this.templateDest = '/' + this.mainDir;
        };

        if(this.environmentOption !== 'express') {
          this.assetsDirPath = this.templateDest + '/' + this.assetsDir;
          this.cssDirPath = '/' + this.assetsDir + '/' + this.cssDir;
          this.jsDirPath = '/' + this.assetsDir + '/' + this.jsDir;
          this.imgDirPath = '/' + this.assetsDir + '/' + this.imgDir;
          this.fontDirPath = '/' + this.assetsDir + '/' + this.fontDir;
          this.cssLibDirPath = this.cssDirPath + '/' + this.libDir;
          this.jsLibDirPath = this.jsDirPath + '/' + this.libDir;
        } else {
          this.assetsDirPath = this.templateDest;
          this.cssDirPath = '/stylesheets';
          this.jsDirPath = '/javascripts';
          this.imgDirPath = '/images';
          this.fontDirPath = '/fonts';
          this.cssLibDirPath = this.cssDirPath + '/libs';
          this.jsLibDirPath = this.jsDirPath + '/libs';
        }
        done();
      }.bind(this));
  },

  html: function() {
    if(this.environmentOption === 'static'){
      this.log(printTitle('HTML Templating'))
      var done = this.async();
      this.prompt([{
        type: 'list',
        name: 'templateOption',
        message: 'How to generate html?',
        choices: ['None, just use plain old html', 'Jade', 'Nunjucks'],
        filter: function(val) {
          var filterMap = {
            'None, just use plain old html': 'html',
            'Jade': 'jade',
            'Nunjucks': 'nunjucks'
          };

          return filterMap[val];
        }

      }], function (answers) {
        this.templateOption = answers.templateOption;
        done();
      }.bind(this));
    }
  },

  css: function() {
    this.log(printTitle('Preprocessors'))
    var done = this.async();
    this.prompt([{
      type: 'list',
      name: 'preproOption',
      message: 'What preprocessor would you like to use?',
      choices: ['Sass', 'Stylus', 'Less'],
      filter: function(val) {
        var filterMap = {
          'Sass': 'sass',
          'Stylus': 'stylus',
          'Less': 'less'
        };

        return filterMap[val];
      }
    } ,{
      when: function (answers) {
        return answers.preproOption === 'sass';
      },
      type: 'list',
      name: 'mixinOption',
      message: 'What mixin libraries would you like to use?',
      choices: ['Default', 'Bourbon', 'Compass Mixins'],
      filter: function(val) {
        var filterMap = {
          'Default': 'default',
          'Bourbon': 'bourbon',
          'Compass Mixins': 'compassmixins'
        };

        return filterMap[val];
      }
    }
    ,{
      when: function (answers) {
        return answers.preproOption === 'stylus';
      },
      type: 'list',
      name: 'mixinOption',
      message: 'What mixin libraries would you like to use?',
      choices: ['Default', 'Nib', 'Kouto Swiss'],
      filter: function(val) {
        var filterMap = {
          'Default': 'default',
          'Nib': 'nib',
          'Kouto Swiss': 'koutoswiss'
        };

        return filterMap[val];
      }
    }
    ,{
      when: function (answers) {
        return answers.preproOption === 'less';
      },
      type: 'list',
      name: 'mixinOption',
      message: 'What mixin libraries would you like to use?',
      choices: ['Default', 'Less Hat'],
      filter: function(val) {
        var filterMap = {
          'none': 'default',
          'Less Hat': 'lesshat'
        };

        return filterMap[val];
      }
    }


    // Media Query Libraries
    ,{
      when: function (answers) {
        return answers.preproOption === 'sass';
      },
      type: 'list',
      name: 'mqOption',
      message: 'What MediaQuery Library to use?',
      choices: ['Default', 'Breakpoint', 'Include Media'],
      filter: function(val) {
        var filterMap = {
          'Default': 'default',
          'Breakpoint': 'breakpoint',
          'Include Media': 'includemedia'
        };

        return filterMap[val];
      }
    }
    ,{
      when: function (answers) {
        return answers.preproOption === 'stylus';
      },
      type: 'list',
      name: 'mqOption',
      message: 'What MediaQuery Library to use?',
      choices: ['Default', 'Rupture'],
      filter: function(val) {
        var filterMap = {
          'Default': 'default',
          'Rupture': 'rupture'
        };

        return filterMap[val];
      }
    }
    ,{
      when: function (answers) {
        return answers.preproOption === 'less';
      },
      type: 'list',
      name: 'mqOption',
      message: 'What MediaQuery Library to use?',
      choices: ['Default', 'Less-MQ'],
      filter: function(val) {
        var filterMap = {
          'Default': 'default',
          'Less-MQ': 'lessmq'
        };

        return filterMap[val];
      }
    }


    // Grid Libraries
    ,{
      when: function (answers) {
        return answers.preproOption === 'sass';
      },
      type: 'list',
      name: 'gridOption',
      message: 'What Grids Library to use?',
      choices: ['None', 'Jeet', 'Susy', 'Gridle', 'Gridle Flex', 'Neat (Will include Bourbon)', 'Semantic.gs'],
      filter: function(val) {
        var filterMap = {
          'None': 'none',
          'Jeet': 'jeet',
          'Susy': 'sysy',
          'Gridle': 'gridle',
          'Gridle Flex': 'gridleFlex',
          'Neat (Will include Bourbon)': 'neat',
          'Semantic.gs': 'semanticStylus'
        };

        return filterMap[val];
      }
    }
    ,{
      when: function (answers) {
        return answers.preproOption === 'stylus';
      },
      type: 'list',
      name: 'gridOption',
      message: 'What Grids Library to use?',
      choices: ['None', 'Jeet', 'sGrid', 'Semantic.gs'],
      filter: function(val) {
        var filterMap = {
          'None': 'none',
          'Jeet': 'jeet',
          'sGrid': 'sgrid',
          'Semantic.gs': 'semanticStylus'
        };

        return filterMap[val];
      }
    }
    ,{
      when: function (answers) {
        return answers.preproOption === 'less';
      },
      type: 'list',
      name: 'gridOption',
      message: 'What Grids Library to use?',
      choices: ['None', 'Gee', 'Semantic.gs'],
      filter: function(val) {
        var filterMap = {
          'None': 'none',
          'Gee': 'gee',
          'Semantic.gs': 'semanticLess'
        };

        return filterMap[val];
      }
    }], function (answers) {

        // Sass
        this.preproOption = answers.preproOption;
        this.mixinOption = answers.mixinOption;
        this.mqOption = answers.mqOption;
        this.gridOption = answers.gridOption;


        done();
      }.bind(this));
  },

  cssBase: function() {
    this.log(printTitle('CSS Base Styles'))
    var done = this.async();
    this.prompt([{
      type: 'list',
      name: 'baseStyleOption',
      message: 'What base styles to include?',
      choices: ['None', 'Sanitize', 'Reset', 'Normalize'],
      filter: function(val) {
        var filterMap = {
          'None': 'none',
          'Sanitize': 'sanitize',
          'Reset': 'reset',
          'Normalize': 'normalize'
        };

        return filterMap[val];
      }
    }], function (answers) {
        this.baseStyleOption = answers.baseStyleOption;
        done();
      }.bind(this));
  },

  cssPost: function() {
    this.log(printTitle('postCSS'))
    var done = this.async();
    this.prompt([{
      type: 'checkbox',
      name: 'postCssOption',
      message: 'What postCSS plugins to include?',
      choices: [{
        name: 'Autoprefixer',
        value: 'autoprefixer',
        checked: true
      }, {
        name: 'CSS Nano (Css Optimalization)',
        value: 'cssnano',
        checked: true
      }, {
        name: 'Gradient Transparency Fix',
        value: 'gradientfix',
        checked: true
      }, {
        name: 'Css Declaration Sorter',
        value: 'csssorter',
        checked: true
      }, {
        name: 'MQ Packer',
        value: 'mqpacker',
        checked: true
      }, {
        name: 'MQ Keyframes',
        value: 'mqkeyframes',
        checked: false
      }, {
        name: 'CSS Next',
        value: 'cssnext',
        checked: false
      }, {
        name: 'Rucksack',
        value: 'rucksack',
        checked: false
      }, {
        name: 'CSS Grace',
        value: 'cssgrace',
        checked: false
      }, {
        name: 'Class Prefix',
        value: 'classprefix',
        checked: false
      }, {
        name: 'Scopify',
        value: 'scopify',
        checked: false
      }]
    }], function (answers) {
        // if(answers.postCssOption.length < 1) {
        //   this.postCssOption = false;
        // } else {
        // }
        var postCssOption = answers.postCssOption;
        this.postCssOption = answers.postCssOption;
        this.autoprefixerOption = hasFeature('autoprefixer', postCssOption);
        this.cssnextOption = hasFeature('cssnext', postCssOption);
        this.cssgraceOption = hasFeature('cssgrace', postCssOption);
        this.rucksackOption = hasFeature('rucksack', postCssOption);
        this.gradientfixOption = hasFeature('gradientfix', postCssOption);
        this.mqpackerOption = hasFeature('mqpacker', postCssOption);
        this.mqkeyframesOption = hasFeature('mqkeyframes', postCssOption);
        this.classprefixOption = hasFeature('classprefix', postCssOption);
        this.scopifyOption = hasFeature('scopify', postCssOption);
        this.cssnanoOption = hasFeature('cssnano', postCssOption);
        this.csssorterOption = hasFeature('csssorter', postCssOption);

        done();
      }.bind(this));
  },

  javascriptLibs: function() {
    this.log(printTitle('Javascript Libraries'))
    var done = this.async();
    this.prompt([{
      type: 'checkbox',
      name: 'scriptsOption',
      message: 'What Javascript libraries to include?',
      choices: [{
        name: 'Modernizr',
        value: 'modernizr',
        checked: true
      }, {
        name: 'jQuery',
        value: 'jquery',
        checked: true
      }, {
        name: 'Requirejs',
        value: 'require',
        checked: false
      }, {
        name: 'Waypoints',
        value: 'waypoints',
        checked: false
      }, {
        name: 'Signals',
        value: 'signals',
        checked: false
      }, {
        name: 'D3js',
        value: 'd3js',
        checked: false
      }, {
        name: 'TweenMax',
        value: 'tweenmax',
        checked: false
      }, {
        name: 'Enquire',
        value: 'enquire',
        checked: false
      }]
    }], function (answers) {
      // if(answers.scriptsOption.length < 1) {
      //   this.scriptsOption = false;
      // } else {
      // }
      var scriptsOption = answers.scriptsOption;
      this.jqueryOption = hasFeature('jquery', scriptsOption);
      this.waypointsOption = hasFeature('waypoints', scriptsOption);
      this.signalsOption = hasFeature('signals', scriptsOption);
      this.d3jsOption = hasFeature('D3js', scriptsOption);
      this.tweenmaxOption = hasFeature('tweenmax', scriptsOption);
      this.enquireOption = hasFeature('enquire', scriptsOption);
      this.requireOption = hasFeature('require', scriptsOption);
      this.modernizrOption = hasFeature('modernizr', scriptsOption);

        done();
      }.bind(this));
  },

  h5bp: function() {
    this.log(printTitle('h5bp Extra\'s'))
    var done = this.async();
    this.prompt([{
      type: 'checkbox',
      name: 'h5bpOption',
      message: 'What h5bp extra\'s to include?',
      choices: [{
        name: '.htaccess',
        value: 'htaccess',
        checked: true
      }, {
        name: 'browserconfig.xml (for windows 10 tiles)',
        value: 'browserconfig',
        checked: true
      }, {
        name: 'crossdomain.xml',
        value: 'crossdomain',
        checked: false
      }, {
        name: 'robots.txt',
        value: 'robots',
        checked: false
      }, {
        name: 'humans.txt',
        value: 'humans',
        checked: false
      }]
    }], function (answers) {
        // if(answers.h5bpOption.length < 1) {
        //   this.h5bpOption = false;
        // } else {
        // }
        var h5bpOption = answers.h5bpOption;
        this.htaccessOption = hasFeature('htaccess', h5bpOption);
        this.crossdomainOption = hasFeature('crossdomain', h5bpOption);
        this.browserconfigOption = hasFeature('browserconfig', h5bpOption);
        this.robotsOption = hasFeature('robots', h5bpOption);
        this.humansOption = hasFeature('humans', h5bpOption);

        done();
      }.bind(this));
  },


  iconfont: function() {
    this.log(printTitle('Custom Icon Font'))
    var done = this.async();
    this.prompt([{
        type: 'confirm',
        name: 'customIconfontOption',
        message: 'Would you like to include a custom icon font?',
        default: false
    }, {
      when: function (answers) {
        return answers.customIconfontOption === true;
      },
      name: 'customIconFontName',
      message: 'Name your custom icon font',
      default: 'robonky-glyphs'
    }], function (answers) {
        this.customIconfontOption = answers.customIconfontOption;
        this.customIconFontName = answers.customIconFontName;
        done();
      }.bind(this));
  },

  googleanalytics: function() {
    if(this.environmentOption === 'static'){
      this.log(printTitle('Google Analytics'))
      var done = this.async();
      this.prompt([{
        type: 'confirm',
        name: 'analyticsOption',
        message: 'Provide Google Analytics Script?',
        default: true
    }], function (answers) {
        this.analyticsOption = answers.analyticsOption;
        done();
      }.bind(this));
    }
  },

  gulp: function() {
    this.log(printTitle('Gulp'))
    var done = this.async();
    this.prompt([{
      type: 'confirm',
      name: 'gulpDirOption',
      message: 'Place Gulp files in a subfolder?',
      default: true
    }, {
      type: 'confirm',
      name: 'gulpCmdOption',
      message: 'Run gulp command after install?',
      default: false
    }], function (answers) {
        this.gulpDirOption = answers.gulpDirOption;
        this.gulpCmdOption = answers.gulpCmdOption;
        done();
      }.bind(this));
  },

  configuring: function(answers){
    this.config.forceSave();
  },

  writing: function(){
    var destRoot = this.destinationRoot(),
        sourceRoot = this.sourceRoot(),
        templateContext = {
          // Project
          projectUrl: this.projectUrl,
          projectName: this.projectName,
          projectDescription: this.projectDescription,
          projectAuthor: this.projectAuthor,
          authorEmail: this.authorEmail,
          projectVersion: this.projectVersion,
          projectLicense: this.projectLicense,

          // Environment
          environmentOption: this.environmentOption,
          themeName: this.themeName,
          themeFolder: this.themeFolder,
          templateOption: this.templateOption,
          mainDir: this.mainDir,
          assetsDir: this.assetsDir,
          templateDest: this.templateDest,
          assetsDir: this.assetsDir,
          assetsDirPath: this.assetsDirPath,
          cssDirPath: this.cssDirPath,
          jsDirPath: this.jsDirPath,
          imgDirPath: this.imgDirPath,
          fontDirPath: this.fontDirPath,
          cssLibDirPath: this.cssLibDirPath,
          jsLibDirPath: this.jsLibDirPath,

          // Styles
          preproOption: this.preproOption,
          mixinOption: this.mixinOption,
          mqOption: this.mqOption,
          gridOption: this.gridOption,
          baseStyleOption: this.baseStyleOption,

          postCssOption: this.postCssOption,
          autoprefixerOption: this.autoprefixerOption,
          cssnextOption: this.cssnextOption,
          cssgraceOption: this.cssgraceOption,
          rucksackOption: this.rucksackOption,
          gradientfixOption: this.gradientfixOption,
          mqpackerOption: this.mqpackerOption,
          mqkeyframesOption: this.mqkeyframesOption,
          classprefixOption: this.classprefixOption,
          scopifyOption: this.scopifyOption,
          cssnanoOption: this.cssnanoOption,
          csssorterOption: this.csssorterOption,



          // Javascript
          jqueryOption: this.jqueryOption,
          waypointsOption: this.waypointsOption,
          signalsOption: this.signalsOption,
          d3jsOption: this.d3jsOption,
          tweenmaxOption: this.tweenmaxOption,
          enquireOption: this.enquireOption,
          requireOption: this.requireOption,
          modernizrOption: this.modernizrOption,

          // Root Files
          htaccessOption: this.htaccessOption,
          crossdomainOption: this.crossdomainOption,
          browserconfigOption: this.browserconfigOption,
          robotsOption: this.robotsOption,
          humansOption: this.humansOption,

          // Icon Font
          customIconfontOption: this.customIconfontOption,
          customIconFontName: this.customIconFontName,

          // Google Analytics
          analyticsOption: this.analyticsOption,

          // Gulp
          gulpDirOption: this.gulpDirOption

        };

    projectFiles(destRoot, sourceRoot, templateContext, this);
    gulpFiles(destRoot, sourceRoot, templateContext, this);
    bowerFiles(destRoot, sourceRoot, templateContext, this);
    h5bpFiles(destRoot, sourceRoot, templateContext, this);
    htmlFiles(destRoot, sourceRoot, templateContext, this);
    sassFiles(destRoot, sourceRoot, templateContext, this);
    stylusFiles(destRoot, sourceRoot, templateContext, this);
    lessFiles(destRoot, sourceRoot, templateContext, this);
    scriptFiles(destRoot, sourceRoot, templateContext, this);
    imageFiles(destRoot, sourceRoot, templateContext, this);
    iconfontFiles(destRoot, sourceRoot, templateContext, this);
    wordpressFiles(destRoot, sourceRoot, templateContext, this);

  },

  install: function() {
    if(this.gulpDirOption) {
      // Change working directory to 'gulp' for dependency install
      var npmdir = process.cwd() + '/gulp';
      process.chdir(npmdir);
    }
    this.bowerInstall();
    this.npmInstall();
  },
  end: function() {
    this._endMsg();
    if(this.gulpCmdOption) {
      this.spawnCommand('gulp', ['serve']);
    }
  }

});
