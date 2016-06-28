import { combineReducers } from 'redux'

import modRefSelectCer from './modRef-select-cer'
import modRefListCer from './modRef-list-cer'

// reddit reducer
const modRefReducer = combineReducers({
  modRefSelectCer,
  modRefListCer
})

export default modRefReducer
