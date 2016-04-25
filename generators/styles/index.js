'use strict';

var yeoman          = require('yeoman-generator'),
    fs              = require('fs'),
    path            = require('path'),
    chalk           = require('chalk'),
    mkdirp          = require('mkdirp'),
    jsonfile        = require('jsonfile'),
    generatorName   = path.basename(__dirname);

var greeting        = require('../app/helpers/greeting'),
    hasFeature      = require('../app/helpers/hasFeature'),
    printTitle      = require('../app/helpers/printTitle');

var init            = require('../app/config/init'),
    setConfigVars   = require('../app/config/setConfigVars'),
    setConfigFiles  = require('../app/config/setConfigFiles'),
    copyFiles       = require('../app/config/copyFiles'),
    installDep      = require('../app/config/installDep');

var structureExists = require('../app/prompts/structureExists'),
    gulpPrompt      = require('../app/prompts/gulpPrompt');


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
    gulp: function(){
      gulpPrompt(this, function(){})
    },

    existingStructure: function(){
      if(this.exit) return;
      structureExists(this, ['mainDir', 'assetsDir', 'cssDir', 'gulpDirOption'], function(){});
    },

    structure: function(){
      if(!this.calledFrom) {
        var done = this.async(),
            self = this;

        console.log(printTitle('Folder Structure'));

        this.prompt([{
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
        }], function (answers) {
          this.cfg.mainDir = answers.mainDir;
          this.cfg.assetsDir = answers.assetsDir;
          this.cfg.cssDir = answers.cssDir;

          done();
        }.bind(this));
      }
    },





    baseStyles: function(){
      if(this.exit) return;

      console.log(printTitle('Base Styles'));

      var done = this.async(),
          self = this;
      this.prompt([{
        type: 'list',
        name: 'baseStyleOption',
        message: 'What base styles to include?',
        choices: [{
          name: 'None',
          value: 'none'
        }, {
          name: 'Reset',
          value: 'reset'
        }, {
          name: 'Normalize',
          value: 'normalize'
        }, {
          name: 'Sanitize',
          value: 'sanitize'
        }],
        default: function(answers){
          if(self.cfg.baseStyleOption) return self.cfg.baseStyleOption
          else return 'none'
        }
      }], function (answers) {
        this.cfg.baseStyleOption = answers.baseStyleOption;

        done();
      }.bind(this));
    },





    styles: function(){
      if(this.exit) return;

      console.log(printTitle('CSS Preprocessor'));

      var done = this.async(),
          self = this;
      this.prompt([{
        type: 'list',
        name: 'preproOption',
        message: 'How would you like to write css?',
        choices: [
        //   {
        //   name: 'None, or I\'ll build my own with postcss',
        //   value: 'none'
        // },
        //   {
        //   name: 'PreCss',
        //   value: 'precss'
        // },
         {
          name: 'Sass',
          value: 'scss'
        }, {
          name: 'Stylus',
          value: 'stylus'
        }, {
          name: 'Less',
          value: 'less'
        }],
        default: function(){
          if(self.cfg.preproOption) return self.cfg.preproOption
          else return 'scss'
        }
      }], function (answers) {
        this.cfg.preproOption = answers.preproOption;

        done();
      }.bind(this));
    },







    sass: function(){
      if(this.cfg.preproOption === 'scss'){
        var done = this.async(),
            self = this;

        console.log(printTitle('Sass Libraries'));

        this.prompt([{
          type: 'list',
          name: 'mixinOption',
          message: 'What mixin libraries would you like to use?',
          choices: [{
            name: 'Default',
            value: 'default'
          }, {
            name: 'Bourbon',
            value: 'bourbon'
          }, {
            name: 'Compass Mixins',
            value: 'compassmixins'
          }],
          default: function(answers){
            if(self.cfg.mixinOption && self.cfg.preproOption === 'scss') return self.cfg.mixinOption
            else return 'default'
          }
        }


        // Media Query Libraries
        ,{
          type: 'list',
          name: 'mqOption',
          message: 'What MediaQuery Library to use?',
          choices: [{
            name: 'Default',
            value: 'default'
          }, {
            name: 'Breakpoint',
            value: 'breakpoint'
          }, {
            name: 'Include Media',
            value: 'includemedia'
          }],
          default: function(answers){
            if(self.cfg.mqOption && self.cfg.preproOption === 'scss') return self.cfg.mqOption
            else return 'default'
          }
        }


        // Grid Libraries
        ,{
          type: 'list',
          name: 'gridOption',
          message: 'What Grids Library to use?',
          choices: [{
            name: 'None',
            value: 'none'
          }, {
            name: 'Jeet',
            value: 'jeet'
          }, {
            name: 'Susy',
            value: 'susy'
          }, {
            name: 'Gridle',
            value: 'gridle'
          }, {
            name: 'Gridle Flex',
            value: 'gridleflex'
          }, {
            name: 'Neat (Will include Bourbon)',
            value: 'neat'
          }, {
            name: 'Semantic.gs',
            value: 'semantic'
          }],
          default: function(answers){
            if(self.cfg.gridOption && self.cfg.preproOption === 'scss') return self.cfg.gridOption
            else return 'none'
          }
        }], function (answers) {
          this.cfg.mixinOption = answers.mixinOption;
          this.cfg.mqOption = answers.mqOption;
          this.cfg.gridOption = answers.gridOption;

          done();
      }.bind(this));
    }
  },



  stylus: function(){
    if(this.cfg.preproOption === 'stylus'){
      var done = this.async(),
          self = this;

      console.log(printTitle('Stylus Libraries'));

      this.prompt([{
        type: 'list',
        name: 'mixinOption',
        message: 'What mixin libraries would you like to use?',
        choices: [{
          name: 'Default',
          value: 'default'
        }, {
          name: 'Nib',
          value: 'nib'
        }, {
          name: 'Kouto Swiss',
          value: 'koutoswiss'
        }],
        default: function(answers){
          if(self.cfg.mixinOption && self.cfg.preproOption === 'stylus') return self.cfg.mixinOption
          else return 'default'
        }
      }


      // Media Query Libraries
      ,{
        type: 'list',
        name: 'mqOption',
        message: 'What MediaQuery Library to use?',
        choices: [{
          name: 'Default',
          value: 'default'
        }, {
          name: 'Rupture',
          value: 'rupture'
        }],
        default: function(answers){
          if(self.cfg.mqOption && self.cfg.preproOption === 'stylus') return self.cfg.mqOption
          else return 'default'
        }
      }


      // Grid Libraries
      ,{
        type: 'list',
        name: 'gridOption',
        message: 'What Grids Library to use?',
        choices: [{
          name: 'None',
          value: 'none'
        }, {
          name: 'Jeet',
          value: 'jeet'
        }, {
          name: 'sGrid',
          value: 'sgrid'
        }, {
          name: 'Semantic.gs',
          value: 'semantic'
        }],
        default: function(answers){
          if(self.cfg.gridOption && self.cfg.preproOption === 'stylus') return self.cfg.gridOption
          else return 'none'
        }
      }], function (answers) {
        this.cfg.mixinOption = answers.mixinOption;
        this.cfg.mqOption = answers.mqOption;
        this.cfg.gridOption = answers.gridOption;

        done();
      }.bind(this));
    }

  },




  less: function(){
    if(this.cfg.preproOption === 'less'){
      var done = this.async(),
          self = this;

      console.log(printTitle('Less Libraries'));

      this.prompt([{
        type: 'list',
        name: 'mixinOption',
        message: 'What mixin libraries would you like to use?',
        choices: [{
          name: 'Default',
          value: 'default'
        }, {
          name: 'Less Hat',
          value: 'lesshat'
        }],
        default: function(answers){
          if(self.cfg.mixinOption && self.cfg.preproOption === 'less') return self.cfg.mixinOption
          else return 'default'
        }
      }


      // Media Query Libraries
      ,{
        type: 'list',
        name: 'mqOption',
        message: 'What MediaQuery Library to use?',
        choices: [{
          name: 'Default',
          value: 'default'
        }, {
          name: 'Less-MQ',
          value: 'lessmq'
        }],
        default: function(answers){
          if(self.cfg.mqOption && self.cfg.preproOption === 'less') return self.cfg.mqOption
          else return 'default'
        }
      }


      // Grid Libraries
      ,{
        type: 'list',
        name: 'gridOption',
        message: 'What Grids Library to use?',
        choices: [{
          name: 'None',
          value: 'none'
        }, {
          name: 'Gee',
          value: 'gee'
        }, {
          name: 'Semantic.gs',
          value: 'semantic'
        }],
        default: function(answers){
          if(self.cfg.gridOption && self.cfg.preproOption === 'less') return self.cfg.gridOption
          else return 'none'
        }
      }], function (answers) {
        this.cfg.mixinOption = answers.mixinOption;
        this.cfg.mqOption = answers.mqOption;
        this.cfg.gridOption = answers.gridOption;

        done();
      }.bind(this));
    }

  },



  syntax: function() {
    if(this.cfg.preproOption === 'none'){
      var done = this.async(),
          self = this;

      this.prompt([{
        type: 'checkbox',
        name: 'customPreCss',
        message: 'What syntax plugin to use?',
        choices: [{
          name: 'SugarSS (Indented syntax like Stylus)',
          value: 'sugarss',
          checked: hasFeature('sugarss', self.cfg.customPreCss)
        }, {
          name: 'Partial Import',
          value: 'import',
          checked: hasFeature('import', self.cfg.customPreCss)
        }, {
          name: 'Advanced Variables',
          value: 'variables',
          checked: hasFeature('variables', self.cfg.customPreCss)
        }, {
          name: 'Nested',
          value: 'nested',
          checked: hasFeature('nested', self.cfg.customPreCss)
        }, {
          name: 'Extend',
          value: 'extend',
          checked: hasFeature('extend', self.cfg.customPreCss)
        }, {
          name: 'Custom Media',
          value: 'custommedia',
          checked: hasFeature('custommedia', self.cfg.customPreCss)
        }, {
          name: 'Custom Properties',
          value: 'customproperties',
          checked: hasFeature('customproperties', self.cfg.customPreCss)
        }, {
          name: 'Custom Selectors',
          value: 'customselectors',
          checked: hasFeature('customselectors', self.cfg.customPreCss)
        }, {
          name: 'At-Root',
          value: 'atroot',
          checked: hasFeature('atroot', self.cfg.customPreCss)
        }, {
          name: 'Color Function',
          value: 'colorfunction',
          checked: hasFeature('colorfunction', self.cfg.customPreCss)
        }
        // , {
        //   name: 'Modules Values',
        //   value: 'modulesvalues',
        //   checked: hasFeature('modulesvalues', self.cfg.customPreCss)
        // }
      ]
      }], function(answers){
        this.cfg.customPreCss = answers.customPreCss

        done();
      }.bind(this));
    }
  },



  extras: function() {
    if(this.cfg.preproOption === 'none'){
      var done = this.async(),
          self = this;

      this.prompt([{
        type: 'checkbox',
        name: 'customPreCssExtras',
        message: 'Extend your custom PreCSS build',
        choices: [{
          name: 'Short',
          value: 'short',
          checked: hasFeature('short', self.cfg.customPreCssExtras)
        }, {
          name: 'Property Lookup',
          value: 'propertylookup',
          checked: hasFeature('propertylookup', self.cfg.customPreCssExtras)
        }, {
          name: 'Quantity Queries',
          value: 'quantityqueries',
          checked: hasFeature('quantityqueries', self.cfg.customPreCssExtras)
        }, {
          name: 'Media MinMax',
          value: 'minmax',
          checked: hasFeature('minmax', self.cfg.customPreCssExtras)
        }]
      }], function(answers){
        this.cfg.customPreCssExtras = answers.customPreCssExtras

        done();
      }.bind(this));
    }
  },



  mixins: function() {
    if(this.cfg.preproOption === 'none'){
      var done = this.async(),
          self = this;

      this.prompt([{
        type: 'list',
        name: 'customPreCssMixins',
        message: 'What mixin plugin to use?',
        choices: [{
          name: 'None',
          value: 'none',
          checked: hasFeature('none', self.cfg.customPreCssMixins)
        }, {
          name: 'Mixins',
          value: 'mixins',
          checked: hasFeature('mixins', self.cfg.customPreCssMixins)
        }, {
          name: 'Sassy mixins',
          value: 'sassymixins',
          checked: hasFeature('sassymixins', self.cfg.customPreCssMixins)
        }]
      }], function(answers){
        this.cfg.customPreCssMixins = answers.customPreCssMixins

        done();
      }.bind(this));
    }
  },



  grids: function() {
    if(this.cfg.preproOption === 'none' || this.cfg.preproOption === 'precss'){
      var done = this.async(),
          self = this;

      this.prompt([{
        type: 'list',
        name: 'customPreCssGrids',
        message: 'What grid plugin to use?',
        choices: [{
          name: 'None',
          value: 'none',
          checked: hasFeature('none', self.cfg.customPreCssGrids)
        }, {
          name: 'Grid',
          value: 'grid',
          checked: hasFeature('grid', self.cfg.customPreCssGrids)
        }, {
          name: 'Lost Grid',
          value: 'lostgrid',
          checked: hasFeature('lostgrid', self.cfg.customPreCssGrids)
        }, {
          name: 'Neat',
          value: 'neat',
          checked: hasFeature('neat', self.cfg.customPreCssGrids)
        }]
      }], function(answers){
        this.cfg.customPreCssGrids = answers.customPreCssGrids

        done();
      }.bind(this));
    }
  },




  postcss: function(){
    console.log(printTitle('postCSS'))

    var done = this.async(),
        self = this;

    this.prompt([{
      type: 'checkbox',
      name: 'postcssOption',
      message: function(){
        if(self.cfg.preproOption === 'precss') {
          return 'What other postCSS plugins to include?'
        } else {
          return 'What postCSS plugins to include?'
        }
      },
      choices: function() {
        var postCss = [{
          name: 'CSS Nano (Css Optimalization)',
          value: 'cssnano',
          checked: hasFeature('cssnano', self.cfg.postcssOption)
        }, {
          name: 'Gradient Transparency Fix',
          value: 'gradientfix',
          checked: hasFeature('gradientfix', self.cfg.postcssOption)
        }, {
          name: 'Css Declaration Sorter',
          value: 'csssorter',
          checked: hasFeature('csssorter', self.cfg.postcssOption)
        }, {
          name: 'MQ Packer',
          value: 'mqpacker',
          checked: hasFeature('mqpacker', self.cfg.postcssOption)
        }, {
          name: 'MQ Keyframes',
          value: 'mqkeyframes',
          checked: hasFeature('mqkeyframes', self.cfg.postcssOption)
        }, {
          name: 'CSS Next',
          value: 'cssnext',
          checked: hasFeature('cssnext', self.cfg.postcssOption)
        }, {
          name: 'Rucksack',
          value: 'rucksack',
          checked: hasFeature('rucksack', self.cfg.postcssOption)
        }, {
          name: 'CSS Grace',
          value: 'cssgrace',
          checked: hasFeature('cssgrace', self.cfg.postcssOption)
        }, {
          name: 'Class Prefix',
          value: 'classprefix',
          checked: hasFeature('classprefix', self.cfg.postcssOption)
        }, {
          name: 'Scopify',
          value: 'scopify',
          checked: hasFeature('scopify', self.cfg.postcssOption)
        }];

        var prefixer = {
          name: 'Autoprefixer',
          value: 'autoprefixer',
          checked: function(){
            if(self.cfg.precssOption)  {
              return false
            } else {
              return hasFeature('autoprefixer', self.cfg.postcssOption)
            }
          }
        };

        if(!self.cfg.preproOption === 'precss'){
          postCss.unshift(prefixer);
        }

        return postCss;
      }
    }], function (answers) {
      this.cfg.postcssOption = answers.postcssOption;

      done();
    }.bind(this));
  }

},








  configuring: {

    answers: function(){
      var done = this.async(),
          self = this;

      setConfigVars(this, function(result){})

      this.gulpDirOption = this.cfg.gulpDirOption;
      this.gulpCmdOption = this.cfg.gulpCmdOption;
      this.preproOption = this.cfg.preproOption;
      this.mixinOption = this.cfg.mixinOption;
      this.mqOption = this.cfg.mqOption;
      this.gridOption = this.cfg.gridOption;
      this.baseStyleOption = this.cfg.baseStyleOption;



      if(!this.cfg.postcssOption) this.cfg.postcssOption = [];

      if(this.cfg.customPreCss){
        this.cfg.postcssOption.concat(this.cfg.customPreCss)
      }

      if(this.cfg.customPreCssExtras){
        this.cfg.postcssOption.concat(this.cfg.customPreCssExtras)
      }

      if(this.cfg.customPreCssMixins !== 'none'){
        this.cfg.postcssOption.push(this.cfg.customPreCssMixins)
      }
      if(this.cfg.customPreCssGrids !== 'none'){
        this.cfg.postcssOption.push(this.cfg.customPreCssGrids)
      }

      if(this.cfg.preproOption === 'precss'){
        this.cfg.postcssOption.push('precss')
      }

      this.postcssOption = this.cfg.postcssOption;

      this.postcssPlugins = [];

      for (var i = 0; i < this.cfg.postcssOption.length; i++) {
        switch(this.cfg.postcssOption[i]) {
          case 'sugarss':
            this.postcssPlugins.push({
              key: 'sugarss',
              name: 'SugarSS',
              link: 'https://github.com/postcss/sugarss',
              req: 'sugarss',
              call: 'sugarss',
              sort: 0
            });
          break;

          case 'precss':
            this.postcssPlugins.push({
              key: 'precss',
              name: 'PreCSS',
              link: 'https://github.com/jonathantneal/precss',
              req: 'precss',
              call: 'precss',
              sort: 1
            });
          break;

          case 'import':
            this.postcssPlugins.push({
              key: 'import',
              name: 'Partial Import',
              link: 'https://github.com/jonathantneal/postcss-partial-import',
              req: 'postcss-partial-import',
              call: 'import',
              sort: 2
            });
          break;

          case 'variables':
            this.postcssPlugins.push({
              key: 'variables',
              name: 'Advanced Variables',
              link: 'https://github.com/jonathantneal/postcss-advanced-variables',
              req: 'postcss-advanced-variables',
              call: 'variables',
              sort: 3
            });
          break;

          case 'nested':
            this.postcssPlugins.push({
              key: 'nested',
              name: 'Nested',
              link: 'https://github.com/postcss/postcss-nested',
              req: 'postcss-nested',
              call: 'nested',
              sort: 4
            });
          break;

          case 'extend':
            this.postcssPlugins.push({
              key: 'extend',
              name: 'Extend',
              link: 'https://github.com/travco/postcss-extend',
              req: 'postcss-extend',
              call: 'extend',
              sort: 5
            });
          break;

          case 'custommedia':
            this.postcssPlugins.push({
              key: 'media',
              name: 'Custom Media',
              link: 'https://github.com/postcss/postcss-custom-media',
              req: 'postcss-custom-media',
              call: 'media',
              sort: 6
            });
          break;

          case 'customproperties':
            this.postcssPlugins.push({
              key: 'properties',
              name: 'Custom Media',
              link: 'https://github.com/postcss/postcss-custom-properties',
              req: 'postcss-custom-properties',
              call: 'properties',
              sort: 7
            });
          break;

          case 'customselectors':
            this.postcssPlugins.push({
              key: 'selectors',
              name: 'Custom Media',
              link: 'https://github.com/postcss/postcss-custom-selectors',
              req: 'postcss-custom-selectors',
              call: 'selectors',
              sort: 8
            });
          break;

          case 'atroot':
            this.postcssPlugins.push({
              key: 'atroot',
              name: 'At-Root',
              link: 'https://github.com/OEvgeny/postcss-atroot',
              req: 'postcss-atroot',
              call: 'atroot',
              sort: 9
            });
          break;

          case 'colorfunction':
            this.postcssPlugins.push({
              key: 'colorfunction',
              name: 'Color Function',
              link: 'https://github.com/postcss/postcss-color-function',
              req: 'postcss-color-function',
              call: 'colorfunction',
              sort: 10
            });
          break;

          case 'mixins':
            this.postcssPlugins.push({
              key: 'mixins',
              name: 'Mixins',
              link: 'https://github.com/postcss/postcss-mixins',
              req: 'postcss-mixins',
              call: 'mixins',
              sort: 39
            });
          break;

          case 'sassymixins':
            this.postcssPlugins.push({
              key: 'mixins',
              name: 'Sassy Mixins',
              link: 'https://github.com/andyjansson/postcss-sassy-mixins',
              req: 'postcss-sassy-mixins',
              call: 'mixins',
              sort: 39
            });
          break;

          case 'minmax':
            this.postcssPlugins.push({
              key: 'minmax',
              name: 'Quantity Queries',
              link: 'https://github.com/postcss/postcss-media-minmax',
              req: 'postcss-media-minmax',
              call: 'minmax',
              sort: 48
            });
          break;

          case 'quantityqueries':
            this.postcssPlugins.push({
              key: 'quantity',
              name: 'Quantity Queries',
              link: 'https://github.com/pascalduez/postcss-quantity-queries',
              req: 'postcss-quantity-queries',
              call: 'quantity',
              sort: 49
            });
          break;

          case 'lostgrid':
            this.postcssPlugins.push({
              key: 'grid',
              name: 'Lost Grid',
              link: 'https://github.com/peterramsing/lost',
              req: 'lost',
              call: 'grid',
              sort: 59
            });
          break;

          case 'neat':
            this.postcssPlugins.push({
              key: 'grid',
              name: 'PostCss Neat',
              link: 'https://github.com/jo-asakura/postcss-neat',
              req: 'postcss-neat',
              call: 'grid({neatGridColumns: \'12\', neatGutterWidth: \'1.618em\', neatMaxWidth: \'64em\'})',
              sort: 59
            });
          break;

          case 'grid':
            this.postcssPlugins.push({
              key: 'grid',
              name: 'Grid',
              link: 'https://github.com/andyjansson/postcss-grid',
              req: 'postcss-grid',
              call: 'grid({columns: 12, maxWidth: 1440, gutter: 20})',
              sort: 59
            });
          break;

          case 'propertylookup':
            this.postcssPlugins.push({
              key: 'lookup',
              name: 'Property Lookup',
              link: 'https://github.com/simonsmith/postcss-property-lookup',
              req: 'postcss-property-lookup',
              call: 'lookup',
              sort: 75
            });
          break;

          case 'short':
            this.postcssPlugins.push({
              key: 'short',
              name: 'Short',
              link: 'https://github.com/jonathantneal/postcss-short',
              req: 'postcss-short',
              call: 'short',
              sort: 76
            });
          break;

          case 'gradientfix':
            this.postcssPlugins.push({
                key: 'gradientFix',
                name: 'Gradient Transparency Fixer',
                link: 'https://github.com/gilmoreorless/postcss-gradient-transparency-fix',
                req: 'postcss-gradient-transparency-fix',
                call: 'gradientFix',
                sort: 77
              });
          break;

          case 'rucksack':
            this.postcssPlugins.push({
                key: 'rucksack',
                name: 'Rucksack',
                link: 'https://simplaio.github.io/rucksack',
                req: 'rucksack-css',
                call: 'rucksack',
                sort: 78
              });
          break;

          case 'cssnext':
            this.postcssPlugins.push({
              key: 'next',
              name: 'Css Next',
              link: 'http://cssnext.io',
              req: 'postcss-cssnext',
              call: 'next({browsers: cfg.browsers})',
              sort: 79
            });
          break;

          case 'cssgrace':
            this.postcssPlugins.push({
                key: 'grace',
                name: 'Css Grace',
                link: 'https://github.com/cssdream/cssgrace',
                req: 'cssgrace',
                call: 'grace',
                sort: 92
              });
          break;

          case 'classprefix':
            this.postcssPlugins.push({
                key: 'classPrfx',
                name: 'Class Prefix',
                link: 'https://github.com/thompsongl/postcss-class-prefix',
                req: 'postcss-class-prefix',
                call: 'classPrfx(cfg.prefix)',
                sort: 93
              });
          break;

          case 'scopify':
            this.postcssPlugins.push({
                key: 'scopify',
                name: 'Scopify',
                link: 'https://github.com/pazams/postcss-scopify',
                req: 'postcss-scopify',
                call: 'scopify(cfg.scope)',
                sort: 94
              });
          break;

          case 'csssorter':
            this.postcssPlugins.push({
                key: 'cssdeclsort',
                name: 'Css Declaration Sorter',
                link: 'https://github.com/Siilwyn/css-declaration-sorter',
                req: 'css-declaration-sorter',
                call: 'cssdeclsort({order: cfg.cssSortOrder})',
                sort: 95
              });
          break;

          case 'mqkeyframes':
            this.postcssPlugins.push({
                key: 'mqKeyframes',
                name: 'MQKeyframes',
                link: 'https://github.com/TCotton/postcss-mq-keyframes',
                req: 'postcss-mq-keyframes',
                call: 'mqKeyframes',
                sort: 96
              });
          break;

          case 'mqpacker':
            this.postcssPlugins.push({
                key: 'mqPacker',
                name: 'MQPacker',
                link: 'https://github.com/hail2u/node-css-mqpacker',
                req: 'css-mqpacker',
                call: 'mqPacker',
                sort: 97
              });
          break;

          case 'autoprefixer':
            this.postcssPlugins.push({
                key: 'autoprefixer',
                name: 'Autoprefixer',
                link: 'https://github.com/postcss/autoprefixer',
                req: 'autoprefixer',
                call: 'autoprefixer({browsers: cfg.browsers})',
                sort: 98
              });
          break;

          case 'cssnano':
            this.postcssPlugins.push({
                key: 'cssnano',
                name: 'Css Nano',
                link: 'https://github.com/ben-eb/cssnano',
                req: 'cssnano',
                call: 'cssnano({autoprefixer: false})',
                sort: 99,
                excludeDev: true
              });
          break;
        }
      }
      this.postcssPlugins = this.postcssPlugins.sort(function(a,b){return a.sort-b.sort});

      this.postcssAutoprefixerOption = hasFeature('autoprefixer', this.cfg.postcssOption);
      this.postcssCssNextOption = hasFeature('cssnext', this.cfg.postcssOption);
      this.postcssCssGraceOption = hasFeature('cssgrace', this.cfg.postcssOption);
      this.postcssRucksackOption = hasFeature('rucksack', this.cfg.postcssOption);
      this.postcssGradientfixOption = hasFeature('gradientfix', this.cfg.postcssOption);
      this.postcssMqpackerOption = hasFeature('mqpacker', this.cfg.postcssOption);
      this.postcssMqkeyframesOption = hasFeature('mqkeyframes', this.cfg.postcssOption);
      this.postcssClassprefixOption = hasFeature('classprefix', this.cfg.postcssOption);
      this.postcssScopifyOption = hasFeature('scopify', this.cfg.postcssOption);
      this.postcssCssNanoOption = hasFeature('cssnano', this.cfg.postcssOption);
      this.postcssCssSorterOption = hasFeature('csssorter', this.cfg.postcssOption);
      this.postcssLostGridOption = hasFeature('lostgrid', this.cfg.postcssOption);

      this.postcssSugarssOption = hasFeature('sugarss', this.cfg.postcssOption);
      this.postcssAdvancedVarsOption = hasFeature('variables', this.cfg.postcssOption);
      this.postcssExtendOption = hasFeature('extended', this.cfg.postcssOption);
      this.postcssNestedOption = hasFeature('nested', this.cfg.postcssOption);
      this.postcssDefinePropertyOption = hasFeature('define', this.cfg.postcssOption);
      this.postcssColorOption = hasFeature('colorfunction', this.cfg.postcssOption);
      this.postcssImportOption = hasFeature('import', this.cfg.postcssOption);
      this.postcssModulesOption = hasFeature('modulesvalues', this.cfg.postcssOption);
      this.postcssCustommediaOption = hasFeature('custommedia', this.cfg.postcssOption);
      this.postcssCustompropertiesOption = hasFeature('customproperties', this.cfg.postcssOption);
      this.postcssCustomselectorsOption = hasFeature('customselectors', this.cfg.postcssOption);
      this.postcssAtrootOption = hasFeature('atroot', this.cfg.postcssOption);
      this.postcssSelectormatchesOption = hasFeature('selectormatches', this.cfg.postcssOption);
      this.postcssSelectornotOption = hasFeature('selectornot', this.cfg.postcssOption);
      this.postcssMixinsOption = hasFeature('mixins', this.cfg.postcssOption);
      this.postcssSassyMixinsOption = hasFeature('sassymixins', this.cfg.postcssOption);
      this.postcssSassyMixinsOption = hasFeature('sassymixins', this.cfg.postcssOption);
      this.postcssLostGridOption = hasFeature('lostgrid', this.cfg.postcssOption);
      this.postcssGridOption = hasFeature('grid', this.cfg.postcssOption);
      this.postcssNeatOption = hasFeature('neat', this.cfg.postcssOption);
      this.postcssShortOption = hasFeature('short', this.cfg.postcssOption);
      this.postcssPropertylookupOption = hasFeature('propertylookup', this.cfg.postcssOption);
      this.postcssQuantityQueriesOption = hasFeature('quantityqueries', this.cfg.postcssOption);
      this.postcssMediaMinmaxOption = hasFeature('minmax', this.cfg.postcssOption);


      done();
    },

    config: function(){
      var done = this.async();
      setConfigFiles(this, function(){
        // console.log('Config Files written...')
      });
      done();
    },
  },




  writing: function(){
    var done       = this.async(),
        destRoot   = this.destinationRoot(),
        gulpRoot   = destRoot,
        sourceRoot = this.sourceRoot();
    if(this.cfg.gulpDirOption) gulpRoot = destRoot + '/gulp';

    copyFiles.copyStyleFiles(this, destRoot, gulpRoot, sourceRoot, function(){
      // console.log('Scss files copied.');
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
