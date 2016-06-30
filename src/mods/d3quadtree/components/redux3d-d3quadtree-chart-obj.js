import * as d3 from 'd3.v4.0.0';

class ChartD3V4Obj {

	constructor(el, props = {}) {
		const elid = '#ChartD3V4Ent'
	
			
			
		var width = 960,
			height = 500;

		var data = d3.range(1000).map(function() {
		  return [Math.random() * width, Math.random() * height];
		});

		var quadtree = d3.quadtree()
			.addAll(data)
			.extent([[-1, -1], [width + 1, height + 1]])

		var color = d3.scaleLinear()
			.domain([0, 8])  // max depth of quadtree
			.range(["#efe", "#060"]);
			
		var svg = d3.select(elid).append("svg")
			.attr("width", width)
			.attr("height", height)
			.on("click", function (d) {
				var xy = d3.mouse(d3.selectAll('svg')[0][0]);
				svg.selectAll("#pt")
					.attr("cx", xy[0])
					.attr("cy", xy[1]);
				clicked();
			});

		var rect = svg.selectAll(".node")
			.data(nodes(quadtree))
		  .enter().append("rect")
			.attr("class", "node")
			.attr("x", function(d) { return d.x1; })
			.attr("y", function(d) { return d.y1; })
			.attr("width", function(d) { return d.x2 - d.x1; })
			.attr("height", function(d) { return d.y2 - d.y1; });

		var point = svg.selectAll(".point")
			.data(data)
		  .enter().append("circle")
			.attr("class", "point")
			.attr("cx", function(d) { return d[0]; })
			.attr("cy", function(d) { return d[1]; })
			.attr("r", 3);

		svg.append("circle")
			.attr("id", "pt")
			.attr("r", 3)
			.attr("cx", width/2)
			.attr("cy", height/2)
			.style("fill", "yellow");

		// PDS Collect a list of nodes to draw rectangles, adding extent and depth data
		function nodes(quadtree) {
		  var nodes = [];
		  quadtree.depth = 0; // root
		  quadtree.visit(function(node, x1, y1, x2, y2) {
			node.x1 = x1;
			node.y1 = y1;
			node.x2 = x2;
			node.y2 = y2;
			nodes.push(node);
			for (var i=0; i<4; i++) {
				if (node.nodes[i]) node.nodes[i].depth = node.depth+1;
			}
		  });
		  return nodes;
		}
			  
		function nearest(x, y, best, node) {
			var x1 = node.x1, y1 = node.y1, x2 = node.x2, y2 = node.y2;
			node.visited = true;
			// exclude node if point is farther away than best distance in either axis
			if (x < x1 - best.d || x > x2 + best.d || y < y1 - best.d || y > y2 + best.d) {
				return best;
			}
			// test point if there is one, potentially updating best
			var p = node.point;
			if (p) {
			  p.scanned = true;
			  var dx = p[0] - x, dy = p[1] - y, d = Math.sqrt(dx*dx + dy*dy);
			  if (d < best.d) {
				best.d = d;
				best.p = p;
			  }
			}
			// check if kid is on the right or left, and top or bottom
			// and then recurse on most likely kids first, so we quickly find a 
			// nearby point and then exclude many larger rectangles later
			var kids = node.nodes;
			var rl = (2*x > x1 + x2), bt = (2*y > y1 + y2);
			if (kids[bt*2+rl]) best = nearest(x, y, best, kids[bt*2+rl]);
			if (kids[bt*2+(1-rl)]) best = nearest(x, y, best, kids[bt*2+(1-rl)]);
			if (kids[(1-bt)*2+rl]) best = nearest(x, y, best, kids[(1-bt)*2+rl]);
			if (kids[(1-bt)*2+(1-rl)]) best = nearest(x, y, best, kids[(1-bt)*2+(1-rl)]);
			
			return best;
		}

		function clicked() {
			let pt = d3.selectAll('#pt');
			var x = +pt.attr('cx'), y = +pt.attr('cy');
			
			point.each(function(d) { d.scanned = d.selected = false; });
			rect.each(function(d) { d.visited = false; });
			
			var best = nearest(x, y, {d: height+width, p: null}, quadtree);
			best.p.selected = true;
			point.classed("scanned", function(d) { return d.scanned; });
			point.classed("selected", function(d) { return d.selected; });
			rect.style('fill', function(d) { return d.visited ? color(d.depth) : 'none'; });
		}

		clicked();
			
			
	}
}

export default ChartD3V4Obj
