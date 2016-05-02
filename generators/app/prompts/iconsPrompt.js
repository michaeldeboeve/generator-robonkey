'use strict';

var chalk       = require('chalk'),
    printTitle  = require('../helpers/printTitle.js');

function iconsPrompt(self, cb){

  console.log(printTitle('Icons'));

  self.prompt([{
    type: 'list',
    name: 'iconsType',
    message: 'How would you like to create icons?',
    choices: [{
      name: 'Not at all',
      value: 'none'
    }, {
      name: 'SVG Sprite',
      value: 'svg'
    }, {
      name: 'Icon Font',
      value: 'iconfont'
    }, {
      name: 'Both',
      value: 'both'
    }],
      default: function(){
        if(self.cfg.customIconfontOption && self.cfg.svgiconsOption){
          return 'both';
        } else if(!self.cfg.customIconfontOption && self.cfg.svgiconsOption){
          return 'svg'
        } else if(self.cfg.customIconfontOption && !self.cfg.svgiconsOption){
          return 'iconfont'
        } else {
          return 'none'
        }
      }
    }, {
      when: function (answers){
        return answers.iconsType === 'iconfont' || answers.iconsType === 'both';
      },
      name: 'customIconfontName',
      message: 'Name your custom icon font',
      default: function(answers){
        if(self.cfg.customIconfontName){
          return self.cfg.customIconfontName
        } else {
          return 'robonky-glyphs'
        }
      }
    }, {
      when: function (answers){
        return answers.iconsType === 'svg' || answers.iconsType === 'both';
      },
      name: 'svgIconSpriteName',
      message: 'Name your svg icon sprite',
      default:  function(answers){
        if(self.cfg.svgIconSpriteName){
          return self.cfg.svgIconSpriteName
        } else {
          return 'icon-sprite'
        }
      }
    }], function (answers){
      self.cfg.iconsType = answers.iconsType;
      switch(answers.iconsType){
        case 'svg':
          self.cfg.customIconfontOption = false;
          self.cfg.svgiconsOption = true;
          self.cfg.svgIconSpriteName = answers.svgIconSpriteName;
        break;

        case 'iconfont':
          self.cfg.customIconfontOption = true;
          self.cfg.svgiconsOption = false;
        break;

        case 'both':
          self.cfg.customIconfontOption = true;
          self.cfg.svgiconsOption = true;
          self.cfg.svgIconSpriteName = answers.svgIconSpriteName;
        break;

        default:
          self.cfg.customIconfontOption = false;
          self.cfg.svgiconsOption = false;

      }
      if(self.cfg.customIconfontOption){
        self.cfg.customIconfontName = answers.customIconfontName;
      }

    cb();
  }.bind(self));
}

module.exports = iconsPrompt;
