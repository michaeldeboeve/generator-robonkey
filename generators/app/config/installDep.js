'use strict';
var fs        = require('fs'),
    jsonfile  = require('jsonfile'),
    printTitle = require('../helpers/printTitle');

const exec          = require('child_process').exec;
const spawn         = require('child_process').spawnSync;

var installDep = function (self, cb) {
  if(!self.calledFrom) {
    console.log(printTitle('Installing Dependencies'));

    if(self.gulpDirOption) {
      // Change working directory to 'gulp' for dependency install
      var gulpDir = process.cwd() + '/gulp';
      process.chdir(gulpDir);
    }
    //var expressInstall = spawn('npm', ['install'], { cwd: '/website' });
    self.installDependencies({
      bower: true,
      npm: true,
      skipInstall: self.options['skip-install'],
      callback: function() {
        console.log('\nEverything looks ready!' +
          ' Get started by running "gulp serve".\n'
        );
      }
    });

    cb();
  }
}

module.exports = installDep;
