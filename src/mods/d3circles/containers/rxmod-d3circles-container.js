/* ---------------------------			*/
/* rxmod-d3circles-container.js  		*/
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

import RxmodComponent  from '../components/rxmod-d3circles-component';
// import rxmodComponents  from '../components';
// const { RxmodComponent } = rxmodComponents

class rxmodContainer extends Component {
	constructor(props) {
		super(props);
	}
  
  componentDidMount() {
	}
	
  componentDidUpdate() {
	}
	
  render() {
	const { d3circles } = this.props
    return (
      <section>
       <div className="container">
					<RxmodComponent ref='RxmodComponentRef' {...this.props} />
        </div>
			</section>
    );
  }
}

rxmodContainer.propTypes = {
  d3circles: PropTypes.array.isRequired,
}
function mapStateToProps(state) {
  return {
		d3circles: state[rxmodPackageName].d3circles,
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
)(rxmodContainer);


