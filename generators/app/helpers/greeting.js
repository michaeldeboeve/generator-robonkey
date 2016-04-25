'use strict';
var chalk = require('chalk'),
    yosay = require('yosay');

var greeting = function (self) {
  if(!self.calledFrom){
    var message = chalk.yellow.bold('Welcome to Robonkey ') + chalk.yellow('\'Cause everyone needs a Robotic Monkey');
    console.log(yosay(message, {maxLength: 19}));
  };
}

module.exports = greeting;
