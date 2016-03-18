# Robonkey Generator

> A [Yeoman](http://yeoman.io) front-end application generator with Jade, Sass, Gulp, PostCSS, Autoprefixer, Modernizr, Custom Icon Font Generator and some JavaScript and Sass Libraries to choose from.

> **This generator is a work in progress.**
> **There probably will be some bugs and missing features.**
> **Likewise, this documentation isn't finished yet either.**

![image](docs/robonkeyscreenshot.png)

## Table of contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Options](#options)
- [Docs](#docs)

## Features

- [Gulp](http://gulpjs.com/)
- [Jade](http://jade-lang.com/) _(Optional)_
- [SASS](http://sass-lang.com/) with [some mixins](/docs/sass/mixins.md) and [functions](/docs/sass/functions.md)
- [BrowserSync](https://www.browsersync.io/)
- [PostCSS](http://postcss.org/) _(Optional)_
- [Autoprefixer](https://github.com/postcss/autoprefixer) _(Automatically used **if postCSS is true**)_
- [Imagemin](https://github.com/sindresorhus/gulp-imagemin)
- Custom Icon Font Generator _(Optional)_
	- [iconfont](https://github.com/nfroidure/gulp-iconfont)
	- [iconfont-css](https://github.com/backflip/gulp-iconfont-css)
- [Modernizr Builder](https://github.com/doctyper/gulp-modernizr) _(Optional)_


## Getting Started

Install yo

```sh
$ npm install -g yo
```

Install Robonkey

```sh
$ npm install generator-robonkey -g
```

Then you can start building your app with Robonkey:

```sh
$ mkdir yourapp
$ cd yourapp
$ yo robonkey
```


## Docs

- [Home](/README.md)
- [Getting started](/docs/getting-started.md)
- [Features](/docs/features.md)
- [Options](/docs/options.md)
- [Modernizr](/docs/modernizr.md)
- [Custom Icon Font](/docs/custom-icon-font.md)
- [Sass](/docs/sass/sass.md)
	- [Functions](/docs/sass/functions.md)
	- [Mixins](/docs/sass/mixins.md)
