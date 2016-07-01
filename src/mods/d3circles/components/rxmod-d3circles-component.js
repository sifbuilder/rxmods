import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { styles } from './styles.scss';

import RxmodsD3circlesRenderer from './rxmod-d3circles-renderer';

class RxmodsD3circlesComponent extends Component {
  constructor(props) {
		super(props);
		this.RxmodsD3circlesRenderer = null;
	}

  	componentDidMount() {
		let el = 	ReactDOM.findDOMNode(this.refs.RxmodsD3circlesComponentRef)
		this.RxmodsD3circlesRenderer = new RxmodsD3circlesRenderer(el, this.props)
	}

	componentDidUpdate(prevProps) {
		let el = 	ReactDOM.findDOMNode(this.refs.RxmodsD3circlesComponentRef)
		if (prevProps.loading === true && this.props.loading === true) {
		}
		if (this.RxmodsD3circlesRenderer == null &&  prevProps.loading === true && this.props.loading === true) {
				this.RxmodsD3circlesRenderer = new RxmodsD3circlesRenderer(el, this.props)
		}
	}

  render() {
		return (
            <div ref="RxmodsD3circlesComponentRef" id="RxmodsD3circlesComponent" className={styles}>
            </div>
          )
  }
}

export default RxmodsD3circlesComponent;