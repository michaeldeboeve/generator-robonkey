'use strict';
var hasFeature    = require('../helpers/hasFeature'),
    setConfigVars = require('./setConfigVars');

function setIconFontAnswers (self) {
  var done = self.async();

  setConfigVars(self);

  self.preproOption = self.cfg.preproOption;
  self.customIconfontOption = self.cfg.customIconfontOption;
  self.customIconFontName = self.cfg.customIconFontName;

  done();
}

module.exports = setIconFontAnswers;
