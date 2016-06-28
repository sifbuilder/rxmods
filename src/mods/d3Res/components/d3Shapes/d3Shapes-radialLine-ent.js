import React from 'react';

import { radialLine, cardinalClosed } from 'd3.v4.0.0-alpha.39'


export const CpnD3AsyncShapeRadialLine = () => {
  const n = 500;
  const data = Array.from({ length: n }, (d, i) => {
    return { x: 2 * i * Math.PI / n, y: 120 + 40 * (1 / 2 - Math.random()) };
  });

  const lineGenerator = radialLine()
    .curve(cardinalClosed)
    .angle(d => d.x)
    .radius(d => d.y);

  return (<path
    stroke={'steelblue'}
    fill={'none'}
    d={lineGenerator(data)}/>);
};
