var projectPrompt = function projectPrompt(context) {
  var self = context;

  self.prompt([{
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
  }], function () {
  }.bind(self));
}

module.exports = projectPrompt;
