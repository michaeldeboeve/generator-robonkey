'use strict';

var yeoman          = require('yeoman-generator'),
    fs              = require('fs'),
    path            = require('path'),
    chalk           = require('chalk'),
    mkdirp          = require('mkdirp'),
    jsonfile        = require('jsonfile'),
    generatorName   = path.basename(__dirname);

var greeting        = require('../app/helpers/greeting'),
    walk            = require('../app/helpers/walk'),
    printTitle      = require('../app/helpers/printTitle'),
    hasFeature      = require('../app/helpers/hasFeature'),
    createJson      = require('../app/helpers/createJson');

var init            = require('../app/config/init'),
    setConfigVars   = require('../app/config/setConfigVars'),
    setConfigFiles  = require('../app/config/setConfigFiles'),
    copyFiles       = require('../app/config/copyFiles'),
    installDep      = require('../app/config/installDep');

var structureExists = require('../app/prompts/structureExists'),
    isFramework     = require('../app/prompts/isFramework'),
    gulpPrompt      = require('../app/prompts/gulpPrompt'),
    isStatic        = require('../app/prompts/isStatic');


module.exports = yeoman.Base.extend({
  initializing: function(){
    var done = this.async(),
        self = this;
    init(this, function(){
      greeting(self);
    });
    done();
  },


  prompting: {

    existingEnvironment: function(){
      if(this.calledFrom === 'app' || !this.calledFrom){
        this.cfg.environmentOption ='static';
        var done = this.async(),
            self = this,
            destRoot = this.destinationRoot(),
            frameworks = ['wordpress', 'codeigniter', 'drupal', 'express', 'laravel'];

        isFramework(frameworks, destRoot, this.calledFrom, this, function(environmentOption){
          self.cfg.environmentOption = environmentOption;
        });
      }
    },

    gulp: function(){
      gulpPrompt(this, function(){})
    },

    environment: function(){
      if(this.exit) return;
      isStatic(this, function(){});
    },

    project: function(){
      if(this.exit) return;
      console.log(printTitle('Project Details'))
      var done = this.async(),
          self = this;

      this.prompt([{
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
        this.cfg.projectUrl = answers.projectUrl;
        this.cfg.projectName = answers.projectName;
        this.cfg.projectNameJson = answers.projectName.replace(/\s/g,'');
        this.cfg.projectDescription = answers.projectDescription;
        this.cfg.projectVersion = answers.projectVersion;
        this.cfg.projectAuthor = answers.projectAuthor;
        this.cfg.authorURI = answers.authorURI;
        this.cfg.projectLicense = 'MIT';


        done();
      }.bind(this));
    },

    existingStructure: function(){
      if(this.exit) return;
      structureExists(this, ['mainDir', 'assetsDir', 'cssDir', 'jsDir', 'libDir', 'fontDir', 'gulpDirOption'], function(){});
    },

    structure: function(){
      if(this.exit) return;

      console.log(printTitle('Folder structure'));
      var done = this.async(),
          self = this;

      this.prompt([{
        when: function(){
          return !self.cfg.mainDir
        },
        name: 'mainDir',
        message: 'What is your main directory?',
        default: function(answers) {
          if(self.cfg.mainDir) {
            return self.cfg.mainDir
          } else {
            return 'website'
          }
        }
      }, {
        when: function(){
          return !self.cfg.themeDir && (self.cfg.environmentOption === 'wordpress' || self.cfg.environmentOption === 'drupal')
        },
        name: 'themeDir',
        message: 'What is your theme folder?',
        default: function(answers) {
          if(self.cfg.themeDir) {
            return self.cfg.themeDir
          } else {
            return 'mytheme'
          }
        }
      }, {
        name: 'assetsDir',
        message: 'Name your assets folder:',
        default: function(answers) {
          if(self.cfg.assetsDir) {
            return self.cfg.assetsDir
          } else {
            return 'assets'
          }
        }
      }, {
        type: 'input',
        name: 'cssDir',
        message: 'Name your css directory:',
        default: function(answers) {
          if(self.cfg.cssDir) {
            return self.cfg.cssDir
          } else {
            return 'css'
          }
        }
      }, {
        type: 'input',
        name: 'imgDir',
        message: 'Name your images directory:',
        default: function(answers) {
          if(self.cfg.imgDir) {
            return self.cfg.imgDir
          } else {
            return 'img'
          }
        }
      }, {
        type: 'input',
        name: 'jsDir',
        message: 'Name your javascript directory:',
        default: function(answers) {
          if(self.cfg.jsDir) {
            return self.cfg.jsDir
          } else {
            return 'js'
          }
        }
      }, {
        type: 'input',
        name: 'libDir',
        message: 'Name your javascript library directory:',
        default: function(answers) {
          if(self.cfg.libDir) {
            return self.cfg.libDir
          } else {
            return 'lib'
          }
        }
      }, {
        type: 'input',
        name: 'fontDir',
        message: 'Name your fonts directory:',
        default: function(answers) {
          if(self.cfg.fontDir) {
            return self.cfg.fontDir
          } else {
            return 'fonts'
          }
        }
      }], function (answers) {

        if(!this.cfg.mainDir) this.cfg.mainDir = answers.mainDir;
        if(!this.cfg.themeDir && (this.cfg.environmentOption === 'wordpress' || this.cfg.environmentOption === 'drupal')) {
          this.cfg.themeDir = answers.themeDir;
        }
        this.cfg.assetsDir = answers.assetsDir;
        this.cfg.cssDir = answers.cssDir;
        this.cfg.imgDir = answers.imgDir;
        this.cfg.jsDir = answers.jsDir;
        this.cfg.libDir = answers.libDir;
        this.cfg.fontDir = answers.fontDir;

        done();
      }.bind(this));
    },

    html: function(){
      if(this.exit) return;

      if(this.cfg.environmentOption === 'static'){
        var done = this.async(),
            self = this;
        console.log(printTitle('HTML Templating'))
        var done = this.async();
        this.prompt([{
          type: 'list',
          name: 'templateOption',
          message: 'How to generate html?',
          choices: [{
            name: 'None, just use plain old html',
            value: 'html'
          }, {
            name: 'Pug (was Jade)',
            value: 'pug'
          }, {
            name: 'Nunjucks',
            value: 'nunjucks'
          }, {
            name: 'Jade (Will be deprecated)',
            value: 'jade'
          }],
          default: function(){
            if(self.cfg.templateOption) return self.cfg.templateOption
            else return 'html'
          }
        }], function (answers) {

          if(this.cfg.environmentOption === 'express') this.cfg.templateOption = 'jade';
          this.cfg.templateOption = answers.templateOption;

          done();
        }.bind(this));
      }
    },


    stylesOptions: function(){
      if(this.exit) return;

      var done = this.async(),
          self = this;

      this.composeWith('robonkey:styles',{
        options: {
          calledFrom: generatorName,
          cfg: this.cfg
        }
      });

      done();
    },

    scripts: function(){
      if(this.exit) return;

      var done = this.async(),
          self = this;
      this.composeWith('robonkey:js',{
        options: {
          calledFrom: generatorName,
          cfg: this.cfg
        }
      });

      done();
    },

    font: function(){
      if(this.exit) return;

      var done = this.async(),
          self = this;

      this.composeWith('robonkey:iconfont',{
        options: {
          calledFrom: generatorName,
          cfg: this.cfg
        }
      });

      done();
    },

  },




  configuring: {

    answers: function() {
      if(this.exit) return;

      var done = this.async();

      this.gulpDirOption = this.cfg.gulpDirOption;
      this.gulpCmdOption = this.cfg.gulpCmdOption;

      setConfigVars(this, function(result){})

      done();
    },


    config: function(){
      if(this.exit) return;

      var done = this.async();
      setConfigFiles(this, function(){
        // console.log('Config Files written...')
      });
      done();
    },

  },




  writing: function(){
    if(this.exit) return;

    var done       = this.async(),
        destRoot   = this.destinationRoot(),
        gulpRoot   = destRoot,
        sourceRoot = this.sourceRoot();
    if(this.cfg.gulpDirOption) gulpRoot = destRoot + '/gulp';

    copyFiles.copyGulpFiles(this, destRoot, gulpRoot, sourceRoot, function(){
      // console.log('Main Gulp files copied.');
    });
    copyFiles.copyProjectFiles(this, destRoot, gulpRoot, sourceRoot, function(){
      // console.log('Project files copied.');
    });
    copyFiles.copyWordpressFiles(this, destRoot, gulpRoot, sourceRoot, function(){
      // console.log('WordPress theme files copied.');
    });
    copyFiles.copyExpressFiles(this, destRoot, gulpRoot, sourceRoot, function(){
      // console.log('Express files copied.');
    });
    copyFiles.copyH5bpFiles(this, destRoot, gulpRoot, sourceRoot, function(){
      // console.log('hp5b files copied.');
    });
    copyFiles.copyHtmlFiles(this, destRoot, gulpRoot, sourceRoot, function(){
      // console.log('Html files copied.');
    });
    copyFiles.copyImageFiles(this, destRoot, gulpRoot, sourceRoot, function(){
      // console.log('Image files copied.');
    });

    done();
  },




  install: function(){
    if(this.exit) return;

    var done = this.async();
    installDep(this, function(){});
    done();
  }

});
