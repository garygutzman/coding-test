import { Component } from '@angular/core';
import { SpreadsheetReaderComponent } from '../spreadsheet-reader/spreadsheet-reader.component';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import * as d3 from 'd3';

@Component({
  selector: 'graphs',
  standalone: true,
  imports: [SpreadsheetReaderComponent],
  templateUrl: './graphs.component.html',
  styleUrl: './graphs.component.css'
})
export class GraphsComponent {
  receiveData(data: any[]) {
    console.log(data);
    data.forEach((currentValue, index) => {

      if(currentValue.sheetName && currentValue.sheetName.includes('LineChart')) {

        console.log(data);
        console.log("Line Chart");
        // create line chart
        // declare the chart dimensions
        const width = 250;
        const height = 250;

        // set scale
        var xScale = d3.scaleLinear().domain([0, 24]).range([0, width]),
            yScale = d3.scaleLinear().domain([0, 200]).range([height, 0]);

        // append the SVG container.
        const svg = d3.select("#charts").append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height])
            .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

        // title
        svg.append('text')
        .attr('x', width/2)
        .attr('y', 100)
        .attr('text-anchor', 'middle')
        .style('font-family', 'Helvetica')
        .style('font-size', 20)
        .text('Line Chart');
        
        // x label
        svg.append('text')
        .attr('x', width/2)
        .attr('y', height/2)
        .attr('text-anchor', 'middle')
        .style('font-family', 'Helvetica')
        .style('font-size', 12)
        .text('Hour Ending');
        
        // y label
        svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('transform', 'translate(60,' + height + ')rotate(-90)')
        .style('font-family', 'Helvetica')
        .style('font-size', 12)
        .text('');

        // add axis
        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));
       
        svg.append("g")
        .call(d3.axisLeft(yScale));

        // scatter dots
        svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return xScale(d[0]); } )
        .attr("cy", function (d) { return yScale(d[1]); } )
        .attr("r", 2)
        .attr("transform", "translate(" + 100 + "," + 100 + ")")
        .style("fill", "#CC0000");

        // plot line
        var line = d3.line()
        .x(function(d) { return xScale(d[0]); }) 
        .y(function(d) { return yScale(d[1]); }) 
        .curve(d3.curveMonotoneX)
        
        svg.append("path")
        .datum(data) 
        .attr("class", "line") 
        .attr("transform", "translate(" + 100 + "," + 100 + ")")
        .attr("d", line)
        .style("fill", "none")
        .style("stroke", "#CC0000")
        .style("stroke-width", "2");


      }
      else if (currentValue.sheetName && currentValue.sheetName.includes('BarChart')) {
        console.log("bar chart");
        // create bar chart
        // set the dimensions and margins of the graph
        var margin = {top: 30, right: 30, bottom: 70, left: 60},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var svg = d3.select("#charts")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

        // x axis
        var x = d3.scaleLinear()
        .range([ 0, width ])
        .domain([0, 24])
        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

        // y axis
        var y = d3.scaleLinear()
        .domain([0, 24])
        .range([ height, 0]);
        svg.append("g")
        .call(d3.axisLeft(y));

        // bars
        svg.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("y", function(d) { return y(d.data); })
        .attr("height", function(d) { return height - y(d.Value); })
        .attr("fill", "#69b3a2")   
      }
      else {
        console.log("no sheet name specified");
      }
    });
  }
}
