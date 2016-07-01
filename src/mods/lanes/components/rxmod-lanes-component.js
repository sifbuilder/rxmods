import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';

import { styles } from './styles/styles.scss';

import RxmodsLanesRenderer from './rxmod-lanes-renderer';

class RxmodsLanesComponent extends Component {
	
	static propTypes = {
	  rxmodState: PropTypes.object.isRequired
	};

 constructor(props) {
    super(props);
  }

	 componentDidMount() {
		let el = 	ReactDOM.findDOMNode(this.refs.RxmodsLanesComponentRef)
		this.RxmodsLanesRenderer = new RxmodsLanesRenderer(el, this.props)
	}

	componentDidUpdate(prevProps) {
		let el = 	ReactDOM.findDOMNode(this.refs.RxmodsLanesComponentRef)
		if (prevProps.loading === true && this.props.loading === true) {
		}
		if (this.RxmodsLanesRenderer == null &&  prevProps.loading === true && this.props.loading === true) {
				this.RxmodsLanesRenderer = new RxmodsLanesRenderer(el, this.props)
		}
	}
  
  
  render() {
    return (
	     <div className="component">
				<div ref="RxmodsLanesComponentRef" id="RxmodsLanesComponentRef" className={styles}></div>
		</div>	
    )
  }
}

export default RxmodsLanesComponent;

