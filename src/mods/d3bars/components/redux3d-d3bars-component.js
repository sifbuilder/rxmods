import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import * as d3 from 'd3.v4.0.0';
import modRefPage from './modRef-page';

import { styles } from './modRef-styles.scss';

export default class __modRefEnt extends Component {
	 static propTypes = {
	  addItem: PropTypes.func.isRequired,
	  delItem: PropTypes.func.isRequired,
	  __modRefItems: PropTypes.array.isRequired
	};

 constructor(props) {
    super(props);
  }

	shouldComponentUpdate(props) {
        return false;
    }

	 componentDidMount() {
	 	let el = 	ReactDOM.findDOMNode(this.refs.d3Bars)	// elem
		modRefPage(el, {}, {})
	}

	componentDidUpdate(prevProps) {
		let el = 	ReactDOM.findDOMNode(this.refs.chartD3V4Ent)
	}
  
  
  render() {
    return (
	     <div className="component">
			<p> |------- d3Bars  </p>
				<div ref="d3Bars" id="d3Bars" className={styles}></div>
			<p>  d3Bars ------| </p>
		</div>	
    )
  }
}
