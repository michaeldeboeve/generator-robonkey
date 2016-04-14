/**
 * Install dependencies
 */

'use strict';

var installConfig = function installConfig() {
  var self = this;
  if(this.gulpDirOption) {
    // Change working directory to 'gulp' for dependency install
    var npmdir = process.cwd() + '/gulp';
    process.chdir(npmdir);
  }

  // this.installDependencies({
  //   bower: true,
  //   npm: true,
  //   skipInstall: this.options['skip-install'],
  //   callback: function() {
  //     // self.log('\nEverything looks ready!' +
  //     //   ' Get started by running "gulp serve".\n'
  //     // );
  //   }
  // });
};

module.exports = installConfig;
