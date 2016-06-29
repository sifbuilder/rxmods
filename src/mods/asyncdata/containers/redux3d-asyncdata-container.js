import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pushState } from 'react';
import ReactDOM from 'react-dom';

import {ActionTypes as __modRefCtt,	ActionCreators as __modRefIon} from '../actions';
import __modRefCard from '../package.js'
const __modRefCerName = __modRefCard.name
import ents  from '../components';
let __modRefEnt = ents.__modRefEnt

class __modRefNer extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { __props } = this.props
		return (
			<__modRefEnt ref='__modRefEnt' {...this.props} />
		);
	}
}

__modRefNer.propTypes = {
  cat100NameSelected: PropTypes.string.isRequired,
  item100s: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  cats100: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
	const datums = state[__modRefCerName]
  const { modRefSelectCer, modRefListCer } = datums
  const { cats100, cat100NameSelected } = modRefSelectCer
  const { isFetching, lastUpdated, items: item100s } 
	= modRefListCer[cat100NameSelected] || {isFetching: true, items: [] }
  return {
    cat100NameSelected,
    item100s,
    isFetching,
    lastUpdated,
	cats100
  }
}

export default connect(mapStateToProps)(__modRefNer)