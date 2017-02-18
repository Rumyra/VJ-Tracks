var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    body = document.body

var w = canvas.width = window.innerWidth,
    h = canvas.height = window.innerHeight

var stage = new createjs.Stage("canvas")
var shapes = [],
    shapesLength = 10,
    colors = ["#e74c3c", "#f1c40f", "#2ecc71", "#3498db", "#e74c3c", "#f1c40f", "#2ecc71", "#3498db", "#e74c3c", "#fff"]

var pos = {
  x: w/2,
  y: h/2
}

function drawCircle(posX, posY, radius, color){
  
  var g = new createjs.Graphics()

  var shape = new createjs.Shape(g)
  shape.graphics.beginStroke(colors[color])
  shape.graphics.setStrokeStyle(5 - (radius))
  shape.graphics.drawCircle(0, 0, 17 * radius)
  
  shape.x = posX
  shape.y = posY
  
  stage.addChild(shape)
  
  shapes.push(shape)
}


for(i = 1; i < shapesLength; i++){
  drawCircle(pos.x, pos.y, i, i-1)  
}

TweenMax.ticker.addEventListener("tick", stage.update, stage)

var tl = new TimelineMax({
  repeat: -1,
  yoyo: true
})

tl.staggerTo(shapes, 1, {
  scaleX: 1.4,
  scaleY: 1.4,
  alpha: 0.5,
  ease: Power4.easeInOut
}, 0.025)

body.addEventListener("mousemove", function(e){
  pos.x = e.clientX
  pos.y = e.clientY
  
  TweenMax.staggerTo(shapes, .5, {
    x: pos.x,
    y: pos.y
  }, 0.05)
})

// credit
balapaCop("Weird Circles", "rgba(255,255,255,.5)")