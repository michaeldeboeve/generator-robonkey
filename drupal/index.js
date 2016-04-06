'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var git = require('simple-git');

var DrupalGenerator = yeoman.generators.Base.extend({
    init: function() {
        this.on('end', function() {
            if (!this.options['skip-install']) {
                this.getDrupal(this.drupalVersion);
            }
        });
    },

    askFor: function() {
        var done = this.async();

        this.log(this.yeoman);
        this.log(chalk.magenta('You\'re using the Drupal generator'));

        var prompts = [{
            type: 'list',
            name: 'drupalVersion',
            message: 'What version of Drupal would you like to install?',
            choices: ['6', '7', '8'],
            default: '7'
        }];

        this.prompt(prompts, function(props) {
            this.drupalVersion = props.drupalVersion;

            done();
        }.bind(this));
    },

    getDrupal: function(drupalVersion) {
        if (!drupalVersion) return false;
        var drupal6Repo = 'https://github.com/drupal/drupal.git -b 6.x',
            drupal7Repo = 'https://github.com/drupal/drupal.git -b 7.x',
            drupal8Repo = 'https://github.com/drupal/drupal.git -b 8.x';

        console.log('Instaling Drupal ' + drupalVersion + '. Please wait...');
        git().clone('https://github.com/drupal/drupal.git -b --single-branch ' + drupalVersion + '.x', 'hopla', function(error) {
            if (error) console.log('There was a problem in the instalation. Please try again.');
            else console.log('Installed Drupal succesfully, enjoy it!');
        });

        return false;
    }
});

module.exports = DrupalGenerator;
