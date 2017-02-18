var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var width = window.innerWidth;
var height = window.innerHeight;
var snows1 = [];
var snows2 = [];
var snows3 = [];
var speed1 = 0.2;
var speed2 = 0.9;
var speed3 = 2;
var Snow1 = function(x, y, size) {
  this.x = x;
  this.y = y;
  this.size = size;
}
Snow1.prototype.update = function() {
  if (this.y > height * 0.9) {
    snows1.shift();
    snows1.push(new Snow1(getRandomInt(0, width), getRandomInt(0, height * 0.4), 1));
  }
  this.x -= getRandomInt(0, speed1);
  this.y += getRandomInt(0, speed1);

  ctx.beginPath();
  ctx.fillStyle = "#efefef";
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}
Snow1.prototype.onresize = function() {
  this.x = getRandomInt(0, width);
  this.y = getRandomInt(0, height * 0.4);
}

var Snow2 = function(x, y, size) {
  this.x = x;
  this.y = y;
  this.size = size;
}
Snow2.prototype.update = function() {
  if (this.y > height * 0.9) {
    snows2.shift();
    snows2.push(new Snow2(getRandomInt(0, width), getRandomInt(0, height * 0.4), getRandomInt(1, 3)));
  }
  this.x -= getRandomInt(0, speed2);
  this.y += getRandomInt(0, speed2);

  ctx.beginPath();
  ctx.fillStyle = "#efefef";
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}
Snow2.prototype.onresize = function() {
  this.x = getRandomInt(0, width);
  this.y = getRandomInt(0, height * 0.4);
}

var Snow3 = function(x, y, size) {
  this.x = x;
  this.y = y;
  this.size = size;
}
Snow3.prototype.update = function() {
  if (this.y > height * 0.9) {
    snows3.shift();
    snows3.push(new Snow3(getRandomInt(0, width), getRandomInt(0, height * 0.4), getRandomInt(1, 5)));
  }
  this.x -= getRandomInt(0, speed3);
  this.y += getRandomInt(0, speed3);

  ctx.beginPath();
  ctx.fillStyle = "#efefef";
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}
Snow3.prototype.onresize = function() {
  this.x = getRandomInt(0, width);
  this.y = getRandomInt(0, height * 0.4);
}

init();

function init() {
  canvas.width = width;
  canvas.height = height;
  for (var i = 0; i < 50; i++) {
    snows1.push(new Snow1(getRandomInt(0, width), getRandomInt(0, height * 0.4), 1));
  }
  for (var i = 0; i < 50; i++) {
    snows2.push(new Snow2(getRandomInt(0, width), getRandomInt(0, height * 0.4), getRandomInt(1, 3)));
  }
  for (var i = 0; i < 50; i++) {
    snows3.push(new Snow3(getRandomInt(0, width), getRandomInt(0, height * 0.4), getRandomInt(1, 5)));
  }
  render();
}

function render() {
  ctx.clearRect(0, 0, width, height);
  for (var i = 0; i < snows1.length; i++) {
    snows1[i].update();
  }
  for (var i = 0; i < snows2.length; i++) {
    snows2[i].update();
  }
  for (var i = 0; i < snows3.length; i++) {
    snows3[i].update();
  }
  window.requestAnimationFrame(render);
}

function getRandomInt(min, max) {
  return (Math.random() * (max - min + 1)) + min;
}

function onResize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  for (var i = 0; i < snows1.length; i++) {
    snows1[i].onresize();
  }
  for (var i = 0; i < snows2.length; i++) {
    snows2[i].onresize();
  }
  for (var i = 0; i < snows3.length; i++) {
    snows3[i].onresize();
  }
}
window.addEventListener('resize', onResize, false);