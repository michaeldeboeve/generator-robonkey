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
          this.cssBasePrompt,
          this.cssPostPrompt,
          this.javascriptPrompt,
          this.scriptsPrompt,
          this.h5bpPrompt,
          this.fontPrompt,
          this.gaPrompt,
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


    //Environment
    if (this.environmentInstalled) {
      this.answers.environmentOption = this.environmentInstalled;
    } else if(!this.answers.environmentOption) {
      this.answers.environmentOption = 'static';
    }
    this.environmentOption = this.answers.environmentOption;

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


    // BrowserSync
    switch (this.environmentOption) {

      case 'express':
      case 'static':
        this.browsersyncOption = true;
      break;

      default:
        this.browsersyncOption = false;

    }

    if(this.answers.gulpDirOption) {
      this.rootFolder = '../';
      this.fontStyleOutputBase = '../../../../';
      this.nodeModules = '../../gulp/node_modules/';
    } else {
      this.rootFolder = './';
      this.fontStyleOutputBase = '../../../../';
      this.nodeModules = '../../node_modules/';
    }

    // Themes Location
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

    // Gulp Paths
    this.cssDirPathGulp = '/' + this.assetsDir + '/' + this.cssDir;
    this.jsDirPathGulp = '/' + this.assetsDir + '/' + this.jsDir;
    this.imgDirPathGulp = '/' + this.assetsDir + '/' + this.imgDir;
    this.fontDirPathGulp = '/' + this.assetsDir + '/' + this.fontDir;
    this.cssLibDirPathGulp = this.cssDirPathGulp + '/' + this.libDir;
    this.jsLibDirPathGulp = this.jsDirPathGulp + '/' + this.libDir;

    // Folders Locations
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



    //Html
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
    var postCssOption = this.answers.postCssOption;
    this.postCssOption = this.answers.postCssOption;

    this.postCssPlugins = [];
    for (var i = 0; i < this.postCssOption.length; i++) {
      switch(this.postCssOption[i]) {
        case 'lostgrid':
          this.postCssPlugins.push({
            key: 'lostGrid',
            req: 'lost',
            call: 'lostGrid',
            sort: 1 });
          // this.postCssConfigDev.push({ call: 'lostGrid', sort: 1 });
          // this.postCssConfigBuild.push({ call: 'lostGrid', sort: 1 });
        break;

        case 'gradientfix':
          this.postCssPlugins.push({
              key: 'gradientFix',
              req: 'postcss-gradient-transparency-fix',
              call: 'gradientFix',
              sort: 2
            });
          // this.postCssConfigDev.push({ call: 'gradientFix', sort: 2 });
          // this.postCssConfigBuild.push({ call: 'gradientFix', sort: 2 });
        break;

        case 'rucksack':
          this.postCssPlugins.push({
              key: 'rucksack',
              req: 'rucksack-css',
              call: 'rucksack',
              sort: 3
            });
          // this.postCssConfigDev.push({ call: 'rucksack', sort: 3 });
          // this.postCssConfigBuild.push({ call: 'rucksack', sort: 3 });
        break;

        case 'cssnext':
          this.postCssPlugins.push({
            key: 'next',
            req: 'postcss-cssnext',
            call: 'next({browsers: cfg.browsers})',
            sort: 4
          });
          // this.postCssConfigDev.push({ call: 'next({browsers: cfg.browsers})', sort: 4 });
          // this.postCssConfigBuild.push({ call: 'next({browsers: cfg.browsers})', sort: 4 });
        break;

        case 'cssgrace':
          this.postCssPlugins.push({
              key: 'grace',
              req: 'cssgrace',
              call: 'grace',
              sort: 5
            });
          // this.postCssConfigDev.push({ call: 'grace', sort: 5 });
          // this.postCssConfigBuild.push({ call: 'grace', sort: 5 });
        break;

        case 'classprefix':
          this.postCssPlugins.push({
              key: 'classPrfx',
              req: 'postcss-class-prefix',
              call: 'classPrfx(cfg.prefix)',
              sort: 6
            });
          // this.postCssConfigDev.push({ call: 'classPrfx(cfg.prefix)', sort: 6 });
          // this.postCssConfigBuild.push({ call: 'classPrfx(cfg.prefix)', sort: 6 });
        break;

        case 'scopify':
          this.postCssPlugins.push({
              key: 'scopify',
              req: 'postcss-scopify',
              call: 'scopify(cfg.scope)',
              sort: 7
            });
          // this.postCssConfigDev.push({ call: 'scopify(cfg.scope)', sort: 7 });
          // this.postCssConfigBuild.push({ call: 'scopify(cfg.scope)', sort: 7 });
        break;

        case 'csssorter':
          this.postCssPlugins.push({
              key: 'cssdeclsort',
              req: 'css-declaration-sorter',
              call: 'cssdeclsort({order: cfg.cssSortOrder})',
              sort: 8
            });
          // this.postCssConfigDev.push({ call: 'cssdeclsort({order: cfg.cssSortOrder})', sort: 8 });
          // this.postCssConfigBuild.push({ call: 'cssdeclsort({order: cfg.cssSortOrder})', sort: 8 });
        break;

        case 'mqkeyframes':
          this.postCssPlugins.push({
              key: 'mqKeyframes',
              req: 'postcss-mq-keyframes',
              call: 'mqKeyframes',
              sort: 9
            });
          // this.postCssConfigDev.push({ call: 'mqKeyframes', sort: 9 });
          // this.postCssConfigBuild.push({ call: 'mqKeyframes', sort: 9 });
        break;

        case 'mqpacker':
          this.postCssPlugins.push({
              key: 'mqPacker',
              req: 'css-mqpacker',
              call: 'mqPacker',
              sort: 10
            });
          // this.postCssConfigDev.push({ call: 'mqPacker', sort: 10 });
          // this.postCssConfigBuild.push({ call: 'mqPacker', sort: 10 });
        break;

        case 'autoprefixer':
          this.postCssPlugins.push({
              key: 'autoprefixer',
              req: 'autoprefixer',
              call: 'autoprefixer({browsers: cfg.browsers})',
              sort: 98
            });
          // this.postCssConfigDev.push({call: 'autoprefixer({browsers: cfg.browsers})', sort: 98 });
          // this.postCssConfigBuild.push({call: 'autoprefixer({browsers: cfg.browsers})', sort: 98 });
        break;

        case 'cssnano':
          this.postCssPlugins.push({
              key: 'cssnano',
              req: 'cssnano',
              call: 'cssnano({autoprefixer: false})',
              sort: 99,
              excludeDev: true
            });
          // this.postCssConfigBuild.push({ call: 'cssnano({autoprefixer: false})', sort: 99 });
        break;
      }
    }
    this.postCssPlugins = this.postCssPlugins.sort(function(a,b){return a.sort-b.sort});


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
    this.lostgridOption = hasFeature('lostgrid', postCssOption);



    // javascript
    this.javascriptOption = this.answers.javascriptOption;

    // Scripts
    var scriptsOption = this.answers.scriptsOption;
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
    var h5bpOption = this.answers.h5bpOption;
    this.htaccessOption = hasFeature('htaccess', h5bpOption);
    this.crossdomainOption = hasFeature('crossdomain', h5bpOption);
    this.browserconfigOption = hasFeature('browserconfig', h5bpOption);
    this.robotsOption = hasFeature('robots', h5bpOption);
    this.humansOption = hasFeature('humans', h5bpOption);


    // Font
    this.customIconfontOption = this.answers.customIconfontOption;
    this.customIconFontName = this.answers.customIconFontName;


    // Google Analytics
    this.analyticsOption = this.answers.analyticsOption;


    // Gulp
    this.gulpDirOption = this.answers.gulpDirOption;
    this.gulpCmdOption = this.answers.gulpCmdOption;

    // this.destRoot = this.destinationRoot();
    // this.sourceRoot = this.sourceRoot();
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

      postCssPlugins: this.postCssPlugins,
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
      lostgridOption: this.lostgridOption,



      // Javascript
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
