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
gulp iconfont
```

### SCSS File

The rendered .scss file, located in `src/scss/modules/_icons.scss`:

```sh
// ==========================================================================
// Variables
// ==========================================================================


$icn--name: "\E001";
$icn--name2: "\E002";
$icn--name3: "\E003";





// ==========================================================================
// Map
// ==========================================================================

$icons: (
  name: "\E001",
  name2: "\E002",
  name3: "\E003"
);




// ==========================================================================
// Extends
// ==========================================================================

%icn-base {
  @extend %iconfont;
  font-size: 1em;
  line-height: 1;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  speak: none;
  display: inline-block;
  text-rendering: auto;

  // Better Font Rendering
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

%icn{
  @extend %iconfont;
  display: inline-block;
  // vertical-align: bottom;
  &:before {
    @extend %icn-base;
  }
}

%icn--fw {
  width: $icn-fixed-width-size;
  text-align: center;
}


@each $name, $icn in $icons {
  .icn--#{$name}:before {
    content: $icn;
  }
}

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