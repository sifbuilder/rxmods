import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pushState } from 'react';
import ReactDOM from 'react-dom';

import __modRefIon from '../actions';		// <===== ctts
const __modRefCer = 'd3Res'				// <===== id
import __modRefEnt  from '../components/d3Bars/modRef-ent';
import __d3CirclesEnt  from '../components/d3Circles/chartD3V4-ent';
import LineChartEnt  from '../components/d3Lines/line-chart-ent';
import ShapeEnt from '../components/d3Shapes/d3Shapes-ent';
import __refModelSvgEnt  from '../components/d3Svg/__refModel-svg-ent';

let data = {
  points: [
    [ { x: 0, y: 20 }, { x: 1, y: 30 }, { x: 2, y: 10 }, { x: 3, y: 5 },
      { x: 4, y: 8 }, { x: 5, y: 15 }, { x: 6, y: 10 } ],
    [ { x: 0, y: 8 }, { x: 1, y: 5 }, { x: 2, y: 20 }, { x: 3, y: 12 },
      { x: 4, y: 4 }, { x: 5, y: 6 }, { x: 6, y: 2 } ],
    [ { x: 0, y: 0 }, { x: 1, y: 5 }, { x: 2, y: 8 }, { x: 3, y: 2 },
      { x: 4, y: 6 }, { x: 5, y: 4 }, { x: 6, y: 2 } ]
  ],
  xValues: [0,1,2,3,4,5,6],
  yMin: 0,
  yMax: 30
};



class __modRefNer extends Component {
	constructor(props) {
		super(props);
	}
  
    componentDidMount() {
      // let e1 = 	ReactDOM.findDOMNode(this.refs.__modRefEnt)

	}
  	componentDidUpdate() {
      // let e1 = 	ReactDOM.findDOMNode(this.refs.__modRefEnt)
	}
	
// 				<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-md-offset-3 col-lg-offset-3">

					 // <ShapeEnt ref='ShapeRef' {...this.props} />
					 					// <__refModelSvgEnt ref='__refModelSvgEnt' {...this.props} />


  render() {
	const { __modRefItems } = this.props
    return (
      <section>
       <div className="container">
			<p> |----- d3Res container  </p>
					<__modRefEnt ref='__modRefEnt' {...this.props} />
					<__d3CirclesEnt ref='e1EntRef' {...this.props} />
					 <LineChartEnt data={data} width={600}	height={300}/>
			<p>  container d3Res ---------| </p>
        </div>
	</section>
    );
  }
}

__modRefNer.propTypes = {
  __modRefItems: PropTypes.array.isRequired,
}
function mapStateToProps(state) {
  return {
	__modRefItems: state[__modRefCer].__modRefItems,
  };
}
function mapDispatchToProps(dispatch) {
  const actionsAll = Object.assign({},
    bindActionCreators(__modRefIon, dispatch), { dispatch });
  return actionsAll;
}
export default  connect(
	mapStateToProps,
	mapDispatchToProps
)(__modRefNer);


