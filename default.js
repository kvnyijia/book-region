// default.js

// enter code to define margin and dimensions for svg
var	margin = {top: 100, right: 200, bottom: 50, left: 100};
var ww = 1600;
var hh = 800;
var w = ww - margin.left - margin.right;
var h = hh - margin.top - margin.bottom;

// enter code to create svg
var showFiveBooksDiv = d3.select("#choropleth")
  .append("div");

var svg = d3.select("#choropleth")
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .style("background-color","#c9e8fd")
  .attr("viewBox", "0 0 " + w + " " + h)
  .classed("svg-content", true);

var countryPaths = svg.append('g')
  .attr('id', 'countries');

// enter code to create color scale

// enter code to define tooltip

// enter code to define projection and path required for Choropleth
var projection = d3.geoMercator()
  .translate([w/2, h/2])
  .scale(150)
  .center([0, 40]);

var path = d3.geoPath()
  .projection(projection);

// Load data  
var worldmap = d3.json('world_countries.json', function(err, jsondata) {
  console.log('read json');
  console.log(jsondata);
});
var bookRegionWeight = d3.csv('region_score_sort.csv');

Promise.all([
    // enter code to read files
    worldmap,
    bookRegionWeight
  ])
  .then(function(data) {
    // enter code to call ready() with required arguments
    // console.log('then');
    // console.log(data);
    ready(0, data[0], data[1]);
  });

// this function should be called once the data from files have been read
// world: topojson from world_countries.json
// gameData: data from ratings-by-country.csv
function ready(error, world, book) {
  // enter code to extract all unique games from gameData
  var selectedCountry = 'usa';

  console.log(book);

  var cnt = 0;
  var fiveBooks = [];
  for (var i = 0; i < book.length; ++i) {
    if (book[i]['country'] == selectedCountry) {
      fiveBooks.push(book[i]);
      cnt = cnt + 1;
      if (cnt >= 5) break;
    }
  }
  console.log(fiveBooks);

  // enter code to append the game options to the dropdown
  
  // event listener for the dropdown. Update choropleth and legend when selection changes. Call createMapAndLegend() with required arguments.
  
  // create Choropleth with default option. Call createMapAndLegend() with required arguments. 
  createMapAndLegend(world, fiveBooks, selectedCountry);
}

// this function should create a Choropleth and legend using the world and gameData arguments for a selectedGame
// also use this function to update Choropleth and legend when a different game is selected from the dropdown
function createMapAndLegend(world, fiveBooks, selectedCountry) { 

  countryPaths.selectAll("path")
    .data(world.features)
    .enter()
    .append("path")
    .attr("class", "countries")
    .attr("d", path)
    .attr('fill', function(d) {
      
      return 'grey'; })
    .on('mouseover', function(d) { 
      
    })
    .on("mousemove", function() {
      d3.select("#tooltip").style("left",(d3.event.pageX+20) + 'px').style('top',(d3.event.pageY+20) + 'px')
    })
    .on('mouseout', function(d) { 
      d3.select('#tooltip').remove();
      // tooltipSvg.selectAll("*").remove();

      // tip.hide(d); 
    });

    showFiveBooksDiv.selectAll("img")
      .data(fiveBooks)
      .enter()
      .append('img')
      .attr("src", function(d, i) { return fiveBooks[i]['img_l'] });
    
    showFiveBooksDiv.selectAll('text')
      .data(fiveBooks)
      .enter()
      .append('text')
      .html(function(d, i) { 
        return 'Book Name: ' + fiveBooks[i]['book_title'] + ', ' +
               'ISBN: ' + fiveBooks[i]['isbn'] + '</br>';  });

    // showFiveBooksDiv.selectAll('text')
    //   .data(fiveBooks)
    //   .enter()
    //   .append('text')
    //   .text(function(d, i) { return fiveBooks[i]['isbn'] });

    
}