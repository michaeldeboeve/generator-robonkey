var chalk = require('chalk');

'use strict';

// It does what it says
var printTitle = function(title){
  return '\n\n\n\n---- ' + chalk.bgWhite.black(' ' + title + ' ') + ' ----\n';
}

module.exports = printTitle;
