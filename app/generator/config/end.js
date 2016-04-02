/**
 * End message and gulp command
 */

'use strict';

var chalk = require('chalk');

var endConfig = function endConfig() {
  var allDone =
    '\n.-------------------.' +
    '\n| Robonkey says:    |' +
    '\n| '+chalk.yellow.bold('ALL DONE!') + '         |' +
    '\n| ' + chalk.yellow.bold('Now fly, my pets!') + ' |' +
    '\n\'-------------------\'' +
    '\n';

  console.log(allDone);

  if(this.gulpCmdOption) {
    this.spawnCommand('gulp', ['serve']);
  }

};

module.exports = endConfig;
