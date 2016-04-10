 /**
 * Handle prompt choices and setup template values
 * For file creation
 */

'use strict';

var _           = require('lodash'),
    hasFeature  = require('./../../helpers/hasFeature');


var answersConfig = function answersConfig() {

// If user chooses to use exsiting yo-rc file, then skip prompts
    if (this.existingConfig) {
        this.answers = this.config.getAll();
    } else {
        this.answers = _.merge(
          this.projectPrompt,
          this.environmentPrompt,
          this.environmentCheckPrompt,
          this.foldersPrompt,
          this.htmlPrompt,
          this.cssPrompt,
          this.cssLibsSassPrompt,
          this.cssLibsStylusPrompt,
          this.cssLibsLessPrompt,
          this.cssBasePrompt,
          this.cssPostPrompt,
          this.javascriptPrompt,
          this.scriptsPrompt,
          // this.h5bpPrompt,
          this.fontPrompt,
          // this.gaPrompt,
          this.gulpPrompt);
      }

// Assign each answer property to `this` context to give the generator access to it
    this.skipEnvironment = this.answers.skipEnvironment;




// Project
    this.projectUrl = this.answers.projectUrl;
    this.projectName = this.answers.projectName;
    this.projectNameJson = this.answers.projectName.replace(/\s/g,'');
    this.projectDescription = this.answers.projectDescription;
    this.projectVersion = this.answers.projectVersion;
    this.projectAuthor = this.answers.projectAuthor;
    this.authorURI = this.answers.authorURI;
    this.projectLicense = 'MIT';




// Environment
    if (this.environmentInstalled) {
      this.answers.environmentOption = this.environmentInstalled;
    } else if(!this.answers.environmentOption) {
      this.answers.environmentOption = 'static';
    }
    this.environmentOption = this.answers.environmentOption;




// BrowserSync
    switch(this.answers.environmentOption) {
      case 'express':
      case 'static':
        this.answers.browsersyncOption = true;
      break;

      default:
        this.answers.browsersyncOption = false;
    }

    this.browsersyncOption = this.answers.browsersyncOption;




// Folders
    this.mainDir = this.answers.mainDir;
    this.cssDir = this.answers.cssDir;
    this.jsDir = this.answers.jsDir;
    this.imgDir = this.answers.imgDir;
    this.libDir = this.answers.libDir;
    this.fontDir = this.answers.fontDir;
    this.browserConfigAssets = '/' + this.answers.assetsDir + '/' + this.imgDir;

    switch (this.environmentOption) {
      case 'express':
        this.assetsDir = 'public';
      break;

      case 'laravel':
      case 'codeigniter':
        this.assetsDir = 'public/' + this.answers.assetsDir;
      break;

      default:
        this.assetsDir = this.answers.assetsDir;
    }




// Wordpress Theme
    this.wpBlankTheme = this.answers.wpBlankTheme;
    this.themeNameSpace =this.answers.themeNameSpace;
    this.themeAuthor = this.answers.themeAuthor;
    this.themeAuthorURI = this.answers.themeAuthorURI;

    this.themeName = this.answers.themeName;
    if(this.answers.themeName) {
      this.themeFolder = this.themeName.replace(/\s/g,'').toLowerCase();
    } else {
      this.themeFolder = this.themeName;
    }



// Theme Location
    switch (this.environmentOption){
      case 'wordpress':
        this.templateDest = this.mainDir + '/wp-content/themes/' + this.themeFolder;
      break;

      case 'drupal':
        this.templateDest = this.mainDir + '/themes/' + this.themeFolder;
      break;

      break;

      default:
        this.templateDest = this.mainDir;
    };




// Gulp
    this.gulpDirOption = this.answers.gulpDirOption;
    this.gulpCmdOption = this.answers.gulpCmdOption;

    if(this.answers.gulpDirOption) {
      this.rootFolder = '../';
      this.fontStyleOutputBase = '../../../../';
      this.nodeModules = '../../gulp/node_modules/';
    } else {
      this.rootFolder = './';
      this.fontStyleOutputBase = '../../../../';
      this.nodeModules = '../../node_modules/';
    }





// Gulp Paths
    this.cssDirPathGulp = '/' + this.assetsDir + '/' + this.cssDir;
    this.jsDirPathGulp = '/' + this.assetsDir + '/' + this.jsDir;
    this.imgDirPathGulp = '/' + this.assetsDir + '/' + this.imgDir;
    this.fontDirPathGulp = '/' + this.assetsDir + '/' + this.fontDir;
    this.cssLibDirPathGulp = this.cssDirPathGulp + '/' + this.libDir;
    this.jsLibDirPathGulp = this.jsDirPathGulp + '/' + this.libDir;





// Folders Paths
    switch (this.environmentOption){
      case 'express':
        // No assets folder
        this.cssDirPath = '/' + this.cssDir;
        this.jsDirPath = '/' + this.jsDir;
        this.imgDirPath = '/' + this.imgDir;
        this.fontDirPath = '/' + this.fontDir;
        this.cssLibDirPath = this.cssDirPath + '/' + this.libDir;
        this.jsLibDirPath = this.jsDirPath + '/' + this.libDir;
      break;

      default:
        this.cssDirPath = '/' + this.assetsDir + '/' + this.cssDir;
        this.jsDirPath = '/' + this.assetsDir + '/' + this.jsDir;
        this.imgDirPath = '/' + this.assetsDir + '/' + this.imgDir;
        this.fontDirPath = '/' + this.assetsDir + '/' + this.fontDir;
        this.cssLibDirPath = this.cssDirPath + '/' + this.libDir;
        this.jsLibDirPath = this.jsDirPath + '/' + this.libDir;
    }





// Html
    this.templateOption = this.answers.templateOption;
    if(this.environmentOption === 'express') {
      this.templateOption = 'jade';
    }




// Css
    this.preproOption = this.answers.preproOption;
    this.mixinOption = this.answers.mixinOption;
    this.mqOption = this.answers.mqOption;
    this.gridOption = this.answers.gridOption;




// Css Base
    this.baseStyleOption = this.answers.baseStyleOption;




// Css Post
    var postcssOption = this.answers.postcssOption;
    this.postcssOption = this.answers.postcssOption;

    this.postcssPlugins = [];


    // if(this.preproOption === 'precss') {
    //   this.postcssPlugins.push({
    //     key: 'precss',
    //     req: 'precss',
    //     call: 'precss',
    //     sort: 0
    //   });
    // }

    for (var i = 0; i < this.postcssOption.length; i++) {
      switch(this.postcssOption[i]) {
        case 'lostgrid':
          this.postcssPlugins.push({
            key: 'lostGrid',
            name: 'Lost Grid',
            link: 'https://github.com/peterramsing/lost',
            req: 'lost',
            call: 'lostGrid',
            sort: 1
          });
        break;

        case 'gradientfix':
          this.postcssPlugins.push({
              key: 'gradientFix',
              name: 'Gradient Transparency Fixer',
              link: 'https://github.com/gilmoreorless/postcss-gradient-transparency-fix',
              req: 'postcss-gradient-transparency-fix',
              call: 'gradientFix',
              sort: 2
            });
        break;

        case 'rucksack':
          this.postcssPlugins.push({
              key: 'rucksack',
              name: 'Rucksack',
              link: 'https://simplaio.github.io/rucksack',
              req: 'rucksack-css',
              call: 'rucksack',
              sort: 3
            });
        break;

        case 'cssnext':
          this.postcssPlugins.push({
            key: 'next',
            name: 'Css Next',
            link: 'http://cssnext.io',
            req: 'postcss-cssnext',
            call: 'next({browsers: cfg.browsers})',
            sort: 4
          });
        break;

        case 'cssgrace':
          this.postcssPlugins.push({
              key: 'grace',
              name: 'Css Grace',
              link: 'https://github.com/cssdream/cssgrace',
              req: 'cssgrace',
              call: 'grace',
              sort: 5
            });
        break;

        case 'classprefix':
          this.postcssPlugins.push({
              key: 'classPrfx',
              name: 'Class Prefix',
              link: 'https://github.com/thompsongl/postcss-class-prefix',
              req: 'postcss-class-prefix',
              call: 'classPrfx(cfg.prefix)',
              sort: 6
            });
        break;

        case 'scopify':
          this.postcssPlugins.push({
              key: 'scopify',
              name: 'Scopify',
              link: 'https://github.com/pazams/postcss-scopify',
              req: 'postcss-scopify',
              call: 'scopify(cfg.scope)',
              sort: 7
            });
        break;

        case 'csssorter':
          this.postcssPlugins.push({
              key: 'cssdeclsort',
              name: 'Css Declaration Sorter',
              link: 'https://github.com/Siilwyn/css-declaration-sorter',
              req: 'css-declaration-sorter',
              call: 'cssdeclsort({order: cfg.cssSortOrder})',
              sort: 8
            });
        break;

        case 'mqkeyframes':
          this.postcssPlugins.push({
              key: 'mqKeyframes',
              name: 'MQKeyframes',
              link: 'https://github.com/TCotton/postcss-mq-keyframes',
              req: 'postcss-mq-keyframes',
              call: 'mqKeyframes',
              sort: 9
            });
        break;

        case 'mqpacker':
          this.postcssPlugins.push({
              key: 'mqPacker',
              name: 'MQPacker',
              link: 'https://github.com/hail2u/node-css-mqpacker',
              req: 'css-mqpacker',
              call: 'mqPacker',
              sort: 10
            });
        break;

        case 'autoprefixer':
          this.postcssPlugins.push({
              key: 'autoprefixer',
              name: 'Autoprefixer',
              link: 'https://github.com/postcss/autoprefixer',
              req: 'autoprefixer',
              call: 'autoprefixer({browsers: cfg.browsers})',
              sort: 98
            });
        break;

        case 'cssnano':
          this.postcssPlugins.push({
              key: 'cssnano',
              name: 'Css Nano',
              link: 'https://github.com/ben-eb/cssnano',
              req: 'cssnano',
              call: 'cssnano({autoprefixer: false})',
              sort: 99,
              excludeDev: true
            });
        break;
      }
    }
    this.postcssPlugins = this.postcssPlugins.sort(function(a,b){return a.sort-b.sort});

    this.postcssAutoprefixerOption = hasFeature('autoprefixer', postcssOption);
    this.postcssCssNextOption = hasFeature('cssnext', postcssOption);
    this.postcssCssGraceOption = hasFeature('cssgrace', postcssOption);
    this.postcssRucksackOption = hasFeature('rucksack', postcssOption);
    this.postcssGradientfixOption = hasFeature('gradientfix', postcssOption);
    this.postcssMqpackerOption = hasFeature('mqpacker', postcssOption);
    this.postcssMqkeyframesOption = hasFeature('mqkeyframes', postcssOption);
    this.postcssClassprefixOption = hasFeature('classprefix', postcssOption);
    this.postcssScopifyOption = hasFeature('scopify', postcssOption);
    this.postcssCssNanoOption = hasFeature('cssnano', postcssOption);
    this.postcssCssSorterOption = hasFeature('csssorter', postcssOption);
    this.postcssLostGridOption = hasFeature('lostgrid', postcssOption);




// javascript
    this.javascriptOption = this.answers.javascriptOption;




// Scripts
    var scriptsOption = this.answers.scriptsOption;
    this.scriptsOption = this.answers.scriptsOption;

    this.jsScripts = [];

    for (var i = 0; i < this.scriptsOption.length; i++) {
      switch(this.scriptsOption[i]) {
        case 'jquery':
          this.jsScripts.push({
            file: 'jquery.min.js',
            src: 'jquery/dist/',
            sort: 0
          });
        break;

        case 'zepto':
          this.jsScripts.push({
            file: 'zepto.min.js',
            src: 'zepto/',
            sort: 0
          });
        break;

        case 'underscore':
          this.jsScripts.push({
            file: 'underscore-min.js',
            src: 'underscore/',
            sort: 1
          });
        break;

        case 'waypoints':
          if(hasFeature('jquery', scriptsOption)){
            this.jsScripts.push({
              file: 'jquery.waypoints.min.js',
              src: 'waypoints/lib/',
              sort: 2
            });
          } else if(!hasFeature('jquery', scriptsOption) && hasFeature('zepto', scriptsOption)){
            this.jsScripts.push({
              file: 'zepto.waypoints.min.js',
              src: 'waypoints/lib/',
              sort: 2
            });
          } else {
            this.jsScripts.push({
              file: 'noframework.waypoints.min.js',
              src: 'waypoints/lib/',
              sort: 2
            });
          }
        break;

        case 'signals':
          this.jsScripts.push({
            file: 'signals.min.js',
            src: 'js-signals/dist/',
            sort: 3
          });
        break;

        case 'dthreejs':
          this.jsScripts.push({
            file: 'd3.min.js',
            src: 'd3/',
            sort: 4
          });
        break;

        case 'enquire':
          this.jsScripts.push({
            file: 'enquire.min.js',
            src: 'enquire/dist/',
            sort: 5
          });
        break;

        case 'tweenmax':
          this.jsScripts.push({
            file: 'TweenMax.min.js',
            src: 'gsap/src/minified/',
            sort: 6
          });
        break;


        case 'backbone':
          this.jsScripts.push({
            file: 'backbone-min.js',
            src: 'backbone/',
            sort: 7
          });
        break;

        case 'react':
          this.jsScripts.push({
            file: 'react-dom.min.js',
            src: 'react/',
            sort: 8
          });
          this.jsScripts.push({
            file: 'react.min.js',
            src: 'react/',
            sort: 9
          });
        break;

        case 'scrollreveal':
          this.jsScripts.push({
            file: 'scrollreveal.min.js',
            src:  'scrollreveal/dist/',
            sort: 10
          });
        break;
      }
    }

    this.jsScriptsBower = this.jsScripts;

    // Push extra scripts to bower list
    if(hasFeature('require', scriptsOption)) {
      this.jsScriptsBower.push({
        file: 'require.js',
        src: 'requirejs/',
        sort: 0
      });
    }

    if(hasFeature('modernizr', scriptsOption)) {
      this.jsScriptsBower.push({
        file: 'modernizr-custom.js',
        src: this.rootFolder + 'src/modernizr/',
        sort: 8
      });
    }

    if(hasFeature('react', scriptsOption)) {
      this.jsScriptsBower.push({
        file: 'react-with-addons.min.js',
        src: 'react/',
        sort: 0
      });
    }


    // Overwrite this.jsScripts id Require option is true
    if(hasFeature('require', scriptsOption)) {
      this.jsScripts = [];
      this.jsScripts.push({
        file: 'require.js',
        sort: 0
      });
    }

    this.jsScripts = this.jsScripts.sort(function(a,b){return a.sort-b.sort});
    this.jsScriptsBower = this.jsScriptsBower.sort(function(a,b){return a.sort-b.sort});


    this.jqueryOption = hasFeature('jquery', scriptsOption);
    this.waypointsOption = hasFeature('waypoints', scriptsOption);
    this.signalsOption = hasFeature('signals', scriptsOption);
    this.dthreejsOption = hasFeature('dthreejs', scriptsOption);
    this.tweenmaxOption = hasFeature('tweenmax', scriptsOption);
    this.enquireOption = hasFeature('enquire', scriptsOption);
    this.requireOption = hasFeature('require', scriptsOption);
    this.modernizrOption = hasFeature('modernizr', scriptsOption);
    this.angularOption = hasFeature('angular', scriptsOption);
    this.reactOption = hasFeature('react', scriptsOption);
    this.backboneOption = hasFeature('backbone', scriptsOption);
    this.underscoreOption = hasFeature('underscore', scriptsOption);
    this.zeptoOption = hasFeature('zepto', scriptsOption);
    this.scrollrevealOption = hasFeature('scrollreveal', scriptsOption);





// h5bp
    // var h5bpOption = this.answers.h5bpOption;
    // this.htaccessOption = hasFeature('htaccess', h5bpOption);
    // this.crossdomainOption = hasFeature('crossdomain', h5bpOption);
    // this.browserconfigOption = hasFeature('browserconfig', h5bpOption);
    // this.robotsOption = hasFeature('robots', h5bpOption);
    // this.humansOption = hasFeature('humans', h5bpOption);





// Font
    this.customIconfontOption = this.answers.customIconfontOption;
    this.customIconFontName = this.answers.customIconFontName;




// Google Analytics
    // this.analyticsOption = this.answers.analyticsOption;
    this.analyticsOption = true;






    this.templateContext = {
      // Project
      projectUrl: this.projectUrl,
      projectName: this.projectName,
      projectNameJson: this.projectNameJson,
      projectDescription: this.projectDescription,
      projectAuthor: this.projectAuthor,
      authorEmail: this.authorEmail,
      projectVersion: this.projectVersion,
      projectLicense: this.projectLicense,
      browsersyncOption: this.browsersyncOption,

      // Environment
      environmentOption: this.environmentOption,
      themeName: this.themeName,
      themeFolder: this.themeFolder,
      wpBlankTheme: this.wpBlankTheme,
      themeNameSpace: this.themeNameSpace,
      themeAuthor: this.themeAuthor,
      themeAuthorURI: this.themeAuthorURI,
      templateOption: this.templateOption,
      rootFolder: this.rootFolder,
      fontStyleOutputBase: this.fontStyleOutputBase,
      nodeModules: this.nodeModules,
      mainDir: this.mainDir,
      assetsDir: this.assetsDir,
      templateDest: this.templateDest,
      assetsDir: this.assetsDir,
      cssDirPath: this.cssDirPath,
      jsDirPath: this.jsDirPath,
      imgDirPath: this.imgDirPath,
      fontDirPath: this.fontDirPath,
      cssLibDirPath: this.cssLibDirPath,
      jsLibDirPath: this.jsLibDirPath,
      cssDirPathGulp: this.cssDirPathGulp,
      jsDirPathGulp: this.jsDirPathGulp,
      imgDirPathGulp: this.imgDirPathGulp,
      fontDirPathGulp: this.fontDirPathGulp,
      cssLibDirPathGulp: this.cssLibDirPathGulp,
      jsLibDirPathGulp: this.jsLibDirPathGulp,
      browserConfigAssets: this.browserConfigAssets,

      // Styles
      preproOption: this.preproOption,
      mixinOption: this.mixinOption,
      mqOption: this.mqOption,
      gridOption: this.gridOption,
      baseStyleOption: this.baseStyleOption,
      javascriptOption: this.javascriptOption,



      // Postcss
      postcssPlugins: this.postcssPlugins,
      postcssOption: this.postcssOption,
      postcssAutoprefixerOption: this.postcssAutoprefixerOption,
      postcssCssNextOption: this.postcssCssNextOption,
      postcssCssGraceOption: this.postcssCssGraceOption,
      postcssRucksackOption: this.postcssRucksackOption,
      postcssGradientfixOption: this.postcssGradientfixOption,
      postcssMqpackerOption: this.postcssMqpackerOption,
      postcssMqkeyframesOption: this.postcssMqkeyframesOption,
      postcssClassprefixOption: this.postcssClassprefixOption,
      postcssScopifyOption: this.postcssScopifyOption,
      postcssCssNanoOption: this.postcssCssNanoOption,
      postcssCssSorterOption: this.postcssCssSorterOption,
      postcssLostGridOption: this.postcssLostGridOption,



      // Javascript
      jsScripts: this.jsScripts,
      jsScriptsBower: this.jsScriptsBower,
      jsScriptsBower: this.jsScriptsBower,
      jqueryOption: this.jqueryOption,
      waypointsOption: this.waypointsOption,
      signalsOption: this.signalsOption,
      dthreejsOption: this.dthreejsOption,
      tweenmaxOption: this.tweenmaxOption,
      enquireOption: this.enquireOption,
      requireOption: this.requireOption,
      modernizrOption: this.modernizrOption,
      angularOption: this.angularOption,
      reactOption: this.reactOption,
      backboneOption: this.backboneOption,
      underscoreOption: this.underscoreOption,
      zeptoOption: this.zeptoOption,
      scrollrevealOption: this.scrollrevealOption,

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


};

module.exports = answersConfig;
