#Mixins

* [Aspect Ratio](#aspect-ratio)
* [BEM](#bem)
* [Centerer](#centerer)
* [Clearfix](#clearfix)

 
####Aspect Ratio

Use:

	.foo {
		@include aspect-ratio(800, 400);
	}

Output:

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

Mixin:

	@mixin aspect-ratio($width, $height) {
  		position: relative;

  		&:before {
   			display: block;
    		content: ' ';
    		width: 100%;
    		padding-top: (($height / $width) * 100%);
  		}

  		& > &__inner {
    		position: absolute;
    		top: 0;
    		left: 0;
    		right: 0;
    		bottom: 0;
  		}
	}

####BEM

Use:

	.foo {
	  foo: block;
	  @include e('element') {
	    foo: element;
	  }
	  
	  @include m('modifier') {
	    foo: modifier;
	  }
	}
	
	/* Nested: */
	
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

Output:

	.foo {
	  foo: block;
	}
	.foo__element {
	  foo: block__element;
	}
	.foo--modifier {
	  foo: block--modifier;
	}
	
	/* Nested: */
	
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

Mixin:

	@mixin element($element) {
	  &__#{$element} {
	    @content;
	  }
	}
	
	@mixin modifier($modifier) {
	  &--#{$modifier} {
	    @content;
	  }
	}
	
	
	// @alias element
	@mixin e($element) {
	  @include element($element)  {
	    @content;
	  }
	}
	
	// @alias modifier
	@mixin m($modifier) {
	  @include modifier($modifier) {
	    @content;
	  }
	}

####Centerer

Use:

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

Output: 

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


Mixin:

	@mixin centerer($d: both) {
	  position: absolute;
	  @if ($d == both or $d == b) {
	    top: 50%;
	    left: 50%;
	    transform: translate(-50%, -50%);
	  } @else if ($d == horizontal or $d == h) {
	    left: 50%;
	    transform: translate(-50%, 0);
	  } @else if ($d == vertical or $d == v) {
	    top: 50%;
	    transform: translate(0, -50%);
	  }
	}
	
	@mixin centerer-remove($p: relative) {
	  position: $p;
	  top: auto;
	  left: auto;
	  transform: translate(0, 0);
	}

####Clearfix

Use:

	.foo {
  		@include clearfix();
	}

Output: 

	.foo:after {
	  content: '';
	  display: table;
	  clear: both;
	}

Mixin:

	@mixin clearfix(){
	  &:after {
	    content: '';
	    display: table;
	    clear: both;
	  }
	}