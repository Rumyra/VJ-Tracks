- var n = 9

while n-- > 0
  svg(viewBox="-10 -10 120 120")
      path.polygon.line(d="M 50 0 L 18 12 L 1 41 L 7 75 L 33 97 L 67 97 L 93 75 L 99 41 L 82 12 Z")
      path.polygon.dots(d="M 50 0 L 18 12 L 1 41 L 7 75 L 33 97 L 67 97 L 93 75 L 99 41 L 82 12 Z")

$animation-duration: 2s;

html {
  background-color: #000;
  color: #FFF;
  overflow: hidden;
}
body {
  height: 75vmin; width: 75vmin;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  background-image: radial-gradient(rgba(#FED, .25), transparent);
}
body, svg {
  position: absolute; margin: auto;
  top: 0; right: 0; bottom: 0; left: 0;
}
.polygon {
  $side-length: 74.9999;
  fill: transparent;
  stroke-linecap: round;

  &.line {
    stroke: #444;
    stroke-width: 1;
    stroke-linecap: round;
    position: absolute;
    z-index: 0;
  }
  &.dots {
    position: absolute;
    z-index: 0;
    stroke: #FFF;
    stroke-width: 6;
    stroke-dasharray: 1 ($side-length / 2) 1 ($side-length / 2);
    stroke-dashoffset: 0;
    animation: turn $animation-duration infinite linear;
    @keyframes turn {
      to{stroke-dashoffset:$side-length;}
    }
  }
}

svg {
  width: 50%; right: auto;
  transform-origin: 100% 50%;
  $nb-el: 9;
  $angle: 360deg / $nb-el;
  $delay: $animation-duration / $nb-el * -1;
  @for $i from 1 through $nb-el {
    &:nth-child( #{$i} ){
      transform: rotateZ( $angle * $i );    
    }
    
    &:nth-child( #{$i} ) .dots {
      animation-delay: $delay * $i;
    }
  }
}