
/* ---------------------------			*/
/* rxmod-lanes-reducer.js   		*/
/* ---------------------------			*/

import rxmodActions from '../actions';
const { ActionTypes, ActionCreators } = rxmodActions
		
import ModPackage from '../package.js'
let modName = ModPackage.name

// _____________ LANES
var initialStateLanes = {
			areRecordsFetched: false,
			container: null,
			keyEventsOnLanes: {},

			periodFactor: 4,
			fadeFactor: 3,
			beatTime: 500,
			itemProps: ['to', 'from'],
			vstep: 50,
			currentMode: 'autoMode',
			currentView: 'lanesView',
			tickspan: 60,
			itemSpan: 6,
			
			lanes: [],
			lanesIndex: 0,
			messages: [],
			messagesCursorLow: 0,
			messagesCursorHigh: 0,
			records: [],
			recordsCollection: [],
			recordsCollection: [
				 {id: "1", from: "app", to: "store", msg: "create store"},
				 {id: "2", from: "store", to: "store", msg: "subscribe lanes listener"},
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
				 {id: "13", from: "renderer", to: "UI", msg: "render lanes"},
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
				 {id: "24", from: "renderer", to: "UI", msg: "render lanes"},
				 {id: "25", from: "UI", to: "app", msg: "send right arrow event"},
				 {id: "26", from: "store", to: "reducer", msg: "dispatch setMode action"},
				 {id: "27", from: "reducer", to: "reducer", msg: "run action"},
				 {id: "28", from: "reducer", to: "reducer", msg: "return new mode auto"},
				 {id: "29", from: "ticker", to: "ticker", msg: "run listeners with new state"},
				 {id: "30", from: "renderer", to: "UI", msg: "render auto lanes"},
				 {id: "31", from: "store", to: "reducer", msg: "dispatch createParticles action"},
				 {id: "32", from: "reducer", to: "reducer", msg: "run action"},
				 {id: "33", from: "reducer", to: "store", msg: "return new state with particles"},
				 {id: "34", from: "ticker", to: "ticker", msg: "run particles listeners"},
				 {id: "35", from: "renderer", to: "UI", msg: "render particles"},
			],
	}
	
function rxmodReducer(state = initialStateLanes, action) {
	if (action == null) return state
    switch (action.type) {
		
		
				case ActionTypes.SET_CONTAINER:		// setContainer
					var r = Object.assign({}, state,
						{container: action.container})
					return r
		
				case ActionTypes.DELETE_LANE:		// deleteLane
					var lanes = state.lanes
					var ls = lanes.filter(function( obj ) {
							return obj.id !== action.lane.id;
						})
					var r = Object.assign({}, state,
						{lanes: ls},
						{lanesIndex: ls.length}
						)
					return r

				case ActionTypes.SET_LANE:		// setLane
					var lanes = state.lanes
					var ls = {}
					var result = lanes.filter(function( obj ) {
							return obj.id == action.lane.id;
						});
							
					if (result.length === 0) {			// add
						ls = {lanes: [
							{
									id: action.lane.id,
									name: action.lane.name,
									x: action.lane.x
							}, 
							...lanes
						]}
					} else {												// edit
							ls = {lanes: lanes.map(lane =>
								lane.id === action.lane.id ?
									Object.assign({}, lane, { id: action.lane.id, name: action.lane.name, x: action.lane.x }) :
									lane
							)}
					}
					
					 var r = Object.assign({}, state,
						ls,
						{
							lanesIndex: ls.lanes.length
						})
						return r
						
        case ActionTypes.SET_LANES:		// setLanes
 						// console.log('SET_LANES')
            return Object.assign({}, state, {
                lanes: action.lanes,
                lanesIndex: Object.keys(action.lanes).length
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
									store.dispatch(actions.setMessages(store.getState().reducerLanes.recordsCollection.slice(0,
										store.getState().reducerLanes.recordsCollection.length)))
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
						var keyEventsOnLanes = state.keyEventsOnLanes
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
							if (keyEventsOnLanes.upArrow !== null && keyEventsOnLanes.upArrow !== action.payload.keyEvents.upArrow) {			// upArrow
										keyEventsOnLanes.upArrow = action.payload.keyEvents.upArrow
										vLow = Math.max(0, --vLow)
										r = Object.assign({}, state, keyEventsOnLanes) 
										r = Object.assign({}, state, {
											records: state.recordsCollection.slice(vLow, vHigh),
											messagesCursorLow: vLow,
											messagesCursorHigh: vHigh,
									})
								}
						}
						return r
						
				case ActionTypes.WALK_DOWN_RECORDS:			// walkDownRecords
						var keyEventsOnLanes = state.keyEventsOnLanes
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
							if (keyEventsOnLanes.downArrow !== null && keyEventsOnLanes.downArrow !== action.payload.keyEvents.downArrow) {			// downArrow
								keyEventsOnLanes.downArrow = action.payload.keyEvents.downArrow
								r = Object.assign({}, state, keyEventsOnLanes) 
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