/* ---------------------------			*/
/* redux3d-d3circles-container.js  		*/
/* ---------------------------			*/

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pushState } from 'react';
import ReactDOM from 'react-dom';

import rxmodPackage from '../package.js'
const rxmodPackageName = rxmodPackage.name

import rxmodActions from '../actions';
const { ActionTypes, ActionCreators } = rxmodActions

import __modRefEnt  from '../components';

class modRefNer extends Component {
	constructor(props) {
		super(props);
	}
  
  componentDidMount() {
	}
	
  componentDidUpdate() {
	}
	
  render() {
	const { __modRefItems } = this.props
    return (
      <section>
       <div className="container">
					<__modRefEnt ref='e1EntRef' {...this.props} />
        </div>
			</section>
    );
  }
}

modRefNer.propTypes = {
  __modRefItems: PropTypes.array.isRequired,
}
function mapStateToProps(state) {
  return {
	__modRefItems: state[rxmodPackageName].__modRefItems,
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
)(modRefNer);


