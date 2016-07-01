import React, { Component } from 'react';

import { styles } from './__refModel-svg-ent-styles.scss';

/* component */
class __refModelSvgEnt extends Component {
  render() {
    // bump the pie around a bit...
    const calcCenter = () => 150 + Math.random() * 200;

    return (<div>
      <p> ------ component --------- </p>
      <div style={{ height: 500, width: 500, border: '2px solid lightgray' }}>
        <svg height={500} width={500} id="__advModelSvg" className={styles} >
        </svg>
      <p> ------ component --------- </p>
      </div>
    </div>);
  }
}

export default __refModelSvgEnt 
