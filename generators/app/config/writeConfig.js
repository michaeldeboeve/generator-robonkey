'use strict';
var fs              = require('fs'),
    path            = require('path'),
    jsonfile        = require('jsonfile'),
    createJson      = require('../helpers/createJson'),
    hasFeature      = require('../helpers/hasFeature'),
    fileExists      = require('../helpers/fileExists');

var writeConfig = function (configFile, self){
  var configJson;

  if(fileExists(configFile, function(result){
    if ( result ){
      configJson = jsonfile.readFileSync(configFile);
      createConfig(self, configJson, function(configJson){
        createJson(configFile, configJson);
      });
    } else {
      configJson = {};
      createConfig(self, configJson, function(configJson){
        createJson(configFile, configJson);
      });
    }
  }));


  function createConfig(self, configJson, cb){

    configJson['projectURL'] = self.projectUrl;

    configJson['browsersync'] = {};


    if(self.environmentOption === 'static'){
      configJson['browsersync']['server'] = path.join(self.rootFolder, self.mainDir);
    }

    if(self.environmentOption === 'express'){
      configJson['browsersync']['proxy'] = 'http://localhost:3000';
      configJson['browsersync']['port'] = 4000;

      configJson['browsersync']['nodemon'] = {}
      configJson['browsersync']['nodemon']['script'] =  path.join(self.rootFolder, self.mainDir, 'bin/www');
      configJson['browsersync']['nodemon']['watch'] = [path.join(self.rootFolder, self.mainDir, 'app.js')];

    }

    if(self.postcssScopifyOption){
      configJson['scope'] = '#scope';
    }

    if(self.postcssClassprefixOption){
      configJson['prefix'] = 'prfx-';
    }

    configJson['styles'] = {}
    switch(self.preproOption){
      case 'scss':
        configJson['styles']['src'] = path.join(self.rootFolder, 'src/scss/style.scss');
        configJson['styles']['src_files'] = path.join(self.rootFolder, 'src/scss/**/*.scss');
      break;

      case 'stylus':
        configJson['styles']['src'] = path.join(self.rootFolder, 'src/stylus/style.styl');
        configJson['styles']['src_files'] = path.join(self.rootFolder, 'src/stylus/**/*.styl');
      break;

      case 'less':
        configJson['styles']['src'] = path.join(self.rootFolder, 'src/less/style.less');
        configJson['styles']['src_files'] = path.join(self.rootFolder, 'src/less/**/*.less');
      break;
    }
    configJson['styles']['build_srcsmap'] = path.join(self.rootFolder, self.templateDest, self.cssDirPath + '/');
    configJson['styles']['build'] = path.join(self.rootFolder, self.templateDest, self.cssDirPath + '/');
    configJson['styles']['src_lib'] = path.join(self.rootFolder, self.templateDest, self.cssDirPath, '**/*.css');
    configJson['styles']['build_lib'] = path.join(self.rootFolder, self.templateDest, self.cssDirPath + '/');

    if(self.postcssScopifyOption) configJson['scope'] = '#scope';
    if(self.postcssClassprefixOption) configJson['prefix'] = 'prfx-';
    if(self.postcssAutoprefixerOption || self.postcssCssNextOption) configJson['browsers'] = 'last 3 versions, > 1%';
    if(self.postcssCssSorterOption) configJson['cssSortOrder'] = 'smacss';
    configJson['postcss'] = {};
    configJson['postcss']['src'] = path.join(self.rootFolder, self.templateDest, self.cssDirPath + 'style.css');
    configJson['postcss']['build'] = path.join(self.rootFolder, self.templateDest, self.cssDirPath + '/');


    configJson['images'] = {};
    configJson['images']['src'] = path.join(self.rootFolder, 'src/img/**/*');
    configJson['images']['build'] = path.join(self.rootFolder, self.templateDest, self.imgDirPath + '/');

    if(self.environmentOption === 'static'){
      configJson['html'] = {};
      configJson['html']['src'] = path.join(self.rootFolder, self.templateDest, '**/*.html');
      configJson['html']['build'] = path.join(self.rootFolder, self.templateDest + '/');
    }

    if(self.templateOption === 'jade' && self.environmentOption === 'static'){
      configJson['jade'] = {};
      configJson['jade']['src'] = path.join(self.rootFolder, 'src/jade/*.jade');
      configJson['jade']['watch'] = path.join(self.rootFolder, 'src/jade/**/*.jade');
      configJson['jade']['build'] = path.join(self.rootFolder, self.templateDest + '/');
    }

    if(self.templateOption === 'pug' && self.environmentOption === 'static'){
      configJson['pug'] = {};
      configJson['pug']['src'] = path.join(self.rootFolder, 'src/pug/*.pug');
      configJson['pug']['watch'] = path.join(self.rootFolder, 'src/pug/**/*.pug');
      configJson['pug']['build'] = path.join(self.rootFolder, self.templateDest + '/');
    }


    if(self.templateOption === 'nunjucks' && self.environmentOption === 'static'){
      configJson['nunjucks'] = {};
      configJson['nunjucks']['src'] = path.join(self.rootFolder, 'src/nunjucks/pages/**/*.html');
      configJson['nunjucks']['watch'] = path.join(self.rootFolder, 'src/nunjucks/**/*.html');
      configJson['nunjucks']['templates'] = path.join(self.rootFolder, 'src/nunjucks/');
      configJson['nunjucks']['build'] = path.join(self.rootFolder, self.templateDest + '/');
    }

    if(!configJson['tasks']){
      configJson['tasks'] = {}
    }
    if(!configJson['tasks']['main']){
      configJson['tasks']['main'] = []
    }
    if(!configJson['tasks']['default']){
      configJson['tasks']['default'] = []
    }
    if(!configJson['tasks']['build']){
      configJson['tasks']['build'] = []
    }

    configJson['tasks']['main'] = ['images', 'scripts', 'styles'];
    configJson['tasks']['default'] = ['main', 'watch'];
    configJson['tasks']['build'] = ['main', 'scripts-build', 'styles-build', 'removeDevFiles'];

    if(self.environmentOption !== 'static'){
      if (!hasFeature('moveBower', configJson['tasks']['main'])){
        configJson['tasks']['main'].splice(0, 0, 'moveBower');
      }
    }

    if(self.environmentOption === 'static'){
      if (!hasFeature('html', configJson['tasks']['main'])){
        configJson['tasks']['main'].splice(0, 0, 'html');
      }

      if (!hasFeature('html-build', configJson['tasks']['build'])){
        configJson['tasks']['build'].splice(1, 0, 'html-build');
      }

    }

    if(self.environmentOption === 'static' || self.environmentOption === 'express'){
      if (!hasFeature('browser-sync', configJson['tasks']['default'])){
        configJson['tasks']['default'].splice(2, 0, 'browser-sync');
      }
    }

    if (self.modernizrOption && !hasFeature('modernizr', configJson['tasks']['build'])){
      configJson['tasks']['build'].splice(1, 0, 'modernizr');
    }

    if (self.customIconfontOption && !hasFeature('iconfont', configJson['tasks']['build'])){
      configJson['tasks']['build'].push('iconfont');
    }

    if (self.svgiconsOption && !hasFeature('svg', configJson['tasks']['build'])){
      configJson['tasks']['build'].push('svg');
    }


    if(self.modernizrOption){
      configJson['modernizr'] = {};
      configJson['modernizr']['output'] = 'modernizr-custom.js';
      configJson['modernizr']['build'] = path.join(self.rootFolder,self.templateDest, self.jsLibDirPath + '/');
      configJson['modernizr']['excludeTests'] = [];
      configJson['modernizr']['tests'] = [];
      configJson['modernizr']['options'] = ['setClasses', 'addTest', 'testProp', 'fnBind'];
    }


    configJson['scripts'] = {}
    configJson['scripts']['src'] = path.join(self.rootFolder, 'src/js/**/*.js');
    configJson['scripts']['build'] = path.join(self.rootFolder, self.templateDest, self.jsDirPath);
    configJson['scripts']['src_lib'] = path.join( self.rootFolder, self.templateDest, self.jsLibDirPath, '**/*.js');
    configJson['scripts']['build_lib'] = path.join(self.rootFolder, self.templateDest, self.jsLibDirPath + '/');

    switch(self.cfg.javascriptOption){
      case 'vanilla':
        configJson['scripts']['src'] = path.join(self.rootFolder, 'src/js/**/*.js');
      break;

      case 'coffee':
        configJson['scripts']['src'] = path.join(self.rootFolder, 'coffee/js/**/*.coffee');
      break;
    }

    if(self.customIconfontOption){
      configJson['iconFont'] = {};
      configJson['iconFont']['name'] = self.customIconfontName;
      configJson['iconFont']['types'] = ['ttf', 'eot', 'woff', 'woff2', 'svg'];
      configJson['iconFont']['src'] = path.join(self.rootFolder,'src/iconfont/svg/**/*.svg');
      configJson['iconFont']['build'] = path.join(self.rootFolder, self.templateDest, self.fontDirPath + '/');
      configJson['iconFont']['templateInput'] = '';
      configJson['iconFont']['templateOutput'] = '';
      configJson['iconFont']['templateFontpath'] = '../fonts/';

      switch(self.preproOption){
        case 'scss':
          configJson['iconFont']['templateInput'] = path.join(self.rootFolder, 'src/iconfont/template/_icons.scss');
          configJson['iconFont']['templateOutput'] = path.join(self.fontStyleOutputBase, 'src/scss/modules/_icons.scss');
        break;

        case 'stylus':
          configJson['iconFont']['templateInput'] = path.join(self.rootFolder, 'src/iconfont/template/icons.styl');
          configJson['iconFont']['templateOutput'] = path.join(self.fontStyleOutputBase, 'src/stylus/modules/icons.styl');
        break;

        case 'less':
          configJson['iconFont']['templateInput'] = path.join(self.rootFolder, 'src/iconfont/template/icons.less');
          configJson['iconFont']['templateOutput'] = path.join(self.fontStyleOutputBase, 'src/less/modules/icons.less');
        break;
      }
      
    }

    if(self.svgiconsOption){
      configJson['svgicons'] = {};
      configJson['svgicons']['spriteName'] = self.svgIconSpriteName;
      configJson['svgicons']['src'] = path.join(self.rootFolder,'src/icons', self.svgIconSpriteName, '**/*.svg');
      configJson['svgicons']['build'] = path.join(self.rootFolder, self.templateDest, self.imgDirPath + '/svg/');
    }


    cb(configJson);
  }

}

module.exports = writeConfig;
