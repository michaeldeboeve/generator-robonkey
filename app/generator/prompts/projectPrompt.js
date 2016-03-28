/**
 * Generate files specific to project files
 */

'use strict';

var projectPrompt = function projectPrompt(context) {
  var self = context;
  project: function() {
    this.log(printTitle('Project Details'))
    var done = this.async();
    this.prompt([{
      name: 'projectUrl',
      message: 'Local URL to use:',
      default: 'mynewawesomeapp.localhost'
    }, {
      name: 'projectName',
      message: 'Name your project:',
      default: this.appname,
    }, {
      name: 'projectDescription',
      message: 'Describe your project:',
      default: 'My new awesome app',
    }, {
      name: 'projectVersion',
      message: 'Project version:',
      default: '0.0.0'
    }, {
      name: 'projectAuthor',
      message: 'Author:',
      default: ''
    }, {
      name: 'authorEmail',
      message: 'Author\'s Email Address:',
      default: ''
    }], function (answers) {
        return answers;
        // this.projectUrl = answers.projectUrl;
        // this.projectName = answers.projectName;
        // this.projectDescription = answers.projectDescription;
        // this.projectVersion = answers.projectVersion;
        // this.projectAuthor = answers.projectAuthor;
        // this.authorEmail = answers.authorEmail;
        // this.projectLicense = 'MIT';
        done();
      }.bind(this));
  }


};

module.exports = projectPrompt;
