'use strict';
var fs              = require('fs'),
    path            = require('path'),
    chalk           = require('chalk'),
    mkdirp          = require('mkdirp'),
    jsonfile        = require('jsonfile'),
    jsonfile        = require('jsonfile'),
    createJson      = require('../helpers/createJson'),
    fileExists      = require('../helpers/fileExists');

var writePackage = function (packageFile, self) {

  var packageJson;

  if(fileExists(packageFile, function(result){
    if(result){
      packageJson = jsonfile.readFileSync(packageFile);
      packageDependencies(self, packageJson, function(packageJson){
        createDependencies(self, packageJson, function(packageJson){
          createJson(packageFile, packageJson);
        });
      })
    } else {
      packageDefaults(self, packageJson, function(packageJson){
        packageDependencies(self, packageJson, function(packageJson){
          createDependencies(self, packageJson, function(packageJson){
            createJson(packageFile, packageJson);
          });
        })
      });
    }
  }));


  function packageDefaults(self, packageJson, cb) {
    packageJson = {};
    packageJson['name'] = self.projectName;
    packageJson['version'] = self.projectVersion;
    packageJson['description'] = self.projectDescription;
    packageJson['license'] = self.projectLicense;
    packageJson['authors'] = self.projectAuthor;
    packageJson['homepage'] = self.authorURI;
    packageJson['repository'] = '';
    packageJson['main'] = 'gulpfile.js';
    packageJson['devDependencies'] = {};
    packageJson['dependencies'] = {};

    cb(packageJson);
  }


  function packageDependencies(self, packageJson, cb) {
    packageJson['devDependencies']['browser-sync'] = '^2.11.1';
    if(self.gulpTypeOption === 'coffee') packageJson['devDependencies']['coffee-script'] = '^1.10.0';
    packageJson['devDependencies']['gulp'] = '^3.9.1';
    packageJson['devDependencies']['gulp-plumber'] = '^1.1.0';
    packageJson['devDependencies']['gulp-changed'] = '^1.3.0';
    packageJson['devDependencies']['gulp-watch'] = '^4.3.5';
    packageJson['devDependencies']['gulp-concat'] = '^2.6.0';
    packageJson['devDependencies']['gulp-uglify'] = '^1.5.3';
    packageJson['devDependencies']['gulp-util'] = '^3.0.7';
    packageJson['devDependencies']['gulp-clean'] = '^0.3.2';
    packageJson['devDependencies']['gulp-rename'] = '^1.2.2';
    packageJson['devDependencies']['gulp-html-replace'] = '^1.5.5';
    packageJson['devDependencies']['gulp-imagemin'] = '^2.4.0';
    packageJson['devDependencies']['gulp-sourcemaps'] = '^1.6.0';
    packageJson['devDependencies']['gulp-prettify'] = '^0.4.0';
    packageJson['devDependencies']['gulp-notify'] = '^2.0.0';
    packageJson['devDependencies']['gulp-flatten'] = '^0.2.0';
    packageJson['devDependencies']['require-dir'] = '^0.3.0';
    packageJson['devDependencies']['main-bower-files'] = '^2.11.1';

    cb(packageJson);
  }


  function createDependencies(self, packageJson, cb){

// Superlatief
    if(self.preproOption === 'scss' || self.preproOption === 'stylus' || self.preproOption === 'less') {
      packageJson['dependencies']['superlatief-colors'] = '*';
    }

    if(self.preproOption !== 'less' && self.mixinOption === 'default') {
      packageJson['dependencies']['superlatief-mixins'] = '*';
    }

    if(self.mqOption === 'default') {
      packageJson['dependencies']['superlatief-mediaqueries'] = '*';
    }


// Express
    if(self.environmentOption === 'express') {
      packageJson['dependencies']['gulp-nodemon'] = '^2.0.6';
    }


// Sass
    if(self.preproOption === 'scss') {
      packageJson['dependencies']['gulp-sass'] = '^2.2.0';
      packageJson['dependencies']['gulp-sass-glob'] = '^1.0.4';
    }

    if(self.gridOption === 'gridle' || self.gridOption === 'gridleFlex') {
      packageJson['dependencies']['gridle'] = '^2.0.44';
    }

    if(self.mqOption === 'breakpoint') {
      packageJson['dependencies']['breakpoint-sass'] = '^2.7.0';
    }

    if(self.gridOption === 'susy') {
      packageJson['dependencies']['susy'] = '^2.2.12';
    }

    if(self.mixinOption === 'bourbon' || self.gridOption === 'neat') {
      packageJson['dependencies']['node-bourbon'] = '^4.2.3';
    }

    if(self.gridOption === 'neat') {
      packageJson['dependencies']['node-neat'] = '^1.7.2';
    }

    if(self.gridOption === 'includemedia') {
      packageJson['dependencies']['include-media'] = '^1.4.2';
    }

    if(self.mixinOption === 'compassmixins') {
      packageJson['dependencies']['compass-mixins'] = '^0.12.7';
    }


// Less
    if(self.preproOption === 'less') {
      packageJson['dependencies']['gulp-less'] = '^3.0.5';
      packageJson['dependencies']['less-plugin-glob'] = '^1.1.1';
      packageJson['dependencies']['less-plugin-clean-css'] = '^1.5.1';
    }

    if(self.gridOption === 'gee') {
      packageJson['dependencies']['gee.less'] = '^3.0.0';
    }


// Stylus
    if(self.preproOption === 'stylus') {
      packageJson['dependencies']['gulp-stylus'] = '^2.3.1';
    }

    if(self.mixinOption === 'koutoswiss') {
      packageJson['dependencies']['kouto-swiss'] = '^0.11.14';
    }

    if(self.mqOption === 'rupture') {
      packageJson['dependencies']['rupture'] = '^0.6.1';
    }

    if(self.mixinOption === 'nib') {
      packageJson['dependencies']['nib'] = '^1.1.0';
    }

    if(self.gridOption === 'sgrid') {
      packageJson['dependencies']['s-grid'] = '^1.1.2';
    }


// Html
    if(self.templateOption === 'jade') {
      packageJson['dependencies']['gulp-jade'] = '^1.1.0';
    }

    if(self.templateOption === 'haml') {
      packageJson['dependencies']['gulp-haml'] = '^0.1.6';
    }

    if(self.templateOption === 'handlebars') {
      packageJson['dependencies']['gulp-handlebars-html'] = '0.0.2';
      packageJson['dependencies']['handlebars'] = '^4.0.5';
    }

    if(self.templateOption === 'nunjucks') {
      packageJson['dependencies']['gulp-nunjucks-render'] = '^2.0.0';
    }

    if(self.customIconfontOption) {
      packageJson['dependencies']['gulp-iconfont'] = '^6.0.0';
      packageJson['dependencies']['gulp-iconfont-css'] = '^2.0.0';
    }

    if(self.modernizrOption) {
      packageJson['dependencies']['gulp-modernizr'] = '^1.0.0-alpha';
    }

    if(self.javascriptOption === 'coffee') {
      packageJson['dependencies']['gulp-coffee'] = '^2.3.2';
    }



// Post Css
    if(self.postcssOption) {
      packageJson['dependencies']['gulp-postcss'] = '^6.1.0';
    }

    if(self.postcssStylelint) {
      packageJson['devDependencies']['stylelint'] = '^6.1.1';
    }

    if(self.postcssAutoprefixerOption) {
      packageJson['dependencies']['autoprefixer'] = '^6.3.3';
    }

    if(self.postcssMqpackerOption) {
      packageJson['dependencies']['css-mqpacker'] = '^4.0.0';
    }

    if(self.postcssCssNanoOption) {
      packageJson['dependencies']['cssnano'] = '^3.5.2';
    }

    if(self.postcssClassprefixOption) {
      packageJson['dependencies']['postcss-class-prefix'] = '^0.3.0';
    }

    if(self.postcssGradientfixOption) {
      packageJson['dependencies']['postcss-gradient-transparency-fix'] = '^1.0.1';
    }

    if(self.postcssScopifyOption) {
      packageJson['dependencies']['postcss-scopify'] = '^0.1.6';
    }

    if(self.postcssMqkeyframesOption) {
      packageJson['dependencies']['postcss-mq-keyframes'] = '^0.2.5';
    }

    if(self.postcssCssSorterOption) {
      packageJson['dependencies']['css-declaration-sorter'] = '^1.2.1';
    }

    if(self.postcssCssGraceOption) {
      packageJson['dependencies']['cssgrace'] = '^3.0.0';
    }

    if(self.postcssCssNextOption) {
      packageJson['dependencies']['postcss-cssnext'] = '^2.5.1';
    }

    if(self.postcssRucksackOption) {
      packageJson['dependencies']['rucksack-css'] = '^0.8.5';
    }



// Pre Css
    if(self.precssOption === 'precss') {
      packageJson['dependencies']['precss'] = '^1.4.0';
    }



// Custom Pre Css
    if(self.postcssSugarssOption) {
      packageJson['dependencies']['sugarss'] = '^0.1.3';
    }

    if(self.postcssAdvancedVarsOption) {
      packageJson['dependencies']['postcss-advanced-variables'] = '^1.2.2';
    }

    if(self.postcssExtendOption) {
      packageJson['dependencies']['postcss-extend'] = '^1.0.1';
    }

    if(self.postcssNestedOption) {
      packageJson['dependencies']['postcss-nested'] = '^1.0.0';
      packageJson['dependencies']['postcss-nesting'] = '^2.0.6';
    }

    if(self.postcssDefinePropertyOption) {
      packageJson['dependencies']['postcss-define-property'] = '^0.3.1';
    }

    if(self.postcssColorOption) {
      packageJson['dependencies']['postcss-color-function'] = '^2.0.1';
    }

    if(self.postcssImportOption) {
      packageJson['dependencies']['postcss-partial-import'] = '^1.3.0';
    }

    if(self.postcssModulesOption) {
      packageJson['dependencies']['postcss-modules-values'] = '^8.1.0';
    }

    if(self.postcssCustommediaOption) {
      packageJson['dependencies']['postcss-custom-media'] = '^5.0.0';
    }

    if(self.postcssCustompropertiesOption) {
      packageJson['dependencies']['postcss-custom-properties'] = '^5.0.0';
    }

    if(self.postcssCustomselectorsOption) {
      packageJson['dependencies']['postcss-custom-selectors'] = '^3.0.0';
    }

    if(self.postcssAtrootOption) {
      packageJson['dependencies']['postcss-atroot'] = '^0.1.2';
    }

    if(self.postcssSelectormatchesOption) {
      packageJson['dependencies']['postcss-selector-matches'] = '^2.0.0';
    }

    if(self.postcssSelectornotOption) {
      packageJson['dependencies']['postcss-selector-not'] = '^2.0.0';
    }


// Custom Pre Css Mixins
    if(self.postcssMixinsOption) {
      packageJson['dependencies']['postcss-mixins'] = '^4.0.1';
    }

    if(self.postcssSassyMixinsOption) {
      packageJson['dependencies']['postcss-sassy-mixins'] = '^2.0.0';
    }

// Custom Pre Css Grid
    if(self.postcssLostGridOption) {
      packageJson['dependencies']['lost'] = '^6.7.2';
    }

    if(self.postcssGridOption) {
      packageJson['dependencies']['postcss-grid'] = '^2.0.0';
    }

    if(self.postcssNeatOption) {
      packageJson['dependencies']['postcss-neat'] = '^2.5.2';
    }

// Custom Pre Css Extras
    if(self.postcssShortOption) {
      packageJson['dependencies']['postcss-short'] = '^1.4.0';
    }

    if(self.postcssPropertylookupOption) {
      packageJson['dependencies']['postcss-property-lookup'] = '^1.1.3';
    }

    if(self.postcssQuantityQueriesOption) {
      packageJson['dependencies']['postcss-quantity-queries'] = '^0.4.0';
    }

    if(self.postcssMediaMinmaxOption) {
      packageJson['dependencies']['postcss-media-minmax'] = '^2.1.2';
    }

    // if(self.postcssModernizrOption) {
    //   packageJson['dependencies']['css2modernizr'] = '^0.1.0';
    // }





    cb(packageJson);
  }

}

module.exports = writePackage;
