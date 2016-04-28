'use strict';
var chalk = require('chalk'),
    yosay = require('yosay');

var init = function(self, cb) {
    if (self.options.cfg) {
        self.cfg = self.options.cfg;
    } else {
        self.cfg = self.config.getAll();
    }

    self.calledFrom = false;
    if (self.options.calledFrom) self.calledFrom = self.options.calledFrom;

    cb()
}

module.exports = init;
