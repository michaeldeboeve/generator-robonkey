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
