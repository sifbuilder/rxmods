/* ---------------------------	*/
/* rxmod-d3lanes-container.js  		*/
/* ---------------------------	*/

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pushState } from 'react';
import ReactDOM from 'react-dom';

import rxmodPackage from '../package.js'
const rxmodPackageName = rxmodPackage.name

import rxmodActions from '../actions';
const { ActionTypes, ActionCreators } = rxmodActions

import RxmodD3lanesComponent  from '../components/rxmod-d3lanes-component';

class RxmodContainer extends Component {
  constructor(props) {
    super(props);
  }
  
	// 				
  render() {
	const { rxmodState } = this.props
    return (
      <section>
				<div className="container">
					<div className="row">
            <div >
			
							<RxmodD3lanesComponent {...this.props}/>
			
            </div>	
          </div>
        </div>
	</section>
    );
  }
}

RxmodContainer.propTypes = {
  rxmodState: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired,
  }

function mapStateToProps(state) {
  return {
		rxmodState: state[rxmodPackageName],
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ActionCreators, dispatch)
  }
}
export default  connect(
	mapStateToProps,
	mapDispatchToProps
)(RxmodContainer);


