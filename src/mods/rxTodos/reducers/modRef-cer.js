import {ActionTypes as modRefActionTypes,
		ActionCreators as modRefActionCreators} from '../actions';

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

export default function todos(state = initialState, action) {
	
console.log("modRef-cer state: ");console.log(state);
console.log("modRef-cer action: ");console.log(action);
	
const todos = state.todos
  switch (action.type) {
    case modRefActionTypes.ADD_TODO:
		console.log("modRef-cer ADD_TODO: ");
      return {todos: [
        {
          id: todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.text
        }, 
        ...todos
      ]}

    case modRefActionTypes.DELETE_TODO:
      return {todos: todos.filter(todo =>
        todo.id !== action.id
      )}

    case modRefActionTypes.EDIT_TODO:
      return {todos: todos.map(todo =>
        todo.id === action.id ?
          Object.assign({}, todo, { text: action.text }) :
          todo
      )}

    case modRefActionTypes.COMPLETE_TODO:
      return {todos:todos.map(todo =>
        todo.id === action.id ?
          Object.assign({}, todo, { completed: !todo.completed }) :
          todo
      )}

    case modRefActionTypes.COMPLETE_ALL:
      const areAllMarked = todos.every(todo => todo.completed)
      return {todos: todos.map(todo => Object.assign({}, todo, {
        completed: !areAllMarked
      }))}

    case modRefActionTypes.CLEAR_COMPLETED:
      return {todos: todos.filter(todo => todo.completed === false)}

    default:
      return state
  }
}
