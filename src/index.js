import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { compose, createStore, applyMiddleware, combineReducers } from 'redux'

import { Router, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';

import { Route, IndexRoute } from 'react-router';
 
const history = useRouterHistory(createHashHistory)({ queryKey: false });


// import { routeReducer } from 'redux-simple-router';
// import { reducer as formReducer } from 'redux-form';
// import thunk from 'redux-thunk'
// import logger from 'redux-logger'
import routing from 'rxRouting'
import form from 'rxForm'
import thunk from 'rxThunk'
import logger from 'rxLogger'


// import asyncData from 'asyncData'
// import d3Msq from 'd3Msq'
// import d3Quadtree from 'd3Quadtree'
// import d3Res from 'd3Res'
// import d3Particles from 'd3Particles'



// var d3ParticlesEs = require('d3Particles/index.js')
// var d3Particles
// if (d3ParticlesEs.__esModule) d3Particles=d3ParticlesEs.default


// import modRef from 'modRef'

// import rebApp from 'rebApp'
// import rebHome from 'rebHome'
// import rebList from 'rebList'

// import rxCounter from 'rxCounter'
// import rxNumer from 'rxNumer'

// import rxStoreViz from 'rxStoreViz'

import rxTodos from 'rxTodos'

// import uberCity from 'uberCity'



  
let mods = {
	routing,		// reducer
	form,			// reducer
	thunk,			// middleware
	// logger,			// middleware
	
	// asyncData,
	// d3Msq,
	// d3Quadtree,
	// d3Res,

	
	// d3Particles,

		// modRef,
		
	// rebApp,
	// rebHome,
	// rebList,

	// rxStoreViz,		// instrument
	// rxCounter,
	// rxNumer,
	
	rxTodos,

	
	// uberCity,
	
	// applNer,
	}

/* ------------- UTILS */
 var newelm = function (elid) {
	let element = document.getElementById("root");
	let asyncDataElm = document.createElement("div");
	asyncDataElm.setAttribute("id", elid);
	asyncDataElm.setAttribute("class", elid);
	element.appendChild(asyncDataElm);
	let elem = document.getElementById(elid)
	return elem
}

var renderNer = function (containers, store) {
	for (let NerKey in containers) {
		let NerObj = containers[NerKey]
		render(
			<Provider store={store}>
					<NerObj />
			</Provider>
			,newelm(NerKey))
	}
}

let middleware = []
let instruments = []
let reducers = {} // form: formReducer,	// routing: routeReducer,
let containers = {}
let routes = []


// console.log("_e_ index mods:" ); console.log(mods);

for (let modKey in mods) {
 // console.log("_e_ index mw:" + modKey + " " ); console.log(mods[modKey].MW );
	if (mods[modKey].Ner != undefined) containers[modKey] = mods[modKey].Ner
	if (mods[modKey].Cer != undefined) reducers[modKey] = mods[modKey].Cer
	if (mods[modKey].MW != undefined) middleware.push(mods[modKey].MW)
	if (mods[modKey].Inst != undefined) instruments.push(mods[modKey].Inst)
	if (mods[modKey].Route != undefined) routes.push(mods[modKey].Route)
}
 
 // console.log("...thunk:");console.log( mods.thunk.MW)
 // console.log("...logger:");console.log(mods.logger.MW)
 // console.log("...middleware:");console.log(middleware)
 console.log("...routes:");console.log(routes)
 
 
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
		// mods.thunk.MW,
		// mods.logger.MW,
	),
	...instruments
)(createStore)


// console.log("instruments:");console.log(instruments)
// console.log("instrument:");console.log(rxStoreViz.Ner.instrument())
// console.log("containers:");console.log(containers)

// the container pases the actions and the data to the app component 
// the data comes from the module entry in the state, set by the reducer
// render the components with the store 
 
 /* ------------- RENDER */
var store = createStoreWithMiddleware(combineReducers(reducers))
// renderNer (containers, store)	


function renderRoutes() {
   // <Router history={history} >
		// <Route path="/" component={routes[0].container}>
		// <Route path="list" component={containers.rebList} />
		// <Route status={404} path="*" component={containers.rebHome} />
		// </Route>	
    // </Router>

	let r = routes.find(d => d.path == '/')
	let rs = routes.filter(d => d.path !== '/')
	return (
		<Route path={r.path} component={r.container}>
				{rs.map(r =>
								<Route path={r.path} component={r.container} />
							)}
		</Route>	
	)
}

function renderRouter() {
	return(
		 <Router history={history} >
		 			{renderRoutes()}
		 </Router>
	)
}

render(
  <Provider store={store}>
			{renderRouter()}
  </Provider>,
  document.getElementById('root')
)

