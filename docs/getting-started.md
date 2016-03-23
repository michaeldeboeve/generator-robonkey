# Getting Started

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

Dev task, including BrowserSync and watch (unminified styles and scripts):

```sh
$ gulp
```
or

```sh
$ gulp dev
```

or

```sh
$ gulp serve
```

Make a custom icon font:

```sh
$ gulp iconfont
```

Generate custom modernizr file:

```sh
$ gulp modernizr
```

Build task will generate custom modernizr file and run the iconfont task and minify the styles and scripts:

```sh
$ gulp build
```

## Structure

###### Main structure:

```sh
root
├── gulp
	...
├── src
	...
├── website
	...
.editorconfig
.gitignore
.gitattributes
.yo-rc.json
README.md
```


###### Gulp structure:
```sh
gulp
	bower.json
	config.json
	package.json
	paths.json
	gulpfile.js
	├── gulp-tasks
		bower.js
		clean.js
		images.js
		jade.js
		nunjucks.js
		modernizr.js
		scripts.js
		styles.js
	├── node_modules
		...	
```

###### Src structure:
```sh
scc
	├── bower_components
		...
	├── images
		...	
	├── jade
		...	
	├── js
		...
	├── modernizr
		...	
	├── scss/stylus/less
		...	
```

###### Website structure:
```sh
website
	├── css
		...
	├── fonts
		...	
	├── images
		...	
	├── js
		├── libs
			...
		...
	.htaccess
	browserconfig.xml
	crossdomain.xml
	humans.txt
	robots.txt
	index.html
```

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