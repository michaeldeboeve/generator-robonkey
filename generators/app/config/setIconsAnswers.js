'use strict';
var hasFeature    = require('../helpers/hasFeature'),
    setConfigVars = require('./setConfigVars');

function setIconsAnswers (self, cb) {
  setConfigVars(self, function(){
    if(self.cfg.customIconfontOption) {
      self.preproOption = self.cfg.preproOption;
      self.customIconfontOption = self.cfg.customIconfontOption;
      self.customIconfontName = self.cfg.customIconfontName;
    }

    if(self.cfg.svgiconsOption){
      self.svgiconsOption = self.cfg.svgiconsOption;
      self.svgIconSpriteName = self.cfg.svgIconSpriteName;
    }

    cb();
  })
}

module.exports = setIconsAnswers;
