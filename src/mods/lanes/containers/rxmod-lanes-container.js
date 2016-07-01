import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pushState } from 'react';
import ReactDOM from 'react-dom';

import rxmodPackage from '../package.js'
const rxmodPackageName = rxmodPackage.name

import rxmodActions from '../actions';
const { ActionTypes, ActionCreators } = rxmodActions
		
import RxmodLanesComponent  from '../components/rxmod-lanes-component';

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
	const { rxmodState } = this.props
    return (
      <section>
       <div className="container">

		  <div className="row">
            <div >
			
			  <RxmodLanesComponent {...this.props}/>
			
            </div>	
          </div>
        </div>
	</section>
    );
  }
}

__modRefNer.propTypes = {
  rxmodState: PropTypes.object.isRequired,
  }

/* __advModelChildEnt - connect to STORE */
function mapStateToProps(state) {
  return {
		rxmodState: state[rxmodPackageName],
  };
}
function mapDispatchToProps(dispatch) {
  const actionsAll = Object.assign({},
    bindActionCreators(ActionCreators, dispatch), { dispatch });
  return actionsAll;
}
export default  connect(
	mapStateToProps,
	mapDispatchToProps
)(__modRefNer);


