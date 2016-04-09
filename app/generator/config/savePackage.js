/**
 * Save bowr.json and .bowerrc
 */

'use strict';

var mkdirp      = require('mkdirp'),
    fs          = require('fs'),
    util        = require('util'),
    jsonfile    = require('jsonfile'),
    createJson  = require('./../../helpers/createJson');

var savePackage = function savePackage() {
    var self = this;

    if (this.gulpDirOption) {
      var packageFile = './gulp/package.json';
    } else {
      var packageFile = './package.json';
    }

    var packageJson = {
      name: this.projectNameJson,
      version: this.projectVersion,
      description: this.projectDescription,
      license: this.projectLicense,
      authors: [
        this.projectAuthor
      ],
      homepage: this.authorURI,
      repository: {
        type: 'git',
        url: 'https://github.com/michaeldeboeve/generator-robonkey'
      },
      main: 'gulpfile.js',
      dependencies: {},
      devDependencies: {}
    }


    packageJson.dependencies['browser-sync'] = '^2.11.1';
    packageJson.dependencies['gulp'] = '^3.9.1';
    packageJson.dependencies['gulp-plumber'] = '^1.1.0';
    packageJson.dependencies['gulp-changed'] = '^1.3.0';
    packageJson.dependencies['gulp-watch'] = '^4.3.5';
    packageJson.dependencies['gulp-concat'] = '^2.6.0';
    packageJson.dependencies['gulp-uglify'] = '^1.5.3';
    packageJson.dependencies['gulp-clean'] = '^0.3.2';
    packageJson.dependencies['gulp-rename'] = '^1.2.2';
    packageJson.dependencies['gulp-html-replace'] = '^1.5.5';
    packageJson.dependencies['gulp-imagemin'] = '^2.4.0';
    packageJson.dependencies['gulp-sourcemaps'] = '^1.6.0';
    packageJson.dependencies['gulp-prettify'] = '^0.4.0';
    packageJson.dependencies['require-dir'] = '^0.3.0';
    packageJson.dependencies['superlatief-colors'] = '*';

    if(this.preproOption !== 'less' && this.mixinOption === 'default') {
      packageJson.dependencies['superlatief-mixins'] = '*';
    }

    if(this.mqOption === 'default') {
      packageJson.dependencies['superlatief-mediaqueries'] = '*';
    }

    if(this.environmentOption === 'express') {
      packageJson.dependencies['gulp-nodemon'] = '^2.0.6';
    }

    if(this.preproOption === 'sass') {
      packageJson.dependencies['gulp-sass'] = '^2.2.0';
      packageJson.dependencies['gulp-sass-glob'] = '^1.0.4';
    }

    if(this.gridOption === 'gridle' || this.gridOption === 'gridleFlex') {
      packageJson.dependencies['gridle'] = '^2.0.44';
    }

    if(this.mqOption === 'breakpoint') {
      packageJson.dependencies['breakpoint-sass'] = '^2.7.0';
    }

    if(this.gridOption === 'susy') {
      packageJson.dependencies['susy'] = '^2.2.12';
    }

    if(this.mixinOption === 'bourbon' || this.gridOption === 'neat') {
      packageJson.dependencies['node-bourbon'] = '^4.2.3';
    }

    if(this.gridOption === 'neat') {
      packageJson.dependencies['node-neat'] = '^1.7.2';
    }

    if(this.gridOption === 'includemedia') {
      packageJson.dependencies['include-media'] = '^1.4.2';
    }

    if(this.mixinOption === 'compassmixins') {
      packageJson.dependencies['compass-mixins'] = '^0.12.7';
    }

    if(this.preproOption === 'less') {
      packageJson.dependencies['gulp-less'] = '^3.0.5';
      packageJson.dependencies['less-plugin-glob'] = '^1.1.1';
      packageJson.dependencies['less-plugin-clean-css'] = '^1.5.1';
    }

    if(this.gridOption === 'gee') {
      packageJson.dependencies['gee.less'] = '^3.0.0';
    }

    if(this.preproOption === 'stylus') {
      packageJson.dependencies['gulp-stylus'] = '^2.3.1';
    }

    if(this.mixinOption === 'koutoswiss') {
      packageJson.dependencies['kouto-swiss'] = '^0.11.14';
    }

    if(this.mqOption === 'rupture') {
      packageJson.dependencies['rupture'] = '^0.6.1';
    }

    if(this.mixinOption === 'nib') {
      packageJson.dependencies['nib'] = '^1.1.0';
    }

    if(this.gridOption === 'sgrid') {
      packageJson.dependencies['s-grid'] = '^1.1.2';
    }

    if(this.templateOption === 'jade') {
      packageJson.dependencies['gulp-jade'] = '^1.1.0';
    }

    if(this.templateOption === 'haml') {
      packageJson.dependencies['gulp-haml'] = '^0.1.6';
    }

    if(this.templateOption === 'handlebars') {
      packageJson.dependencies['gulp-handlebars-html'] = '0.0.2';
      packageJson.dependencies['handlebars'] = '^4.0.5';
    }

    if(this.templateOption === 'nunjucks') {
      packageJson.dependencies['gulp-nunjucks-render'] = '^2.0.0';
    }

    if(this.customIconfontOption) {
      packageJson.dependencies['gulp-iconfont'] = '^6.0.0';
      packageJson.dependencies['gulp-iconfont-css'] = '^2.0.0';
    }

    if(this.modernizrOption) {
      packageJson.dependencies['gulp-modernizr'] = '^1.0.0-alpha';
    }

    if(this.postCssOption) {
      packageJson.dependencies['gulp-postcss'] = '^6.1.0';
    }

    if(this.lostgridOption) {
      packageJson.dependencies['lost'] = '^6.7.2';
    }

    if(this.autoprefixerOption) {
      packageJson.dependencies['autoprefixer'] = '^6.3.3';
    }

    if(this.mqpackerOption) {
      packageJson.dependencies['css-mqpacker'] = '^4.0.0';
    }

    if(this.cssnanoOption) {
      packageJson.dependencies['cssnano'] = '^3.5.2';
    }

    if(this.classprefixOption) {
      packageJson.dependencies['postcss-class-prefix'] = '^0.3.0';
    }

    if(this.gradientfixOption) {
      packageJson.dependencies['postcss-gradient-transparency-fix'] = '^1.0.1';
    }

    if(this.scopifyOption) {
      packageJson.dependencies['postcss-scopify'] = '^0.1.6';
    }

    if(this.mqkeyframesOption) {
      packageJson.dependencies['postcss-mq-keyframes'] = '^0.2.5';
    }

    if(this.csssorterOption) {
      packageJson.dependencies['css-declaration-sorter'] = '^1.2.1';
    }

    if(this.cssgraceOption) {
      packageJson.dependencies['cssgrace'] = '^3.0.0';
    }

    if(this.cssnextOption) {
      packageJson.dependencies['postcss-cssnext'] = '^2.5.1';
    }

    if(this.rucksackOption) {
      packageJson.dependencies['rucksack-css'] = '^0.8.5';
    }

    if(this.javascriptOption === 'coffee') {
      packageJson.dependencies['gulp-coffee'] = '^2.3.2';
    }


    createJson(packageFile, packageJson);

};

module.exports = savePackage;
