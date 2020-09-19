//var grades = [100, 70, 100, 90, 85, 95, 80, 100, 75, 100, 90, 85, 95];
//grades.sort(function compN(a, b) { return a -b; });
//var grades = [];
var students = [];
d3.json("hw3data.json", function(error, data) {

    data.forEach(function(d) {
        d.term = d.term;
        d.students = +d.students;
    });

//d3.tsv('data.tsv')
/*d3.json('hw3data.json')
    .then (function(data) {
        for (key in data) {
           students.push(+data[key].value) }*/
        
var tooltip = d3.select('body').append('div')
    .style('position', 'absolute')
    .style('padding', '0 10px')
    .style('background', 'white')
    .style('opacity', 0);
var margin = { top: 20, right: 20, bottom: 30, left: 40};
var height = 200 - margin.top - margin.bottom, 
    width = 500 - margin.left - margin.right, 
    barW = 40, barSpace = 5;
var mycolors = d3.scaleLinear()
    .domain([0, students.length])
    .range(['#E59500', '#CB327D']);
var verticalGuide = d3.scaleLinear()
    .domain([0, d3.max(students)])
    .range([height, 0]);
var yS = d3.scaleLinear()
    .domain([0, d3.max(students)])
    .range([0, height]);
var xS = d3.scaleBand()
    .domain(d3.range(0, students.length))
    .range([0, width])
    .padding(0.1);
var graph = d3.select('#chart')
              .append('svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)
                    .style('background', '#788180')
                    .append('g')
                    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
graph.selectAll('rect')
    .data(students)
    .enter()
    .append('rect')
    .style('fill', function(d, i) { return mycolors(i) })
    .attr("width", xS.bandwidth)
    .attr('height', function(d) { return yS(d); })
    .attr('x', function(d, i) { return xS(i); })
    .attr('y', function(d) { return height - yS(d) })
    .on('mouseover', function(d) {
      tooltip.transition()
          .style('opacity', .8)
        tooltip.html(d)
            .style('left', (d3.event.pageX - 35) + 'px')
            .style('top', (d3.event.pageY -30) + 'px')
      d3.select(this)
         .style('opacity', .4)
    .on('mouseout', function(d) {
        d3.select(this)
         .style('opacity', 1)
    })
 });
 graph.append('g')
    .call(d3.axisLeft(yS).scale(verticalGuide));
    //.attr('transform', 'translate(35, 0)');
graph.append('g')
    .call(d3.axisBottom(xS))
    .attr('transform', 'translate(0, ' + height + ')');
    });