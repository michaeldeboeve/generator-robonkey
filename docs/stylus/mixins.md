# Stylus Mixins

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
- [Placeholder](#placeholder)
- [Position](#position)
- [Selection](#selection)
- [Size](#size)
- [Triangle](#triangle)
- [Docs](#docs)


## Aspect Ratio
> Keep an element respecting a given aspect ratio

###### Use:

```sh
.foo
  aspect-ratio(800, 400)
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
.foo
  foo: block

  +e('element')
    foo: element

  +m('modifier')
    foo: modifier

/* Nested */

.foo
  foo: block;

  +e('element')
    foo: element
    +m('modifier')
      foo: element--modifier

  +m('modifier')
    foo: modifier
    +e('element')
      foo: modifier__element
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
.foo
  centerer()

.foo--both
  centerer(both) // both or b

.foo--horizontal
  centerer(horizontal) // horizontal or h

.foo--vertical
  centerer(vertical) // vertical or v

.foo--remove
  centerer-remove()

.foo--remove--pos
  centerer-remove(absolute)
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
.foo
    clearfix()
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
.foo
  equal-padding-inline-span(red, 1em)
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
.foo
  video-container()
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
.foo
  ghost-arrow($size: 16px, $color: red, $width: 1px, $direction: right)
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
.foo
  hamburger($size: 30px, $size-inner-width: 70%, $size-inner-height: 2px, $size-inner-offset: 8px)
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
.foo
  width: 200px
  height: 100px
  hidetext()
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
load-font('fontname', 'fontfolder', 'fontfile', weight, style)
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
above($bp){}
below($bp){}
between($bp1, $bp2){}
orientation($orientation){}
landscape(){}
portrait(){}

iphone6plus(null/portrait/landscape){}
iphone6(null/portrait/landscape){}
iphone5(null/portrait/landscape){
iphone4(null/portrait/landscape){};

More will follow
```



### Placeholder

##### Use:

```sh
+placeholder()
  color: red;

.foo
  +placeholder
    color: blue;
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
.foo
  position(absolute);

.foo--bar
  position(absolute, top 0 right 20px);

.foo--baz
  position(absolute, top 10px right 0 bottom 30px left 1em)
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
.foo
  border: none;

  +qualify(button)
    -webkit-appearance: none;

  // @alias qualify
  +when-is(a)
    text-decoration: none;
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
+selection()
  background: red;

.foo
  +selection()
    background: red;
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
.foo--size
  size(30px, 100px)

.foo--size--square
  size(30px)

.foo--square
  square(30px)

.foo--circle
  circle(30px)
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
.foo--top
  triangle(top, red, 20px 10px);

.foo--left
  triangle(left, red, 20px 10px);
```

##### Output:

```sh
.foo--top {
  width: 0;
  height: 0;
  display: block;
  border-style: solid;
  border-width: 20px 10px;
  border-color: transparent;
  border-top-width: 0;
  border-bottom-color: #f00;
}

.foo--left {
  width: 0;
  height: 0;
  display: block;
  border-style: solid;
  border-width: 10px 20px;
  border-color: transparent;
  border-left-width: 0;
  border-right-color: #f00;
}

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
