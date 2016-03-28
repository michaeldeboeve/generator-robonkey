
'use strict';
var mkdirp = require('mkdirp'),
    fs = require('fs');

var installDep = function installDep(gulpDirOption, context) {
  var self = context;

  if(gulpDirOption) {
    // Change working directory to 'gulp' for dependency install
    var npmdir = process.cwd() + '/gulp';
    process.chdir(npmdir);
  }
  self.bowerInstall();
  self.npmInstall();

};

module.exports = installDep;
