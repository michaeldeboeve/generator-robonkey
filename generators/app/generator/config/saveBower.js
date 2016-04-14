/**
 * Save bowr.json and .bowerrc
 */

'use strict';

var mkdirp      = require('mkdirp'),
    fs          = require('fs'),
    util        = require('util'),
    jsonfile    = require('jsonfile'),
    createJson  = require('./../../helpers/createJson');

var saveBower = function saveBower() {
    var destRoot = this.destinationRoot(),
        sourceRoot = this.sourceRoot(),
        self = this;

    var bowerrcJson = {
        directory: bowerrcPath
      }

    var bowerJson = {
      name: this.projectNameJson,
      version: this.projectVersion,
      authors: [
        this.projectAuthor
      ],
      description: this.projectDescription,
      main: '',
      moduleType: [
        'globals'
      ],
      license: this.projectLicense,
      homepage: this.authorURI,
      ignore: [
        '**/.*',
        'node_modules',
        'bower_components',
        'test',
        'tests'
      ],
      dependencies: {}
    }

    if(this.html5shivOption) {
      bowerJson.dependencies['html5shiv'] = '^3.7.3'
    }

    if(this.jqueryOption) {
      bowerJson.dependencies['jquery'] = '^2.2.1'
    }

    if(this.zeptoOption) {
      bowerJson.dependencies['zepto'] = '^1.1.6'
    }

    if(this.waypointsOption) {
      bowerJson.dependencies['waypoints'] = '^4.0.0'
    }

    if(this.enquireOption) {
      bowerJson.dependencies['enquire'] = '^2.1.2'
    }

    if(this.tweenmaxOption) {
      bowerJson.dependencies['gsap'] = '^1.18.2'
    }

    if(this.signalsOption) {
      bowerJson.dependencies['js-signals'] = 'signals#^1.0.0'
    }

    if(this.dthreejsOption) {
      bowerJson.dependencies['d3'] = '^3.5.16'
    }

    if(this.requireOption) {
      bowerJson.dependencies['requirejs'] = '^2.2.0'
    }

    if(this.angularOption) {
      bowerJson.dependencies['angular'] = '^1.5.3'
    }

    if(this.reactOption) {
      bowerJson.dependencies['react'] = '^0.14.8'
    }

    if(this.backboneOption) {
      bowerJson.dependencies['backbone'] = '^1.3.2'
    }

    if(this.underscoreOption) {
      bowerJson.dependencies['underscore'] = '^1.8.3'
    }

    if(this.scrollrevealOption) {
      bowerJson.dependencies['scrollreveal'] = '^3.1.4'
    }


    if (this.gulpDirOption) {
      mkdirp(destRoot + '/gulp');
      var bowerFile = './gulp/bower.json';
      var bowerrcFile = './gulp/.bowerrc';
      var bowerrcPath = '../src/bower_components';
    } else {
      var bowerFile = './bower.json';
      var bowerrcFile = './.bowerrc';
      var bowerrcPath = 'src/bower_components';
    }

    createJson(bowerFile, bowerJson);
    createJson(bowerrcFile, bowerrcJson);
    console.log('writing ' + bowerFile);
    console.log('writing ' + bowerrcFile);

};

module.exports = saveBower;
