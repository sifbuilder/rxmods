import React, { Component, PropTypes } from 'react';
import d3 from 'd3.v4.0.0-alpha.39';
import Line  from './line-ent';

const DataSeries = React.createClass({

  propTypes: {
    colors:             React.PropTypes.func,
    data:               React.PropTypes.object,
    interpolationType:  React.PropTypes.string
  },

  getDefaultProps() {
    return {
      data:               {},
      interpolationType:  'cardinal',
      colors:             d3.scaleCategory10(),
      xScale:             React.PropTypes.func,
      yScale:             React.PropTypes.func
    };
  },

  render() {
    let { data, colors, xScale, yScale, interpolationType } = this.props;

    let line = d3.line()
    /*  .interpolate(interpolationType) */
      .x((d) => { return xScale(d.x); })
      .y((d) => { return yScale(d.y); });

    let lines = data.points.map((series, id) => {
      return (
        <Line
          path={line(series)}
          seriesName={series.name}
          stroke={colors(id)}
          key={id}
          />
      );
    });

    return (
      <g>
        <g>{lines}</g>
      </g>
    );
  }

});

export default DataSeries