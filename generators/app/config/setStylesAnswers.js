'use strict';
var hasFeature      = require('../helpers/hasFeature'),
    setConfigVars   = require('./setConfigVars'),
    setBaseConfigVars  = require('./setBaseConfigVars');

function setStylesAnswers (self) {
  var done = self.async();

  setConfigVars(self);

  self.mixinOption = self.cfg.mixinOption;
  self.mqOption = self.cfg.mqOption;
  self.gridOption = self.cfg.gridOption;
  self.baseStyleOption = self.cfg.baseStyleOption;


  if(!self.cfg.postcssOption) self.cfg.postcssOption = [];

  if(self.cfg.customPreCss){
    self.cfg.postcssOption.concat(self.cfg.customPreCss)
  }

  if(self.cfg.customPreCssExtras){
    self.cfg.postcssOption.concat(self.cfg.customPreCssExtras)
  }

  if(self.cfg.customPreCssMixins !== 'none'){
    self.cfg.postcssOption.push(self.cfg.customPreCssMixins)
  }
  if(self.cfg.customPreCssGrids !== 'none'){
    self.cfg.postcssOption.push(self.cfg.customPreCssGrids)
  }

  if(self.cfg.preproOption === 'precss'){
    self.cfg.postcssOption.push('precss')
  }

  self.postcssOption = self.cfg.postcssOption;

  self.postcssPlugins = [];

  for (var i = 0; i < self.cfg.postcssOption.length; i++) {
    switch(self.cfg.postcssOption[i]) {
      case 'sugarss':
        self.postcssPlugins.push({
          key: 'sugarss',
          name: 'SugarSS',
          link: 'https://github.com/postcss/sugarss',
          req: 'sugarss',
          call: 'sugarss',
          sort: 0
        });
      break;

      case 'precss':
        self.postcssPlugins.push({
          key: 'precss',
          name: 'PreCSS',
          link: 'https://github.com/jonathantneal/precss',
          req: 'precss',
          call: 'precss',
          sort: 1
        });
      break;

      case 'import':
        self.postcssPlugins.push({
          key: 'import',
          name: 'Partial Import',
          link: 'https://github.com/jonathantneal/postcss-partial-import',
          req: 'postcss-partial-import',
          call: 'import',
          sort: 2
        });
      break;

      case 'variables':
        self.postcssPlugins.push({
          key: 'variables',
          name: 'Advanced Variables',
          link: 'https://github.com/jonathantneal/postcss-advanced-variables',
          req: 'postcss-advanced-variables',
          call: 'variables',
          sort: 3
        });
      break;

      case 'nested':
        self.postcssPlugins.push({
          key: 'nested',
          name: 'Nested',
          link: 'https://github.com/postcss/postcss-nested',
          req: 'postcss-nested',
          call: 'nested',
          sort: 4
        });
      break;

      case 'extend':
        self.postcssPlugins.push({
          key: 'extend',
          name: 'Extend',
          link: 'https://github.com/travco/postcss-extend',
          req: 'postcss-extend',
          call: 'extend',
          sort: 5
        });
      break;

      case 'custommedia':
        self.postcssPlugins.push({
          key: 'media',
          name: 'Custom Media',
          link: 'https://github.com/postcss/postcss-custom-media',
          req: 'postcss-custom-media',
          call: 'media',
          sort: 6
        });
      break;

      case 'customproperties':
        self.postcssPlugins.push({
          key: 'properties',
          name: 'Custom Media',
          link: 'https://github.com/postcss/postcss-custom-properties',
          req: 'postcss-custom-properties',
          call: 'properties',
          sort: 7
        });
      break;

      case 'customselectors':
        self.postcssPlugins.push({
          key: 'selectors',
          name: 'Custom Media',
          link: 'https://github.com/postcss/postcss-custom-selectors',
          req: 'postcss-custom-selectors',
          call: 'selectors',
          sort: 8
        });
      break;

      case 'atroot':
        self.postcssPlugins.push({
          key: 'atroot',
          name: 'At-Root',
          link: 'https://github.com/OEvgeny/postcss-atroot',
          req: 'postcss-atroot',
          call: 'atroot',
          sort: 9
        });
      break;

      case 'colorfunction':
        self.postcssPlugins.push({
          key: 'colorfunction',
          name: 'Color Function',
          link: 'https://github.com/postcss/postcss-color-function',
          req: 'postcss-color-function',
          call: 'colorfunction',
          sort: 10
        });
      break;

      case 'mixins':
        self.postcssPlugins.push({
          key: 'mixins',
          name: 'Mixins',
          link: 'https://github.com/postcss/postcss-mixins',
          req: 'postcss-mixins',
          call: 'mixins',
          sort: 39
        });
      break;

      case 'sassymixins':
        self.postcssPlugins.push({
          key: 'mixins',
          name: 'Sassy Mixins',
          link: 'https://github.com/andyjansson/postcss-sassy-mixins',
          req: 'postcss-sassy-mixins',
          call: 'mixins',
          sort: 39
        });
      break;

      case 'minmax':
        self.postcssPlugins.push({
          key: 'minmax',
          name: 'Quantity Queries',
          link: 'https://github.com/postcss/postcss-media-minmax',
          req: 'postcss-media-minmax',
          call: 'minmax',
          sort: 48
        });
      break;

      case 'quantityqueries':
        self.postcssPlugins.push({
          key: 'quantity',
          name: 'Quantity Queries',
          link: 'https://github.com/pascalduez/postcss-quantity-queries',
          req: 'postcss-quantity-queries',
          call: 'quantity',
          sort: 49
        });
      break;

      case 'lostgrid':
        self.postcssPlugins.push({
          key: 'grid',
          name: 'Lost Grid',
          link: 'https://github.com/peterramsing/lost',
          req: 'lost',
          call: 'grid',
          sort: 59
        });
      break;

      case 'neat':
        self.postcssPlugins.push({
          key: 'grid',
          name: 'PostCss Neat',
          link: 'https://github.com/jo-asakura/postcss-neat',
          req: 'postcss-neat',
          call: 'grid({neatGridColumns: \'12\', neatGutterWidth: \'1.618em\', neatMaxWidth: \'64em\'})',
          sort: 59
        });
      break;

      case 'grid':
        self.postcssPlugins.push({
          key: 'grid',
          name: 'Grid',
          link: 'https://github.com/andyjansson/postcss-grid',
          req: 'postcss-grid',
          call: 'grid({columns: 12, maxWidth: 1440, gutter: 20})',
          sort: 59
        });
      break;

      case 'propertylookup':
        self.postcssPlugins.push({
          key: 'lookup',
          name: 'Property Lookup',
          link: 'https://github.com/simonsmith/postcss-property-lookup',
          req: 'postcss-property-lookup',
          call: 'lookup',
          sort: 75
        });
      break;

      case 'short':
        self.postcssPlugins.push({
          key: 'short',
          name: 'Short',
          link: 'https://github.com/jonathantneal/postcss-short',
          req: 'postcss-short',
          call: 'short',
          sort: 76
        });
      break;

      case 'gradientfix':
        self.postcssPlugins.push({
            key: 'gradientFix',
            name: 'Gradient Transparency Fixer',
            link: 'https://github.com/gilmoreorless/postcss-gradient-transparency-fix',
            req: 'postcss-gradient-transparency-fix',
            call: 'gradientFix',
            sort: 77
          });
      break;

      case 'rucksack':
        self.postcssPlugins.push({
            key: 'rucksack',
            name: 'Rucksack',
            link: 'https://simplaio.github.io/rucksack',
            req: 'rucksack-css',
            call: 'rucksack',
            sort: 78
          });
      break;

      case 'cssnext':
        self.postcssPlugins.push({
          key: 'next',
          name: 'Css Next',
          link: 'http://cssnext.io',
          req: 'postcss-cssnext',
          call: 'next({browsers: cfg.browsers})',
          sort: 79
        });
      break;

      case 'cssgrace':
        self.postcssPlugins.push({
            key: 'grace',
            name: 'Css Grace',
            link: 'https://github.com/cssdream/cssgrace',
            req: 'cssgrace',
            call: 'grace',
            sort: 91
          });
      break;

      case 'classprefix':
        self.postcssPlugins.push({
            key: 'classPrfx',
            name: 'Class Prefix',
            link: 'https://github.com/thompsongl/postcss-class-prefix',
            req: 'postcss-class-prefix',
            call: 'classPrfx(cfg.prefix)',
            sort: 92
          });
      break;

      case 'scopify':
        self.postcssPlugins.push({
            key: 'scopify',
            name: 'Scopify',
            link: 'https://github.com/pazams/postcss-scopify',
            req: 'postcss-scopify',
            call: 'scopify(cfg.scope)',
            sort: 93
          });
      break;

      case 'split':
        self.postcssPlugins.push({
            key: 'split',
            name: 'Split',
            link: 'https://github.com/wladston/postcss-split',
            req: 'postcss-split',
            call: 'split',
            sort: 94
          });
      break;

      case 'csssorter':
        self.postcssPlugins.push({
            key: 'cssdeclsort',
            name: 'Css Declaration Sorter',
            link: 'https://github.com/Siilwyn/css-declaration-sorter',
            req: 'css-declaration-sorter',
            call: 'cssdeclsort({order: cfg.cssSortOrder})',
            sort: 95
          });
      break;

      case 'mqkeyframes':
        self.postcssPlugins.push({
            key: 'mqKeyframes',
            name: 'MQKeyframes',
            link: 'https://github.com/TCotton/postcss-mq-keyframes',
            req: 'postcss-mq-keyframes',
            call: 'mqKeyframes',
            sort: 96
          });
      break;

      case 'mqpacker':
        self.postcssPlugins.push({
            key: 'mqPacker',
            name: 'MQPacker',
            link: 'https://github.com/hail2u/node-css-mqpacker',
            req: 'css-mqpacker',
            call: 'mqPacker',
            sort: 97
          });
      break;

      case 'autoprefixer':
        self.postcssPlugins.push({
            key: 'autoprefixer',
            name: 'Autoprefixer',
            link: 'https://github.com/postcss/autoprefixer',
            req: 'autoprefixer',
            call: 'autoprefixer({browsers: cfg.browsers})',
            sort: 98
          });
      break;

      case 'cssnano':
        self.postcssPlugins.push({
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
  self.postcssPlugins = self.postcssPlugins.sort(function(a,b){return a.sort-b.sort});

  self.postcssAutoprefixerOption = hasFeature('autoprefixer', self.cfg.postcssOption);
  self.postcssCssNextOption = hasFeature('cssnext', self.cfg.postcssOption);
  self.postcssCssGraceOption = hasFeature('cssgrace', self.cfg.postcssOption);
  self.postcssRucksackOption = hasFeature('rucksack', self.cfg.postcssOption);
  self.postcssGradientfixOption = hasFeature('gradientfix', self.cfg.postcssOption);
  self.postcssMqpackerOption = hasFeature('mqpacker', self.cfg.postcssOption);
  self.postcssMqkeyframesOption = hasFeature('mqkeyframes', self.cfg.postcssOption);
  self.postcssClassprefixOption = hasFeature('classprefix', self.cfg.postcssOption);
  self.postcssScopifyOption = hasFeature('scopify', self.cfg.postcssOption);
  self.postcssCssNanoOption = hasFeature('cssnano', self.cfg.postcssOption);
  self.postcssCssSorterOption = hasFeature('csssorter', self.cfg.postcssOption);
  self.postcssLostGridOption = hasFeature('lostgrid', self.cfg.postcssOption);

  self.postcssSugarssOption = hasFeature('sugarss', self.cfg.postcssOption);
  self.postcssAdvancedVarsOption = hasFeature('variables', self.cfg.postcssOption);
  self.postcssExtendOption = hasFeature('extended', self.cfg.postcssOption);
  self.postcssNestedOption = hasFeature('nested', self.cfg.postcssOption);
  self.postcssDefinePropertyOption = hasFeature('define', self.cfg.postcssOption);
  self.postcssColorOption = hasFeature('colorfunction', self.cfg.postcssOption);
  self.postcssImportOption = hasFeature('import', self.cfg.postcssOption);
  self.postcssModulesOption = hasFeature('modulesvalues', self.cfg.postcssOption);
  self.postcssCustommediaOption = hasFeature('custommedia', self.cfg.postcssOption);
  self.postcssCustompropertiesOption = hasFeature('customproperties', self.cfg.postcssOption);
  self.postcssCustomselectorsOption = hasFeature('customselectors', self.cfg.postcssOption);
  self.postcssAtrootOption = hasFeature('atroot', self.cfg.postcssOption);
  self.postcssSelectormatchesOption = hasFeature('selectormatches', self.cfg.postcssOption);
  self.postcssSelectornotOption = hasFeature('selectornot', self.cfg.postcssOption);
  self.postcssMixinsOption = hasFeature('mixins', self.cfg.postcssOption);
  self.postcssSassyMixinsOption = hasFeature('sassymixins', self.cfg.postcssOption);
  self.postcssSassyMixinsOption = hasFeature('sassymixins', self.cfg.postcssOption);
  self.postcssLostGridOption = hasFeature('lostgrid', self.cfg.postcssOption);
  self.postcssGridOption = hasFeature('grid', self.cfg.postcssOption);
  self.postcssNeatOption = hasFeature('neat', self.cfg.postcssOption);
  self.postcssShortOption = hasFeature('short', self.cfg.postcssOption);
  self.postcssPropertylookupOption = hasFeature('propertylookup', self.cfg.postcssOption);
  self.postcssQuantityQueriesOption = hasFeature('quantityqueries', self.cfg.postcssOption);
  self.postcssMediaMinmaxOption = hasFeature('minmax', self.cfg.postcssOption);

  done();
}

module.exports = setStylesAnswers;
