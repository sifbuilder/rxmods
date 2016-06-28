export const ActionTypes = {
	ADD_ITEM: 'ADD_ITEM',
	DELETE_ITEM: 'DELETE_ITEM',
}

export const ActionCreators = {
	addItem(fields) {
	  return {
		type: __modRefCtt.ADD_ITEM,
		fields,
	  };
	},
	
	delItem(index) {
	  return {
		type: __modRefCtt.DELETE_ITEM,
		index,
	  };
	},
}
