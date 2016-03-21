# Modernizr

Modernizr gulp plugin is used for the creation of custom Modernizr tests.

When initialized, the plugin will crawl your .scss and .js files for Modernizr references (ie: `.no-svg`) and builds the `modernizr-custom.js` file.

## Settings

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

## Dev file

A dev file, with all the tests is available:

```sh
website/asses/js/libs/modernizr.dev.js
```


## Build

To build a custom modernizr file, just run:

```sh
$ gulp modernizr
```
The build task will also create a custom modernizr file, next to a custom icon font and minified styles and script.

```sh
$ gulp build
```
### Output

The output file will be: 

```sh
website/assets/js/libs/modernizr.custom.js
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