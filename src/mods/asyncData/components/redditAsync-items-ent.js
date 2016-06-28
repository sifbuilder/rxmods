import React, { PropTypes, Component } from 'react'

class redditAsyncItem100sEnt extends Component {
  render() {
    return (
      <ul>
        {this.props.item100s.map((item100, i) =>
          <li key={i}>{item100.title}</li>
        )}
      </ul>
    )
  }
}

redditAsyncItem100sEnt.propTypes = {
  item100s: PropTypes.array.isRequired
}

export default redditAsyncItem100sEnt
