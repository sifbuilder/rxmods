import {ActionTypes, ActionCreators} from '../actions';
		
const intialState = {
  isFetching: false,
  didInvalidate: false,
  items: []
}

function item100sPerItem(state = intialState, action) {
  switch (action.type) {
    case ActionTypes.INVALIDATE_CAT100:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case ActionTypes.REQUEST_ITEM100S:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case ActionTypes.RECEIVE_ITEM100S:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.item100s,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function modRefListCer(state = { }, action) {
  switch (action.type) {
    case ActionTypes.INVALIDATE_CAT100:
    case ActionTypes.RECEIVE_ITEM100S:
    case ActionTypes.REQUEST_ITEM100S:
      return Object.assign({}, state, {
        [action.cat100NameSelected]: item100sPerItem(state[action.cat100NameSelected], action)
      })
    default:
      return state
  }
}		
		
export default modRefListCer	
