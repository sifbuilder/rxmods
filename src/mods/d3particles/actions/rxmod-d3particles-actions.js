import __modRefCard from '../package.js'
let __modRefCer = __modRefCard.name				// <===== id

const ctts = {
	TIME_TICK: '',
	TICKER_STARTED: '',
	CREATE_PARTICLES: '',
	START_PARTICLES: '',
	STOP_PARTICLES: '',
	UPDATE_MOUSE_POS: '',
	RESIZE_SCREEN: '',
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


export const ActionTypes = keyMirror(ctts, '')

export const ActionCreators = {
	tickTime() {
    return {
        type: ActionTypes.TIME_TICK
    };
	},
	tickerStarted() {
    return {
        type: ActionTypes.TICKER_STARTED
    };
	},
	createParticles(N, x, y) {
    return {
        type: ActionTypes.CREATE_PARTICLES,
        x: x,
        y: y,
        N: N
    };
	},
	startParticles() {
    return {
        type: ActionTypes.START_PARTICLES
    };
	},
	stopParticles() {
    return {
        type: ActionTypes.STOP_PARTICLES
    }
	},
	updateMousePos(x, y) {
    return {
        type: ActionTypes.UPDATE_MOUSE_POS,
        x: x,
        y: y
    }
	},
	resizeScreen(width, height) {
    return {
        type: ActionTypes.RESIZE_SCREEN,
        width: width,
        height: height
    }
	}

}