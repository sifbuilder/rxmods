import { combineReducers } from 'redux'

import modRefSelectCer from './rxmod-asyncdata-select-reducer'
import modRefListCer from './rxmod-asyncdata-list-reducer'

// reddit reducer
const modRefReducer = combineReducers({
  modRefSelectCer,
  modRefListCer
})

export default modRefReducer
