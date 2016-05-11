import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {ActionTypes,	ActionCreators} from '../actions';
import modPackage from '../package.js'
let modName = modPackage.name

import MainSection from '../components/MainSection/MainSection'

class modRefNer extends Component {
  render() {
    const { datums, actions } = this.props
    return (
        <MainSection datums={datums} actions={actions} />
    )
  }
}

modRefNer.propTypes = {
  modRefCerName: PropTypes.string.isRequired,
	datums: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
		datums: state[modName],
		modRefCerName: modName
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
