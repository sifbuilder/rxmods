import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import modRefPage from './redux3d-lanes-page';
import { styles } from './styles/styles.scss';

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
	 	let el = 	ReactDOM.findDOMNode(this.refs.d3lanes)	// elem
		modRefPage(el, {}, {})
	}

	componentDidUpdate(prevProps) {
		let el = 	ReactDOM.findDOMNode(this.refs.chartD3V4Ent)
		if (prevProps.loading === true && this.props.loading === true) {
		}
	}
  
  
  render() {
    return (
	     <div className="component">
			<p> |------- d3lanes  </p>
				<div ref="d3lanes" id="d3lanes" className={styles}></div>
			<p>  d3lanes ------| </p>
		</div>	
    )
  }
}

