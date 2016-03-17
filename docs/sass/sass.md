# Sass

This setup uses [node-sass](https://github.com/sass/node-sass), a library that provides a binding for Node.js to [LibSass](https://github.com/sass/libsass)


## Mixins and Functions
A set of [mixins](/docs/sass/mixins.md) and [functions](/docs/sass/functions.md) are available

## Libraries
The following libraries are included (optional on install): 

See their docs for more information.

- [Breakpoint](http://breakpoint-sass.com/) for mediaqueries
- [Susy](http://susydocs.oddbird.net/en/latest/) for creating your own grid system

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
- [Modernizr](/docs/modernizr.md)
- [Custom Icon Font](/docs/custom-icon-font.md)
- [Sass](/docs/sass/sass.md)
	- [Functions](/docs/sass/functions.md)
	- [Mixins](/docs/sass/mixins.md)