import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3.v4.0.0';

/* component */
import ChartD3V4Obj from './redux3d-d3quadtree-chart-obj';
import { styles } from './redux3d-d3quadtree-chart-styles.scss';

class LineChart extends Component {

	static propTypes = {
		width:  React.PropTypes.number,
		height: React.PropTypes.number,
		data:   React.PropTypes.object.isRequired
	};

	constructor(props) {
		super(props);
		
		this.ChartD3V4Obj = null;
		this.width = props.width;
		this.height = props.height;
	};

// http://stackoverflow.com/questions/21903604/is-there-any-proper-way-to-integrate-d3-js-graphics-into-facebook-react-applicat
//http://stackoverflow.com/questions/21285262/react-leave-the-contents-of-a-component-alone/21290217#21290217

	
    shouldComponentUpdate(props) {
        // d3.select(this.getDOMNode())
        // .call(chart(props));
        return false;
    }

	 componentDidMount() {
		 // d3.select(this.getDOMNode())
         // .call(chart(this.props));
		let el = 	ReactDOM.findDOMNode(this.refs.chartD3V4Ent)
		// console.log("chartD3V4Ent: componentDidMount: el: "); console.log(el); console.log("/")
		// console.log("chartD3V4Ent: create ChartD3V4Obj")
		this.ChartD3V4Obj = new ChartD3V4Obj(el)
		// console.log("chartD3V4Ent: ChartD3V4Obj created"); console.log(this.ChartD3V4Obj); console.log("/")
	}

	componentDidUpdate(prevProps) {
		let el = 	ReactDOM.findDOMNode(this.refs.chartD3V4Ent)
		// console.log("chartD3V4Ent: componentDidUpdate: el: "); console.log(el)
		if (prevProps.loading === true && this.props.loading === true) {
			// console.log("chartD3V4Ent: componentDidUpdate: prevProps.loading ");
		}
		if (this.ChartD3V4Obj == null &&  prevProps.loading === true && this.props.loading === true) {
			// console.log("chartD3V4Ent: create componentDidUpdate")
				this.ChartD3V4Obj = new ChartD3V4Obj(el)
			// console.log("chartD3V4Ent: componentDidUpdate created"); console.log(this.ChartD3V4Obj); console.log("/")
		}
	}

	
  render() {
	
    let { width, height, data} = this.props;

    let xScale = d3.scaleOrdinal()
      .domain(data.xValues)
      .range([0, width]);

    let yScale = d3.scaleLinear()
      .range([height, 10])
      .domain([data.yMin, data.yMax]);
	  
    return (
      <div width={width} height={height} ref="chartD3V4Ent"  id="ChartD3V4Ent" className={`${styles}`} >

      </div>
    );
  }
  

};

export default LineChart

