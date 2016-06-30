/* ---------------------------			*/
/* redux3d-rxtodos-reducer.js   		*/
/* ---------------------------			*/

import {ActionTypes,
		ActionCreators	} from '../actions';

import __modRefCard from '../package.js'
let __modRefCerName = __modRefCard.name

const initialState = {
	todos: [
	  {
			text: 'Use React',
			completed: false,
			id: 0
	  },	  
		{
			text: 'Use Redux',
			completed: false,
			id: 1
	  },
	]
}

function reducer(state = initialState, action) {
	
	const todos = state.todos
  switch (action.type) {
    case ActionTypes.ADD_TODO:
      return {todos: [
        {
          id: todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.text
        }, 
        ...todos
      ]}

    case ActionTypes.DELETE_TODO:
      return {todos: todos.filter(todo =>
        todo.id !== action.id
      )}

    case ActionTypes.EDIT_TODO:
      return {todos: todos.map(todo =>
        todo.id === action.id ?
          Object.assign({}, todo, { text: action.text }) :
          todo
      )}

    case ActionTypes.COMPLETE_TODO:
      return {todos:todos.map(todo =>
        todo.id === action.id ?
          Object.assign({}, todo, { completed: !todo.completed }) :
          todo
      )}

    case ActionTypes.COMPLETE_ALL:
      const areAllMarked = todos.every(todo => todo.completed)
      return {todos: todos.map(todo => Object.assign({}, todo, {
        completed: !areAllMarked
      }))}

    case ActionTypes.CLEAR_COMPLETED:
      return {todos: todos.filter(todo => todo.completed === false)}

    default:
      return state
  }
}

export default reducer;