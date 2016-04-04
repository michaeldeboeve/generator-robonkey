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
        this.answers = this.config.get('config');
    } else {
        this.answers = _.merge(
        // this.defaultPrompt,
        this.projectPrompt,
        this.environmentPrompt,
        this.environmentCheckPrompt,
        this.foldersPrompt,
        this.htmlPrompt,
        this.cssPrompt,
        this.cssBasePrompt,
        this.cssPostPrompt,
        this.scriptsPrompt,
        this.h5bpPrompt,
        this.fontPrompt,
        this.gaPrompt,
        this.gulpPrompt);
    }

    // Assign each answer property to `this` context to give the generator access to it

    // Defaults
    this.defaultOption = this.answers.defaultPrompt;
    this.skipInstall = this.answers.skipInstall;

    // Project
    this.projectUrl = this.answers.projectUrl;
    this.projectName = this.answers.projectName;
    this.projectDescription = this.answers.projectDescription;
    this.projectVersion = this.answers.projectVersion;
    this.projectAuthor = this.answers.projectAuthor;
    this.authorEmail = this.answers.authorEmail;
    this.projectLicense = 'MIT';


    //Environment
    if (this.environmentInstalled) {
      this.environmentOption = this.environmentInstalled;
    } else {
      this.environmentOption = this.answers.environmentOption;
    }

    console.log(this.environmentOption);

    this.themeName = this.answers.themeName;
    if(this.themeName) {
      this.themeFolder = this.themeName.replace(/\s/g,'').toLowerCase();
    } else {
      this.themeFolder = this.themeName;
    }
    this.customStyle = this.answers.customStyle;


    // Folders
    if(this.answers.defaultDirs) {
      switch (this.environmentOption) {

        case 'express':
          this.mainDir = 'app';
          this.assetsDir = 'public';
          this.cssDir = 'stylesheets';
          this.jsDir = 'javascripts';
          this.imgDir = 'images';
          this.libDir = 'lib';
          this.fontDir = 'fonts';
        break;

        case 'codeigniter':
          this.mainDir = 'website';
          this.assetsDir = 'public';
          this.cssDir = 'css';
          this.jsDir = 'js';
          this.imgDir = 'img';
          this.libDir = 'lib';
          this.fontDir = 'fonts';
        break;

        case 'laravel':
          this.mainDir = 'website';
          this.assetsDir = 'public';
          this.cssDir = 'css';
          this.jsDir = 'js';
          this.imgDir = 'img';
          this.libDir = 'lib';
          this.fontDir = 'fonts';
        break;

        default:
          this.mainDir = 'website';
          this.assetsDir = 'assets';
          this.cssDir = 'css';
          this.jsDir = 'js';
          this.imgDir = 'img';
          this.libDir = 'lib';
          this.fontDir = 'fonts';

      }
    } else {
      this.mainDir = this.answers.mainDir;
      this.assetsDir = this.answers.assetsDir;
      this.cssDir = this.answers.cssDir;
      this.jsDir = this.answers.jsDir;
      this.imgDir = this.answers.imgDir;
      this.libDir = this.answers.libDir;
      this.fontDir = this.answers.fontDir;
    }


    // BrowserSync
    switch (this.environmentOption) {

      case 'express':
        this.browsersyncOption = true;
      break;

      case 'static':
        this.browsersyncOption = true;
      break;

      default:
        this.browsersyncOption = false;

    }

    // Themes Location
    switch (this.environmentOption){
       case 'wordpress': this.templateDest = '/' + this.mainDir + '/wp-content/themes/' + this.themeFolder;
       break;

       case 'drupal': this.templateDest = '/' + this.mainDir + '/themes/' + this.themeFolder;
       break;

       break;

       default: this.templateDest = '/' + this.mainDir;
    };


    // Folders Locations
    this.assetsDirPath = this.templateDest + '/' + this.assetsDir;
    this.cssDirPath = '/' + this.assetsDir + '/' + this.cssDir;
    this.jsDirPath = '/' + this.assetsDir + '/' + this.jsDir;
    this.imgDirPath = '/' + this.assetsDir + '/' + this.imgDir;
    this.fontDirPath = '/' + this.assetsDir + '/' + this.fontDir;
    this.cssLibDirPath = this.cssDirPath + '/' + this.libDir;
    this.jsLibDirPath = this.jsDirPath + '/' + this.libDir;


    //Html
    this.templateOption = this.answers.templateOption;


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


    // Scripts
    var scriptsOption = this.answers.scriptsOption;
    this.jqueryOption = hasFeature('jquery', scriptsOption);
    this.waypointsOption = hasFeature('waypoints', scriptsOption);
    this.signalsOption = hasFeature('signals', scriptsOption);
    this.d3jsOption = hasFeature('D3js', scriptsOption);
    this.tweenmaxOption = hasFeature('tweenmax', scriptsOption);
    this.enquireOption = hasFeature('enquire', scriptsOption);
    this.requireOption = hasFeature('require', scriptsOption);
    this.modernizrOption = hasFeature('modernizr', scriptsOption);
    this.angularOption = hasFeature('angular', scriptsOption);
    this.reactOption = hasFeature('react', scriptsOption);
    this.backboneOption = hasFeature('backbone', scriptsOption);
    this.underscoreOption = hasFeature('underscore', scriptsOption);


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
      angularOption: this.angularOption,
      reactOption: this.reactOption,
      backboneOption: this.backboneOption,
      underscoreOption: this.underscoreOption,

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
