'use strict';
var fs              = require('fs'),
    jsonfile        = require('jsonfile'),
    mkdirp          = require('mkdirp'),
    createJson      = require('../helpers/createJson'),
    hasFeature      = require('../helpers/hasFeature'),
    fileExists      = require('../helpers/fileExists');

var writeBower = function (self, cb) {

  var bowerFile = './bower.json',
      bowerrcFile = './.bowerrc',
      bowerrcPath = 'src/bower_components',
      destRoot = self.destinationRoot();

  if (self.gulpDirOption) {
    mkdirp(destRoot + '/gulp');
    var bowerFile = './gulp/bower.json';
    var bowerrcFile = './gulp/.bowerrc';
    var bowerrcPath = '../src/bower_components';
  }

  var bowerrcJson = {
      directory: bowerrcPath
    }

  var bowerJson = {
    name: self.projectName,
    version: self.projectVersion,
    authors: [
      self.projectAuthor
    ],
    description: self.projectDescription,
    main: '',
    moduleType: [
      'globals'
    ],
    license: self.projectLicense,
    homepage: self.authorEmail,
    ignore: [
      '**/.*',
      'node_modules',
      'bower_components',
      'test',
      'tests'
    ],
    dependencies: {}
  }

  if(self.html5shivOption) bowerJson.dependencies['html5shiv'] = '^3.7.3';
  if(self.jqueryOption) bowerJson.dependencies['jquery'] = '^2.2.1';
  if(self.zeptoOption) bowerJson.dependencies['zepto'] = '^1.1.6';
  if(self.waypointsOption) bowerJson.dependencies['waypoints'] = '^4.0.0';
  if(self.enquireOption) bowerJson.dependencies['enquire'] = '^2.1.2';
  if(self.tweenmaxOption) bowerJson.dependencies['gsap'] = '^1.18.2';
  if(self.signalsOption) bowerJson.dependencies['js-signals'] = 'signals#^1.0.0';
  if(self.dthreejsOption) bowerJson.dependencies['d3'] = '^3.5.16';
  if(self.requireOption) bowerJson.dependencies['requirejs'] = '^2.2.0';
  if(self.angularOption) bowerJson.dependencies['angular'] = '^1.5.3';
  if(self.reactOption) bowerJson.dependencies['react'] = '^0.14.8';
  if(self.backboneOption) bowerJson.dependencies['backbone'] = '^1.3.2';
  if(self.underscoreOption) bowerJson.dependencies['underscore'] = '^1.8.3'
  if(self.scrollrevealOption) bowerJson.dependencies['scrollreveal'] = '^3.1.4'
  if(self.snapOption) bowerJson.dependencies['Snap.svg'] = 'snap.svg#^0.4.1'

  createJson(bowerFile, bowerJson);
  createJson(bowerrcFile, bowerrcJson);

  cb();
}

module.exports = writeBower;
