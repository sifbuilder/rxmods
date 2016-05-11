import __modRefCard from '../package.js'
let __modRefCer = __modRefCard.name				// <===== id

const ctts = {
	ADD_TODO: '',
	DELETE_TODO: '',
	EDIT_TODO: '',
	COMPLETE_TODO: '',
	COMPLETE_ALL: '',
	CLEAR_COMPLETED: '',
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
}

export const ActionTypes = keyMirror(ctts, '@@' + __modRefCer + '/')

export const ActionCreators = {
	addTodo(text) {
		return { type: ActionTypes.ADD_TODO, text }
	},
	deleteTodo(id) {
		return { type: ActionTypes.DELETE_TODO, id }
	},
	editTodo(id, text) {
	  return { type: ActionTypes.EDIT_TODO, id, text }
	},
	completeTodo(id) {
	  return { type: ActionTypes.COMPLETE_TODO, id }
	},
	completeAll() {
	  return { type: ActionTypes.COMPLETE_ALL }
	},
	clearCompleted() {
	  return { type: ActionTypes.CLEAR_COMPLETED }
	},
}
