import * as d3 from 'd3.v4.0.0';
import modRefChart from './redux3d-d3bars-chart';

// ---------------------------
function page (elem, props = {}, ownProps = {}) {
		let el = elem
		let elid = (typeof (el) === 'object') ? '#'+ el.id : '#'+ el
		
	    var dataSet = [];
        var highTemperatures = dataSet[0] = [77, 71, 82, 87, 84, 78, 80, 84, 86, 72, 71, 68, 75, 73, 80, 85, 86, 80];
        var lowTemperatures = dataSet[1] = highTemperatures.map(function(d) { return d - Math.random() * 30});
        var milesRun = dataSet[2] = [2, 5, 4, 3, 1, 2, 1];
        var fillColors = ['coral', 'steelblue', 'teal'];
		
		var updatableChart = modRefChart().width(800).data(highTemperatures); 
		d3.select(el)
			.call(updatableChart);
		
        // window.setTimeout(function() {
            // updatableChart.height(450);
        // }, 1000);

        // var i = 1;
        // window.setInterval(function() {
            // updatableChart.data(dataSet[i]);
            // updatableChart.fillColor(fillColors[i]);
            // i = (i+1) % 3 ;
        // }, 2500);

}

export default page


