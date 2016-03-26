'use strict';

var exports = module.exports = {
  //this.log(printTitle('Project Details'))
  var done = this.async();
  this.prompt([{
    name: 'localUrl',
    message: 'Local URL to use:',
    default: 'mynewawesomeapp.localhost'
    }, {
      name: 'name',
      message: 'Name your project:',
      default: this.appname
    }, {
      name: 'description',
      message: 'Describe your project:',
      default: 'My new awesome app'
    }, {
      name: 'version',
      message: 'Project version:',
      default: '0.0.0'
    }, {
      name: 'author',
      message: 'Author:',
      default: ''
    }, {
      name: 'email',
      message: 'Author\'s Email Address:',
      default: ''
  }], function (answers) {
      this.localUrl = answers.localUrl;
      this.appname = answers.name;
      this.appdescription = answers.description;
      this.appversion = answers.version;
      this.appauthor = answers.author;
      this.appemail = answers.email;
      this.applicense = 'MIT';
      done();
  }.bind(this));

};
