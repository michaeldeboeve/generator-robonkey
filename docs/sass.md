# Sass

This setup uses [node-sass](https://github.com/sass/node-sass), a library that provides a binding for Node.js to [LibSass](https://github.com/sass/libsass)

[Sass website](http://sass-lang.com/)

## Location

Sass source files are located in

```sh
src/scss/
```

and will be compiled to

```sh
website/assets/css
```


## Libraries
The following libraries are included (optional on install):

See their docs for more information.

###### Media Queries
- [Breakpoint](http://breakpoint-sass.com/)
- [Include Media](https://github.com/Igosuki/compass-mixins)

###### Grids
- [Jeet](http://jeet.gs/)
- [Susy](http://susydocs.oddbird.net/en/latest/)
- [Neat](http://bourbon.io/)
- [Semantic.gs](https://tylertate.github.io/semantic.gs/)

###### Mixins
- [Compass Mixins](https://github.com/Igosuki/compass-mixins)
- [Bourbon](http://bourbon.io/)

## Settings
Information about variables


## Structure
```sh
scss
	├── base
		├── colors
			_materialdesign.scss
			_socialmedia.scss
			...
		├── functions
			...
	 	├── mixins
	 		...
	 	_fonts.scss
	 	_placeholders.scss
	 	_typography.scss
	 	_variables.scss
	 	_reset.scss, _normalize.scss or _sanitize.scss
		...
	├── modules
		_buttons.scss
		_forms.scss
		_icons.scss
		...
	├── playground
		_playground.scss
		...
	├── views
		_footer.scss
		_header.scss
		...
	├── pages
		...
	├── themes
		...
	styles.scss

```



## Docs

- [Home](/README.md)
- [Getting started](/docs/getting-started.md)
- [Features](/docs/features.md)
- [Options](/docs/options.md)
- [HTML templating](/docs/html.md)
- [Images](/docs/images.md)
- [Sass](/docs/sass.md)
- [Stylus](/stylus/stylus.md)
- [Less](/docs/less.md)
- [Modernizr](/docs/modernizr.md)
- [Custom Icon Font](/docs/custom-icon-font.md)
