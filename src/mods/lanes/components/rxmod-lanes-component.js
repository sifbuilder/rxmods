import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';

import { styles } from './styles/styles.scss';

import RxmodsLanesRenderer from './rxmod-lanes-renderer';

class RxmodsLanesComponent extends Component {
	
	static propTypes = {
	  rxmodState: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired,
	}

 constructor(props, context) {
    super(props, context);
		this.props = props
  }

	 componentDidMount() {
							let el = 	ReactDOM.findDOMNode(this.refs.RxmodsLanesComponentRef)
	
									var rxmodState = this.props.rxmodState
									var msgs = rxmodState.recordsCollection

									var actions = this.props.actions
									actions.setContainer({container: el})

									var state = rxmodState
									var vLow = state.messagesCursorLow
									var vHigh = state.messagesCursorHigh
									var itemSpan = state.itemSpan
									var recordsCollection = state.recordsCollection
									var numRecords = recordsCollection.length

									var periodFactor = state.periodFactor					
									var beatTime = state.beatTime				
									var periodTime = periodFactor	* beatTime // items added						

									function delay_add(messages) {
											 setTimeout(function() { delay_add(messages)}, periodTime)
											 
														if (vHigh >= vLow) vHigh = vHigh + 1	// add one to upper border
														if (vHigh > numRecords) vHigh = -1		// upper border
														if (((vHigh - vLow) > itemSpan) 			// all spteps full
																|| (vHigh == -1) 									// infinitum with vLow active
																|| (vLow == -1) 									// get always from reset
																) vLow = vLow + 1									// increase lower border
														if (vLow > numRecords) vLow = -1			// reset at end of cycle
														var records = recordsCollection.slice(vLow, vHigh)
														state.records = records
														RxmodsLanesRenderer(el, state)
									 }
								delay_add(msgs)
	}

	componentDidUpdate(prevProps) {
		let el = 	ReactDOM.findDOMNode(this.refs.RxmodsLanesComponentRef)
		if (prevProps.loading === true && this.props.loading === true) {
		}
		
		if (this.RxmodsLanesRenderer == null &&  prevProps.loading === true && this.props.loading === true) {
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

