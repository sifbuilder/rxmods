import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pushState } from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3.v4.0.0';

/* components */
import RefModelChartEnt  from '../components/redux3d-d3quadtree-component';

/* actions */
import * as obj from '../actions';
let __refModelIon = obj.default			// <========== set actions

/* reducer */
let __refModelCer = 'd3quadtree'				// <========== set Cer

// -----------


let data = {
  points: [],
  xValues: [0,1,2,3,4,5,6],
  yMin: 0,
  yMax: 30
};


/* RENDER */
class __refModelNer extends Component {
  constructor(props) {
    super(props);
	
  }
  
    componentDidMount() {
      let el = 	ReactDOM.findDOMNode(this.refs.e1EntRef)
      let e2 = 	ReactDOM.findDOMNode(this.refs.e2EntRef)
      console.log("_e_  __refModelNer: componentDidMount: el: "); console.log(el)

	}
  	componentDidUpdate() {
			console.log("_e_ __refModelNer componentDidUpdate")
	}



	// 				
  render() {
	const { refModelItems } = this.props
    return (
      <section>
       <div className="container">

		<p> |----- refModel container  </p>
		  <div className="row">
            <div >
			
			  <RefModelChartEnt
				data={data}
				width={900}
				height={700}
				/>
			
            </div>	
          </div>
		<p>  refModel container ---------| </p>
        </div>
	</section>
    );
  }
}

// export default __refModelNer

__refModelNer.propTypes = {
  refModelItems: PropTypes.array.isRequired,
  }

/* __advModelChildEnt - connect to STORE */
function mapStateToProps(state) {
 	console.log("_e_  __refModelNer state:",state)
 return {
	refModelItems: state[__refModelCer].refModelItems,
  };
}
function mapDispatchToProps(dispatch) {
  const actionsAll = Object.assign({},
    bindActionCreators(__refModelIon, dispatch), { dispatch });
  return actionsAll;
}
export default  connect(
	mapStateToProps,
	mapDispatchToProps
)(__refModelNer);


