# <%= projectName %>
> <%= projectDescription %><br>
> _Generated with [robonkey](https://github.com/michaeldeboeve/generator-robonkey/blob/master/docs/features.md)_

## gulpfile.js

The gulpfile.js is split up in parts using [require-dir]().
It gets it's tasks from the subdirectory `gulp-tasks`, which contains the followig files:

- bower.js _(moving bower dependencies to the `website/assets` folder)_<% if(customIconfontOption) { %>
- iconfont.js _(creating the iconfont)_<% } %>
- images.js _(imagemin)_<% if(templateOption === 'nunjucks') { %>
- nunjucks.js _(nunjucks compile)_<% } %><% if(templateOption === 'jade') { %>
- jade.js _(jade compile)_<% } %><% if(modernizrOption) { %>
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

Build task will <% if(modernizrOption) { %>generate a custom modernizr file and<% } %> <% if(customIconfontOption) { %>run the iconfont task and<% } %> minify the styles and scripts:

```sh
$ gulp build
```


### Settings

Two config files are present:

- config.json - contains basic settings for:
  - url for browsersync<% if(modernizrOption) { %>
  - modernizr settings<% } %><% if(customIconfontOption) { %>
  - icon font settings<% } %><% if(classprefixOption) { %>
  - class perfix name<% } %><% if(scopifyOption) { %>
  - scope name<% } %>
- paths.json - contains paths for:
  - scripts - scr/build<% if(modernizrOption) { %>
  - modernizr - build<% } %>
  - html - scr
  - images - src/build
  - styles - src/build/scr_watch/build_soucemap<% if(templateOption === 'nunjucks') { %>
  - nunjucks - src/watch/build<% } %><% if(templateOption === 'jade') { %>
  - jade - src/watch/build<% } %><% if(postCssOption) { %>
  - postcss - src/build<% } %><% if(customIconfontOption) { %>
  - font - src/build/template/path<% } %>

<% if(customIconfontOption) { %>
Make a custom icon font:

```sh
$ gulp iconfont
```
<% } %>

<% if(modernizrOption) { %>
Generate custom modernizr file:

```sh
$ gulp modernizr
```
<% } %>

<% if(templateOption === 'jade') { %>
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

<% if(templateOption === 'nunjucks') { %>
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

<% if(preproOption === 'sass') { %>
## Sass

Sass source files are located in

```sh
src/scss/
```

and will be compiled to

```sh
website/assets/css
```

<% if(preproOption === 'sass' && mixinOption !== 'none') { %>
###### Mixin library:

<% if(mixinOption === 'bourbon') { %>
- [Bourbon](http://bourbon.io/)<% } %><% if(mixinOption === 'compassmixins') { %>
- [Compass Mixins](https://github.com/Igosuki/compass-mixins)<% } %>

<% } %>

<% if(preproOption === 'sass' && gridOption !== 'none') { %>
###### Grid library:

<% if(preproOption === 'sass' && gridOption === 'jeet') { %>
- [Jeet](http://jeet.gs/)<% } %><% if(gridOption === 'susy') { %>
- [Susy](http://susydocs.oddbird.net/en/latest/)<% } %><% if(gridOption === 'neat') { %>
- [Neat](http://bourbon.io/)<% } %><% if(preproOption === 'sass' && gridOption === 'semantic') { %>
- [Semantic.gs](https://tylertate.github.io/semantic.gs/)<% } %>

<% } %>

<% if(preproOption === 'sass' && mqOption !== 'none') { %>
###### Mediaqueries library:

<% if(mqOption === 'breakpoint') { %>
- [Breakpoint](http://breakpoint-sass.com/)<% } %><% if(gridOption === 'includemedia') { %>
- [Include Media](https://github.com/Igosuki/compass-mixins)<% } %>

<% } %>

<% } %>

<% if(preproOption === 'stylus') { %>
## Stylus

Stylus source files are located in

```sh
src/stylus/
```

and will be compiled to

```sh
website/stylus/css
```

<% if(preproOption === 'stylus' && gridOption !== 'none') { %>
###### Mixin library:
<% if(mixinOption === 'nib') { %>
- [Nib](https://tj.github.io/nib/)<% } %><% if(mixinOption === 'koutoswiss') { %>
- [Kouto Swiss](http://kouto-swiss.io/)<% } %>
<% } %>

<% if(preproOption === 'stylus' && gridOption !== 'none') { %>
###### Grid library:

<% if(preproOption === 'stylus' && gridOption === 'jeet') { %>
- [Jeet](http://jeet.gs/)<% } %><% if(gridOption === 'sgrid') { %>
- [sGrid](http://stylusgrid.com/)<% } %><% if(preproOption === 'stylus' && gridOption === 'semantic') { %>
- [Semantic.gs](https://tylertate.github.io/semantic.gs/)<% } %>

<% } %>

<% if(preproOption === 'stylus' && mqOption !== 'none') { %>
###### Mediaqueries library:

<% if(mqOption === 'rupture') { %>
- [Rupture](https://jenius.github.io/rupture/)<% } %>

<% } %>

<% } %>

<% if(preproOption === 'less') { %>
## Less

Less source files are located in

```sh
src/less/
```

and will be compiled to

```sh
website/less/css
```

<% if(preproOption === 'less' && mixinOption !== 'none') { %>
###### Mixin library:

<% if(mixinOption === 'lesshat') { %>
- [Less Hat](http://lesshat.madebysource.com/)<% } %>

<% } %>

<% if(preproOption === 'less' && gridOption !== 'none') { %>
###### Grid library:

<% if(gridOption === 'gee') { %>
- [Gee](http://sorgalla.com/gee/)<% } %><% if(preproOption === 'less' && gridOption === 'semantic') { %>
- [Semantic.gs](https://tylertate.github.io/semantic.gs/)<% } %>

<% } %>

<% if(preproOption === 'stylus' && mqOption !== 'none') { %>
###### Mediaqueries library:

<% if(mqOption === 'lessmq') { %>
- [Less-MQ](https://github.com/mrmlnc/less-mq)<% } %>

<% } %>

<% } %>

<% if(baseStyleOption !== 'none') {%>
## Base Styles

<% if(baseStyleOption === 'reset' && preproOption === 'sass') { %>
- [Reset](https://github.com/shannonmoeller/reset-css)<% } %><% if(baseStyleOption === 'normalize' && preproOption === 'sass') { %>
- [Normalize](https://github.com/JohnAlbin/normalize-scss)<% } %><% if(baseStyleOption === 'sanitize' && preproOption === 'sass') { %>
- [Sanitize](https://github.com/10up/sanitize.css)<% } %><% if(baseStyleOption === 'reset' && preproOption === 'stylus') { %>
- [Reset](https://github.com/dtan/html5-reset-stylus)<% } %><% if(baseStyleOption === 'normalize' && preproOption === 'stylus') { %>
- [Normalize](https://github.com/bymathias/normalize.styl)<% } %><% if(baseStyleOption === 'sanitize' && preproOption === 'stylus') { %>
- [Sanitize]()<% } %><% if(baseStyleOption === 'reset' && preproOption === 'less') { %>
- [Reset](https://github.com/kuatsure/Eric-Meyer-Reset---less--)<% } %><% if(baseStyleOption === 'normalize' && preproOption === 'less') { %>
- [Normalize](https://github.com/additiveinverse/normalize.less)<% } %><% if(baseStyleOption === 'sanitize' && preproOption === 'less') { %>
- [Sanitize](https://github.com/luixxiul/sanitize.less/blob/master/sanitize.less)<% } %>

<% } %>

<% if(postCssOption) { %>
## PostCSS
> PostCSS: https://github.com/postcss/postcss<br>
> More PostCSS plugins: http://postcss.parts/

<% if(autoprefixerOption) {%>
- [Autoprefixer](https://github.com/postcss/autoprefixer)<% } %><% if(cssnanoOption) {%>
- [Csso](https://github.com/lahmatiy/postcss-csso)<% } %><% if(gradientfixOption) {%>
- [Gradient Transparency Fixer](https://github.com/gilmoreorless/postcss-gradient-transparency-fix)<% } %><% if(mqpackerOption) {%>
- [MQPacker](https://github.com/hail2u/node-css-mqpacker)<% } %><% if(mqkeyframesOption) {%>
- [MQKeyframes](https://github.com/TCotton/postcss-mq-keyframes)<% } %><% if(classprefixOption) {%>
- [Class Prefix](https://github.com/thompsongl/postcss-class-prefix)<% } %><% if(scopifyOption) {%>
- [Scopify](https://github.com/pazams/postcss-scopify)<% } %>

<% } %>

<% if(customIconfontOption) { %>
## Custom Icon Font

The custom icon font generator uses svg images from a folder to build the font. Then it generates a <% if(preproOption === 'sass') { %>.scss<% } %><% if(preproOption === 'stylus') { %>.stylus<% } %><% if(preproOption === 'less') { %>.less<% } %> file with `@font-face` declaration, `.icn` and `.icn--name` classes.

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
Build task will <% if(modernizrOption) { %>generate a custom modernizr file and <% } %> run the iconfont task and minify the styles and scripts:

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
<% if(preproOption === 'sass') {%>src/scss/modules/_icons.scss<% } %><% if(preproOption === 'stylus') {%>
src/stylus/modules/icons.styl<% } %><% if(preproOption === 'less') {%>
src/less/modules/icons.less<% } %>
```
<% } %>

<% if(modernizrOption) { %>
## Modernizr

Modernizr gulp plugin is used for the creation of custom Modernizr tests.

When initialized, the plugin will crawl your <% if(preproOption === 'sass') { %>.scss<% } %><% if(preproOption === 'stylus') { %>.stylus<% } %><% if(preproOption === 'less') { %>.less<% } %> and .js files for Modernizr references (ie: `.no-svg`) and builds the `modernizr-custom.js` file.

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
Build task will generate a custom modernizr file and <% if(customIconfontOption) { %>run the iconfont task and<% } %> minify the styles and scripts:

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

<% if(gulpDirOption) {%>
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
<% } %>

<% if(!gulpDirOption) {%>
###### Main structure:

```sh
root
├── src
  ...
├── website
  ...
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
bower.json
config.json
package.json
paths.json
gulpfile.js
.editorconfig
.gitignore
.gitattributes
.yo-rc.json
README.md
```
<% } %>

###### Src structure:
```sh
scc
  ├── bower_components
    ...
  ├── images
    ...
  ├── <% if(templateOption === 'jade') {%>jade<% } %><% if(templateOption === 'nunjucks') {%>nunjucks<% } %>
    ...
  ├── js
    ...
  ├── modernizr
    ...
  ├── <% if(preproOption === 'sass') {%>scss<% } %><% if(preproOption === 'stylus') {%>stylus<% } %><% if(preproOption === 'less') {%>less<% } %>
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
  <% if(htaccessOption) {%>.htaccess<% } %><% if(browserconfigOption) {%>
  browserconfig.xml<% } %><% if(crossdomainOption) {%>
  crossdomain.xml<% } %><% if(robotsOption) {%>
  humans.txt
  robots.txt<% } %>
  index.html
```
