import {ActionTypes as modRefActionTypes,
		ActionCreators as modRefActionCreators} from '../actions'
import __modRefCard from '../package.js'
// import d3 from 'd3.v4.0.0'

	// d3.v4.0.0-rc.
  function normal(mu, sigma) {
    var x, r;
    mu = mu == null ? 0 : +mu;
    sigma = sigma == null ? 1 : +sigma;
    return function() {
      var y;

      // If available, use the second previously-generated uniform random.
      if (x != null) y = x, x = null;

      // Otherwise, generate a new x and y.
      else do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        r = x * x + y * y;
      } while (!r || r > 1);

      return mu + sigma * y * Math.sqrt(-2 * Math.log(r) / r);
    };
  }


let __modRefCerName = __modRefCard.name

const Gravity = 0.5,
      randNormal = normal(0.3, 2),
      randNormal2 = normal(0.5, 1.8)

const initialState = {
    particles: [],
    particleIndex: 0,
    particlesPerTick: 5,
		lastTick: 0,
    svgWidth:  250,
    svgHeight: 	250,
    tickerStarted: false,
    generateParticles: false,
    mousePos: [null, null]
};

function particlesApp(state = initialState, action) {
    switch (action.type) {
        case 'TICKER_STARTED':
            return Object.assign({}, state, {
                tickerStarted: true
            });
        case 'START_PARTICLES':
            return Object.assign({}, state, {
                generateParticles: true
            });
        case 'STOP_PARTICLES':
            return Object.assign({}, state, {
                generateParticles: false
            });
        case 'CREATE_PARTICLES':
            let newParticles = state.particles.slice(0),
                i;

            for (i = 0; i < action.N; i++) {
                let particle = {id: state.particleIndex+i,
                                x: action.x,
                                y: action.y};

                particle.vector = [particle.id%2 ? -randNormal() : randNormal(),
                                   -randNormal2()*3.3];

                newParticles.unshift(particle);
            }

            return Object.assign({}, state, {
                particles: newParticles,
                particleIndex: state.particleIndex+i+1
            });
        case 'UPDATE_MOUSE_POS':
            return Object.assign({}, state, {
                mousePos: [action.x, action.y]
            });
        case 'TIME_TICK':
							let {svgWidth, svgHeight} = state
              let movedParticles = state.particles
                                      .filter((p) =>
                                          !(p.y > svgHeight || p.x < 0 || p.x > svgWidth))
                                      .map((p) => {
                                          let [vx, vy] = p.vector;
                                          p.x += vx;
                                          p.y += vy;
                                          p.vector[1] += Gravity;
                                          return p;
                                      });
            return Object.assign({}, state, {
                particles: movedParticles
            });
        case 'RESIZE_SCREEN':
            return Object.assign({}, state, {
                svgWidth: action.width,
                svgHeight: action.height
            });
        default:
            return state;
    }
}

export default particlesApp;