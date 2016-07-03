
/* ---------------------------			*/
/* rxmod-d3lanes-reducer.js   		*/
/* ---------------------------			*/

import rxmodActions from '../actions';
const { ActionTypes, ActionCreators } = rxmodActions
		
import ModPackage from '../package.js'
let modName = ModPackage.name

// _____________ D3LANES
var initialStateD3lanes = {
			areRecordsFetched: false,
			container: null,
			keyEventsOnD3lanes: {},

			periodFactor: 4,
			fadeFactor: 3,
			beatTime: 500,
			itemProps: ['to', 'from'],
			vstep: 50,
			currentMode: 'autoMode',
			currentView: 'd3lanesView',
			tickspan: 60,
			itemSpan: 6,
			
			d3lanes: [],
			d3lanesIndex: 0,
			messages: [],
			messagesCursorLow: 0,
			messagesCursorHigh: 0,
			records: [],
			recordsCollection: [],
			recordsCollection: [
				 {id: "1", from: "app", to: "store", msg: "create store"},
				 {id: "2", from: "store", to: "store", msg: "subscribe d3lanes listener"},
				 {id: "3", from: "store", to: "store", msg: "subscribe particles listener"},
				 {id: "4", from: "app", to: "app", msg: "start kbd controller"},
				 {id: "5", from: "app", to: "app", msg: "start mouse controller"},
				 {id: "6", from: "ticker", to: "ticker", msg: "subscribe tickParticles"},
				 {id: "7", from: "ticker", to: "ticker", msg: "subscribe setRecords"},
				 {id: "8", from: "ticker", to: "ticker", msg: "start auto"},
				 {id: "9", from: "store", to: "reducer", msg: "dispatch setRecords action"},
				 {id: "10", from: "reducer", to: "reducer", msg: "apply action logic"},
				 {id: "11", from: "reducer", to: "store", msg: "return new state"},
				 {id: "12", from: "ticker", to: "ticker", msg: "run listeners"},
				 {id: "13", from: "renderer", to: "UI", msg: "render d3lanes"},
				 {id: "14", from: "UI", to: "app", msg: "trigger left arrow event"},
				 {id: "15", from: "store", to: "reducer", msg: "dispatch setMode action"},
				 {id: "16", from: "reducer", to: "reducer", msg: "run action"},
				 {id: "17", from: "reducer", to: "store", msg: "return new state"},
				 {id: "18", from: "ticker", to: "ticker", msg: "run listeners"},
				 {id: "19", from: "UI", to: "app", msg: "send down arrow event"},
				 {id: "20", from: "store", to: "reducer", msg: "dispatch setRecods action"},
				 {id: "21", from: "reducer", to: "reducer", msg: "run action and get record"},
				 {id: "22", from: "reducer", to: "reducer", msg: "return new set"},
				 {id: "23", from: "ticker", to: "ticker", msg: "run listeners"},
				 {id: "24", from: "renderer", to: "UI", msg: "render d3lanes"},
				 {id: "25", from: "UI", to: "app", msg: "send right arrow event"},
				 {id: "26", from: "store", to: "reducer", msg: "dispatch setMode action"},
				 {id: "27", from: "reducer", to: "reducer", msg: "run action"},
				 {id: "28", from: "reducer", to: "reducer", msg: "return new mode auto"},
				 {id: "29", from: "ticker", to: "ticker", msg: "run listeners with new state"},
				 {id: "30", from: "renderer", to: "UI", msg: "render auto d3lanes"},
				 {id: "31", from: "store", to: "reducer", msg: "dispatch createParticles action"},
				 {id: "32", from: "reducer", to: "reducer", msg: "run action"},
				 {id: "33", from: "reducer", to: "store", msg: "return new state with particles"},
				 {id: "34", from: "ticker", to: "ticker", msg: "run particles listeners"},
				 {id: "35", from: "renderer", to: "UI", msg: "render particles"},
			],
	}
	
function rxmodReducer(state = initialStateD3lanes, action) {
	if (action == null) return state
    switch (action.type) {
		
		
				case ActionTypes.SET_CONTAINER:		// setContainer
					var r = Object.assign({}, state,
						{container: action.container})
					return r
		
				case ActionTypes.DELETE_D3LANE:		// deleteD3lane
					var d3lanes = state.d3lanes
					var ls = d3lanes.filter(function( obj ) {
							return obj.id !== action.d3lane.id;
						})
					var r = Object.assign({}, state,
						{d3lanes: ls},
						{d3lanesIndex: ls.length}
						)
					return r

				case ActionTypes.SET_D3LANE:		// setD3lane
					var d3lanes = state.d3lanes
					var ls = {}
					var result = d3lanes.filter(function( obj ) {
							return obj.id == action.d3lane.id;
						});
							
					if (result.length === 0) {			// add
						ls = {d3lanes: [
							{
									id: action.d3lane.id,
									name: action.d3lane.name,
									x: action.d3lane.x
							}, 
							...d3lanes
						]}
					} else {												// edit
							ls = {d3lanes: d3lanes.map(d3lane =>
								d3lane.id === action.d3lane.id ?
									Object.assign({}, d3lane, { id: action.d3lane.id, name: action.d3lane.name, x: action.d3lane.x }) :
									d3lane
							)}
					}
					
					 var r = Object.assign({}, state,
						ls,
						{
							d3lanesIndex: ls.d3lanes.length
						})
						return r
						
        case ActionTypes.SET_D3LANES:		// setD3lanes
 						// console.log('SET_D3LANES')
            return Object.assign({}, state, {
                d3lanes: action.d3lanes,
                d3lanesIndex: Object.keys(action.d3lanes).length
            })
				case ActionTypes.FETCH_RECORDS:	// fetchRecords
						// console.log('FETCH_RECORDS')
						var processRecord = function processRecord(d) {
							d.amount = +d.amount;
							d.risk = +d.risk;
							d.valueOf = function value() {
								return this.amount;
							}	
							return d;
						}

						var processData = function processData(error, dataCsv) {
							if (store.getState().court.currentMode == 0) {	// _tbd_  
									++timeTick
									++vLast
									store.dispatch(actions.setMessages(store.getState().reducerD3lanes.recordsCollection.slice(0,
										store.getState().reducerD3lanes.recordsCollection.length)))
							}
						}
						d3.queue()
							.defer(maps, action.src, processRecord)
							.await(processData)					
						
            return Object.assign({}, state);

        case ActionTypes.SET_MESSAGES:			
 						// console.log('SET_MESSAGES')
           return Object.assign({}, state, {
										messages: action.messages,
            })
						
				case ActionTypes.SET_RECORDS_FETCHED:
						// console.log('SET_RECORDS_FETCHED')
           return Object.assign({}, state, {
                areRecordsFetched: action.areRecordsFetched
            })
						
				case ActionTypes.SET_RECORDS_COLLECTION:	// setRecordsCollection
						console.log('SET_RECORDS_COLLECTION', action, state)
						var r = state
						if (state.areRecordsFetched == false) {
							// console.log('SET_RECORDS_COLLECTION')
							var r = Object.assign({}, state, {
									recordsCollection: action.recordsCollection,
									areRecordsFetched: true,
							})
						}
						return r
						
				case ActionTypes.SET_RECORDS:
						console.log('SET_RECORDS', action, state)
						var vLow = state.messagesCursorLow
						var vHigh = state.messagesCursorHigh
						var itemSpan = action.itemSpan
						var mode = action.mode
						var r = state
						if (mode == 'autoMode') {
							var records = state.recordsCollection
							var numRecords = records.length
							if (vHigh >= vLow) vHigh = vHigh + 1	// add one to upper border
							if (vHigh > numRecords) vHigh = -1		// upper border
							if (((vHigh - vLow) > itemSpan) 			// all spteps full
									|| (vHigh == -1) 									// infinitum with vLow active
									|| (vLow == -1) 									// get always from reset
									) vLow = vLow + 1									// increase lower border
							if (vLow > numRecords) vLow = -1			// reset at end of cycle
						// console.log('SET_RECORDS records', records, numRecords, vLow, vHigh)
						console.log('SET_RECORDS records', state.recordsCollection.slice(vLow, vHigh))
							r = Object.assign({}, state, {
								records: state.recordsCollection.slice(vLow, vHigh),
								messagesCursorLow: vLow,
								messagesCursorHigh: vHigh,
							})
						}
						return r

				case ActionTypes.WALK_UP_RECORDS:			// walkUpRecords
						var keyEventsOnD3lanes = state.keyEventsOnD3lanes
						var altKeyCode = 18, ctrlKeyCode = 17 
						var vKeyCode = 86, dKeyCode = 68, fKeyCode = 70
						var leftArrow = 37, rightArrow = 39, leftArrow = 37, upArrow = 38, downArrow = 40
						var keys = action.payload.keys
						
						var vLow = state.messagesCursorLow
						var vHigh = state.messagesCursorHigh
						var itemSpan = action.payload.itemSpan
						var currentMode = action.payload.mode
						var r = state
						if (currentMode == 'walkMode') {
							if (keyEventsOnD3lanes.upArrow !== null && keyEventsOnD3lanes.upArrow !== action.payload.keyEvents.upArrow) {			// upArrow
										keyEventsOnD3lanes.upArrow = action.payload.keyEvents.upArrow
										vLow = Math.max(0, --vLow)
										r = Object.assign({}, state, keyEventsOnD3lanes) 
										r = Object.assign({}, state, {
											records: state.recordsCollection.slice(vLow, vHigh),
											messagesCursorLow: vLow,
											messagesCursorHigh: vHigh,
									})
								}
						}
						return r
						
				case ActionTypes.WALK_DOWN_RECORDS:			// walkDownRecords
						var keyEventsOnD3lanes = state.keyEventsOnD3lanes
						var altKeyCode = 18, ctrlKeyCode = 17 
						var vKeyCode = 86, dKeyCode = 68, fKeyCode = 70
						var leftArrow = 37, rightArrow = 39, leftArrow = 37, upArrow = 38, downArrow = 40
						var keys = action.payload.keys
						
						var vLow = state.messagesCursorLow
						var vHigh = state.messagesCursorHigh
						var itemSpan = action.payload.itemSpan
						var currentMode = action.payload.currentMode
						var r = Object.assign({}, state)
						if (currentMode == 'walkMode') {
							if (keyEventsOnD3lanes.downArrow !== null && keyEventsOnD3lanes.downArrow !== action.payload.keyEvents.downArrow) {			// downArrow
								keyEventsOnD3lanes.downArrow = action.payload.keyEvents.downArrow
								r = Object.assign({}, state, keyEventsOnD3lanes) 
								if ((vHigh - vLow)  >= itemSpan) ++vLow
								++vHigh
									r = Object.assign({}, state, {
										records: state.recordsCollection.slice(vLow, vHigh),
										messagesCursorLow: vLow,
										messagesCursorHigh: vHigh,
								})
							}
						}
						return r
						
        default:
            return state
    }
}

export default rxmodReducer;