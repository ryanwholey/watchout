// start slingin' some d3 here.
d3.select('.scoreboard').selectAll('div')
.style({
  'float':'right',
  'color':'lightskyblue',
  'font-family':'helvetica',
  'padding-right':'10px'
})

var HEIGHT = 600;
var WIDTH = 1000;
var ENNUM = 15;



var svg = d3.select('body')
  .append('svg')
  .attr('class','svg')
  .style({'height':HEIGHT,'width':WIDTH})
  .append('g');

var Enemy = function(x,y,r){
  this.x = x;
  this.y = y;
  this.r = r;
}

var enemies = function(n){
  var arr = [];
  for(var i = 0; i < n; i++){
    arr.push(new Enemy(Math.floor(Math.random()*WIDTH),Math.floor(Math.random()*HEIGHT),10));
  }
  return arr;
}


var drag = d3.behavior.drag()
  .on('drag', function(){
    character.attr('cx', function (d) {
      if (d3.event.x > 0 && d3.event.x < WIDTH) {
        return d3.event.x;
      }else{
        return d3.event.x < 0 ? 0 : WIDTH;
      }
    })
    .attr('cy', function () {
      if (d3.event.y > 0 && d3.event.y < HEIGHT) {
        return d3.event.y;
      } else {
        return d3.event.y < 0 ? 0 : HEIGHT;
      }
    })
  });

var character = svg.append('circle')
  .data([{x:50,y:50}])
  .attr({
    'cx':50,
    'cy':50,
    'r':25,
    'fill':'orange',
    'stroke':'red',
    'cx':function(d){return d.x},
    'cy':function(d){return d.y},
    'class':'hero'
  })
  .call(drag);



var enemies = svg.selectAll('circle')
  .data(enemies(ENNUM))
  .enter()
  .append('svg:circle')
  .attr('class','enemy')
  .attr('r',function(d){return d.r})
  .attr('cx',function(d){return d.x})
  .attr('cy',function(d){return d.y})
  
  

var update = function(d){

    d3.selectAll('.enemy')
    .attr('fill','blue')
    .transition()
    .duration(600)
    .attr('cx',function(){return Math.floor(Math.random()*WIDTH)})
    .attr('cy',function(){return Math.floor(Math.random()*HEIGHT)})   
}



setInterval(function(){update()}, 1000);
var countCollision = 0;
var score = 0;
var highScore = 0;

var collision = function(){
  
  d3.select('.current').select('span').text(score++);
  var hp = [+d3.select('.hero').attr('cx'),
            +d3.select('.hero').attr('cy'),
            +d3.select('.hero').attr('r')];
  var arr = [];
  d3.selectAll('.enemy').each(function(){
    var ex = d3.select(this).attr('cx');
    var ey = d3.select(this).attr('cy');
    var er = d3.select(this).attr('r');
    
    var distance = Math.sqrt((Math.pow(ex - hp[0], 2)) + (Math.pow(ey - hp[1], 2)));
    if (distance < 35) {
      countCollision++;
      d3.select('.collisions').select('span').text(countCollision);
      if (score > highScore) {
        highScore = score;
        d3.select('.high').select('span').text(highScore);
      }
      score = 0;
    }
  });
}

// collision();
// console.log(d3.selectAll('.enemy').attr('cx'));
// setTimeout(collision, 2000);
setInterval(collision, 39);



















