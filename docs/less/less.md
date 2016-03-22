# Less

## Location

Less source files are located in

```sh
src/less/
```

and will be compiled to

```sh
website/assets/css
```


## Libraries
The following libraries are included (optional on install): 

See their docs for more information.

###### Media Queries
- [Less-MQ](https://github.com/mrmlnc/less-mq)

###### Grids
- [Gee](http://sorgalla.com/gee/)
- [Semantic.gs](https://tylertate.github.io/semantic.gs/)

###### Mixins
- [Less Hat](http://lesshat.madebysource.com/)

## Settings
Information about variables


## Structure
```sh
less
	├── base
		├── colors
			materialdesign.less
			socialmedia.less
			...
	 	├── mixins
	 		...
	 	fonts.less
	 	placeholders.less
	 	typography.less
	 	variables.less
	 	reset.less, normalize.less or sanitize.less
		...
	├── modules
		buttons.less
		forms.less
		icons.less
		...
	├── playground
		playground.less
		...
	├── views
		footer.less
		header.less
		...
	├── pages
		...
	├── themes
		...
	styles.less
	
```



## Docs

- [Home](/README.md)
- [Getting started](/docs/getting-started.md)
- [Features](/docs/features.md)
- [Options](/docs/options.md)
- [Jade](/docs/jade)
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