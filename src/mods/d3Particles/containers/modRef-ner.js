import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {ActionTypes,	ActionCreators} from '../actions';
				
import ModPackage from '../package.js'
let modName = ModPackage.name

import App from '../components/App'

class modRefNer extends Component {
  render() {
    const { actions, datums } = this.props
    return (
      <div>
        <App datums={datums} actions={actions} />
      </div>
    )
  }
}

modRefNer.propTypes = {
	actions: PropTypes.object.isRequired,
	datums: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
		modRefCerName: modName,
		datums: state[modName]
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ActionCreators, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(modRefNer)
