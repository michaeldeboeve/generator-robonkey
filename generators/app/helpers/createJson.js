'use strict';
var fs        = require('fs'),
    jsonfile  = require('jsonfile');

var createJson = function (fileName, content) {
  fs.writeFileSync(fileName, JSON.stringify(content, null, 2), null, function (err) {
    if (err) return console.log(err)
    // console.log(JSON.stringify(file))
    // console.log('writing to ' + fileName)
  });
}

module.exports = createJson;
