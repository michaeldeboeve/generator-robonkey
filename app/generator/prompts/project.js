'use strict';
var chalk = require('chalk');

module.exports = {

  project: function() {
    this.log(printTitle('Project Details'))
    var done = this.async();
    this.prompt([{
      name: 'projectUrl',
      message: 'Local URL to use:',
      default: 'mynewawesomeapp.localhost'
    }
    ,{
      name: 'projectName',
      message: 'Name your project:',
      default: this.appname
    }
    ,{
      name: 'projectDescription',
      message: 'Describe your project:',
      default: 'My new awesome app'
    }
    ,{
      name: 'projectVersion',
      message: 'Project version:',
      default: '0.0.0'
    }], function (answers) {
        this.projectUrl = answers.projectUrl;
        this.projectName = answers.projectName;
        this.projectDescription = answers.projectDescription;
        this.projectVersion = answers.projectVersion;
        done();
      }.bind(this));
  }

};
