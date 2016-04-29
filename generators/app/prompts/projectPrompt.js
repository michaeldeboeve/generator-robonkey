var chalk           = require('chalk'),
    printTitle      = require('../helpers/printTitle');

'use strict';

var projectPrompt = function(self, cb){

  console.log(printTitle('Project Details'))

  self.prompt([{
    name: 'projectUrl',
    message: 'Local URL to use:',
    default: function(answers) {
      if(self.cfg.projectUrl) {
        return self.cfg.projectUrl
      } else {
        return 'mynewawesomeapp.localhost'
      }
    }
  }, {
    name: 'projectName',
    message: 'Name your project:',
    default: function(answers) {
      if(self.cfg.projectName) {
        return self.cfg.projectName
      } else {
        return self.appname
      }
    }
  }, {
    name: 'projectDescription',
    message: 'Describe your project:',
    default: function(answers) {
      if(self.cfg.projectDescription) {
        return self.cfg.projectDescription
      } else {
        return 'My new awesome app'
      }
    }
  }, {
    name: 'projectVersion',
    message: 'Project version:',
    default: function(answers) {
      if(self.cfg.projectVersion) {
        return self.cfg.projectVersion
      } else {
        return '0.0.0'
      }
    }
  }, {
    name: 'projectAuthor',
    message: 'Author:',
    default: function(answers) {
      if(self.user.git.name()){
        return  self.user.git.name()
      } if(self.cfg.projectAuthor) {
        return self.cfg.projectAuthor
      } else {
        return 'Your name'
      }
    }
  }, {
    name: 'authorEmail',
    message: 'Author Email:',
    default: function(answers) {
      if(self.user.git.email()){
        return  self.user.git.email()
      } else if(self.cfg.authorEmail) {
        return self.cfg.authorEmail
      } else {
        return 'Your email'
      }
    }

  }], function (answers) {
    self.cfg.projectUrl = answers.projectUrl;
    self.cfg.projectName = answers.projectName;
    self.cfg.projectNameJson = answers.projectName.replace(/\s/g,'');
    self.cfg.projectDescription = answers.projectDescription;
    self.cfg.projectVersion = answers.projectVersion;
    self.cfg.projectAuthor = answers.projectAuthor;
    self.cfg.authorEmail = answers.authorEmail;
    self.cfg.projectLicense = 'MIT';


    cb();
  }.bind(self));
}

module.exports = projectPrompt;
