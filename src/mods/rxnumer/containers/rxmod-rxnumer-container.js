/* ---------------------------			*/
/* rxmod-rxnumer-container.js  		*/
/* ---------------------------			*/

import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import rxmodPackage from '../package.js'
const rxmodPackageName = rxmodPackage.name

import rxmodActions from '../actions';
const { ActionTypes, ActionCreators } = rxmodActions

import rxmodComponent  from '../components/rxmod-rxnumer-component';

class rxmodContainer extends Component {
  render() {
    return (
      {app}
    )
  }
}

rxmodContainer.propTypes = {
	actions: PropTypes.object.isRequired,
	datums: PropTypes.object.isRequired,
}

var app = function renderApp() {
	return(
        <App />
	)
}

function mapStateToProps(state) {
  return {		
		rxmodPackageName: rxmodPackageName,
		datums: state[rxmodPackageName]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ActionCreators, dispatch)
  }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(rxmodComponent);

