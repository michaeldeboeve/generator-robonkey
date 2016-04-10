'use strict';
var fs    = require('fs'),
    path  = require('path');

var walk = function(dir, target, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {

    if (err) return done(err);

    var pending = list.length;
    if (!pending) return done(null, results);

    list.forEach(function(file) {

      file = path.resolve(dir, file);

      fs.stat(file, function(err, stat) {

        if ( stat ){
          var found = false;
          if ( target.indexOf(file.split('/').pop()) > -1 ){
            results.push(file);
          }
        }

        if (stat && stat.isDirectory()) {

          walk(file, target, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });

        } else {
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

module.exports = walk;
