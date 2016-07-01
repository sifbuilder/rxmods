	
/* 	---------------------------------	*/
/* rxmods-d3circles-renderer.js   		*/
/* 	---------------------------------	*/

import * as d3 from 'd3.v4.0.0';

class RxmodsD3circlesRenderer {

	constructor(el, props = {}) {
		
		const width = el.clientWidth;
		const height = el.clientHeight;
		const svgContainer = d3.select(el)
				.append('svg')

			var d3circles = props.d3circles

			var circles = svgContainer.selectAll("circle")
            .data(d3circles)
            .enter()
            .append("circle");
			
			var circleAttributes = circles
                   .attr("cx", function (d) { return d.x_axis; })
                   .attr("cy", function (d) { return d.y_axis; })
                   .attr("r", function (d) { return d.radius; })
                   .style("fill", function(d) { return d.color; });
	}

};

export default RxmodsD3circlesRenderer;
