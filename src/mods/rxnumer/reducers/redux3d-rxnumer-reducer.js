/* ---------------------------			*/
/* redux3d-rxnumer-reducer.js   		*/
/* ---------------------------			*/

import rxmodActions from '../actions';
const { ActionTypes, ActionCreators } = rxmodActions
		
import ModPackage from '../package.js'
let modName = ModPackage.name

const initialState = {
	count: 0
}

function rxmodReducer (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.INCREMENT_COUNTER:
      return {count: state.count + 1}
    case ActionTypes.DECREMENT_COUNTER:
      return {count: state.count - 1}
    default:
      return state
  }
}

export default rxmodReducer;
