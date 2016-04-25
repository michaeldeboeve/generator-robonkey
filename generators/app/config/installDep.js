'use strict';
var fs        = require('fs'),
    jsonfile  = require('jsonfile'),
    printTitle = require('../helpers/printTitle');

var installDep = function (self, cb) {
  if(!self.calledFrom) {
    console.log(printTitle('Installing Dependencies'));

    if(self.gulpDirOption) {
      // Change working directory to 'gulp' for dependency install
      var npmdir = process.cwd() + '/gulp';
      process.chdir(npmdir);
    }

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
