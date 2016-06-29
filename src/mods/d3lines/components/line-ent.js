import React, { Component, PropTypes } from 'react';

const Line = React.createClass({

  propTypes: {
    path:         React.PropTypes.string,
    series:       React.PropTypes.array,
    stroke:       React.PropTypes.string,
    strokeWidth:  React.PropTypes.number
  },

  getDefaultProps() {
    return {
      stroke:       'blue',
      fill:         'none',
      strokeWidth:  3
    };
  },

  render() {
    let { path, series, stroke, fill, strokeWidth } = this.props;
    return (
      <path
        d=''				// path.datum(series).attr("d", line);
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        />
    );
  }

});
export default Line