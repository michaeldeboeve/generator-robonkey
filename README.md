<img src="docs/robonkey-logo.svg" alt="Drawing" style="max-width: 400px;margin-bottom: 20px"/>

> A [Yeoman](http://yeoman.io) generator for Gulp, Templating, CSS Preprocessors, CoffeeScript, PostCSS, Modernizr, Icon Font Generator, BrowserSync, and some libraries to choose from. Express, Wordpress, Drupal, CodeIgniter and Laravel subgenerators are available.

> _**This generator is a work in progress.<br>
> There probably will be some bugs and missing features.<br>
> Likewise, this documentation isn't finished yet either.**_

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

The static generator calls the styles-, js- and iconfont subgenerators

```sh
$ yo robonkey:static
```

#### robonkey:styles generator
Choices include

- Preprocessing (Scss, Stylus, Less, precss (on the way))
- Postprocessing (postcss)

```sh
$ yo robonkey:styles
```

#### robonkey:js generator
Choices include

- Optional CoffeeScript
- A handfull of js libraries to choose from

```sh
$ yo robonkey:styles
```

#### robonkey:iconfont generator

Choices include

- Preprocessors
- Font Name

```sh
$ yo robonkey:iconfont
```

#### robonkey:[framework] generators

Installs a framework, then runs the static generator

```sh
$ yo robonkey:express
$ yo robonkey:wordpress
$ yo robonkey:drupal
$ yo robonkey:codeigniter
$ yo robonkey:laravel
```


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
	- Testing 
	- Update docs
