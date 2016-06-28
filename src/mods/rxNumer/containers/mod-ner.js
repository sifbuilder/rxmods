import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ModPackage from '../package.js'
const modName = ModPackage.name

import {ActionTypes,	ActionCreators} from '../reducers/modRef-cer'
import modEnt  from '../components/mod-ent';

class modNer extends Component {
  render() {
    return (
      {app}
    )
  }
}

modNer.propTypes = {
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
		modName: modName,
		datums: state[modName]
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
)(modEnt);

