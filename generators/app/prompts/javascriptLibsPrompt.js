'use strict';

var chalk       = require('chalk'),
    printTitle  = require('../helpers/printTitle.js'),
    hasFeature  = require('../helpers/hasFeature');

function javascriptsLibsPrompt(self, cb){

  console.log(printTitle('Javascript Libraries'));

  self.prompt([{
    type: 'checkbox',
    name: 'scriptsOption',
    message: 'What Javascript libraries to include?',
    choices: [{
      name: 'Modernizr',
      value: 'modernizr',
      checked: hasFeature('modernizr', self.cfg.scriptsOption)
    }, {
      name: 'jQuery',
      value: 'jquery',
      checked: hasFeature('jquery', self.cfg.scriptsOption)
    }, {
      name: 'Zepto',
      value: 'zepto',
      checked: hasFeature('zepto', self.cfg.scriptsOption)
    }, {
      name: 'Snap.svg',
      value: 'snap',
      checked: hasFeature('snap', self.cfg.scriptsOption)
    }, {
      name: 'Requirejs',
      value: 'require',
      checked: hasFeature('require', self.cfg.scriptsOption)
    }, {
      name: 'React',
      value: 'react',
      checked: hasFeature('react', self.cfg.scriptsOption)
    }, {
      name: 'Waypoints',
      value: 'waypoints',
      checked: hasFeature('waypoints', self.cfg.scriptsOption)
    }, {
      name: 'Signals',
      value: 'signals',
      checked: hasFeature('signals', self.cfg.scriptsOption)
    }, {
      name: 'D3js',
      value: 'dthreejs',
      checked: hasFeature('dthreejs', self.cfg.scriptsOption)
    }, {
      name: 'TweenMax',
      value: 'tweenmax',
      checked: hasFeature('tweenmax', self.cfg.scriptsOption)
    }, {
      name: 'Enquire',
      value: 'enquire',
      checked: hasFeature('enquire', self.cfg.scriptsOption)
    }, {
      name: 'Angular',
      value: 'angular',
      checked: hasFeature('angular', self.cfg.scriptsOption)
    }, {
      name: 'Backbone',
      value: 'backbone',
      checked: hasFeature('backbone', self.cfg.scriptsOption)
    }, {
      name: 'Underscore',
      value: 'underscore',
      checked: hasFeature('underscore', self.cfg.scriptsOption)
    }, {
      name: 'Scrollreveal',
      value: 'scrollreveal',
      checked: hasFeature('scrollreveal', self.cfg.scriptsOption)
    }]
  }], function (answers) {
    self.cfg.scriptsOption = answers.scriptsOption;

    cb();
  }.bind(self));
}

module.exports = javascriptsLibsPrompt;
