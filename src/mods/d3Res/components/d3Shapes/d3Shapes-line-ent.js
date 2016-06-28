import React from 'react';
import d3 from 'd3.v4.0.0-alpha.39'

// import { line, basisClosed } from '../../lib/d3-shape';

export const CpnD3AsyncShapeLine = () => {
  const lineGenerator = d3.line()
 //   .curve(basisClosed)
    .x(d => d.x)
    .y(d => d.y);

  const size = 500;
  const random = () => 500 * Math.random();

  const data = [{
    x: 0,
    y: random(),
  }, {
    x: random(),
    y: 0,
  }, {
    x: size,
    y: random(),
  }, {
    x: random(),
    y: size,
  },
  ];
  return (<path stroke={'red'} fill={'none'}
                d={lineGenerator(data)}/>);
};
