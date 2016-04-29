'use strict';
var hasFeature    = require('../helpers/hasFeature'),
    setConfigVars = require('./setConfigVars');

function setIconFontAnswers (self, cb) {
  setConfigVars(self, function(){
    self.preproOption = self.cfg.preproOption;
    self.customIconfontOption = self.cfg.customIconfontOption;
    self.customIconFontName = self.cfg.customIconFontName;

    cb();
  })
}

module.exports = setIconFontAnswers;
