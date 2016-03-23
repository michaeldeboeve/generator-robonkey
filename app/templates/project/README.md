# <%= appname %>
> <%= appdescription %><br>
> _Generated with [robonkey](https://github.com/michaeldeboeve/generator-robonkey/blob/master/docs/features.md)_

## gulpfile.js

The gulpfile.js is split up in parts using [require-dir]().
It gets it's tasks from the subdirectory `gulp-tasks`, which contains the followig files:

- bower.js _(moving bower dependencies to the `website/assets` folder)_<% if(includeCustomIcnFont) { %>
- iconfont.js _(creating the iconfont)_<% } %>
- images.js _(imagemin)_<% if(includeNunjucks) { %>
- nunjucks.js _(nunjucks compile)_<% } %><% if(includeJade) { %>
- jade.js _(jade compile)_<% } %><% if(includeModernizr) { %>
- modernizr.js _(creating modernizr file)_<% } %>
- scripts.js _(concat and minify javascript)_
- styles.js _(concat and minify SCSS, Stylus or Less)_

### Gulp Dev

The default task will output unminified css, javascript and will start up BrowserSync.

```sh
$ gulp
```

or

```sh
$ gulp serve
```
or

```sh
$ gulp dev
```

### Gulp Build

Build task will <% if(includeModernizr) { %>generate a custom modernizr file and<% } %> <% if(includeCustomIcnFont) { %>run the iconfont task and<% } %> minify the styles and scripts:

```sh
$ gulp build
```


### Settings

Two config files are present:

- config.json - contains basic settings for:
  - url for browsersync<% if(includeModernizr) { %>
  - modernizr settings<% } %><% if(includeCustomIcnFont) { %>
  - icon font settings<% } %><% if(includePcssClassPrefix) { %>
  - class perfix name<% } %><% if(includePcssScopify) { %>
  - scope name<% } %>
- paths.json - contains paths for:
  - scripts - scr/build<% if(includeModernizr) { %>
  - modernizr - build<% } %>
  - html - scr
  - images - src/build
  - styles - src/build/scr_watch/build_soucemap<% if(includeNunjucks) { %>
  - nunjucks - src/watch/build<% } %><% if(includeJade) { %>
  - jade - src/watch/build<% } %><% if(includePostCSS) { %>
  - postcss - src/build<% } %><% if(includeCustomIcnFont) { %>
  - font - src/build/template/path<% } %>

<% if(includeCustomIcnFont) { %>
Make a custom icon font:

```sh
$ gulp iconfont
```
<% } %>

<% if(includeModernizr) { %>
Generate custom modernizr file:

```sh
$ gulp modernizr
```
<% } %>

<% if(includeJade) { %>
## Jade
Jade source files are located in

```sh
src/jade/
```

and will be compiled to

```sh
website/
```
<% } %>

<% if(includeNunjucks) { %>
## Jade
Nunjucks source files are located in

```sh
src/nunjucks/
```

and will be compiled to

```sh
website/
```
<% } %>

<% if(includeSCSS) { %>
## Sass

Sass source files are located in

```sh
src/scss/
```

and will be compiled to

```sh
website/assets/css
```

<% if(!noMixinLibSCSS) { %>
###### Mixin library:

<% if(includeBourbon) { %>
- [Bourbon](http://bourbon.io/)<% } %><% if(includeCompass) { %>
- [Compass Mixins](https://github.com/Igosuki/compass-mixins)<% } %>

<% } %>

<% if(!noGridLibSCSS) { %>
###### Grid library:

<% if(includeJeetSCSS) { %>
- [Jeet](http://jeet.gs/)<% } %><% if(includeSusy) { %>
- [Susy](http://susydocs.oddbird.net/en/latest/)<% } %><% if(includeNeat) { %>
- [Neat](http://bourbon.io/)<% } %><% if(includeSemanticSCSS) { %>
- [Semantic.gs](https://tylertate.github.io/semantic.gs/)<% } %>

<% } %>

<% if(!noMQLibSCSS) { %>
###### Mediaqueries library:

<% if(includeBreakpoint) { %>
- [Breakpoint](http://breakpoint-sass.com/)<% } %><% if(includeIncludeMedia) { %>
- [Include Media](https://github.com/Igosuki/compass-mixins)<% } %>

<% } %>

<% } %>

<% if(includeStylus) { %>
## Stylus

Stylus source files are located in

```sh
src/stylus/
```

and will be compiled to

```sh
website/stylus/css
```

<% if(!noMixinLibStylus) { %>
###### Mixin library:
<% if(includeNib) { %>
- [Nib](https://tj.github.io/nib/)<% } %><% if(includeKoutoSwiss) { %>
- [Kouto Swiss](http://kouto-swiss.io/)<% } %>
<% } %>

<% if(!noGridLibSCSS) { %>
###### Grid library:

<% if(includeJeetStylus) { %>
- [Jeet](http://jeet.gs/)<% } %><% if(includeSGrid) { %>
- [sGrid](http://stylusgrid.com/)<% } %><% if(includeSemanticStylus) { %>
- [Semantic.gs](https://tylertate.github.io/semantic.gs/)<% } %>

<% } %>

<% if(!noMQLibSCSS) { %>
###### Mediaqueries library:

<% if(includeRupture) { %>
- [Rupture](https://jenius.github.io/rupture/)<% } %>

<% } %>

<% } %>

<% if(includeLess) { %>
## Less

Less source files are located in

```sh
src/less/
```

and will be compiled to

```sh
website/less/css
```

<% if(!noMixinLibLess) { %>
###### Mixin library:

<% if(includeLessHat) { %>
- [Less Hat](http://lesshat.madebysource.com/)<% } %>

<% } %>

<% if(!noGridLibLess) { %>
###### Grid library:

<% if(includeGee) { %>
- [Gee](http://sorgalla.com/gee/)<% } %><% if(includeSemanticLess) { %>
- [Semantic.gs](https://tylertate.github.io/semantic.gs/)<% } %>

<% } %>

<% if(!noMQLibLess) { %>
###### Mediaqueries library:

<% if(includeLessMQ) { %>
- [Less-MQ](https://github.com/mrmlnc/less-mq)<% } %>

<% } %>

<% } %>

<% if(!noBaseStyles) {%>
## Base Styles

<% if(includeReset && includeSCSS) { %>
- [Reset](https://github.com/shannonmoeller/reset-css)<% } %><% if(includeNormalize && includeSCSS) { %>
- [Normalize](https://github.com/JohnAlbin/normalize-scss)<% } %><% if(includeSanitize && includeSCSS) { %>
- [Sanitize](https://github.com/10up/sanitize.css)<% } %><% if(includeReset && includeStylus) { %>
- [Reset](https://github.com/dtan/html5-reset-stylus)<% } %><% if(includeNormalize && includeStylus) { %>
- [Normalize](https://github.com/bymathias/normalize.styl)<% } %><% if(includeSanitize && includeStylus) { %>
- [Sanitize]()<% } %><% if(includeReset && includeLess) { %>
- [Reset](https://github.com/kuatsure/Eric-Meyer-Reset---less--)<% } %><% if(includeNormalize && includeLess) { %>
- [Normalize](https://github.com/additiveinverse/normalize.less)<% } %><% if(includeSanitize && includeLess) { %>
- [Sanitize](https://github.com/luixxiul/sanitize.less/blob/master/sanitize.less)<% } %>

<% } %>

<% if(includePostCSS) { %>
## PostCSS
> PostCSS: https://github.com/postcss/postcss<br>
> More PostCSS plugins: http://postcss.parts/

- [Autoprefixer](https://github.com/postcss/autoprefixer) _(Automatically used **if postCSS is true**)_<% if(includePcssNano) {%>
- [Css Nano](https://github.com/ben-eb/cssnano)<% } %><% if(includePcssGradientFix) {%>
- [Gradient Transparency Fixer](https://github.com/gilmoreorless/postcss-gradient-transparency-fix)<% } %><% if(includePcssMQPacker) {%>
- [MQPacker](https://github.com/hail2u/node-css-mqpacker)<% } %><% if(includePcssMQKeyframes) {%>
- [MQKeyframes](https://github.com/TCotton/postcss-mq-keyframes)<% } %><% if(includePcssSelectorNot) {%>
- [Selector Not](https://github.com/postcss/postcss-selector-not)<% } %><% if(includePcssSelectorMatches) {%>
- [Selector Matches](https://github.com/postcss/postcss-selector-matches)<% } %><% if(includePcssClassPrefix) {%>
- [Class Prefix](https://github.com/thompsongl/postcss-class-prefix)<% } %><% if(includePcssScopify) {%>
- [Scopify](https://github.com/pazams/postcss-scopify)<% } %>

<% } %>

<% if(includeCustomIcnFont) { %>
## Custom Icon Font

The custom icon font generator uses svg images from a folder to build the font. Then it generates a <% if(includeSCSS) { %>.scss<% } %><% if(includeStylus) { %>.stylus<% } %><% if(includeLess) { %>.less<% } %> file with `@font-face` declaration, `.icn` and `.icn--name` classes.

### Settings

The fontname is set in the options when you use Robonkey. _(Default: `robonkey-glyphs`)_

In `config.json` you can set the icon font options.

```sh
"iconFont": {
  "name": "fontname",
  "types": ["ttf", "eot", "woff", "woff2", "svg"]
}
```

More info on the settings is available on the [gulp-icon page](https://github.com/nfroidure/gulp-iconfont).

### Build

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


### Build

To build a custom icon font, just run:

```sh
$ gulp iconfont
```
Build task will <% if(includeModernizr) { %>generate a custom modernizr file and <% } %> run the iconfont task and minify the styles and scripts:

```sh
$ gulp build
```

### Output Files

The font will be placed in:

```sh
website/assets/fonts
```

The rendered icon file will be placed in:

```sh
<% if(includeSCSS) {%>src/scss/modules/_icons.scss<% } %><% if(includeStylus) {%>
src/stylus/modules/icons.styl<% } %><% if(includeLess) {%>
src/less/modules/icons.less<% } %>
```
<% } %>

<% if(includeModernizr) { %>
## Modernizr

Modernizr gulp plugin is used for the creation of custom Modernizr tests.

When initialized, the plugin will crawl your <% if(includeSCSS) { %>.scss<% } %><% if(includeStylus) { %>.stylus<% } %><% if(includeLess) { %>.less<% } %> and .js files for Modernizr references (ie: `.no-svg`) and builds the `modernizr-custom.js` file.

### Settings

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

### Dev file

A dev file, with all the tests is available:

```sh
website/asses/js/libs/modernizr.dev.js
```


### Build

To build a custom modernizr file, just run:

```sh
$ gulp modernizr
```
Build task will generate a custom modernizr file and <% if(includeCustomIcnFont) { %>run the iconfont task and<% } %> minify the styles and scripts:

```sh
$ gulp build
```

### Output

The output file will be:

```sh
website/assets/js/libs/modernizr.custom.js
```

<% } %>

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
  ├── <% if(includeJade) {%>jade<% } %><% if(includeNunjucks) {%>nunjucks<% } %>
    ...
  ├── js
    ...
  ├── modernizr
    ...
  ├── <% if(includeSCSS) {%>scss<% } %><% if(includeStylus) {%>stylus<% } %><% if(includeLess) {%>less<% } %>
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
  <% if(includeHtaccess) {%>.htaccess<% } %><% if(includeBrowserconfig) {%>
  browserconfig.xml<% } %><% if(includeCrossdomain) {%>
  crossdomain.xml<% } %><% if(includeRobots) {%>
  humans.txt
  robots.txt<% } %>
  index.html
```
