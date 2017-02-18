.grid {
    font: 12px 'arial';
    fill: none;
    stroke: black;
    shape-rendering: crispEdges;
}
.caption {
  
    font-size: 10px;
}
.comoCell {
    height: 59px;
    width: 59px;
}
.cell {
    border: 1px solid #dddddd;
    padding: 1px;
}

rect.cell:hover {
    stroke: 2px rgb(200,5,5);    
}
}

#legend {
    padding: 1.5em 0 0 1.5em;
}

li.key {
    border-top-width: 15px;
    border-top-style: solid;
    font-size: .75em;
    width: 10%;
    padding-left: 0;
    padding-right: 0;
}

.d3-tip {
  line-height: 1;
  font-weight: bold;
  padding: 12px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  border-radius: 2px;
}

/* Creates a small triangle extender for the tooltip */
.d3-tip:after {
  box-sizing: border-box;
  display: inline;
  font-size: 10px;
  width: 100%;
  line-height: 1;
  color: rgba(0, 0, 0, 0.8);
  content: "\25BC";
  position: absolute;
  text-align: center;
}

/* Style northward tooltips differently */
.d3-tip.n:after {
  margin: -1px 0 0 0;
  top: 100%;
  left: 0;
}

var data = [[{"suitesCount":5,"patientCount":2,"percentageLT":0},
{"suitesCount":5,"patientCount":5,"percentageLT":10},
{"suitesCount":5,"patientCount":0,"percentageLT":20},
{"suitesCount":5,"patientCount":0,"percentageLT":30},
{"suitesCount":5,"patientCount":0,"percentageLT":40},
{"suitesCount":5,"patientCount":5,"percentageLT":50},
{"suitesCount":5,"patientCount":0,"percentageLT":60},
{"suitesCount":5,"patientCount":0,"percentageLT":70},
{"suitesCount":5,"patientCount":0,"percentageLT":80},
{"suitesCount":5,"patientCount":0,"percentageLT":90},
//{"suitesCount":5,"patientCount":0,"percentageLT":100}
            ],
[{"suitesCount":4,"patientCount":10,"percentageLT":0},
{"suitesCount":4,"patientCount":0,"percentageLT":10},
{"suitesCount":4,"patientCount":3,"percentageLT":20},
{"suitesCount":4,"patientCount":0,"percentageLT":30},
{"suitesCount":4,"patientCount":20,"percentageLT":40},
{"suitesCount":4,"patientCount":0,"percentageLT":50},
{"suitesCount":4,"patientCount":0,"percentageLT":60},
{"suitesCount":4,"patientCount":5,"percentageLT":70},
{"suitesCount":4,"patientCount":0,"percentageLT":80},
{"suitesCount":4,"patientCount":0,"percentageLT":90},
//{"suitesCount":4,"patientCount":0,"percentageLT":100}
],
[{"suitesCount":3,"patientCount":5,"percentageLT":0},
{"suitesCount":3,"patientCount":0,"percentageLT":10},
{"suitesCount":3,"patientCount":0,"percentageLT":20},
{"suitesCount":3,"patientCount":0,"percentageLT":30},
{"suitesCount":3,"patientCount":0,"percentageLT":40},
{"suitesCount":3,"patientCount":0,"percentageLT":50},
{"suitesCount":3,"patientCount":0,"percentageLT":60},
{"suitesCount":3,"patientCount":0,"percentageLT":70},
{"suitesCount":3,"patientCount":0,"percentageLT":80},
{"suitesCount":3,"patientCount":0,"percentageLT":90},
//{"suitesCount":3,"patientCount":0,"percentageLT":100}
],
[{"suitesCount":2,"patientCount":20,"percentageLT":0},
{"suitesCount":2,"patientCount":0,"percentageLT":10},
{"suitesCount":2,"patientCount":0,"percentageLT":20},
{"suitesCount":2,"patientCount":0,"percentageLT":30},
{"suitesCount":2,"patientCount":0,"percentageLT":40},
{"suitesCount":2,"patientCount":0,"percentageLT":50},
{"suitesCount":2,"patientCount":0,"percentageLT":60},
{"suitesCount":2,"patientCount":2,"percentageLT":70},
{"suitesCount":2,"patientCount":0,"percentageLT":80},
{"suitesCount":2,"patientCount":1,"percentageLT":90},
//{"suitesCount":2,"patientCount":0,"percentageLT":100}
],
[{"suitesCount":1,"patientCount":0,"percentageLT":0},
{"suitesCount":1,"patientCount":0,"percentageLT":10},
{"suitesCount":1,"patientCount":0,"percentageLT":20},
{"suitesCount":1,"patientCount":0,"percentageLT":30},
{"suitesCount":1,"patientCount":0,"percentageLT":40},
{"suitesCount":1,"patientCount":10,"percentageLT":50},
{"suitesCount":1,"patientCount":0,"percentageLT":60},
{"suitesCount":1,"patientCount":0,"percentageLT":70},
{"suitesCount":1,"patientCount":0,"percentageLT":80},
{"suitesCount":1,"patientCount":0,"percentageLT":90},
//{"suitesCount":1,"patientCount":5,"percentageLT":100}
]];


/**
 *   buildGrid    Setup a grid:
 *   Rows = # of nested arrays, Columns = # of items in each nested array 
 *   @param id           div id tag starting with #
 *   @param width        width of the grid in pixels
 *   @param height       height of the grid in pixels
 *   @param square       true/false if you want the height to
 *                           match the (calculated first) width
 */
function buildGrid(id, width, height, square, dims, pData) {
    //format the data
    var _data = buildData(width, height, square, dims, pData);
    //console.log(_data);
    //"#E42217", --save red for just the zero-centile column
    //"#FFFFFF",
    
    //var sortedData = sortArray3(_data);

    var maxNum = d3.max(sortArray(_data), function (d, i) {
                        return d[0].patients;
                    }),
        domainScale = [0, 1, Math.round(maxNum/5), Math.round(maxNum/4), Math.round(maxNum/3), Math.round(maxNum/2),  maxNum],
        colorRange = ["#FFFFFF", "#E1F2CF", "#C2E49D", "#94D057","#73b040", "#446621"];
    //  "#659730",
    var color = d3.scale.quantile() //color definitions for the number "gravity"
    .domain(domainScale)
        .range(colorRange);

     var tip = d3.tip()
                .attr('class', 'd3-tip')
                .html(function (d) { return "<span style='bg-color:#CCCCCC;font-size:12;font-color:#555;opacity:.8;'>" + d + " patients</span>"; });
    

    var grid = d3.select(id).append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "grid")
        .call(tip);

    var row = grid.selectAll(".row")
        .data(_data)
        .enter().append("svg:g")

        .attr("class", "row");

    var col = row.selectAll(".cell")
        .data(function (d) {
        return d ;
    })
        .enter().append("svg:rect")
        .attr("class", "cell")
        .attr("x", function (d) {
        return d.x;
    })
        .attr("y", function (d) {
        return d.y;
    })
        .attr("width", function (d) {
        return d.width;
    })
        .attr("height", function (d) {
        return d.height;
    })
         .on('mouseover', function (d) {
        d3.select(this)
            .style('stroke', 'rgb(255,0,0)')
            .style('stroke-width', '2.5px')
            .style('border', '1px solid #FFFFFF')
            .style('padding', '2px');
         tip.show(d.patients);
      })
         .on('mouseout', function (d) {
         d3.select(this)
             .style('stroke', '#555')
             .style('stroke-width', '1px')
             .style('border', '1px solid #DDDDDD')
             .style('padding', '1px');
         tip.hide(d.patients);
     })
    .on('click', function () {
        console.log(d3.select(this));
    })
        .style("fill", function (d) {
        return color(d.patients);
    })
        .style("stroke", '#555');
    
    
    var text = row.selectAll(".label")
        .data(function (d) {
        return d;
    })
        .enter().append("svg:text")
        .transition()
        .duration(2500)
        .delay(500)
        .attr("x", function (d) {
        return d.x + d.width / 2;
    })
        .attr("y", function (d) {
        return d.y + d.height / 2;
    })
        .attr("text-anchor", "middle")
        .attr("dy", ".35em")
        .text(function (d) {
        return d.patients;
    });
    
    
    
    /////Legend definition


        var legendBoxDim = 18;
        var legendDim = [655, d3.max(_data, function (d, i) { return d[i].y; }) / 4];
        //console.log("Legend dimensions", legendDim);
        var legend = grid.append('g')
        .attr('class', 'legend')
        .attr('transform', 'rotate(90, 740, 175)'); // 

        //translate(' + (width-10) + ', -3)
        legend.selectAll("rect")
          .data(color.range().map(function (shade) {
              var d = color.invertExtent(shade);
              return d;
    }))
          .enter().append("rect")
            .transition()
            .duration(2500)
            .delay(500)
            .attr("height", legendBoxDim)
            .attr("x", function (d) {
                legendDim[0] += legendBoxDim;
                return legendDim[0];
            })
            .attr("y", (height/2))
            .attr("width", legendBoxDim)
        .style("fill", function (d) { return d < 0 ? "#E42217" : color(d[0]); });

        var xStart = 421,
            yStart = -257;

        legend.selectAll("text")
            .data(color.domain().map(function (v, i) {
                var d = {};
                d.value = color.domain()[i];
                d.x = xStart;
                d.y = yStart;
               // console.log("color invert", v);
                xStart += legendBoxDim / 2;
                yStart -= legendBoxDim / 2;
                return d;
    }))
            .enter()
            .append("text")
            .attr("class", "caption")
        //.attr("y", y.range()[1]) translate(' + d.position + ' ,-3) 
        .attr('transform', function (d) {
            return 'rotate(-90, ' + d.x + ', ' + d.y + ')';
    })
        .text(function (d) {
            return d.value < 0 ? "<0" : d.value;
    });


        // top label for the y axis
    grid.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .style("text-anchor", "left")
    .text("# Suites");

        //build side labels for the y axis
    var nextStartY = dims[0] + 5; //20 + 15 + Math.round(dims[0]/2)
    for (var obj in _data) {

        grid.append("text")
            .attr("x", 20)
            .attr("y", (nextStartY + ((nextStartY - 5) * obj)))
            .style("text-anchor", "left")
            .text(_data[obj][0].suites);

    }

        // build label for the x axis
        // use the length of the first nested array to determine how many (aka range)
    var nextStartX = dims[0]-5,
        nextStartY = height - 2;
    for (var i = 0; i < (_data[0].length + 1); i++) {
        grid.append("text")
            .attr("x", function(){
                var ret = nextStartX;
                nextStartX += 59; //(i === 0 ? (ret + 55) : (ret + 60));
                return ret;})
            .attr("y", nextStartY)
            .style("text-anchor", "bottom")
        .text((i>0?(i * 10)+ "%":i)); //special req to account for "less than 10%"

    }

    grid.append("text")
    .attr("x", nextStartX -= 50)
    .attr("y", nextStartY -= 30)
    .style("text-anchor", "left")
    .text("Uncontrolled");
   /* }*/
    
    grid.append("text")
    .attr("x", nextStartX)
    .attr("y", nextStartY += 15)
    .style("text-anchor", "left")
    .text("Care Opportunities");
    //}
}
        //////////////////////////////////////////////////////////////////////// 

function buildData(gridWidth, gridHeight, square, dims, ds) {
    var _data = [];
    var gridItemWidth = dims[0];
    var gridItemHeight = (square) ? gridItemWidth : dims[1];
    var startX = gridItemWidth;// / 2;
    var startY = gridItemHeight / 2;
    var stepX = gridItemWidth;
    var stepY = gridItemHeight;
    var xpos = startX;
    var ypos = startY;
    var newValue = 0;
    var prctg = 0;
    var suitesCount = 0;
        
    
    //parent array
    for (var index_a = 0; index_a < ds.length; index_a++) {
        _data.push([]);
        //nested array
        for (var index_b = 0; index_b < ds[index_a].length; index_b++) {
            
            suitesCount = ds[index_a][index_b].suitesCount;
            newValue = ds[index_a][index_b].patientCount;
            prctg = ds[index_a][index_b].percentageLT;
            
            
            _data[index_a].push({
                suites: suitesCount,
                patients: newValue,
                width: gridItemWidth,
                height: gridItemHeight,
                x: xpos,
                y: ypos,
                percentage: prctg
            });
            xpos += stepX;
        }
        xpos = startX;
        ypos += stepY;
        
    }

    return _data;
}

            //Sorting via the array container
                 function sortArray(arry) {
                     var retArry = []
                     for (var obj in arry) {

                         retArry.push(arry[obj].sort(function (a, b) { return sortArray2(a, b); }));
                     }
                     return retArry.filter(function (d) {
                         return d[0];
                     });
                 }
                 //sort the nested array, decending on patients to find highest number
                 function sortArray2(a, b) {
                     return d3.descending(a.patients, b.patients);
                 }

buildGrid('.grid', 770, 340,  true, [59], data);