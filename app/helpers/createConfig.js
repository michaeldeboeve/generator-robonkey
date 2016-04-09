'use strict';
var fs          = require('fs'),
    jsonfile    = require('jsonfile'),
    createJson  = require('./createJson');

var createConfig = function(fileName, fileLocation, dir, environment) {
  // Writing the .yo-rc.json file

  fs.stat(fileLocation, function(err, stat) {
    if(err == null) {

      var file = require(fileLocation),
          generator = file['generator-robonkey'];

      generator.mainDir = dir;
      generator.environmentOption = environment;

      createJson(fileName, file);

    } else {

      var file = {
        'generator-robonkey': {
          'mainDir': dir,
          'environmentOption': environment
        },
      };

      createJson(fileName, file);

    }
  });
}

module.exports = createConfig;
