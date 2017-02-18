var base = d3.select("#vis");

var chart = base.append("canvas")
  .attr("width", 400)
  .attr("height", 300);
var context = chart.node().getContext("2d");

// Create an in memory only element of type 'custom'
var detachedContainer = document.createElement("custom");

// Create a d3 selection for the detached container. We won't
// actually be attaching it to the DOM.
var dataContainer = d3.select(detachedContainer);

// Function to create our custom data containers
function drawCustom(data) {
  var scale = d3.scale.linear()
    .range([10, 390])
    .domain(d3.extent(data));
  
  var dataBinding = dataContainer.selectAll("custom.rect")
    .data(data, function(d) { return d; });
  
  dataBinding
    .attr("size", 8)
    .transition()
    .duration(1000)
    .attr("size", 15)
    .attr("fillStyle", "green");
  
  dataBinding.enter()
      .append("custom")
      .classed("rect", true)
      .attr("x", scale)
      .attr("y", 100)
      .attr("size", 8)
      .attr("fillStyle", "red");
  
  dataBinding.exit()
    .attr("size", 8)
    .transition()
    .duration(1000)
    .attr("size", 5)
    .attr("fillStyle", "lightgrey");
}

// Function to render out to canvas our custom
// in memory nodes
function drawCanvas() {

  // clear canvas
  context.fillStyle = "#fff";
  context.rect(0,0,chart.attr("width"),chart.attr("height"));
  context.fill();
  
  // select our dummy nodes and draw the data to canvas.
  var elements = dataContainer.selectAll("custom.rect");
  elements.each(function(d) {
    var node = d3.select(this);
    
    context.beginPath();
    context.fillStyle = node.attr("fillStyle");
    context.rect(node.attr("x"), node.attr("y"), node.attr("size"), node.attr("size"));
    context.fill();
    context.closePath();
    
  })
}

d3.timer(drawCanvas);
drawCustom([1,2,13,20,23]);
drawCustom([1,2,12,16,20]);