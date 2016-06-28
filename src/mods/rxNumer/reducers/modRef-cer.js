import ModPackage from '../package.js'
let modName = ModPackage.name

// import {ActionTypes,	
		// ActionCreators} from '../actions';


const initialState = {
	count: 0
}

function modReducer (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.INCREMENT_COUNTER:
      return {count: state.count + 1}
    case ActionTypes.DECREMENT_COUNTER:
      return {count: state.count - 1}
    default:
      return state
  }
}

export default modReducer



const ctts = {
	INCREMENT_COUNTER: '',
	DECREMENT_COUNTER: '',
}

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

export const ActionTypes = keyMirror(ctts, '')
// console.log('rxNumer ion ActionTypes: '); console.log(ActionTypes)

export const ActionCreators = {
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
	},
}