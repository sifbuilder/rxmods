import React, { Component } from 'react';
// import { Button } from 'react-bootstrap';

/* components */
import { CpnD3AsyncShapeLine } from './d3Shapes-line-ent';
import { CpnD3AsyncShapeRadialLine } from './d3Shapes-radialLine-ent';
import { CpnD3AsyncShapePie } from './d3Shapes-pie-ent';


export default class CpnD3AsyncShape extends Component {
  render() {
    // bump the pie around a bit...
    const calcCenter = () => 150 + Math.random() * 200;

    return (
	<div>
      <p>As a simple example, this <strong>static</strong> component consists of a svg container
        and adds a <strong>Line</strong> (as a component)
        and a <strong>pie chart</strong> (as a component), plus
        a <strong>radial line</strong> (as a component)</p>

      <react-bootstrapButton
        bsStyle={'danger'}
        onClick={() => { this.forceUpdate(); }}>
        Produce some new random data (not animated)
      </react-bootstrapButton>
      <br/><br/>

      <div style={{ height: 500, width: 500, border: '2px solid lightgray' }}>
        <svg height={500} width={500}>
          <CpnD3AsyncShapeLine/>
		  
          <g transform={'translate(' + calcCenter() + ', ' + calcCenter() + ')'}>

            <CpnD3AsyncShapeRadialLine/>
			<CpnD3AsyncShapePie/>
			
          </g>
		  
        </svg>
      </div>
    </div>);
  }
}
