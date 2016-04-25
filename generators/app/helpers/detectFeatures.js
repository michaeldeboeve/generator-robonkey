'use strict';
var chalk = require('chalk');
var hasFeature = require('./hasFeature');

function structureExists(self, options) {
  if(self.cfg.mainDir && hasFeature('mainDir', options)) console.log('Main directory ' + chalk.bold.yellow(self.cfg.mainDir) + ' detected.');

  if(self.cfg.assetsDir && hasFeature('assetsDir', options)) console.log('Assets directory ' + chalk.bold.yellow(self.cfg.assetsDir) + ' detected.');

  if(self.cfg.cssDir && hasFeature('cssDir', options)) console.log('Styles directory ' + chalk.bold.yellow(self.cfg.cssDir) + ' detected.');

  if(self.cfg.jsDir && hasFeature('jsDir', options)) console.log('Javascript directory ' + chalk.bold.yellow(self.cfg.jsDir) + ' detected.');

  if(self.cfg.libDir && hasFeature('libDir', options)) console.log('Javascript libraries directory ' + chalk.bold.yellow(self.cfg.libDir) + ' detected.');

  if(self.cfg.fontDir && hasFeature('fontDir', options)) console.log('Font directory ' + chalk.bold.yellow(self.cfg.fontDir) + ' detected.');

  if(self.cfg.preproOption && hasFeature('preproOption', options)) console.log('Using ' + chalk.bold.yellow(self.cfg.preproOption) + ' as preprocessor.');

  if(self.cfg.JavascriptOption && hasFeature('JavascriptOption', options)) console.log('Using ' + chalk.bold.yellow(self.cfg.JavascriptOption) + ' for writing javascript.');

  if(self.cfg.gulpDirOption && hasFeature('gulpDirOption', options)) console.log(chalk.bold.yellow('Gulp') + ' will be installed in ' + chalk.bold.yellow('subfolder') + '.');
}

module.exports = structureExists;
