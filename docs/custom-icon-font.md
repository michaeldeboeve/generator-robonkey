# Custom Icon Font

The custom icon font generator uses svg images from a folder to build the font. Then it generates a .scss file with `@font-face` declaration, `.icn` and `.icn--name` classes.

## Settings

The fontname is set in the options when you use Robonkey. _(Default: `robonkey-glyphs`)_

In `config.json` you can set the icon font options.

```sh
"iconFont": {
  "name": "fontname",
  "types": ["ttf", "eot", "woff", "woff2", "svg"]
}
```

More info on the settings is available on the [gulp-icon page](https://github.com/nfroidure/gulp-iconfont).

## Build

###### Prepare:
> An Illustrator file is provided with examples.
> _(src/iconfont/illustrator/icn.ai)_

Things to consider when preparing svg for icon fonts:

- Minimum size 512px * 512px
- Each stroke must be converted to fills
- Fills must be combined creating compound paths if necessary (no overlapping shapes)
- Any color will be ignored: glyphs will always be interpreted as black. You also can’t use white for backgrounds: you can have only transparent ones
- Any embedded image in your SVG will be ignored
- The svg filename will be used as class name for the icon _(.icn--svg-file-name)_

###### Location:
Drop your svg files _(minimum 512px * 512px)_ in the svg folder _(src/iconfont/svg)_


###### Run:

```sh
$ gulp iconfont
```

### Output Files

The font will be placed in:

```sh
website/assets/fonts
```

The rendered icon files will be placed in:

###### SCSS
```sh
src/scss/modules/_icons.scss
```

###### Stylus
```sh
src/stylus/modules/icons.styl
```

###### Less
```sh
src/less/modules/icons.less
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
