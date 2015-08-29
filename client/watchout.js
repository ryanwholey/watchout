// start slingin' some d3 here.
d3.select('.scoreboard').selectAll('div')
.style({
  'float':'right',
  'color':'lightskyblue',
  'font-family':'Quicksand',
  'text-align' : 'center'
});

var HEIGHT = 600;
var WIDTH = 1000;
var ENNUM = 25;

var counterObj = {
  collision : 0,
  score : 0,
  highScore: 0
};

var svg = d3.select('body')
  .append('svg')
  .attr('class','svg')
  .style({'height':HEIGHT,'width':WIDTH});

var Enemy = function(x,y,r,img){
  this.x = x;
  this.y = y;
  this.r = r;
  this.image = img;
};

var enemies = function(n){
  var arr = [];
  for (var i = 0; i < n; i++) {
    arr.push(new Enemy(
      Math.floor(Math.random()*WIDTH),
      Math.floor(Math.random()*HEIGHT),
      10,
      'shiruken.png'));
  }
  return arr;
};

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
    'stroke-width': 2,
    'cx':function(d){return d.x},
    'cy':function(d){return d.y},
    'class':'hero'
  })
  .call(drag);

var enemies = svg.selectAll('image')
  .data(enemies(ENNUM))
  .enter()
  .append('svg:image')
  .attr('xlink:href',function(d){return d.image})
  .attr('width','30px')
  .attr('height','30px')
  .attr('class','enemy')
  .attr('x',function(d){return d.x})
  .attr('y',function(d){return d.y});

var update = function(d) {
    d3.selectAll('.enemy')
    .attr('fill','blue')
    .transition()
    .duration(1200)
    .attr('x',function(){return Math.floor(Math.random()*WIDTH)})
    .attr('y',function(){return Math.floor(Math.random()*HEIGHT)});   
};

var collision = function() {
  var ex, ey, er, hp, distance, arr;
  d3.select('.current').select('span').text(counterObj.score++);
  hp = [+d3.select('.hero').attr('cx'),
            +d3.select('.hero').attr('cy'),
            +d3.select('.hero').attr('r')];
  arr = [];
  d3.selectAll('.enemy').each(function(){
    ex = d3.select(this).attr('x');
    ey = d3.select(this).attr('y');
    er = d3.select(this).attr('r');

    distance = Math.sqrt((Math.pow(ex - hp[0], 2)) + (Math.pow(ey - hp[1], 2)));
    if (distance < 40) {
      counterObj.collision++;
      d3.select('.collisions').select('span').text(counterObj.collision);

      if (counterObj.score > counterObj.highScore) {
        counterObj.highScore = counterObj.score;
        d3.select('.high').select('span').text(counterObj.highScore);
      }
      counterObj.score = 0;
    }
  });
};
setInterval(function(){update()}, 1000);
setInterval(collision, 50);



















