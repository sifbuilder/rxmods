
/* ---------------------------			*/
/* rxmod-d3circles-reducer.js   		*/
/* ---------------------------			*/

import rxmodActions from '../actions';
const { ActionTypes, ActionCreators } = rxmodActions
		
import ModPackage from '../package.js'
let modName = ModPackage.name

const initialState = {
	itemSpan: 50,
	areD3circlesFetched: false,
	areD3circlesSet: false,
	d3circles: [
			   { "x_axis": 30, "y_axis": 30, "radius": 20, "color" : "green" },
			  { "x_axis": 70, "y_axis": 70, "radius": 20, "color" : "purple"},
		  	{ "x_axis": 110, "y_axis": 100, "radius": 20, "color" : "red"}],
	d3circlesCollection: [
			   { "x_axis": 30, "y_axis": 30, "radius": 20, "color" : "green" },
			  { "x_axis": 70, "y_axis": 70, "radius": 20, "color" : "purple"},
		  	{ "x_axis": 110, "y_axis": 100, "radius": 20, "color" : "red"}],
}

function rxmodReducer(state = initialState, action) {
	if (action == null) return state
    switch (action.type) {

				case ActionTypes.SET_D3CIRCLES:	// setD3circles
					var r = Object.assign({}, state)			
						if (state.areD3circlesSet == false) {
							console.log("SET_D3CIRCLES", action)
							var d3circlesCollection = state.d3circlesCollection
							var itemSpan = state.itemSpan
							if (d3circlesCollection.length) {
								if (itemSpan > d3circlesCollection.length) itemSpan = d3circlesCollection.length

								r = Object.assign({}, state, {
										d3circles: d3circlesCollection,
										areD3circlesSet: true,
										itemSpan: itemSpan,
								})
							}
						}
						return r
		
				case ActionTypes.WALK_UP_D3CIRCLES:			// walkUpD3circles
						// console.log("WALK_UP_D3CIRCLES", action)
						var keyEventsOnD3circles = state.keyEventsOnD3circles
						var altKeyCode = 18, ctrlKeyCode = 17 
						var vKeyCode = 86, dKeyCode = 68, fKeyCode = 70
						var leftArrow = 37, rightArrow = 39, leftArrow = 37, upArrow = 38, downArrow = 40
						var keys = action.payload.keys
						
						var vLow = state.itemsCursorLow
						var vHigh = state.itemsCursorHigh
						var itemSpan = action.payload.itemSpan
						var currentMode = action.payload.mode
						var r = state
						return r
						
				case ActionTypes.WALK_DOWN_D3CIRCLES:			// walkDownD3circles
						// console.log("WALK_DOWN_D3CIRCLES")
						var keyEventsOnD3circles = state.keyEventsOnD3circles
						var altKeyCode = 18, ctrlKeyCode = 17 
						var vKeyCode = 86, dKeyCode = 68, fKeyCode = 70
						var leftArrow = 37, rightArrow = 39, leftArrow = 37, upArrow = 38, downArrow = 40
						var keys = action.payload.keys
						
						var vLow = state.itemsCursorLow
						var vHigh = state.itemsCursorHigh
						var itemSpan = state.itemSpan
						var currentMode = action.payload.currentMode
						var r = Object.assign({}, state)
						return r						
        default:
            return state
    }}

export default rxmodReducer;