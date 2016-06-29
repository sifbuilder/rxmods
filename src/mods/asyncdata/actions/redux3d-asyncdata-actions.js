import d3 from 'd3.v4.0.0'

import fetch from 'isomorphic-fetch'
import __modRefCard from '../package.js'
let __modRefCerName = __modRefCard.name				// <===== id

// fb
var keyMirror = function(obj) {
  var ret = {};
  var key;
  if (!(obj instanceof Object && !Array.isArray(obj))) {
    throw new Error('keyMirror(...): Argument must be an object.');
  }
  for (key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }
    ret[key] = key;
  }
  return ret;
};

export const ActionTypes = {
	REQUEST_ITEM100S_FROM_URL: 'REQUEST_ITEM100S_FROM_URL',
	REQUEST_ITEM100S_FROM_FILE: 'REQUEST_ITEM100S_FROM_FILE',
	RECEIVE_ITEM100S: 'RECEIVE_ITEM100S',
	SELECT_CAT100: 'SELECT_CAT100',
	INVALIDATE_CAT100: 'INVALIDATE_CAT100',
}

export const ActionCreators = {
	selectCat100(cat100NameSelected) {
	  return {
		type: ActionTypes.SELECT_CAT100,
		cat100NameSelected
	  }
	},
		
	invalidateItem100(cat100NameSelected) {
	  return {
		type: ActionTypes.INVALIDATE_CAT100,
		cat100NameSelected
	  }
	},

	requestItem100sFromUrl(cat100NameSelected) {
	  return {
		type: ActionTypes.REQUEST_ITEM100S_FROM_URL,
		cat100NameSelected
	  }
	},
	
	requestItem100sFromFile(cat100NameSelected) {
	  return {
		type: ActionTypes.REQUEST_ITEM100S_FROM_FILE,
		cat100NameSelected
	  }
	},

	receiveItem100sFromReddit(cat100NameSelected, json) {
	  return {
		type: ActionTypes.RECEIVE_ITEM100S,
		cat100NameSelected: cat100NameSelected,
		item100s: json.data.children.map(child => child.data),
		receivedAt: Date.now()
	  }
	},

	receiveItem100sFromCsv(cat100NameSelected, json) {
							console.log("_e___________ actions : " + JSON.stringify(json, null, 2))
	  return {
		type: ActionTypes.RECEIVE_ITEM100S,
		cat100NameSelected: cat100NameSelected,
		item100s: json.map(child =>  Object.assign({}, child, {"title": child.msg + " - from: " + child.from + " - to: " + child.to })),
		receivedAt: Date.now()
	  }
	},

	fetchItem100s(state, cat100NameSelected) {
		const type100 = state[__modRefCerName].modRefSelectCer.cats100.filter(x => x.cat100Name === cat100NameSelected)[0].type100
		return dispatch => {
			if (type100 === 'http') {
				dispatch(ActionCreators.requestItem100sFromUrl(cat100NameSelected))
				return fetch(`https://www.reddit.com/r/${cat100NameSelected}.json`)
				  .then(response => response.json())
				  .then(json => dispatch(ActionCreators.receiveItem100sFromReddit(cat100NameSelected, json)))
			}
			if (type100 === 'file') {
				dispatch(ActionCreators.requestItem100sFromFile(cat100NameSelected))
				let dsv  = d3.dsv(";", "text/plain")
				let url = `../data/${cat100NameSelected}.csv`
				return  d3.requestText(url)
					.response(function(xhr) { 
						// console.log("_e___________ actions xhr: " + JSON.stringify(xhr, null, 2))
						let x =  dsv.parse(xhr.responseText); 
						// console.log("_e___________ actions : " + JSON.stringify(x, null, 2))
						return x
					})
					.get(function (e, d) {
						if (e){
								console.log("_e___________ actions error: " + JSON.stringify(Error(e), null, 2))
							} else {
								dispatch(ActionCreators.receiveItem100sFromCsv(cat100NameSelected, d))
						}
					})
			}
		}
	},

	shouldFetchItem100s(state, cat100NameSelected) {
	  const Item100s = state[__modRefCerName].modRefListCer[cat100NameSelected]	//<==
	  if (!Item100s) {
		return true
	  }
	  if (Item100s.isFetching) {
		return false
	  }
	  return Item100s.didInvalidate
	},

	fetchItem100sIfNeeded(cat100NameSelected) {
	  return (dispatch, getState) => {
		if (ActionCreators.shouldFetchItem100s(getState(), cat100NameSelected)) {
		  return dispatch(ActionCreators.fetchItem100s(getState(), cat100NameSelected))
		}
	  }
	},

}
