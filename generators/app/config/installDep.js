'use strict';
var fs          = require('fs'),
    path        = require('path'),
    jsonfile    = require('jsonfile'),
    printTitle  = require('../helpers/printTitle');

var installDep = function (self) {
  console.log(printTitle('Installing Dependencies'));

  if(self.gulpDirOption) {
    // Change working directory to 'gulp' for dependency install
    var gulpDir = path.join(process.cwd(), 'gulp');
    process.chdir(gulpDir);
  }

  self.installDependencies({
    bower: true,
    npm: true,
    skipInstall: self.options['skip-install'],
    callback: function(){
      console.log('\nEverything looks ready!' +
        ' Get started by running "gulp serve".\n'
      );
    }
  });
}

module.exports = installDep;
