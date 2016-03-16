#Robonkey Generator

	This generator is a work in progress.
	There probably will be some bugs.
	Likewise, this README isn't finished yet.

> A [Yeoman](http://yeoman.io) front-end application generator with Jade, Sass &amp; Gulp

## Features

* Gulp
* Jade
* SCSS
* BrowserSync
* PostCSS
* Autoprefixr
* Image Optimalisation

	
## Getting Started
	This generator isn't on npm yet, so if you want to use it, you'll need to:

* Download this repo
* In terminal, navigate to the folder `$ cd path/to/generator-robonkey`
* Make a symlink to your node working directory `$ npm link`
* Install yo: `$ npm install -g yo`;

## Install
```$ yo robonkey```

## Options

* Javascript Libraries
	* jQuery
	* Waypoints
	* Signals
	* D3
	* TweenMax
	* Enquire
	* Google Analytics Script in body
* Jade
* Modernizr
* Custom Icon Font Generator	 
* PostCSS
	* CSSNano
	* MQPacker
	* MQKeyframes
	* SelectorNot
	* SelectorMatcher
* Prefix selectors `.myselector` -> `.prefix-myselector`
* Scope selectors `.myselector` -> `#scope .myselector`
* Base styles
	* Reset
	* Normalize
	* Sanitize
* SCSS Libraries
	* Susy
	* Breakpoint
* Boilerplate extra's
	* .htaccess
	* browserconfig.xml
	* crossdomain.xml
	* robots.txt and humans.txt