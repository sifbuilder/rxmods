import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { compose, createStore, applyMiddleware, combineReducers } from 'redux'

import { Router, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';

import { Route, IndexRoute } from 'react-router';
const history = useRouterHistory(createHashHistory)({ queryKey: false });

import routing from 'rxRouting'
import form from 'rxForm'
import thunk from 'rxThunk'
import logger from 'rxLogger'

import asyncdata from 'asyncdata'
import d3particles from 'd3particles'
import d3circles from 'd3circles'
import rxtodos from 'rxtodos'
import rxnumer from 'rxnumer'

import lanes from 'lanes'

// import d3bars from 'd3bars'			//
// import d3lines from 'd3lines'		//
// import d3quadtree from 'd3quadtree'	//
// import d3shapes from 'd3shapes'
// import d3svg from 'd3svg'
// import rebApp from 'rebApp'
// import rebHome from 'rebHome'
// import rebList from 'rebList'
// import rxCounter from 'rxCounter'
// import rxStoreViz from 'rxStoreViz'
// import uberCity from 'uberCity'

  
let mods = {
	routing,		// reducer
	form,			// reducer
	thunk,			// middleware
	// logger,			// middleware
	asyncdata,
	d3particles,
	rxnumer,
	rxtodos,
	d3circles,
	lanes,
	// d3quadtree,
	// d3lines,
	// rebApp,
	// rebHome,
	// rebList,
	// rxStoreViz,		// instrument
	// rxCounter,
	// uberCity,
	}

/* ------------- UTILS */
 var newelm = function (elid) {
	let element = document.getElementById("root")
	let asyncdataElm = document.createElement("div");
	asyncdataElm.setAttribute("id", elid);
	asyncdataElm.setAttribute("class", elid);
	element.appendChild(asyncdataElm);
	let elem = document.getElementById(elid)
	return elem
}

 var getelm = function (elid) {
	let rootElem = document.getElementById("root")
	let contanierElem = document.getElementById(elid)
	
	return contanierElem
}


let middleware = []
let instruments = []
let reducers = {} // form: formReducer,	// routing: routeReducer,
let containers = {}
let routes = []

for (let modKey in mods) {
 	if (mods[modKey].Ner != undefined) containers[modKey] = mods[modKey].Ner	// containers
	if (mods[modKey].Cer != undefined) reducers[modKey] = mods[modKey].Cer		// reducers
	if (mods[modKey].MW != undefined) middleware.push(mods[modKey].MW)				// middleWare
	if (mods[modKey].Inst != undefined) instruments.push(mods[modKey].Inst)		// instruments
	if (mods[modKey].Route != undefined) routes.push(mods[modKey].Route)			// routes
}
 
  /* ------------- store with middleware */
  // expect:
  // const createStoreWithMiddleware = compose(
	// applyMiddleware(
		// thunk,
		// logger(),
	// ),
	// rxStoreViz.Ner.instrument()
	// )(createStore)
const createStoreWithMiddleware = compose(
	applyMiddleware(
		...middleware
	),
	...instruments
)(createStore)

var store = createStoreWithMiddleware(combineReducers(reducers))


/* ------------- render un-routed */
var renderNer = function (containers, store) {
	for (let NerKey in containers) {
		let NerObj = containers[NerKey]
		let contanierElem = document.getElementById(NerKey)
		if (contanierElem) {
			render(
				<Provider store={store}>
						<NerObj />
				</Provider>
				,contanierElem)
			}
	}
}

/* ------------- render routed */
function renderRoutes(rs) {
		// expect:
		// <Router history={history} >
		// <Route path="/" component={routes[0].container}>
		// <Route path="list" component={containers.rebList} />
		// <Route status={404} path="*" component={containers.rebHome} />
		// </Route>	
    // </Router>
	let _r = rs.find(d => d.path == '/')
	let _rs = rs.filter(d => d.path !== '/')
	return (
		<Route path={_r.path} component={_r.container}>
				{_rs.map(_r =>
								<Route path={_r.path} component={_r.container} />
							)}
		</Route>	
	)
}

function renderRouter(rs) {
	return(
		 <Router history={history} >
		 			{renderRoutes(rs)}
		 </Router>
	)
}

function renderRouted(cs, s, rs) {
	for (let NerKey in cs) {
		let NerObj = cs[NerKey]
		render(
			 <Provider store={s}>
						{renderRouter(rs)}
				</Provider>,
				newelm(NerKey))
	}
}

/* ------------- render app */
function renderApp(cs, s, rs) {
	if (rs.length == 0) { 
		renderNer(cs, s) }
	else {
		renderRouted(cs, s, rs)
	}
}

renderApp(containers, store, [])


