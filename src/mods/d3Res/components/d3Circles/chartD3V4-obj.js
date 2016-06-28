import d3 from 'd3.v4.0.0-alpha.39';

export default class ChartD3V4Obj {

	constructor(el, props = {}) {
		
		console.log("_________ el");console.log(el);
		
		const width = el.clientWidth;
		const height = el.clientHeight;
		const { compare } = props;

		
		const svgContainer = d3.select(el)
				.append('svg')
				// .attr("height": height)
				// .attr("width": width)

			var jsonCircles = [
			   { "x_axis": 30, "y_axis": 30, "radius": 20, "color" : "green" },
			  { "x_axis": 70, "y_axis": 70, "radius": 20, "color" : "purple"},
		  	{ "x_axis": 110, "y_axis": 100, "radius": 20, "color" : "red"}];


			var circles = svgContainer.selectAll("circle")
            .data(jsonCircles)
            .enter()
            .append("circle");
			
			var circleAttributes = circles
                   .attr("cx", function (d) { return d.x_axis; })
                   .attr("cy", function (d) { return d.y_axis; })
                   .attr("r", function (d) { return d.radius; })
                   .style("fill", function(d) { return d.color; });

			this.svgContainer = svgContainer

	}

}
