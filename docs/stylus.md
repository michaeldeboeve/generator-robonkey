# Stylus

[Stylus website](http://stylus-lang.com/)

## Location

Stylus source files are located in

```sh
src/stylus/
```

and will be compiled to

```sh
website/assets/css
```


## Libraries
The following libraries are included (optional on install):

See their docs for more information.

###### Media Queries
- [Rupture](https://jenius.github.io/rupture/)

###### Grids
- [Jeet](http://jeet.gs/)
- [Semantic.gs](https://tylertate.github.io/semantic.gs/)
- [sGrid](http://stylusgrid.com/)

###### Mixins
- [Nib](https://tj.github.io/nib/)
- [Kouto Swiss](http://kouto-swiss.io/)

## Settings
Information about variables


## Structure
```sh
stylus
	├── base
		├── colors
			materialdesign.styl
			socialmedia.styl
			...
		├── functions
			...
	 	├── mixins
	 		...
	 	fonts.styl
	 	placeholders.styl
	 	typography.styl
	 	variables.styl
	 	reset.styl, normalize.styl or sanitize.styl
		...
	├── modules
		buttons.styl
		forms.styl
		icons.styl
		...
	├── playground
		playground.styl
		...
	├── views
		footer.styl
		header.styl
		...
	├── pages
		...
	├── themes
		...
	styles.styl

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
