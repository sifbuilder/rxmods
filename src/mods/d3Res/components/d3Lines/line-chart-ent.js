import React, { Component, PropTypes } from 'react';
import d3 from 'd3.v4.0.0-alpha.39';
import DataSeries  from './data-series-ent';

export default class LineChart extends Component {

	static propTypes = {
		width:  React.PropTypes.number,
		height: React.PropTypes.number,
		data:   React.PropTypes.object.isRequired
	};

	constructor(props) {
		super(props);
		this.width = 600;
		this.height = 300;
	};

// http://stackoverflow.com/questions/21903604/is-there-any-proper-way-to-integrate-d3-js-graphics-into-facebook-react-applicat
//http://stackoverflow.com/questions/21285262/react-leave-the-contents-of-a-component-alone/21290217#21290217
	componentDidMount() {
        // d3.select(this.getDOMNode())
            // .call(chart(this.props));
    }
	
    shouldComponentUpdate(props) {
        // d3.select(this.getDOMNode())
            // .call(chart(props));
        // return false;
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
      <svg width={width} height={height}>
        <DataSeries
          xScale={xScale}
          yScale={yScale}
          data={data}
          width={width}
          height={height}
          />
      </svg>
    );
  }
  

};


