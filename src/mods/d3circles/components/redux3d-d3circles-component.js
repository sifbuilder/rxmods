import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/* component styles */
import { styles } from './styles.scss';


/* component objects */
import ChartD3V4Obj from './chartD3V4-obj';

class ChartD3V4Ent extends Component {
  constructor(props) {
		super(props);
		this.ChartD3V4Obj = null;
	}

  	componentDidMount() {
		let el = 	ReactDOM.findDOMNode(this.refs.chartD3V4Ent)
			// console.log("chartD3V4Ent: componentDidMount: el: "); console.log(el); console.log("/")
			// console.log("chartD3V4Ent: create ChartD3V4Obj")
		this.ChartD3V4Obj = new ChartD3V4Obj(el)
			// console.log("chartD3V4Ent: ChartD3V4Obj created"); console.log(this.ChartD3V4Obj); console.log("/")
	}

	componentDidUpdate(prevProps) {
		let el = 	ReactDOM.findDOMNode(this.refs.chartD3V4Ent)
		if (prevProps.loading === true && this.props.loading === true) {
		}
		if (this.ChartD3V4Obj == null &&  prevProps.loading === true && this.props.loading === true) {
				this.ChartD3V4Obj = new ChartD3V4Obj(el)
		}
	}


  render() {
	return (
            <div ref="chartD3V4Ent" id="ChartD3V4Ent" className={styles}>
            </div>
          )
  }
}

export default ChartD3V4Ent;