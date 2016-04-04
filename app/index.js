'use strict';

var yeoman        = require('yeoman-generator'),
    mkdirp        = require('mkdirp'),
    yosay         = require('yosay'),
    chalk         = require('chalk'),
    path          = require('path'),
    _             = require('lodash'),
    grabFiles     = require('./helpers/grabFiles');
    //wordpress   = require('../util/wordpress.js');

'use strict';

// Order to load and run generator config files based on their name
var order = [
  /* Prompts */
  'intro',
  'existing', // Check for existing .yo-rc.json file
  'defaults',
  'project',
  'environmentCheck',
  'environment',
  'folders',
  'html',
  'css',
  'cssBase',
  'cssPost',
  'scripts',
  'h5bp',
  'font',
  'ga',
  'gulp',
  /* Config */
  'answers',  // Handle answers and them up for use in templates
  'save',  // Save answers to .yo-rc.json file
  /* Files */
  'projectFiles',
  'gulpFiles',
  'bowerFiles',
  'h5bpFiles',
  'htmlFiles',
  'sassFiles',
  'stylusFiles',
  'lessFiles',
  'scriptFiles',
  'imageFiles',
  'fontFiles',
  'wordpressFiles',
  /* Config */
  'install',  // Handle generator options and run `bower install & npm install`
  'end' // End Message and Gulp Command
];


// Create array that will hold all generator config file objects
var config = [];

// Create object that will hold all of the code needed to pass to the robonkey
var tasks = {};

// Grab all needed generator config files
// and assign an index based on the order array
config = grabFiles([
path.join(__dirname, '/generator/prompts'),
path.join(__dirname, '/generator/config'),
path.join(__dirname, '/generator/files')], order);

// Sort config files based on their index ascending (ex. 3, 1, 2 -> 1, 2, 3)
config.sort(function(a, b) {
    return a.index - b.index;
});

// Attach to tasks object so that the filename becomes a key
// and the code becomes the value
config.forEach(function(item) {
    tasks[item.name] = item.code;
});

var robonkey = yeoman.generators.Base.extend(_.merge({
    init: function() {
        this.pkg = require('../package.json');
    }
}, tasks));

module.exports = robonkey;
