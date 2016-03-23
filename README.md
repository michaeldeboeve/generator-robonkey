# Robonkey Generator

> A [Yeoman](http://yeoman.io) front-end application generator with Gulp, Jade, Sass/Stylus/Less, PostCSS, Autoprefixer, Modernizr, Custom Icon Font Generator and some JavaScript and Sass/Stylus/Less libraries to choose from.

> _**This generator is a work in progress.<br>
> There probably will be some bugs and missing features.<br>
> Likewise, this documentation isn't finished yet either.**_

![image](docs/robonkeyscreenshot.png)

## Table of contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Options](#options)
- [To Do](#to-do)
- [Docs](#docs)

## Features

- [Gulp](http://gulpjs.com/)
- Html templating
	- [Jade](http://jade-lang.com/)
	- [Nunjucks](http://jade-lang.com/)
- Preprocessors:
	- [SASS](http://sass-lang.com/) with [some mixins](/docs/sass/mixins.md), [functions](/docs/sass/functions.md) or [optional libraries](/docs/features.md#sass-libraries)
	- [Stylus](http://stylus-lang.com/) with [some mixins](/docs/stylus/mixins.md), [functions](/docs/stylus/functions.md) or  [optional libraries](/docs/features.md#stylus-libraries)
	- [Less](http://lesscss.org/) with [optional libraries](/docs/features.md#less-libraries)
- [BrowserSync](https://www.browsersync.io/)
- PostCSS:
	- [Autoprefixer](https://github.com/postcss/autoprefixer) _(Automatically used **if postCSS is true**)_
	- [Css Nano](https://github.com/ben-eb/cssnano)
	- [Gradient Transparency Fixer](https://github.com/gilmoreorless/postcss-gradient-transparency-fix)
	- [MQPacker](https://github.com/hail2u/node-css-mqpacker)
	- [MQKeyframes](https://github.com/TCotton/postcss-mq-keyframes)
	- [Selector Not](https://github.com/postcss/postcss-selector-not)
	- [Selector Matches](https://github.com/postcss/postcss-selector-matches)
	- [Class Prefix](https://github.com/thompsongl/postcss-class-prefix)
	- [Scopify](https://github.com/pazams/postcss-scopify)
- [Imagemin](https://github.com/sindresorhus/gulp-imagemin)
- Custom Icon Font Generator:
	- [iconfont](https://github.com/nfroidure/gulp-iconfont)
	- [iconfont-css](https://github.com/backflip/gulp-iconfont-css)
- [Modernizr Builder](https://github.com/doctyper/gulp-modernizr)


## Getting Started

Install yo

```sh
$ npm install -g yo
```

Install Robonkey

```sh
$ npm install -g generator-robonkey
```

Then you can start building your app with Robonkey:

```sh
$ mkdir yourapp
$ cd yourapp
$ yo robonkey
```

## To Do

- Priority:
	- Mixin and Function documentation

- maybe down the road
	- more js libraries?
	- …

- maybe further down the road
	- express/angular
	- wordpress
	- drupal
	- codeigniter
	- …


## Docs

- [Home](/README.md)
- [Getting started](/docs/getting-started.md)
- [Features](/docs/features.md)
- [Options](/docs/options.md)
- [HTML templating](/docs/html)
- [Images](/docs/images.md)
- [Sass](/docs/sass/sass.md)
	- [Functions](/docs/sass/functions.md)
	- [Mixins](/docs/sass/mixins.md)
- [Stylus](/docs/stylus/stylus.md)
	- [Functions](/docs/stylus/functions.md)
	- [Mixins](/docs/stylus/mixins.md)
- [Less](/docs/less/less.md)
- [Modernizr](/docs/modernizr.md)
- [Custom Icon Font](/docs/custom-icon-font.md)
