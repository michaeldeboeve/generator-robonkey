/**
 * Create prompts for javascript libraries
 */

'use strict';

var chalk       = require('chalk'),
    printTitle  = require('./../../helpers/printTitle');

var scriptsPrompt = function scriptsPrompt() {
  this.log(printTitle('Javascript Libraries'))
  var done = this.async();
  this.prompt([{
    type: 'checkbox',
    name: 'scriptsOption',
    message: 'What Javascript libraries to include?',
    choices: [{
      name: 'Modernizr',
      value: 'modernizr',
      checked: true
    }, {
      name: 'jQuery',
      value: 'jquery',
      checked: true
    }, {
      name: 'Zepto',
      value: 'zepto',
      checked: false
    }, {
      name: 'Requirejs',
      value: 'require',
      checked: false
    }, {
      name: 'Waypoints',
      value: 'waypoints',
      checked: false
    }, {
      name: 'Signals',
      value: 'signals',
      checked: false
    }, {
      name: 'dthreejs',
      value: 'dthreejs',
      checked: false
    }, {
      name: 'TweenMax',
      value: 'tweenmax',
      checked: false
    }, {
      name: 'Enquire',
      value: 'enquire',
      checked: false
    }, {
      name: 'Angular',
      value: 'angular',
      checked: false
    }, {
      name: 'React',
      value: 'react',
      checked: false
    }, {
      name: 'Backbone',
      value: 'backbone',
      checked: false
    }, {
      name: 'Underscore',
      value: 'underscore',
      checked: false
    }]
  }], function (answers) {
    this.scriptsPrompt = answers;

    done();
  }.bind(this));
};

module.exports = scriptsPrompt;
