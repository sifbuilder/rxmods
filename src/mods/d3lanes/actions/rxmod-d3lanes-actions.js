
/* ---------------------------			*/
/* rxmod-d3lanes-actions.js   		*/
/* ---------------------------			*/

import rxmodPackage from '../package.js'
let rxmodPackageName = rxmodPackage.name

// ____________________ keyMirror
// https://github.com/STRML/keyMirror
var keyMirror = function(obj, prefix) {
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


var actionConstants = {
	DELETE_D3LANE: '',
	RENDER_D3LANES: '',
	SET_CONTAINER: '',
	SET_D3LANE: '',
	SET_D3LANES: '',
	SET_MESSAGES: '',
	SET_RECORDS: '',
	SET_RECORDS_COLLECTION: '',
	SET_RECORDS_FETCHED: '',
	UPDATE_MESSAGES: '',
	WALK_DOWN_RECORDS: '',
	WALK_UP_RECORDS: '',
}

var ActionTypes = keyMirror(actionConstants, '')

// ____________________ actions D3LANES
var ActionCreators = {
	decreaseCursorLow() {
    return {
        type: ActionTypes.DECREASE_CURSOR_LOW,
		}
  },
	decreaseCursorHigh() {
    return {
        type: ActionTypes.DECREASE_CURSOR_HIGH,
		}
  },
	deleteD3lane(d3lane) {
    return {
        type: ActionTypes.DELETE_D3LANE,
        d3lane: d3lane,
		}
  },
	renderD3lanes(argObj) {
    return {
        type: ActionTypes.RENDER_D3LANES,
 		}
  },
	setContainer(argObj) {
    return {
        type: ActionTypes.SET_CONTAINER,
				container: argObj.container
 		}
  },
	setRecordsFetched(areRecordsFetched) {
    return {
        type: ActionTypes.SET_RECORDS_FETCHED,
        areRecordsFetched: areRecordsFetched,
    }
  },
	setRecords(argObj) {	// SET_RECORDS
    return {
        type: ActionTypes.SET_RECORDS,
        itemSpan: argObj.itemSpan,
        mode: argObj.currentMode,
    }	
  },
	setRecordsCollection(obj) {	// SET_RECORDS_COLLECTION
    return {
        type: ActionTypes.SET_RECORDS_COLLECTION,
        recordsCollection: obj.recordsCollection
    }
  },
	setD3lane(d3lane) {
    return {
        type: ActionTypes.SET_D3LANE,
        d3lane: d3lane,
		}
  },
	setD3lanes(d3lanes) {
    return {
        type: ActionTypes.SET_D3LANES,
        d3lanes: d3lanes,
		}
  },
	setMessages(messages) {
    return {
        type: ActionTypes.SET_MESSAGES,
        messages: messages,
		}
  },
	updateMessages(messages) {
    return {
       type: ActionTypes.UPDATE_MESSAGES,
       cursorLow: cursorLow,
       cursorHigh: cursorHigh,
		}
  },
	walkDownRecords(payload) {	// WALK_DOWN_RECORDS
    return {
        type: ActionTypes.WALK_DOWN_RECORDS,
        payload: payload,
    }
  },
	walkUpRecords(payload) {	// WALK_UP_RECORDS
    return {
        type: ActionTypes.WALK_UP_RECORDS,
        payload: payload,
    }
  },
}

export default {ActionTypes, ActionCreators};