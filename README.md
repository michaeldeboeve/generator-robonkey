<img src="docs/robonkey-logo.png" alt="Robonkey" style="max-width: 400px;margin-bottom: 20px"/>

> A [Yeoman](http://yeoman.io) generator for Gulp, Templating, CSS Preprocessors, CoffeeScript, PostCSS, Modernizr, Icon Font Generator, BrowserSync, and some libraries to choose from. Express, Wordpress, Drupal, CodeIgniter and Laravel subgenerators are available.

> _**This generator is a work in progress.<br>
> There probably will be some bugs and missing features.<br>
> Likewise, this documentation isn't finished yet either.**_

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


## Gulp
This generator uses Gulp (CoffeeScript Gulp is optional). You have the option to install Gulp at root level, or a subfolder.

###### Root stucture
```sh
.yo-rc.json
bower.json
package.json
gulpfile.js
- gulp-tasks
- node_modules
- src
  - bower_components
  - preprocessors
  - js
  - …
- app
  - index.html
```

###### Clean stucture
```sh
.yo-rc.json
-gulp
  bower.json
  package.json
  gulpfile.js
  - gulp-tasks
  - node_modules
- src
  - bower_components
  - preprocessors
  - js
  - …
- app
  - index.html
```

## Generators

#### Main generator
The main generator calls the static subgenerator

```sh
$ yo robonkey
```

#### robonkey:static generator
The static generator installs a static website project

Choices include

- Templating (Jade/Pug, Nunjucks)

The static generator calls the styles-, js- and icons subgenerators

```sh
$ yo robonkey:static
```

#### robonkey:styles generator
Choices include

- Preprocessing (Scss, Stylus, Less)
- Postprocessing (postcss)

```sh
$ yo robonkey:styles
```

#### robonkey:js generator
Choices include

- Optional CoffeeScript
- A handfull of js libraries to choose from

```sh
$ yo robonkey:js
```

#### robonkey:icons

Choices include

- SVG Spritesheet
	- Spritesheet Name
- Icon font
	- Preprocessors
	- Font Name

```sh
$ yo robonkey:icons
```

#### robonkey:[framework] generators

Installs a framework. `$ yo robonkey` should be run aftwerwards.

```sh
$ yo robonkey:express
$ yo robonkey:wordpress
$ yo robonkey:drupal
$ yo robonkey:codeigniter
$ yo robonkey:laravel
```

## Modernizr

Modernizr gulp plugin is used for the creation of custom Modernizr tests.

When initialized, the plugin will crawl your .scss and .js files for Modernizr references (ie: `.no-svg`) and builds the `modernizr-custom.js` file.

[Modernizr website](https://modernizr.com/)<br>
[Gulp Modernizr](https://github.com/doctyper/gulp-modernizr)

### Settings

In `config.json` you can set the modernizr options.

```sh
"modernizr": {
  "excludeTests": [],
  "tests": [],
  "output": "modernizr-custom.js",
  "options": [ "setClasses", "addTest", "html5printshiv", "testProp", "fnBind" ]
}
```

More info on the settings is available on the [gulp-modernizr page](https://github.com/doctyper/gulp-modernizr).


### Build

To build a custom modernizr file, just run:

```sh
$ gulp modernizr
```
The build task will also create a custom modernizr file, next to a custom icon font and minified styles and script.

```sh
$ gulp build
```
#### Output

The output file will be:

```sh
website/assets/js/libs/modernizr-custom.js
```

## SVG spritesheet

Uses [gulp-svgstore](https://github.com/w0rm/gulp-svgstore)<br>
Combine svg files into one with <symbol> elements.
Read more about this in [CSS Tricks article](https://css-tricks.com/svg-symbol-good-choice-icons/).


### Settings

More on configuring on the [gulp-svgstore page](https://github.com/w0rm/gulp-svgstore)


### Build

Drop your svg files in: 

```sh
src/icons/<spritesheet name>/
```

Run

```sh
$ gulp svg
```
The build task will also run the svg task

```sh
$ gulp build

```
#### Output

The output file will be:

```sh
website/assets/img/svg
```


## Custom Icon Font

The custom icon font generator uses svg images from a folder to build the font. Then it generates a .scss file with `@font-face` declaration, `.icn` and `.icn--name` classes.

[Gulp Iconfont](https://www.npmjs.com/package/gulp-iconfont)<br>
[Gulp Iconfont css](https://github.com/backflip/gulp-iconfont-css)


### Settings

The fontname is set in the options when you use Robonkey. _(Default: `robonkey-glyphs`)_

In `config.json` you can set the icon font options.

```sh
"iconFont": {
  "name": "fontname",
  "types": ["ttf", "eot", "woff", "woff2", "svg"]
}
```

More info on the settings is available on the [gulp-icon page](https://github.com/nfroidure/gulp-iconfont).

### Build

###### Prepare:
> An Illustrator file is provided with examples.
> _(src/iconfont/illustrator/icn.ai)_

Things to consider when preparing svg for icon fonts:

- Minimum size 500px * 500px
- Each stroke must be converted to fills
- Fills must be combined creating compound paths if necessary (no overlapping shapes)
- Any color will be ignored: glyphs will always be interpreted as black. You also can’t use white for backgrounds: you can have only transparent ones
- Any embedded image in your SVG will be ignored
- The svg filename will be used as class name for the icon _(.icn--svg-file-name)_

###### Location:
Drop your svg files _(minimum 500px * 500px)_ in:

```sh
src/iconfont/svg/
```

###### Run:

```sh
$ gulp iconfont
```

#### Output Files

The font will be placed in:

```sh
website/assets/fonts/<your font name>
```

The scss/styl/less files will be placed in:

###### SCSS
```sh
src/scss/base/fonts/_font-icn.scss
src/scss/modules/_icons.scss
```

###### Stylus
```sh
src/scss/base/fonts/font-styl
src/stylus/modules/icons.styl
```

###### Less
```sh
src/scss/base/fonts/font-icn.less
src/less/modules/icons.less
```


## To Do

- Priority:
  - Testing
  - Update docs
