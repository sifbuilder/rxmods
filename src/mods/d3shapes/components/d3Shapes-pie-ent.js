import React from 'react';

import d3, { interpolateLab, pie, arc } from 'd3.v4.0.0'



export const CpnD3AsyncShapePie = () => {
  const data = [1, 1, 2, 3, 5, 8, 13, 21];
  const arcs = pie()(data);

  const arcGen = arc()
    .innerRadius(0)
    .outerRadius(100);

  const col = d3.interpolateLab('darkgray', 'yellow');

  return (<g>
    {arcs.map((a, i) => {
      const ratio = Math.abs(a.startAngle - a.endAngle) / 2 / Math.PI;
      return (<path
        key={'arc' + i}
        fill={col(ratio)}
        stroke={'white'}
        d={arcGen(a)}/>);
    })}
  </g>);
};
