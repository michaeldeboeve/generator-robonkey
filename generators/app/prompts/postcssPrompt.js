'use strict';

var chalk       = require('chalk'),
    printTitle  = require('../helpers/printTitle.js'),
    hasFeature  = require('../helpers/hasFeature.js');

function postcssPrompt(self){
  if(self.exit) return;

  console.log(printTitle('postCSS'))

  var done = self.async();

  self.prompt([{
    type: 'checkbox',
    name: 'postcssOption',
    message: function(){
      if(self.cfg.preproOption === 'precss') {
        return 'What other postCSS plugins to include?'
      } else {
        return 'What postCSS plugins to include?'
      }
    },
    choices: function(){
      var postCss = [{
        name: 'CSS Nano (Css Optimalization)',
        value: 'cssnano',
        checked: hasFeature('cssnano', self.cfg.postcssOption)
      }, {
        name: 'Gradient Transparency Fix',
        value: 'gradientfix',
        checked: hasFeature('gradientfix', self.cfg.postcssOption)
      }
      // ,{
      //   name: 'Split',
      //   value: 'split',
      //   checked: hasFeature('split', self.cfg.postcssOption)
      // }
      , {
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
    self.cfg.postcssOption = answers.postcssOption;

    done();
  }.bind(self));
}

module.exports = postcssPrompt;
