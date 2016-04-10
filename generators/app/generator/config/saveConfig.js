/**
 * Save bowr.json and .bowerrc
 */

'use strict';

var mkdirp      = require('mkdirp'),
    fs          = require('fs'),
    util        = require('util'),
    jsonfile    = require('jsonfile'),
    createJson  = require('./../../helpers/createJson');

var saveConfig = function saveConfig() {
    var destRoot = this.destinationRoot(),
        sourceRoot = this.sourceRoot(),
        self = this;

    if (this.gulpDirOption) {
      var configFile = './gulp/config.json';
    } else {
      var configFile = './config.json';
    }


    var configJson = {}

    configJson['projectURL'] = this.projectUrl;

    if(this.postcssScopifyOption) {
      configJson['scope'] = '#scope';
    }

    if(this.postcssClassprefixOption) {
      configJson['prefix'] = 'prfx-';
    }

    if(this.modernizrOption) {
      configJson['modernizr'] = {};
      configJson['modernizr']['output'] = 'modernizr-custom.js';
      configJson['modernizr']['build'] = this.rootFolder + this.templateDest + this.jsLibDirPathGulp;
      configJson['modernizr']['excludeTests'] = [];
      configJson['modernizr']['tests'] = [];
      configJson['modernizr']['options'] = ['setClasses', 'addTest', 'testProp', 'fnBind'];
    }

    if(this.postcssAutoprefixerOption || this.postcssCssNextOption) {
      configJson['browsers'] = 'last 3 versions, > 1%';
    }

    if(this.postcssCssSorterOption) {
      configJson['cssSortOrder'] = 'smacss';
    }



    configJson['scripts'] = {}
    configJson['scripts']['src'] = ''
    configJson['scripts']['build'] = this.rootFolder + this.templateDest + this.jsDirPathGulp;
    configJson['scripts']['src_lib'] = this.rootFolder + this.templateDest + this.jsLibDirPathGulp + '/**/*.js';
    configJson['scripts']['build_lib'] = this.rootFolder + this.templateDest + this.jsLibDirPathGulp + '/';

    switch(this.javascriptOption) {
      case 'vanilla':
        configJson['scripts']['src'] = this.rootFolder + 'src/js/**/*.js';
      break;

      case 'coffee':
        configJson['scripts']['src'] = this.rootFolder + 'coffee/js/**/*.coffee';
      break;
    }



    configJson['images'] = {};
    configJson['images']['src'] = this.rootFolder + 'src/img/**/*';
    configJson['images']['build'] = this.rootFolder + this.templateDest + this.imgDirPathGulp;



    configJson['styles'] = {}
    configJson['styles']['src'] = '';
    configJson['styles']['src_files'] = '';
    configJson['styles']['build_srcsmap'] = this.rootFolder + this.templateDest + this.cssDirPathGulp + '/';
    configJson['styles']['build'] = this.rootFolder + this.templateDest + this.cssDirPathGulp + '/';
    configJson['styles']['src_lib'] = this.rootFolder + this.templateDest + this.cssDirPathGulp + '/**/*.css';
    configJson['styles']['build_lib'] = this.rootFolder + this.templateDest + this.cssDirPathGulp + '/';

    switch(this.preproOption) {
      case 'sass':
        configJson['styles']['src'] = this.rootFolder + 'src/scss/style.scss';
        configJson['styles']['src_files'] = this.rootFolder + 'src/scss/**/*.scss';
      break;

      case 'stylus':
        configJson['styles']['src'] = this.rootFolder + 'src/stylus/style.styl';
        configJson['styles']['src_files'] = this.rootFolder + 'src/stylus/**/*.styl';
      break;

      case 'less':
        configJson['styles']['src'] = this.rootFolder + 'src/less/style.less';
        configJson['styles']['src_files'] = this.rootFolder + 'src/less/**/*.less';
      break;
    }



    if(this.environmentOption === 'static') {
      configJson['html'] = {};
      configJson['html']['src'] = this.rootFolder + this.templateDest + '/**/*.html';
      configJson['html']['build'] = this.rootFolder + this.templateDest + '/';
    }

    if(this.templateOption === 'jade' && this.environmentOption === 'static') {
      configJson['jade'] = {};
      configJson['jade']['src'] = this.rootFolder + 'src/jade/*.jade';
      configJson['jade']['watch'] = this.rootFolder + 'src/jade/**/*.jade';
      configJson['jade']['build'] = this.rootFolder + this.templateDest + '/';
    }

    if(this.templateOption === 'haml' && this.environmentOption === 'static') {
      configJson['haml'] = {};
      configJson['haml']['src'] = this.rootFolder + 'src/haml/*.haml';
      configJson['haml']['watch'] = this.rootFolder + 'src/haml/**/*.haml';
      configJson['haml']['build'] = this.rootFolder + this.templateDest + '/';
    }

    if(this.templateOption === 'handlebars' && this.environmentOption === 'static') {
      configJson['handlebars'] = {};
      configJson['handlebars']['src'] = this.rootFolder + 'src/handlebars/*.html';
      configJson['handlebars']['watch'] = this.rootFolder + 'src/handlebars/**/*.html';
      configJson['handlebars']['watchdata'] = this.rootFolder + 'src/handlebars/**/*.json';
      configJson['handlebars']['partials'] = this.rootFolder + 'src/handlebars/partials';
      configJson['handlebars']['build'] = this.rootFolder + this.templateDest + '/';
    }

    if(this.templateOption === 'nunjucks' && this.environmentOption === 'static') {
      configJson['nunjucks'] = {};
      configJson['nunjucks']['src'] = this.rootFolder + 'src/nunjucks/pages/**/*.html';
      configJson['nunjucks']['watch'] = this.rootFolder + 'src/nunjucks/**/*.html';
      configJson['nunjucks']['templates'] = this.rootFolder + 'src/nunjucks/';
      configJson['nunjucks']['build'] = this.rootFolder + this.templateDest + '/';
    }



    configJson['postcss'] = {};
    configJson['postcss']['src'] = this.rootFolder + this.templateDest + this.cssDirPathGulp + '/style.css';
    configJson['postcss']['build'] = this.rootFolder + this.templateDest + this.cssDirPathGulp + '/';


    if(this.customIconfontOption) {
      configJson['iconFont'] = {};
      configJson['iconFont']['name'] = this.customIconFontName;
      configJson['iconFont']['types'] = ['ttf', 'eot', 'woff', 'woff2', 'svg'];

      configJson['font'] = {};
      configJson['font']['src'] = this.rootFolder + 'src/iconfont/svg/*.svg';
      configJson['font']['build'] = this.rootFolder + this.templateDest + this.fontDirPath + '/';
      configJson['font']['templateInput'] = '';
      configJson['font']['templateOutput'] = '';
      configJson['font']['templateFontpath'] = '../fonts/';

      switch(this.preproOption) {
        case 'sass':
          configJson['font']['templateInput'] = this.rootFolder + 'src/iconfont/template/_icons.scss';
          configJson['font']['templateOutput'] = this.fontStyleOutputBase + 'src/scss/modules/_icons.scss';
        break;

        case 'stylus':
          configJson['font']['templateInput'] = this.rootFolder + 'src/iconfont/template/icons.styl';
          configJson['font']['templateOutput'] = this.fontStyleOutputBase + 'src/stylus/modules/icons.styl';
        break;

        case 'less':
          configJson['font']['templateInput'] = this.rootFolder + 'src/iconfont/template/icons.less';
          configJson['font']['templateOutput'] = this.fontStyleOutputBase + 'src/less/modules/icons.less';
        break;
      }
    }

    fs.stat(configFile, function(err, stat) {
      if(err == null) {
        createJson(configFile, configJson);
      } else {
        if (self.gulpDirOption) {
          mkdirp(destRoot + '/gulp');
        }
        createJson(configFile, configJson);
      }
    });


};

module.exports = saveConfig;
