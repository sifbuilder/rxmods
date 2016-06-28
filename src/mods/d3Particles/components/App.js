import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3.v4.0.0-alpha.39';

import Particles from './Particles';
import Footer from './Footer';
import Header from './Header';

import style from './style.css'

class App extends Component {
  constructor(props, context) {
    super(props, context)

		console.log("this: ", this)		// fix size **************** 
		
// props.datums.svgWidth = 100
// props.datums.svgHeight = 100

		const {datums, actions} = props
		

		
		
  }
			// ------
    startTicker() {
        let ticker = () => {
            if (this.props.datums.tickerStarted) {
               this.maybeCreateParticles();
                this.props.actions.tickTime()

                window.requestAnimationFrame(ticker);
            }
        };
        if (!this.props.datums.tickerStarted) {
           this.props.actions.tickerStarted()
						// ticker();

						this.maybeCreateParticles();
            this.props.actions.tickTime()

            window.requestAnimationFrame(ticker);
        }
    }
		
    startParticles() {
       this.props.actions.startParticles()
    }

    stopParticles() {
				this.props.actions.stopParticles()
    }

    updateMousePos(x, y) {
        this.actions.updateMousePos(x, y);
    }

    maybeCreateParticles() {
        const [x, y] = this.props.datums.mousePos;
        if (this.props.datums.generateParticles) {
            this.props.actions.createParticles(this.props.datums.particlesPerTick, x, y)
        }
   }
	 
		// ------
    updateMousePos() {
        let [x, y] = d3.mouse(this.refs.svg);
        this.props.actions.updateMousePos(x, y);
    }

    updateTouchPos() {
        let [x, y] = d3.touches(this.refs.svg)[0];
        this.actions.updateMousePos(x, y);
    }		
		
    componentDidMount() {
        let svg = d3.select(this.refs.svg);
// width={this.props.datums.svgWidth}
// height={this.props.datums.svgHeight}
        svg.on('mousedown', () => {
           this.updateMousePos();
            this.startParticles();
        });
        svg.on('touchstart', () => {
            this.updateTouchPos();
            this.startParticles();
        });
        svg.on('mousemove', () => {
            this.updateMousePos();
        });
        svg.on('touchmove', () => {
            this.updateTouchPos();
        });
        svg.on('mouseup', () => {
            this.stopParticles();
        });
        svg.on('touchend', () => {
            this.stopParticles();
        });
        svg.on('mouseleave', () => {
            this.stopParticles();
        });
    }



    render() {
		
        let timestamp = new Date().getTime(),
            lastTick = this.props.datums.lastTick,
            fps = 600000/(timestamp-lastTick);
 
        return (
            <div onMouseDown={e => this.startTicker()} style={{}}>
 								<Header />
                 <svg className={style.tile}
											// width={this.props.datums.svgWidth}
											// height={this.props.datums.svgHeight}
                      ref="svg"
                      style={{background: 'rgba(124, 224, 249, .3)'}}>
                     <Particles particles={this.props.datums.particles} />
                 </svg>
                 <Footer N={this.props.datums.particles.length} />
             </div>
        );
    }
}

export default App;
