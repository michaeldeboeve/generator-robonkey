/**
 * Install dependencies
 */

'use strict';

var installConfig = function installConfig() {
  if(this.gulpDirOption) {
    // Change working directory to 'gulp' for dependency install
    var npmdir = process.cwd() + '/gulp';
    process.chdir(npmdir);
  }
  this.bowerInstall();
  this.npmInstall();
};

module.exports = installConfig;
