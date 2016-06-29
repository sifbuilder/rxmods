import { combineReducers } from 'redux'

import modRefSelectCer from './redux3d-asyncdata-select-reducer'
import modRefListCer from './redux3d-asyncdata-list-reducer'

// reddit reducer
const modRefReducer = combineReducers({
  modRefSelectCer,
  modRefListCer
})

export default modRefReducer
