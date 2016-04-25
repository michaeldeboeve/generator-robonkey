'use strict';
var fs = require('fs');

function fileExists(targetPath, cb) {
  fs.stat( targetPath, function (err) {
    if (err) {

      // file does not exist-
      if (err.code === 'ENOENT' ) {
        // console.log('No file or directory at',targetPath);
        cb(false);
      }

      // miscellaneous error (e.g. permissions)
      // console.error(err);
      cb(false);
    } else {
        cb(true);
    }
  })
}

module.exports = fileExists;
