'use strict';

var generators  = require('yeoman-generator'),
    mkdirp      = require('mkdirp'),
    yosay       = require('yosay'),
    chalk       = require('chalk');
    //wordpress   = require('../util/wordpress.js');

var printTitle = function(title){
  return '\n\n\n\n---- ' + chalk.bgWhite.black(' ' + title + ' ') + ' ----\n';
}
function hasFeature(feat, answer) {
  return answer && answer.indexOf(feat) !== -1;
};


module.exports = generators.Base.extend({

  _folders: function(appDir){
    mkdirp(appDir + '/src');
    mkdirp(appDir + '/website');
    mkdirp(appDir + '/website/assets');
    mkdirp(appDir + '/website/assets/js');
    mkdirp(appDir + '/website/assets/js/libs');
    mkdirp(appDir + '/website/assets/images');
    mkdirp(appDir + '/website/assets/css');
    mkdirp(appDir + '/website/assets/css/libs');
    mkdirp(appDir + '/website/assets/fonts');
  },

  _html: function(destRoot, sourceRoot, templateContext) {
    if(this.noTemplateEngine) {
      // Dynamic
      this.fs.copyTpl(sourceRoot + '/website/index.html', destRoot + '/website/index.html', templateContext);
    }
  },

  _h5bp: function(destRoot, sourceRoot, templateContext) {
    if(this.includeHtaccess) {
      // Static
      this.fs.copy(sourceRoot + '/website/htaccess.txt', destRoot + '/website/.htaccess');
    }
    if(this.includeBrowserconfig) {
      // Static
      this.fs.copy(sourceRoot + '/website/browserconfig.xml', destRoot + '/website/browserconfig.xml');
    }
    if(this.includeCustomIcnFont) {
      // Static
      this.fs.copy(sourceRoot + '/website/crossdomain.xml', destRoot + '/website/crossdomain.xml');
    }
    if(this.includeRobots) {
      // Dynamic
      this.fs.copyTpl(sourceRoot + '/website/humans.txt', destRoot + '/website/humans.txt', templateContext);

      // Static
      this.fs.copy(sourceRoot + '/website/robots.txt', destRoot + '/website/robots.txt');
    }
  },

  _editorconfig: function(destRoot, sourceRoot, templateContext) {
    // Static
    this.fs.copy(sourceRoot + '/project/editorconfig.txt', destRoot + '/.editorconfig');
    this.fs.copy(sourceRoot + '/project/README.md', destRoot + '/README.md');
  },

  _git: function(destRoot, sourceRoot, templateContext) {
    // Static
    this.fs.copy(sourceRoot + '/project/gitignore.txt', destRoot + '/.gitignore');
    this.fs.copy(sourceRoot + '/project/gitattributes.txt', destRoot + '/.gitattributes');
  },

  _readme: function(destRoot, sourceRoot, templateContext) {
    // Dynamic
    this.fs.copyTpl(sourceRoot + '/project/README.md', destRoot + '/README.md', templateContext);
  },

  _bower: function(destRoot, sourceRoot, templateContext) {
    if(this.gulpFolder) {
      destRoot = destRoot + '/gulp';
    }
    // Static
    this.fs.copyTpl(sourceRoot + '/bower/bowerrc.txt', destRoot + '/.bowerrc', templateContext);

    // Dynamic
    this.fs.copyTpl(sourceRoot + '/bower/bower.json', destRoot + '/bower.json', templateContext);
  },

  _gulp: function(destRoot, sourceRoot, templateContext) {
    if(this.gulpFolder) {
      destRoot = destRoot + '/gulp';
    }
    // Dynamic
    this.fs.copyTpl(sourceRoot + '/gulp/package.json', destRoot + '/package.json', templateContext);
    this.fs.copyTpl(sourceRoot + '/gulp/config.json', destRoot + '/config.json', templateContext);
    this.fs.copyTpl(sourceRoot + '/gulp/paths.json', destRoot + '/paths.json', templateContext);
    this.fs.copyTpl(sourceRoot + '/gulp/gulpfile.js', destRoot + '/gulpfile.js', templateContext);
    this.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/images.js', destRoot + '/gulp-tasks/images.js', templateContext);
    this.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/bower.js', destRoot + '/gulp-tasks/bower.js', templateContext);
    this.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/scripts.js', destRoot + '/gulp-tasks/scripts.js', templateContext);
    this.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/clean.js', destRoot + '/gulp-tasks/clean.js', templateContext);


    if(this.includeSCSS) {
      this.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/sass.js', destRoot + '/gulp-tasks/styles.js', templateContext);
    }
    if(this.includeStylus) {
      this.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/styl.js', destRoot + '/gulp-tasks/styles.js', templateContext);
    }
    if(this.includeLess) {
      this.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/less.js', destRoot + '/gulp-tasks/styles.js', templateContext);
    }

    if(this.includeCustomIcnFont) {
      this.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/iconfont.js', destRoot + '/gulp-tasks/iconfont.js', templateContext);
    }

    if(this.noTemplateEngine) {
      // Dynamic
      this.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/html.js', destRoot + '/gulp-tasks/html.js', templateContext);
    }

    if(this.includeJade) {
      this.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/jade.js', destRoot + '/gulp-tasks/html.js', templateContext);
    }

    if(this.includeHaml) {
      this.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/haml.js', destRoot + '/gulp-tasks/html.js', templateContext);
    }

    if(this.includeHandlebars) {
      this.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/handlebars.js', destRoot + '/gulp-tasks/html.js', templateContext);
    }

    if(this.includeNunjucks) {
      this.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/nunjucks.js', destRoot + '/gulp-tasks/html.js', templateContext);
    }

    if(this.includeModernizr) {
      this.fs.copyTpl(sourceRoot + '/gulp/gulp-tasks/modernizr.js', destRoot + '/gulp-tasks/modernizr.js', templateContext);
    }
  },

  _iconfont: function(destRoot, sourceRoot, templateContext) {
    if(this.includeCustomIcnFont) {
      // Static
      this.fs.copy(sourceRoot + '/src/iconfont/illustrator', destRoot + '/src/iconfont/illustrator');
      this.fs.copy(sourceRoot + '/src/iconfont/svg', destRoot + '/src/iconfont/svg');
    }
    if(this.includeCustomIcnFont && this.includeSCSS) {
      this.fs.copy(sourceRoot + '/src/iconfont/template/_icons.scss', destRoot + '/src/iconfont/template/_icons.scss');
    }
    if(this.includeCustomIcnFont && this.includeStylus) {
      this.fs.copy(sourceRoot + '/src/iconfont/template/icons.styl', destRoot + '/src/iconfont/template/icons.styl');
    }
    if(this.includeCustomIcnFont && this.includeLess) {
      this.fs.copy(sourceRoot + '/src/iconfont/template/icons.less', destRoot + '/src/iconfont/template/icons.less');
    }

  },

  _images: function(destRoot, sourceRoot, templateContext) {
    // Static
    this.fs.copy(sourceRoot + '/src/images', destRoot + '/src/images');
  },

  _js: function(destRoot, sourceRoot, templateContext) {
    // Static
    this.fs.copy(sourceRoot + '/src/js', destRoot + '/src/js');
    if(this.includeModernizr) {
      this.fs.copy(sourceRoot + '/src/modernizr', destRoot + '/src/modernizr');
    }
  },

  _scss: function(destRoot, sourceRoot, templateContext) {
    if(this.includeSCSS) {
      // Static
      this.fs.copy(sourceRoot + '/src/scss/base', destRoot + '/src/scss/base');

      // Dynamic
      this.fs.copyTpl(sourceRoot + '/src-tpl/scss/base/_fonts.scss', destRoot + '/src/scss/base/_fonts.scss', templateContext);
      this.fs.copyTpl(sourceRoot + '/src-tpl/scss/base/_variables.scss', destRoot + '/src/scss/base/_variables.scss', templateContext);
      this.fs.copyTpl(sourceRoot + '/src-tpl/scss/style.scss', destRoot + '/src/scss/style.scss', templateContext);

      if(this.includeSemanticSCSS) {
        this.fs.copy(sourceRoot + '/src-tpl/scss/base/_semantic-grid.scss', destRoot + '/src/scss/base/_grid.scss');
      } else {
        this.fs.copyTpl(sourceRoot + '/src-tpl/scss/base/_grid.scss', destRoot + '/src/scss/base/_grid.scss', templateContext);
      }

      if(this.includeCustomIcnFont) {
        this.fs.copyTpl(sourceRoot + '/src-tpl/scss/modules/_icons.scss', destRoot + '/src/scss/modules/_icons.scss', templateContext);
      }
      if(this.includeBreakpoint) {
        this.fs.copy(sourceRoot + '/src-tpl/scss/mixins/_mediaqueries.scss', destRoot + '/src/scss/mixins/_mediaqueries.scss');
      }
      if(this.includeReset) {
        this.fs.copy(sourceRoot + '/src-tpl/scss/reset/_reset.scss', destRoot + '/src/scss/base/_reset.scss');
      }
      if(this.includeNormalize) {
        this.fs.copy(sourceRoot + '/src-tpl/scss/reset/_normalize.scss', destRoot + '/src/scss/base/_normalize.scss');
      }
      if(this.includeSanitize) {
        this.fs.copy(sourceRoot + '/src-tpl/scss/reset/_sanitize.scss', destRoot + '/src/scss/base/_sanitize.scss');
      }
    }
  },

  _stylus: function(destRoot, sourceRoot, templateContext) {
    if(this.includeStylus) {
      // Static
      this.fs.copy(sourceRoot + '/src/stylus', destRoot + '/src/stylus');

      // Dynamic
      this.fs.copyTpl(sourceRoot + '/src-tpl/stylus/base/fonts.styl', destRoot + '/src/stylus/base/fonts.styl', templateContext);
      this.fs.copyTpl(sourceRoot + '/src-tpl/stylus/base/variables.styl', destRoot + '/src/stylus/base/variables.styl', templateContext);
      this.fs.copyTpl(sourceRoot + '/src-tpl/stylus/style.styl', destRoot + '/src/stylus/style.styl', templateContext);

      if(this.includeSemanticStylus) {
        this.fs.copy(sourceRoot + '/src-tpl/stylus/base/semantic-grid.styl', destRoot + '/src/stylus/base/grid.styl');
      } else {
        this.fs.copyTpl(sourceRoot + '/src-tpl/stylus/base/grid.styl', destRoot + '/src/stylus/base/grid.styl', templateContext);
      }

      if(this.includeCustomIcnFont) {
        this.fs.copyTpl(sourceRoot + '/src-tpl/stylus/modules/icons.styl', destRoot + '/src/stylus/modules/icons.styl', templateContext);
      }

      if(this.includeReset) {
        this.fs.copy(sourceRoot + '/src-tpl/stylus/reset/reset.styl', destRoot + '/src/stylus/base/reset.styl');
      }
      if(this.includeNormalize) {
        this.fs.copy(sourceRoot + '/src-tpl/stylus/reset/normalize.styl', destRoot + '/src/stylus/base/normalize.styl');
      }
      if(this.includeSanitize) {
        this.fs.copy(sourceRoot + '/src-tpl/stylus/reset/sanitize.styl', destRoot + '/src/stylus/base/sanitize.styl');
      }
    }
  },

  _less: function(destRoot, sourceRoot, templateContext) {
    if(this.includeLess) {
      this.fs.copy(sourceRoot + '/src/less', destRoot + '/src/less');

      // Dynamic
      this.fs.copyTpl(sourceRoot + '/src-tpl/less/base/fonts.less', destRoot + '/src/less/base/fonts.less', templateContext);
      this.fs.copyTpl(sourceRoot + '/src-tpl/less/base/variables.less', destRoot + '/src/less/base/variables.less', templateContext);
      this.fs.copyTpl(sourceRoot + '/src-tpl/less/style.less', destRoot + '/src/less/style.less', templateContext);

      if(this.includeSemanticLess) {
        this.fs.copy(sourceRoot + '/src-tpl/less/base/semantic-grid.less', destRoot + '/src/less/base/grid.less');
      } else {
        this.fs.copyTpl(sourceRoot + '/src-tpl/less/base/grid.less', destRoot + '/src/less/base/grid.less', templateContext);
      }

      if(this.includeLessHat) {
        this.fs.copy(sourceRoot + '/src-tpl/less/mixins/lesshat.less', destRoot + '/src/less/base/mixins/lesshat.less');
        this.fs.copy(sourceRoot + '/src-tpl/less/mixins/lesshat-prefixed.less', destRoot + '/src/less/base/mixins/lesshat-prefixed.less');
      }

      if(this.includeLessMQ) {
        this.fs.copy(sourceRoot + '/src-tpl/less/mixins/mq.less', destRoot + '/src/less/base/mixins/mq.less');
        this.fs.copy(sourceRoot + '/src-tpl/less/mixins/mq-prefixed.less', destRoot + '/src/less/base/mixins/mq-prefixed.less');
      }

      if(this.includeCustomIcnFont) {
        this.fs.copyTpl(sourceRoot + '/src-tpl/less/modules/icons.less', destRoot + '/src/less/modules/icons.less', templateContext);
      }

      if(this.includeReset) {
        this.fs.copy(sourceRoot + '/src-tpl/less/reset/reset.less', destRoot + '/src/less/base/reset.less');
      }
      if(this.includeNormalize) {
        this.fs.copy(sourceRoot + '/src-tpl/less/reset/normalize.less', destRoot + '/src/less/base/normalize.less');
      }
      if(this.includeSanitize) {
        this.fs.copy(sourceRoot + '/src-tpl/less/reset/sanitize.less', destRoot + '/src/less/base/sanitize.less');
      }
    }
  },

  _jade: function(destRoot, sourceRoot, templateContext) {
    if(this.includeJade) {
      // Static
      this.fs.copy(sourceRoot + '/src/jade', destRoot + '/src/jade');

      // Dyanamic
      this.fs.copyTpl(sourceRoot + '/src-tpl/jade/templates/base.jade', destRoot + '/src/jade/templates/base.jade', templateContext);
    }
  },

  _handlebars: function(destRoot, sourceRoot, templateContext) {
    if(this.includeHandlebars) {
      this.fs.copy(sourceRoot + '/src/handlebars', destRoot + '/src/handlebars');
      this.fs.copyTpl(sourceRoot + '/src-tpl/handlebars/index.html', destRoot + '/src/handlebars/index.html', templateContext);
    }
  },

  _nunjucks: function(destRoot, sourceRoot, templateContext) {
    if(this.includeNunjucks) {
      this.fs.copy(sourceRoot + '/src/nunjucks', destRoot + '/src/nunjucks');
      this.fs.copyTpl(sourceRoot + '/src-tpl/nunjucks/base/base.html', destRoot + '/src/nunjucks/base/base.html', templateContext);
    }
  },

  _haml: function(destRoot, sourceRoot, templateContext) {
    if(this.includeHaml) {
      // Static
      this.fs.copyTpl(sourceRoot + '/src-tpl/haml/index.haml', destRoot + '/src/haml/index.haml', templateContext);
    }
  },

  _endMsg: function() {
    var allDone =
      '\n.-------------------.' +
      '\n| Robonkey says:    |' +
      '\n| '+chalk.yellow.bold('ALL DONE!') + '         |' +
      '\n| ' + chalk.yellow.bold('Now fly, my pets!') + ' |' +
      '\n\'-------------------\'' +
      '\n';

    this.log(allDone);
  },

  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  initializing: function() {
    this.pkg = require('../package.json');
    var message = chalk.yellow.bold('Welcome to Robonkey ') + chalk.yellow('\'Cause everyone needs a Robotic Monkey');
    this.log(yosay(message, {maxLength: 19}));
  },

  prompting: {

    project: function() {
      this.log(printTitle('Project Details'))
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
    },

    cssBase: function() {
      this.log(printTitle('CSS Base Styles'))
      var done = this.async();
      this.prompt([{
        type: 'list',
        name: 'baseStyles',
        message: 'What base styles to include?',
        choices: [{
          name: 'Sanitize',
          value: 'includeSanitize',
          checked: false
        }, {
          name: 'Reset',
          value: 'includeReset',
          checked: false
        }, {
          name: 'Normalize',
          value: 'includeNormalize',
          checked: false
        }, {
          name: 'None',
          value: 'noBaseStyles',
          checked: false
        }]
      }], function (answers) {
          var baseStyles = answers.baseStyles;
          this.includeReset = hasFeature('includeReset', baseStyles);
          this.includeNormalize = hasFeature('includeNormalize', baseStyles);
          this.includeSanitize = hasFeature('includeSanitize', baseStyles);
          this.noBaseStyles = hasFeature('noBaseStyles', baseStyles);
          done();
        }.bind(this));
    },


    css: function() {
      this.log(printTitle('Preprocessors'))
      var done = this.async();
      this.prompt([{
        type: 'list',
        name: 'preproType',
        message: 'What preprocessor would you like to use?',
        choices: [{
          name: 'SCSS',
          value: 'includeSCSS',
          checked: true
        }, {
          name: 'Stylus',
          value: 'includeStylus',
          checked: false
        }, {
          name: 'Less',
          value: 'includeLess',
          checked: false
        }]
      } ,{
        when: function (answers) {
          return answers.preproType.indexOf('includeSCSS') !== -1;
        },
        type: 'list',
        name: 'mixinLibsSCSS',
        message: 'What mixin libraries would you like to use?',
        choices: [{
          name: 'Bourbon',
          value: 'includeBourbon',
          checked: false
        }, {
          name: 'Compass Mixins',
          value: 'includeCompass',
          checked: false
        }, {
          name: 'None',
          value: 'noMixinLibSCSS',
          checked: true
        }]
      }
      ,{
        when: function (answers) {
          return answers.preproType.indexOf('includeStylus') !== -1;
        },
        type: 'list',
        name: 'mixinLibsStylus',
        message: 'What mixin libraries would you like to use?',
        choices: [{
          name: 'Nib',
          value: 'includeNib',
          checked: false
        }, {
          name: 'Kouto Swiss',
          value: 'includeKoutoSwiss',
          checked: false
        }, {
          name: 'None',
          value: 'noMixinLibStylus',
          checked: true
        }]
      }
      ,{
        when: function (answers) {
          return answers.preproType.indexOf('includeLess') !== -1;
        },
        type: 'list',
        name: 'mixinLibsLess',
        message: 'What mixin libraries would you like to use?',
        choices: [{
          name: 'Less Hat',
          value: 'includeLessHat',
          checked: false
        }, {
          name: 'None',
          value: 'noMixinLibLess',
          checked: true
        }]
      }


      // Media Query Libraries
      ,{
        when: function (answers) {
          return answers.preproType.indexOf('includeSCSS') !== -1;
        },
        type: 'list',
        name: 'mqLibsSCSS',
        message: 'What MediaQuery Library to use?',
        choices: [{
          name: 'Breakpoint',
          value: 'includeBreakpoint',
          checked: false
        }, {
          name: 'Include Media',
          value: 'includeIncludeMedia',
          checked: false
        }, {
          name: 'None',
          value: 'noMQLibSCSS',
          checked: true
        }]
      }
      ,{
        when: function (answers) {
          return answers.preproType.indexOf('includeStylus') !== -1;
        },
        type: 'list',
        name: 'mqLibsStylus',
        message: 'What MediaQuery Library to use?',
        choices: [{
          name: 'Rupture',
          value: 'includeRupture',
          checked: false
        }, {
          name: 'None',
          value: 'noMQLibStylus',
          checked: true
        }]
      }
      ,{
        when: function (answers) {
          return answers.preproType.indexOf('includeLess') !== -1;
        },
        type: 'list',
        name: 'mqLibsLess',
        message: 'What MediaQuery Library to use?',
        choices: [{
          name: 'Less-MQ',
          value: 'includeLessMQ',
          checked: false
        }, {
          name: 'None',
          value: 'noMQLibLess',
          checked: true
        }]
      }


      // Grid Libraries
      ,{
        when: function (answers) {
          return answers.preproType.indexOf('includeSCSS') !== -1;
        },
        type: 'list',
        name: 'gridLibsSCSS',
        message: 'What Grids Library to use?',
        choices: [{
          name: 'Jeet',
          value: 'includeJeetSCSS',
          checked: false
        }, {
          name: 'Susy',
          value: 'includeSusy',
          checked: false
        }, {
          name: 'Neat (Will include Bourbon)',
          value: 'includeNeat',
          checked: false
        }, {
          name: 'Semantic.gs',
          value: 'includeSemanticSCSS',
          checked: false
        }, {
          name: 'None',
          value: 'noGridLibSCSS',
          checked: false
        }]
      }
      ,{
        when: function (answers) {
          return answers.preproType.indexOf('includeStylus') !== -1;
        },
        type: 'list',
        name: 'gridLibsStylus',
        message: 'What Grids Library to use?',
        choices: [{
          name: 'Jeet',
          value: 'includeJeetStylus',
          checked: false
        }, {
          name: 'sGrid',
          value: 'includeSGrid',
          checked: false
        }, {
          name: 'Semantic.gs',
          value: 'includeSemanticStylus',
          checked: false
        }, {
          name: 'None',
          value: 'noGridLibStylus',
          checked: false
        }]
      }
      ,{
        when: function (answers) {
          return answers.preproType.indexOf('includeLess') !== -1;
        },
        type: 'list',
        name: 'gridLibsLess',
        message: 'What Grids Library to use?',
        choices: [{
          name: 'Gee',
          value: 'includeGee',
          checked: false
        }, {
          name: 'Semantic.gs',
          value: 'includeSemanticLess',
          checked: false
        }, {
          name: 'None',
          value: 'noGridLibLess',
          checked: false
        }]
      }], function (answers) {
          var preproType = answers.preproType;

          // Sass
          var mixinLibsSCSS = answers.mixinLibsSCSS;
          var gridLibsSCSS = answers.gridLibsSCSS;
          var mqLibsSCSS = answers.mqLibsSCSS;
          this.includeSCSS = hasFeature('includeSCSS', preproType);
          this.includeBourbon = hasFeature('includeBourbon', mixinLibsSCSS);
          this.includeCompass = hasFeature('includeCompass', mixinLibsSCSS);
          this.noMixinLibSCSS = hasFeature('noMixinLibSCSS', mixinLibsSCSS);
          this.includeSusy = hasFeature('includeSusy', gridLibsSCSS);
          this.includeJeetSCSS = hasFeature('includeJeetSCSS', gridLibsSCSS);
          this.includeNeat = hasFeature('includeNeat', gridLibsSCSS);
          this.includeSemanticSCSS = hasFeature('includeSemanticSCSS', gridLibsSCSS);
          this.noGridLibSCSS = hasFeature('noGridLibSCSS', gridLibsSCSS);
          this.includeBreakpoint = hasFeature('includeBreakpoint', mqLibsSCSS);
          this.includeIncludeMedia = hasFeature('includeIncludeMedia', mqLibsSCSS);
          this.noMQLibSCSS = hasFeature('noMQLibSCSS', mqLibsSCSS);

          // Stylus
          var mixinLibsStylus = answers.mixinLibsStylus;
          var gridLibsStylus = answers.gridLibsStylus;
          var mqLibsStylus = answers.mqLibsStylus;
          this.includeStylus = hasFeature('includeStylus', preproType);
          this.includeNib = hasFeature('includeNib', mixinLibsStylus);
          this.includeKoutoSwiss = hasFeature('includeKoutoSwiss', mixinLibsStylus);
          this.noMixinLibStylus = hasFeature('noMixinLibStylus', mixinLibsStylus);
          this.includeJeetStylus = hasFeature('includeJeetStylus', gridLibsStylus);
          this.includeSGrid = hasFeature('includeSGrid', gridLibsStylus);
          this.includeSemanticStylus = hasFeature('includeSemanticStylus', gridLibsStylus);
          this.noGridLibStylus = hasFeature('noGridLibStylus', gridLibsStylus);
          this.includeRupture = hasFeature('includeRupture', mqLibsStylus);
          this.noMQLibStylus = hasFeature('noMQLibStylus', mqLibsStylus);

          // Less
          var mixinLibsLess = answers.mixinLibsLess;
          var gridLibsLess = answers.gridLibsLess;
          var mqLibsLess = answers.mqLibsLess;
          this.includeLess = hasFeature('includeLess', preproType);
          this.includeLessHat = hasFeature('includeLessHat', mixinLibsLess);
          this.noMixinLibLess = hasFeature('noMixinLibLess', mixinLibsLess);
          this.includeGee = hasFeature('includeGee', gridLibsLess);
          this.includeSemanticLess = hasFeature('includeSemanticLess', gridLibsLess);
          this.noGridLibLess = hasFeature('noGridLibLess', gridLibsLess);
          this.includeLessMQ = hasFeature('includeLessMQ', mqLibsLess);
          this.noMQLibLess = hasFeature('noMQLibLess', mqLibsLess);
          done();
        }.bind(this));
    },


    html: function() {
      this.log(printTitle('HTML Templating'))
      var done = this.async();
      this.prompt([{
        type: 'list',
        name: 'templateEngine',
        message: 'How to generate html?',
        choices: [{
          name: 'Jade',
          value: 'includeJade',
          checked: false
        }, {
          name: 'Nunjucks',
          value: 'includeNunjucks',
          checked: false
        }, {
          name: 'None, just use plain old html',
          value: 'noTemplateEngine',
          checked: true
        }]
      }], function (answers) {
          var templateEngine = answers.templateEngine;
          this.includeJade = hasFeature('includeJade', templateEngine);
          this.includeNunjucks = hasFeature('includeNunjucks', templateEngine);
          this.includeHaml = false;
          this.includeHandlebars = false;
          this.noTemplateEngine = hasFeature('noTemplateEngine', templateEngine);
          done();
        }.bind(this));
    },

    cssPost: function() {
      this.log(printTitle('postCSS'))
      var done = this.async();
      this.prompt([{
        type: 'checkbox',
        name: 'postCSSPlugins',
        message: 'What postCSS plugins to include?',
        choices: [{
          name: 'Autoprefixer',
          value: 'includePcssAutoprefixer',
          checked: true
        }, {
          name: 'CSS Nano',
          value: 'includePcssNano',
          checked: true
        }, {
          name: 'Gradient Transparency Fix',
          value: 'includePcssGradientFix',
          checked: true
        }, {
          name: 'MQ Packer',
          value: 'includePcssMQPacker',
          checked: true
        }, {
          name: 'MQ Keyframes',
          value: 'includePcssMQKeyframes',
          checked: false
        }, {
          name: 'Selector Not',
          value: 'includePcssSelectorNot',
          checked: false
        }, {
          name: 'Selector Matches',
          value: 'includePcssSelectorMatches',
          checked: false
        }, {
          name: 'Class Prefix',
          value: 'includePcssClassPrefix',
          checked: false
        }, {
          name: 'Scopify',
          value: 'includePcssScopify',
          checked: false
        }]
      }], function (answers) {
          var postCSSPlugins = answers.postCSSPlugins;
          this.includePcssAutoprefixer = hasFeature('includePcssAutoprefixer', postCSSPlugins);
          this.includePcssSelectorNot = hasFeature('includePcssSelectorNot', postCSSPlugins);
          this.includePcssSelectorMatches = hasFeature('includePcssSelectorMatches', postCSSPlugins);
          this.includePcssGradientFix = hasFeature('includePcssGradientFix', postCSSPlugins);
          this.includePcssMQPacker = hasFeature('includePcssMQPacker', postCSSPlugins);
          this.includePcssMQKeyframes = hasFeature('includePcssMQKeyframes', postCSSPlugins);
          this.includePcssNano = hasFeature('includePcssNano', postCSSPlugins);
          this.includePcssClassPrefix = hasFeature('includePcssClassPrefix', postCSSPlugins);
          this.includePcssScopify = hasFeature('includePcssScopify', postCSSPlugins);
          this.includePostCSS = false;
          if(this.includePcssAutoprefixer || this.includePcssSelectorNot || this.includePcssSelectorMatches || this.includePcssGradientFix || this.includePcssMQPacker || this.includePcssMQKeyframes || this.includePcssNano || this.includePcssClassPrefix || this.includePcssScopify) {
            this.includePostCSS = true;
          }

          done();
        }.bind(this));
    },

    javascriptLibs: function() {
      this.log(printTitle('Javascript Libraries'))
      var done = this.async();
      this.prompt([{
        type: 'checkbox',
        name: 'scriptsJS',
        message: 'What Javascript libraries to include?',
        choices: [{
          name: 'jQuery',
          value: 'includeJQuery',
          checked: true
        }, {
          name: 'Waypoints',
          value: 'includeWaypoints',
          checked: false
        }, {
          name: 'Signals',
          value: 'includeSignals',
          checked: false
        }, {
          name: 'D3js',
          value: 'includeD3',
          checked: false
        }, {
          name: 'TweenMax',
          value: 'includeTweenmax',
          checked: false
        }, {
          name: 'Enquire',
          value: 'includeEnquire',
          checked: false
        }]
      }], function (answers) {
        var scriptsJS = answers.scriptsJS;
        this.includeJQuery = hasFeature('includeJQuery', scriptsJS);
        this.includeWaypoints = hasFeature('includeWaypoints', scriptsJS);
        this.includeSignals = hasFeature('includeSignals', scriptsJS);
        this.includeD3 = hasFeature('includeD3', scriptsJS);
        this.includeTweenmax = hasFeature('includeTweenmax', scriptsJS);
        this.includeEnquire = hasFeature('includeEnquire', scriptsJS);
          done();
        }.bind(this));
    },

    h5bp: function() {
      this.log(printTitle('h5bp Extra\'s'))
      var done = this.async();
      this.prompt([{
        type: 'checkbox',
        name: 'rootFiles',
        message: 'What h5bp extra\'s to include?',
        choices: [{
          name: '.htaccess',
          value: 'includeHtaccess',
          checked: true
        }, {
          name: 'browserconfig.xml (for windows 10 tiles)',
          value: 'includeBrowserconfig',
          checked: true
        }, {
          name: 'crossdomain.xml',
          value: 'includeCrossdomain',
          checked: false
        }, {
          name: 'robots.txt and humans.txt',
          value: 'includeRobots',
          checked: false
        }]
      }], function (answers) {
          var rootFiles = answers.rootFiles;
          this.includeHtaccess = hasFeature('includeHtaccess', rootFiles);
          this.includeCrossdomain = hasFeature('includeCrossdomain', rootFiles);
          this.includeBrowserconfig = hasFeature('includeBrowserconfig', rootFiles);
          this.includeRobots = hasFeature('includeRobots', rootFiles);
          done();
        }.bind(this));
    },


    extas: function() {
      this.log(printTitle('Extra\'s'))
      var done = this.async();
      this.prompt([{
        type: 'confirm',
        name: 'includeModernizr',
        message: 'Would you like to use Modernizr?',
        default: true
      }, {
          type: 'confirm',
          name: 'includeCustomIcnFont',
          message: 'Would you like to include a custom icon font?',
          default: false
      }, {
        when: function (answers) {
          return answers.includeCustomIcnFont === true;
        },
        name: 'customIconFontName',
        message: 'Name your custom icon font',
        default: 'robonky-glyphs'
      }, {
        type: 'confirm',
        name: 'includeGA',
        message: 'Provide Google Analytics Script?',
        default: false
      }], function (answers) {
          this.includeModernizr = answers.includeModernizr;
          this.includeCustomIcnFont = answers.includeCustomIcnFont;
          this.customIconFontName = answers.customIconFontName;
          this.includeGA = answers.includeGA;
          done();
        }.bind(this));
    },

    extas: function() {
      this.log(printTitle('Gulp'))
      var done = this.async();
      this.prompt([{
        type: 'confirm',
        name: 'gulpFolder',
        message: 'Place Gulp files in a subfolder?',
        default: true
      }, {
        type: 'confirm',
        name: 'runGulp',
        message: 'Run gulp command after install?',
        default: false
      }], function (answers) {
          this.gulpFolder = answers.gulpFolder;
          this.runGulp = answers.runGulp;
          done();
        }.bind(this));
    }
  },

  configuring: function(answers){
    this.config.forceSave();
  },

  writing: function(){
    var destRoot = this.destinationRoot(),
        sourceRoot = this.sourceRoot(),
        appDir = destRoot,
        templateContext = {
          localUrl: this.localUrl,
          appname: this.appname,
          appdescription: this.appdescription,
          appauthor: this.appauthor,
          appemail: this.appemail,
          appversion: this.appversion,
          applicense: this.applicense,
          includeJQuery: this.includeJQuery,
          includeWaypoints: this.includeWaypoints,
          includeSignals: this.includeSignals,
          includeD3: this.includeD3,
          includeTweenmax: this.includeTweenmax,
          includeEnquire: this.includeEnquire,
          includeModernizr: this.includeModernizr,
          includeGA: this.includeGA,
          includePostCSS: this.includePostCSS,
          includeCustomIcnFont: this.includeCustomIcnFont,
          includeHtaccess: this.includeHtaccess,
          includeCrossdomain: this.includeCrossdomain,
          includeBrowserconfig: this.includeBrowserconfig,
          includeRobots: this.includeRobots,
          includePcssAutoprefixer: this.includePcssAutoprefixer,
          includePcssSelectorNot: this.includePcssSelectorNot,
          includePcssSelectorMatches: this.includePcssSelectorMatches,
          includePcssGradientFix: this.includePcssGradientFix,
          includePcssMQPacker: this.includePcssMQPacker,
          includePcssMQKeyframes: this.includePcssMQKeyframes,
          includePcssClassPrefix: this.includePcssClassPrefix,
          includePcssScopify: this.includePcssScopify,
          includePcssNano: this.includePcssNano,
          customScope: this.customScope,
          includeReset: this.includeReset,
          includeNormalize: this.includeNormalize,
          includeSanitize: this.includeSanitize,
          includeSCSS: this.includeSCSS,
          includeSusy: this.includeSusy,
          includeBreakpoint: this.includeBreakpoint,
          includeBourbon: this.includeBourbon,
          includeNeat: this.includeNeat,
          includeJeetSCSS: this.includeJeetSCSS,
          includeIncludeMedia: this.includeIncludeMedia,
          includeCompass: this.includeCompass,
          includeSemanticSCSS: this.includeSemanticSCSS,
          includeStylus: this.includeStylus,
          includeNib: this.includeNib,
          includeKoutoSwiss: this.includeKoutoSwiss,
          includeJeetStylus: this.includeJeetStylus,
          includeSGrid: this.includeSGrid,
          includeSemanticStylus: this.includeSemanticStylus,
          includeRupture: this.includeRupture,
          includeLess: this.includeLess,
          includeGee: this.includeGee,
          includeSemanticLess: this.includeSemanticLess,
          includeLessHat: this.includeLessHat,
          includeLessMQ: this.includeLessMQ,
          noGridLibSCSS: this.noGridLibSCSS,
          noMixinLibSCSS: this.noMixinLibSCSS,
          noMQLibSCSS: this.noMQLibSCSS,
          noGridLibStylus: this.noGridLibStylus,
          noMixinLibStylus: this.noMixinLibStylus,
          noMQLibStylus: this.noMQLibStylus,
          noGridLibLess: this.noGridLibLess,
          noMixinLibLess: this.noMixinLibLess,
          noMQLibLess: this.noMQLibLess,
          noBaseStyles: this.noBaseStyles,
          includeJade: this.includeJade,
          includeHaml: this.includeHaml,
          includeHandlebars: this.includeHandlebars,
          includeNunjucks: this.includeNunjucks,
          noTemplateEngine: this.noTemplateEngine,
          gulpFolder: this.gulpFolder
        };
    this._folders(appDir);
    this._html(destRoot, sourceRoot, templateContext);
    this._h5bp(destRoot, sourceRoot, templateContext);
    this._images(destRoot, sourceRoot, templateContext);
    this._scss(destRoot, sourceRoot, templateContext);
    this._stylus(destRoot, sourceRoot, templateContext);
    this._less(destRoot, sourceRoot, templateContext);
    this._editorconfig(destRoot, sourceRoot, templateContext);
    this._git(destRoot, sourceRoot, templateContext);
    this._readme(destRoot, sourceRoot, templateContext);
    this._bower(destRoot, sourceRoot, templateContext);
    this._gulp(destRoot, sourceRoot, templateContext);
    this._iconfont(destRoot, sourceRoot, templateContext);
    this._js(destRoot, sourceRoot, templateContext);
    this._jade(destRoot, sourceRoot, templateContext);
    this._haml(destRoot, sourceRoot, templateContext);
    this._handlebars(destRoot, sourceRoot, templateContext);
    this._nunjucks(destRoot, sourceRoot, templateContext);

  },

  install: function() {
    if(this.gulpFolder) {
      // Change working directory to 'gulp' for dependency install
      var npmdir = process.cwd() + '/gulp';
      process.chdir(npmdir);
    }
    this.bowerInstall();
    this.npmInstall();
  },
  end: function() {
    this._endMsg();
    if(this.runGulp) {
      this.spawnCommand('gulp', ['serve']);
    }
  }

});
