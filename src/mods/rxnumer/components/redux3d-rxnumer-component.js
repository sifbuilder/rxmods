import React, { Component, PropTypes } from 'react'

import { styles, textStyles  } from './styles.scss';

class rxmodComponent extends Component {
  render() {
  const { modName, datums, actions} = this.props
    return (
      <div >
				<p>ner: {modName} </p>
						<p className={textStyles}>Clicked: {datums.count} times</p>
						{' '}
						<button onClick={actions.increment} className={styles} >+</button>
						{' '}
						<button onClick={actions.decrement}  className={styles}>-</button>
						{' '}
						<button onClick={actions.incrementIfOdd}  className={styles}>Increment if odd</button>
						{' '}
						<button onClick={() => actions.incrementAsync()}  className={styles}>Increment async</button>
      </div>
    )
  }
}

rxmodComponent.propTypes = {
  actions: PropTypes.object.isRequired,
  datums: PropTypes.object.isRequired,
	rxmodPackageName: PropTypes.string.isRequired,
}

export default rxmodComponent