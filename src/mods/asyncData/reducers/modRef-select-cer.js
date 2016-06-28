import {ActionTypes as modRefActionTypes,
		ActionCreators as modRefActionCreators} from '../actions';

const intitialState = {'cats100': [{'cat100Name': 'reactjs', 'type100': 'http'},
									{'cat100Name': 'frontend', 'type100': 'http'},
									{'cat100Name': 'messages', 'type100': 'file'},
									],	
						'cat100NameSelected': 'reactjs',
						}
		
function modRefSelectCer(state = intitialState, action) {
  switch (action.type) {
    case modRefActionTypes.SELECT_CAT100:
      return Object.assign({},
			state,
			{'cat100NameSelected': action.cat100NameSelected}
			)
    default:
      return state
  }
}

export default modRefSelectCer
