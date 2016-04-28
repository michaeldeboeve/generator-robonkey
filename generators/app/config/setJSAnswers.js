'use strict';
var hasFeature    = require('../helpers/hasFeature'),
    setConfigVars = require('./setConfigVars');

function setJSAnswers(self) {
  var done = self.async();

  setConfigVars(self);

  self.scriptsOption = self.cfg.scriptsOption;
  self.javascriptOption = self.cfg.javascriptOption;

  self.jsScripts = [];

  for (var i = 0; i < self.scriptsOption.length; i++) {
    switch(self.scriptsOption[i]) {
      case 'jquery':
        self.jsScripts.push({
          key: 'jquery',
          file: 'jquery.min.js',
          main: 'dist/jquery.min.js',
          sort: 0
        });
      break;

      case 'zepto':
        self.jsScripts.push({
          key: 'zepto',
          file: 'zepto.min.js',
          main: 'zepto.min.js',
          sort: 0
        });
      break;

      case 'underscore':
        self.jsScripts.push({
          key: 'underscore',
          file: 'underscore-min.js',
          main: 'underscore-min.js',
          sort: 1
        });
      break;

      case 'angular':
        self.jsScripts.push({
          key: 'angular',
          file: 'angular.min.js',
          main: 'angular.min.js',
          sort: 2
        });
      break;

      case 'waypoints':
        if(hasFeature('jquery', self.scriptsOption)){
          self.jsScripts.push({
            key: 'waypoints',
            file: 'jquery.waypoints.min.js',
            main: 'lib/jquery.waypoints.min.js',
            sort: 2
          });
        } else if(!hasFeature('jquery', self.scriptsOption) && hasFeature('zepto', self.scriptsOption)){
          self.jsScripts.push({
            key: 'waypoints',
            file: 'zepto.waypoints.min.js',
            main: 'lib/zepto.waypoints.min.js',
            sort: 2
          });
        } else {
          self.jsScripts.push({
            key: 'waypoints',
            file: 'noframework.waypoints.min.js',
            main: 'lib/noframework.waypoints.min.js',
            sort: 2
          });
        }
      break;

      case 'signals':
        self.jsScripts.push({
          key: 'js-signals',
          file: 'signals.min.js',
          main: 'dist/signals.min.js',
          sort: 3
        });
      break;

      case 'snap':
        self.jsScripts.push({
          key: 'snap',
          file: 'snap.svg-min.js',
          main: 'dist/snap.svg-min.js',
          sort: 3
        });
      break;

      case 'dthreejs':
        self.jsScripts.push({
          key: 'd3',
          file: 'd3.min.js',
          main: 'd3.min.js',
          sort: 4
        });
      break;

      case 'enquire':
        self.jsScripts.push({
          key: 'enquire',
          file: 'enquire.min.js',
          main: 'dist/enquire.min.js',
          sort: 5
        });
      break;

      case 'tweenmax':
        self.jsScripts.push({
          key: 'gsap',
          file: 'TweenMax.min.js',
          main: 'src/minified/TweenMax.min.js',
          sort: 6
        });
      break;


      case 'backbone':
        self.jsScripts.push({
          key: 'backbone',
          file: 'backbone-min.js',
          main: 'backbone-min.js',
          sort: 7
        });
      break;


      case 'scrollreveal':
        self.jsScripts.push({
          key: 'scrollreveal',
          file: 'scrollreveal.min.js',
          main: 'dist/scrollreveal.min.js',
          src:  'scrollreveal/dist/',
          sort: 10
        });
      break;
    }
  }

  self.jsScriptsBower = self.jsScripts;

  // Push extra scripts to bower list
  if(hasFeature('require', self.scriptsOption)) {
    self.jsScriptsBower.push({
      key: 'require',
      file: 'require.js',
      main: 'require.js',
      sort: 0
    });
  }

  // if(hasFeature('modernizr', self.scriptsOption)) {
  //   self.jsScriptsBower.push({
  //     file: 'modernizr-custom.js',
  //     src: self.rootFolder + 'src/modernizr/',
  //     main: self.rootFolder + 'src/modernizr/',
  //     sort: 8
  //   });
  // }

  if(hasFeature('react', self.scriptsOption)) {
    self.jsScriptsBower.push({
      file: 'react-with-addons.min.js',
      sort: 0
    });
  }


  // Overwrite self.jsScripts if Require option is true
  if(hasFeature('require', self.scriptsOption)) {
    self.jsScripts = [];
    self.jsScripts.push({
      file: 'require.js',
      sort: 0
    });
  }

  self.jsScripts = self.jsScripts.sort(function(a,b){return a.sort-b.sort});
  self.jsScriptsBower = self.jsScriptsBower.sort(function(a,b){return a.sort-b.sort});

  self.modernizrOption = hasFeature('modernizr', self.scriptsOption);
  self.jqueryOption = hasFeature('jquery', self.scriptsOption);
  self.snapOption = hasFeature('snap', self.scriptsOption);
  self.waypointsOption = hasFeature('waypoints', self.scriptsOption);
  self.signalsOption = hasFeature('signals', self.scriptsOption);
  self.dthreejsOption = hasFeature('dthreejs', self.scriptsOption);
  self.tweenmaxOption = hasFeature('tweenmax', self.scriptsOption);
  self.enquireOption = hasFeature('enquire', self.scriptsOption);
  self.requireOption = hasFeature('require', self.scriptsOption);
  self.modernizrOption = hasFeature('modernizr', self.scriptsOption);
  self.angularOption = hasFeature('angular', self.scriptsOption);
  self.backboneOption = hasFeature('backbone', self.scriptsOption);
  self.underscoreOption = hasFeature('underscore', self.scriptsOption);
  self.zeptoOption = hasFeature('zepto', self.scriptsOption);
  self.scrollrevealOption = hasFeature('scrollreveal', self.scriptsOption);

  done();
}

module.exports = setJSAnswers;
