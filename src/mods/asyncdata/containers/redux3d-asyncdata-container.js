/* ---------------------------			*/
/* redux3d-asyncdata-container.js 	*/
/* ---------------------------			*/

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pushState } from 'react';
import ReactDOM from 'react-dom';

import rxmodPackage from '../package.js'
const rxmodReducerName = rxmodPackage.name

import {ActionTypes,	ActionCreators} from '../actions';

import rxmodComponents  from '../components';
let __modRefEnt = rxmodComponents.rxmodComponent

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
	const datums = state[rxmodReducerName]
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