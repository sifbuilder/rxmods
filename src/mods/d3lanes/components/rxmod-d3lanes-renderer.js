	
/* 	---------------------------------	*/
/* rxmods-d3lanes-renderer.js   		*/
/* 	---------------------------------	*/

import * as d3 from 'd3.v4.0.0'

// _____________ coordsUtils
	function coordsUtils () {
		function index_hcoord_pct(arr, index) {
				return (index+1) * (100/(arr.length+1));
			}
		function index_hcoord_pct_with_symbol(arr, index) {
			return index_hcoord_pct(arr, index) + "%";
		}
		
		function horizontal_center(x1, x2) {
			if (x1 > x2) return (x2 - x1)/2 + x1
			else return (x1 - x2)/2 + x2
		}
		function horizontal_percent_to_coord(svg, percent) {
			// https://bugzilla.mozilla.org/show_bug.cgi?id=874811 // _e_
			if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
				var xScrollWidth = svg[0].parentNode.scrollWidth;
			} else {
				var xScrollWidth = svg.property("scrollWidth");
			}
			return xScrollWidth * Number.parseFloat(percent)/100;
		}
		function horizontal_coord_to_percent(svg, length) {
				var xScrollWidth = svg.property("scrollWidth");
				return Number.parseFloat(length) / xScrollWidth;
		}

		var publicAPI = {
				hcoord_tagged_pct: function hcoord_tagged_pct(arr, val) {
					return index_hcoord_pct_with_symbol(arr, arr.indexOf(val));
				},
				hcoord_pct:	function hcoord_pct(arr, val) {
					return index_hcoord_pct(arr, arr.indexOf(val));
				},		
				hcenter_tagged_pct:	function hcenter_tagged_pct(x1, x2) {
					return horizontal_center(x1, x2) + "%";
				}
		}
		return publicAPI
	}

// _____________ arrayUtils
	function arrayUtils () {
		function flattenArrByObjProp(a, p) {
			return a.reduce(function(prevArr, currVal, i, a) {
				if (prevArr.indexOf(currVal[p]) < 0)
						var r = prevArr.push(currVal[p])
						return prevArr
			}, []);
		}
		
		function union_arrays (x, y) {
			var obj = {};
			for (var i = x.length-1; i >= 0; -- i)
				 obj[x[i]] = x[i];
			for (var i = y.length-1; i >= 0; -- i)
				 obj[y[i]] = y[i];
			var res = []
			for (var k in obj) {
				if (obj.hasOwnProperty(k))
					res.push(obj[k]);
			}
			return res;
		}

		function array_names_from_props (arr, props) {
			var r = props.reduce( function(prevArr, currVal, i, a) {
				var q1 = flattenArrByObjProp(arr, currVal)
				var q =  union_arrays(prevArr, q1)
				return q
			}, [])
			return r
		}		
	
		var publicAPI = {
			array_names_from_props: function array_names_from_props (arr, props) {
			
						var r = props.reduce( function(prevArr, currVal, i, a) {
							var q1 = flattenArrByObjProp(arr, currVal)
							var q =  union_arrays(prevArr, q1)
							return q
						}, [])
						return r
			},
		}
		return publicAPI
	}

// _____________ context
var oldState = {}; oldState.records = []
var intransition = false


// ================== renderer ==================
function renderer(el, payload = {}) {
			
				var newState = payload
					
				if (intransition == true) return
				
				var _runners0 = oldState.records || []
				oldState= newState
				
				var _runners1 = newState.records
				var	fadeFactor = newState.fadeFactor	// times beat - fade items
				var	periodFactor = newState.periodFactor // times beat - add items
				var beatTime = newState.beatTime
				var itemProps = newState.itemProps
				var currentView = newState.currentView
				var itemSpan = newState.itemSpan

				var _opacity = 1
				if (currentView !== 'd3lanesView') _opacity = 0
				var _fadeTime = fadeFactor * beatTime
			
							var svgContainer = d3.select(el)
								.selectAll('svg')
								.data(['svg'], function(d) { return 'svg' })
							var newSvgContainer = svgContainer
								.enter()
								.append("svg")
									.attr("id", "d3lanes_svg")
							var svgElement = 	d3.select("svg")	
							
					var width = parseInt(svgElement.style("width"), 10)
					var height = parseInt(svgElement.style("height"), 10)
					var vstep = parseInt(height / (itemSpan + 1), 10)	// vertical step
					
							var d3laneGroup = svgContainer
									.selectAll('g.d3lane')
									.data(['d3lane'])
									.style('opacity', _opacity)
										
								d3laneGroup.enter()	
									.append("g")
										.classed("d3lane", true)
										
					var runnersGroup = d3laneGroup
						.selectAll('g.runners')
						.data(['runners'])
							
					runnersGroup.enter()	
						.append("g")
							.classed("runners", true)

					var d3lanesGroup = d3laneGroup
						.selectAll('g.d3lanes')
						.data(['d3lanes'])
							
					d3lanesGroup.enter()	
						.append("g")
							.classed("d3lanes", true)

				var markerInstance = d3laneGroup.select(".runner-marker")
				if (markerInstance.node() == null) {
						d3laneGroup
							.append("marker")
							.attr("id", "runner-marker")
							.attr("class", "runner-marker")
							.attr("viewBox", "0 0 10 10")
							.attr("refX", "10")
							.attr("refY", "5")
							.attr("markerWidth", "5")
							.attr("markerHeight", "4")
							.attr("orient", "auto")
							.append("path")
								.attr("class", "runner-arrow")
								.attr("d", "M 0 0 L 10 5 L 0 10 z")
					}
							
					var _d3laneItems0 = arrayUtils()
						.array_names_from_props(_runners0, itemProps)

					var _d3laneObjs0 = _d3laneItems0.map(function(d, i) {
							return ({id: d,
										name: d,
										x0: parseFloat(coordsUtils().hcoord_pct(_d3laneItems0, d)
											* parseInt(svgContainer.style("width")) / 100).toFixed(0)})})

					var _d3lanesObj0 = _d3laneItems0.reduce(function(total,d,currentIndex,arr) {
							var o = {}
							o[d] = {name: d,
															x0: parseFloat(coordsUtils().hcoord_pct(_d3laneItems0, d)
											* parseInt(svgContainer.style("width")) / 100).toFixed(0)}
							return (Object.assign({}, total, o))}, {})								


					var _d3laneItems1 = arrayUtils()
						.array_names_from_props(_runners1, itemProps)
						
					var _d3laneObjs1 = _d3laneItems1.map(function(d, i) {

					var x0 = 0
							if ( _d3lanesObj0.hasOwnProperty( d) ) {
									x0 =  _d3lanesObj0[d].x0
							}
						return ({id: d,
									name: d,
									x0: x0})})
										
							// d3laneElems trasition
								var redux3dTransition = d3.transition()
									.duration(_fadeTime)
									.ease(d3.easeLinear)
			
							// d3laneElements DATA
								var d3laneElements = svgContainer
									.select("g.d3lanes")
										.selectAll("g.d3lane")
										.data(_d3laneObjs1, function(d) { return d.id })				
							
							// d3laneElements EXIT
									d3laneElements.exit()
											.transition(redux3dTransition)
												.style("opacity", function(d) {
																// store.dispatch(actions.deleteD3lane(d))
																// actions.deleteD3lane(d)
													return 0
												})
												.remove(function(){})										
											
							// d3laneElements UPDATE	texts
								var d3laneTexts = d3laneElements.select("text")
													.attr("text-anchor", "middle")
													.attr("alignment-baseline", "middle")
													.style("font-size", function(d, i) { 
															return parseInt(svgContainer.style("width")) * 2/100
															})
													.text(function(d) { return d.name })
													.attr("dy", "20")
											.transition(redux3dTransition)
												.attr("x", function(d, i) {
														var r = coordsUtils().hcoord_tagged_pct(_d3laneItems1, d.name)
														return r
												})
											.on("start", function start() {		
													intransition = true
											})
											.on("end", function end() {	
													intransition = false
											})

							// d3laneElements UPDATE lines
								var d3laneLines = d3laneElements.select("line")
									.attr("x0", function(d, i) {
										var r = parseFloat(coordsUtils().hcoord_pct(_d3laneItems0, d.name)
														* parseInt(svgContainer.style("width")) / 100).toFixed(0)
										return r
									})
									.attr("y1", function() {
										var text_bbox = this.parentNode.querySelector("text").getBBox();
										return text_bbox.y + text_bbox.height;
									})
									.attr("y2", "100%")
										.transition(redux3dTransition)
											.attr("x1", function(d, i) {
													var r = coordsUtils().hcoord_tagged_pct(_d3laneItems1, d.name)
													return r
											})
											.attr("x2", function(d, i) {
													var r = coordsUtils().hcoord_tagged_pct(_d3laneItems1, d.name)
													return r
											})
											.on("start", function start() {		
													intransition = true
											})
											.on("end", function end() {	
													intransition = false
											})								
									
							// newD3laneElements ENTER
								var newD3laneElements = d3laneElements
									.enter()
										.append("g")
											.classed("d3lane", true)

							// newD3laneElements ENTER text
								newD3laneElements.append("text")
									.attr("class", "d3lane")
									.attr("text-anchor", "middle")
									.attr("alignment-baseline", "middle")
									.style("font-family", "sans-serif")
													.style("fill", "transparent")
									.style("font-size", function(d, i) { 
														return parseInt(svgContainer.style("width")) * 2/100
															})
									.text(function(d) { return d.name })
									.attr("dy", "20")

									.attr("x", function(d, i, a) {
										var r =  coordsUtils().hcoord_tagged_pct(_d3laneItems1, d.name)
										return r
									})
									.transition(redux3dTransition)
											.style("fill", "black")
											.on("start", function start() {		
													intransition = true
											})
											.on("end", function end() {	
													intransition = false
											})									
											
							// newD3laneElements ENTER lines																			
								newD3laneElements.append("line")
									.attr("class", "d3lane")
									.attr("stroke", "lightgray")
									.style("stroke-width", "1px")
									.attr("stroke-width", 1)
									.attr("x0", function(d, i) {
										var r = parseFloat(coordsUtils().hcoord_pct(_d3laneItems0, d.name)
														* parseInt(svgContainer.style("width")) / 100).toFixed(0)
										return r
									})
									.attr("x1", function(d, i, a) { 
												var r = coordsUtils().hcoord_tagged_pct(_d3laneItems1, d.name)
												var x = parseFloat(coordsUtils().hcoord_pct(_d3laneItems1, d.name)
														* parseInt(svgContainer.style("width")) / 100).toFixed(0)
														var l = {name: d.name, id: d.id, x: x }
												return r
									})
									.attr("x2", function(d, i, a) { 
												var r = coordsUtils().hcoord_tagged_pct(_d3laneItems1, d.name)
												return r
									})
									.attr("y1", function(_d, i) {
										var text_bbox = this.parentNode.querySelector("text").getBBox();
										return text_bbox.y + text_bbox.height;
									})
									.attr("y2", function(d, i, a) { 
											var r = "100%"
													return r
									})

						// runnerElements										
								var runnerElements = svgContainer
									.select("g.runners")
										.selectAll("g.runner")
										.data(_runners1, function(d, i) { return d.id || (d.id = ++i); })

							// runner elems UPDATE texts
									runnerElements.select('text')
										.transition(redux3dTransition)
												.attr("x", function(d, i) {
													var r1 = coordsUtils().hcoord_pct(_d3laneItems1, d.from)
													var r2 = coordsUtils().hcoord_pct(_d3laneItems1, d.to)
													var r = coordsUtils().hcenter_tagged_pct(r1, r2)
													return r
												})
											.attr("y", function(d, i, s) { 
													var r = (i + 2) * vstep - 10 
													return r  // (i+1)*10 
											})
											.on("start", function start() {		
													intransition = true
											})
											.on("end", function end() {	
													intransition = false
											})
											
							// runnerElems UPDATE lines
									runnerElements.select('line')						 
									.transition(redux3dTransition)
										.attr("x1", function(d, i, a) { 
													var r = coordsUtils().hcoord_tagged_pct(_d3laneItems1, d.from)
													return r
									})
									.attr("x2", function(d, i, a) { 
												var r = coordsUtils().hcoord_tagged_pct(_d3laneItems1, d.to)
												return r
									})
									.attr("y1", function(d, i) {
											var r = (i + 2) * vstep; 
											return r 
										})
									.attr("y2", function(d, i) {
											var r = (i + 2) * vstep; 
											return r 
									})								
									.on("start", function start() {		
											intransition = true
									})
									.on("end", function end() {	
											intransition = false
									})
											
							// runnerElems UPDATE paths
									runnerElements.select("path")
										.transition(redux3dTransition)
											.attr("d", function(d, i) { 			
													var	x_pc = coordsUtils().hcoord_tagged_pct(_d3laneItems1, d.from)
													var xScrollWidth = parseInt(svgContainer.style("width"))
													var t = xScrollWidth * Number.parseFloat(x_pc)/100
													var x = t
													var	rx = vstep / 2
													var	ry = vstep / 3
													var	y = (i + 2) * vstep - ry
													var	sweep_flag = 1	
													var r = [
														"M", x, y, 
														"a", rx, ry, 0, 1, sweep_flag, 0, ry*2,
														].join(" ");														
													return r
												})
											.on("start", function start() {		
													intransition = true
											})
											.on("end", function end() {	
													intransition = false
											})					
														
								// runnerElems ENTER
										var newMessageElements = runnerElements
											.enter()
												.append("g")
													.classed("runner", true)
																							
								// runnerElems ENTER TEXTs
											newMessageElements.each(function(d, i) {
												var new_runner = d3.select(this)	
													.append("text")													
													.attr("class", "runner")
													.style("fill", "transparent")
													.style("font-size", function(d, i) {
															return parseInt(svgContainer.style("width")) * 2/100
															})
													.attr("dy", ".15em")
													.attr("text-anchor", d.from == d.to ? "end" : "middle")
													.attr("alignment-baseline", d.from == d.to ? "middle" : "autoMode")
														.text(d.msg)
														.attr("y", (i + 2) * vstep - 10)
														.attr("x", function() {
															var x1 = coordsUtils().hcoord_pct(_d3laneItems1, d.from)
															var x2 = coordsUtils().hcoord_pct(_d3laneItems1, d.to)
															var r = coordsUtils().hcenter_tagged_pct(x1, x2)
															return r
														})
													.transition(redux3dTransition)
															.style("fill", "grey")
															.on("start", function start() {		
																	intransition = true
															})
															.on("end", function end() {	
																	intransition = false
															})					
												})
													
								// runnerElems ENTER PATHs
											newMessageElements.each(function(d, i) {
												var new_runner = d3.select(this)	
												if (d.from == d.to) {
													new_runner.append("path")			// new mPATHs
														.attr("fill-opacity", 0)
														.attr("stroke", "transparent")
															.each(function(d) { 
																	// this._current = d_to_arc(d, i); // store initial state
															})
														.attr("d", function() { 			
																var	x_pc_to = coordsUtils().hcoord_pct(_d3laneItems1, d.to)
																var xScrollWidth = parseInt(svgContainer.style("width"))
																var t = xScrollWidth * Number.parseFloat(x_pc_to)/100
																var x = t																		
																var	rx = vstep / 2
																var	ry = vstep / 3
																var	y = (i + 2) * vstep - ry
																var	sweep_flag = 1
																var r = [
																	"M", x, y, 
																	"a", rx, ry, 0, 1, sweep_flag, 0, ry*2,
																	].join(" ");														
																return r
															})
															.transition(redux3dTransition)
																.attr("stroke", "grey")
																.attr("fill", "grey")
																.attrTween("marker-end", function(d) {
																		return function (t) {
																			if (t != 1) {
																				return null
																				} else {
																				return "url(#runner-marker)"
																				}
																		}
																	})
																.on("start", function start() {		
																		intransition = true
																})
																.on("end", function end() {	
																		intransition = false
																})					
																		
							// runnerElems ENTER LINEs
												}	else {
													var line = new_runner.append("line")
														.attr("class", "runner")
														.attr("stroke", "transparent")
														.attr("stroke-width", 1)
														.attr("y1", function() {
																var r = (i + 2) * vstep ; 
																return r 
															})
														.attr("y2", function() {
																var r = (i + 2) * vstep ; 
																return r 
														})	
														.attr("x1", coordsUtils().hcoord_tagged_pct(_d3laneItems1, d.from))
														.attr("x2", coordsUtils().hcoord_tagged_pct(_d3laneItems1, d.to))
														.transition(redux3dTransition)
																	.attr("stroke", "gray")
																	.attr("fill", "grey")
																	.attrTween("marker-end", function() {
																		return function (t) {
																			if (t != 1) {
																				return null
																				} else {
																				return "url(#runner-marker)"
																				}
																		}
																	})
																	.on("start", function start() {		
																			intransition = true
																	})
																	.on("end", function end() {	
																			intransition = false
																	})					
													}
											});								
																
				// runnerElems EXIT
						runnerElements.exit()
							.transition()
								.style("opacity", 0)
								.remove()	
	
		
	
	} // renderer
	
	
	// }
// }

export default renderer;