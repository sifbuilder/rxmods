/* ---------------------------			*/
/* redux3d-d3circles-reducer.js   		*/
/* ---------------------------			*/

import rxmodActions from '../actions';
const { ActionTypes, ActionCreators } = rxmodActions
		
import ModPackage from '../package.js'
let modName = ModPackage.name

const initialState = {
  __modRefItems: [{
    done: true,
  }]
}

function rxmodReducer(state = initialState, action) {
  switch (action.type) {

  default:
    return state;
  }
}

export default rxmodReducer;