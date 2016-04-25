'use strict';

var chalk       = require('chalk'),
    walk        = require('../helpers/walk.js'),
    printTitle  = require('../helpers/printTitle.js');

function isFramework(fwToCheck, destRoot, calledFrom, self, cb){
  var done = self.async();
  var filesToCheck = [];

  fwToCheck.forEach(function(fw) {
    if(fw === 'wordpress') filesToCheck.push('wp-load.php');
    if(fw === 'codeigniter') filesToCheck.push('CodeIgniter.php');
    if(fw === 'drupal') filesToCheck.push('drupal.js');
    if(fw === 'express') filesToCheck.push('www');
    if(fw === 'laravel') filesToCheck.push('artisan');
  });

  checkFrameworks( destRoot, filesToCheck, self, function(framework){
    switch(framework){
      case 'WordPress':
        if(calledFrom === 'app' || !calledFrom) {
          runFromStatic('WordPress', 'wordpress', self);
        } else {
          runFromFW('WordPress', 'wordpress', self);
        }
      break;

      case 'Drupal':
        if(calledFrom === 'app' || !calledFrom) {
          runFromStatic('Drupal', 'drupal', self);
        } else {
          runFromFW('Drupal', 'drupal', self);
        }
      break;

      case 'CodeIgniter':
        if(calledFrom === 'app' || !calledFrom) {
          runFromStatic('CodeIgniter', 'codeigniter', self);
        } else {
          runFromFW('CodeIgniter', 'codeigniter', self);
        }
      break;

      case 'Express':
        if(calledFrom === 'app' || !calledFrom) {
          runFromStatic('Express', 'express', self);
        } else {
          runFromFW('Express', 'express', self);
        }
      break;

      case 'Laravel':
        if(calledFrom === 'app' || !calledFrom) {
          runFromStatic('Laravel', 'laravel', self);
        } else {
          runFromFW('Laravel', 'laravel', self);
        }
      break;

      case 'custom':
        done();
      break;
    }
  });

  function runFromStatic(name, environment, self) {
    console.log(printTitle(' ' + name + ' '));
    self.prompt([{
      type: 'confirm',
      name: 'continueEnvironment',
      message: chalk.bgGreen.white( ' ' + name + ' is detected. Continue? '),
      default: true
    }], function (answers) {
      if(answers.continueEnvironment) {
        self.cfg.environmentName = name;
        self.cfg.environmentOption = environment;
      } else {
        self.exit = true;
      }

      done();
    }.bind(this));
  }


  function runFromFW(name, environment, self) {
    self.prompt([{
      type: 'confirm',
      name: 'continueEnvironment',
      message: chalk.bgRed.white( ' ' + name + ' is detected. Continue? ') +
                chalk.red('\nThis will delete the current installation!'),
      default: true
    }], function (answers) {
      if(answers.continueEnvironment) {
        self.cfg.environmentName = name;
        self.cfg.environmentOption = environment;
      } else {
        self.exit = true;
      }

      done();
    }.bind(this));
  }

  function checkFrameworks( destRoot, filesToCheck, self, cb ){

    walk(destRoot, filesToCheck, function(err, data){
       if ( data.length > 0 ){
        var framework = data[0].split('/').pop();

        switch(framework){
          case 'wp-load.php':
            cb('WordPress');
          break;

          case 'CodeIgniter.php':
            cb('CodeIgniter');
          break;

          case 'drupal.js':
            cb('Drupal');
          break;

          case 'www':
            cb('Express');
          break;

          case 'artisan':
            cb('Laravel');
          break;

          default:
            cb('custom');
          break;
        }
       } else {
       cb('custom');
       }
    });
  }

  cb(self.cfg.environmentOption);
}

module.exports = isFramework;
