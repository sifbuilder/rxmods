/* ---------------------------			*/
/* rxmod-rxnumer-actions.js   		*/
/* ---------------------------			*/

import rxmodPackage from '../package.js'
let rxmodPackageName = rxmodPackage.name				// <===== id


// https://github.com/STRML/keyMirror
var keyMirror = function(obj, prefix='') {
  var ret = {};
  var key;
  if (!(obj instanceof Object && !Array.isArray(obj))) {
    throw new Error('keyMirror(...): Argument must be an object.');
  }
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      ret[key] = prefix + key;
    }
  }
  return ret;
};

const actionConstants = {
	INCREMENT_COUNTER: '',
	DECREMENT_COUNTER: '',
}

const ActionTypes = keyMirror(actionConstants, '')

const ActionCreators = {
	increment() {
	  return {
		type: ActionTypes.INCREMENT_COUNTER
	  }
	},

	decrement() {
	  return {
		type: ActionTypes.DECREMENT_COUNTER
	  }
	},

	incrementIfOdd() {
	  return (dispatch, getState) => {
		const s = getState()
		const counter = s[modName].count
		if (counter % 2 === 0) {
		  return
		}

		dispatch(ActionCreators.increment())
	  }
	},

	incrementAsync(delay = 1000) {
	  return dispatch => {
		setTimeout(() => {
		  dispatch(ActionCreators.increment())
		}, delay)
	  }
	}
};

export default {ActionTypes, ActionCreators};


