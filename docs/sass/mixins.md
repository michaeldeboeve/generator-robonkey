# Sass Mixins

This is my personal mixin library, gathered over the years.

## Table of contents

- [Aspect Ratio](#aspect-ratio)
- [BEM](#bem)
- [Centerer](#centerer)
- [Clearfix](#clearfix)
- [Coverer](#coverer)
- [Equal padding inline element](#equal-padding-inline-element)
- [Flexvideo](#flexvideo)
- [Ghost arrow](#ghost-arrow)
- [Hamburger](#hamburger)
- [Hide text](#hide-text)
- [Load font](#load-font)
- [Media queries](#media-queries)
- [Optional @at-root](#optional-at-root)
- [Placeholder](#placeholder)
- [Position](#position)
- [Qualify](#qualify)
- [Selection](#selection)
- [Size](#size)
- [Triangle](#triangle)
- [Docs](#docs)


## Aspect Ratio
> Keep an element respecting a given aspect ratio

###### Use:

```sh
.foo {
  @include aspect-ratio(800, 400);
}
```

###### Output:

```sh
.foo {
  position: relative;
}
.foo {
  display: block;
  content: ' ';
  width: 100%;
  padding-top: 50%;
}
.foo > .foo__inner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
```


## BEM
> BEM style mixin

###### Use:

```sh
.foo {
  foo: block;

  @include e('element') {
    foo: element;
  }

  @include m('modifier') {
    foo: modifier;
  }
}

/* Nested */

.foo {
  foo: block;

  @include e('element') {
    foo: element;
    @include m('modifier') {
      foo: element--modifier;
    }
  }

  @include m('modifier') {
    foo: modifier;
    @include e('element') {
      foo: modifier__element;
    }
  }
}
```

###### Output:

```sh
.foo {
  foo: block;
}
.foo__element {
  foo: block__element;
}
.foo--modifier {
  foo: block--modifier;
}

/- Nested */

.foo {
  foo: block;
}
.foo__element {
  foo: block__element;
}
.foo__element--modifier {
  foo: block__element--modifier;
}
.foo--modifier {
  foo: block--modifier;
}
.foo--modifier__element {
  foo: block--modifier__element;
}
```

## Centerer
> Center an element using position absolute and translate

###### Use:

```sh
.foo {
  @include centerer();
}

.foo--both {
  @include centerer(both); // both or b
}

.foo--horizontal {
  @include centerer(horizontal); // horizontal or h
}

.foo--vertical {
  @include centerer(vertical); // vertical or v
}

.foo--remove {
  @include centerer-remove();
}

.foo--remove--pos {
  @include centerer-remove(absolute);
}
```

###### Output:

```sh
.foo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.foo--both {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.foo--horizontal {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
}

.foo--vertical {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}

.foo--remove {
  position: relative;
  top: auto;
  left: auto;
  transform: translate(0, 0);
}

.foo--remove--pos {
  position: absolute;
  top: auto;
  left: auto;
  transform: translate(0, 0);
}
```


## Clearfix
> No comment

###### Use:

```sh
.foo {
    @include clearfix();
}
```

###### Output:

```sh
.foo:after {
  content: '';
  display: table;
  clear: both;
}
```
### Equal padding inline element
> Equal padding on an inline element like a span, when the content breaks because of screen size

###### Use:

```sh
.foo {
  @include equal-padding-inline-span(red, 1em);
}
```

###### Output:

```sh
.foo {
  display: inline;
  background-color: red;
  box-shadow: 1em 0 red, -1em 0 red;
  vertical-align: sub;
}
```

### Flexvideo
> Responsive video

###### Use:

```sh
.foo {
  @include video-container();
}
```
###### Output:

```sh
.foo {
  position: relative;
  max-width: 800px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.foo__inner {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  margin: auto;
}
.foo__inner > iframe, .foo__inner > object, .foo__inner > embed, .foo__inner > video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

### Ghost arrow
> An arrow mixin based on a square with borders on two sides declared and rotated

##### Use:

```sh
.foo {
  @include ghost-arrow($size: 16px, $color: red, $width: 1px, $direction: right);
}
```

##### Output:

```sh
.foo {
  content: '';
  display: block;
  width: 16px;
  height: 16px;
  border-width: 0 1px 1px 0;
  border-style: solid;
  border-color: red;
  transform: rotate(-45deg);
}
```

### Hamburger
> A hamburger menu mixin

##### Use:

```sh
.foo {
  @include hamburger($size: 30px, $size-inner-width: 70%, $size-inner-height: 2px, $size-inner-offset: 8px);
}
```

##### Output:

```sh
.foo {
  width: 30px;
  height: 30px;
}
.foo__inner, .foo__inner:before, .foo__inner:after {
  background: #fff;
  display: block;
  position: absolute;
  height: 2px;
}
.foo__inner {
  width: 70%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.foo__inner:before, .foo__inner:after {
  content: '';
  width: 100%;
}
.foo__inner:before {
  bottom: 8px;
}
.foo__inner:after {
  top: 8px;
}
```

### Hide text
> Hide text from an element to be replaced by an image, for accessibility purposes

##### Use:

```sh
.foo {
  width: 200px;
  height: 100px;
  @include hidetext();
}
```

##### Output:

```sh
.foo {
  width: 200px;
  height: 100px;
  overflow: hidden;
}
.foo:before {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
}
```

### Load font
> Declare font
> Uses the assets function

##### Use:

```sh
@include load-font('fontname', 'fontfolder', 'fontfile', weight, style);
```

##### Output:

```sh
@font-face {
  font-family: 'fontname';
  src: url("../assets/fonts/fontfolder/fontfile.eot");
  src: url("../assets/fonts/fontfolder/fontfile.eot?#iefix") format("embedded-opentype"), url("../assets/fonts/fontfolder/fontfile.woff2") format("woff2"), url("../assets/fonts/fontfolder/fontfile.woff") format("woff"), url("../assets/fonts/fontfolder/fontfile.ttf") format("truetype"), url("../assets/fonts/fontfolder/fontfile.svg#fontfile") format("svg");
  font-weight: weight;
  font-style: style;
}
```

### Media queries
> Some mediaqueries

##### Available shortcuts:

```sh
@include above($bp){};
@include below($bp){};
@include between($bp1, $bp2){};
@include orientation($orientation){};
@include landscape(){};
@include portrait(){};

@include iphone6plus(null/portrait/landscape){};
@include iphone6(null/portrait/landscape){};
@include iphone5(null/portrait/landscape){};
@include iphone4(null/portrait/landscape){};

More will follow
```

### Optional @at-root
> Helper mixin to check if ruleset is at root level

##### Use:

```sh
@include optional-at-root('::-moz-selection') {
  @content;
}
```


### Placeholder

##### Use:

```sh
@include placeholder {
  color: red;
}

.foo {
  @include placeholder {
    color: blue;
  }
}
```

##### Output:

```sh
::-webkit-input-placeholder {
  color: red;
}
:-moz-placeholder {
  color: red;
}
::-moz-placeholder {
  color: red;
}
:-ms-input-placeholder {
  color: red;
}

.foo::-webkit-input-placeholder {
  color: blue;
}
.foo:-moz-placeholder {
  color: blue;
}
.foo::-moz-placeholder {
  color: blue;
}
.foo:-ms-input-placeholder {
  color: blue;
}
```


### Position
> Position shorthand

##### Use:

```sh
.foo {
  @include position(absolute);
}

.foo--bar {
  @include position(absolute, $top: 0, $right: 20px);
}

.foo--baz {
  @include position(absolute, 10px, 0, 30px, 1em);
}
```

##### Output:

```sh
.foo {
  position: absolute;
}

.foo--bar {
  position: absolute;
  top: 0;
  right: 20px;
}

.foo--baz {
  position: absolute;
  top: 10px;
  right: 0;
  bottom: 30px;
  left: 1em;
}
```

### Qualify
> Qualify a class from within its ruleset

##### Use:

```sh
.foo {
  border: none;

  @include qualify(button) {
    -webkit-appearance: none;
  }

  // @alias qualify
  @include when-is(a) {
    text-decoration: none;
  }
}
```

##### Output:

```sh
.foo {
  border: none;
}
button.foo {
  -webkit-appearance: none;
}
a.foo {
  text-decoration: none;
}
```

### Selection
> Selection styles mixin

##### Use:

```sh
@include selection {
  background: red;
}

.foo {
  @include selection {
    background: red;
  }
}
```

##### Output:

```sh
::-moz-selection {
  background: red;
}
:selection {
  background: red;
}
.foo::-moz-selection {
  background: blue;
}
.foo:selection {
  background: blue;
}
```

### Size
> Size shortcut mixins

##### Use:

```sh
.foo--size {
  @include size(30px, 100px);
}

.foo--size--square {
  @include size(30px);
}

.foo--square {
  @include square(30px);
}

.foo--circle {
  @include circle(30px);
}
```

##### Output:

```sh
.foo--size {
  width: 30px;
  height: 100px;
}

.foo--size--square {
  width: 30px;
  height: 30px;
}

.foo--square {
  width: 30px;
  height: 30px;
}

.foo--circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
```

### Triangle
> Make a triangle using the border method

##### Use:

```sh
.foo {
  @include triangle(red, left);
}
```

##### Output:

```sh
.foo {
  display: block;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 14px 0 14px 22px;
  border-color: transparent transparent transparent red;
}
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