import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pushState } from 'react';
import ReactDOM from 'react-dom';

import {ActionTypes as __modRefCtt,
		ActionCreators as __modRefIon} from '../actions';
import __modRefCard from '../package.js'
import __modRefEnt  from '../components/modRef-ent';
let __modRefCer = __modRefCard.name
let _e_ = __modRefCard.name

/* RENDER */
class __modRefNer extends Component {
  constructor(props) {
    super(props);
  }
  
	componentDidMount() {
		let el = 	ReactDOM.findDOMNode(this.refs.e1EntRef)
		let e2 = 	ReactDOM.findDOMNode(this.refs.e2EntRef)
	}
	componentDidUpdate() {
	}

	// 				
  render() {
	const { __modRefItems } = this.props
    return (
      <section>
       <div className="container">

		<p> |----- modRef container  </p>
		  <div className="row">
            <div >
			
			  <__modRefEnt {...this.props}/>
			
            </div>	
          </div>
		<p>  modRef container ---------| </p>
        </div>
	</section>
    );
  }
}

__modRefNer.propTypes = {
  __modRefItems: PropTypes.array.isRequired,
  }

/* __advModelChildEnt - connect to STORE */
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


