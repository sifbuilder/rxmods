import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as styles from './styles.scss';

import {ActionTypes, ActionCreators} from '../actions';
	
		
let { selectCat100, fetchItem100sIfNeeded, invalidateItem100 } = ActionCreators
import RedditAsyncPickerEnt from './redditAsync-picker-ent'
import RedditAsyncItem100sEnt from './redditAsync-items-ent'

// reddit component
export default class redditAsyncEnt extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { dispatch, cat100NameSelected } = this.props
    dispatch(fetchItem100sIfNeeded(cat100NameSelected))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cat100NameSelected !== this.props.cat100NameSelected) {
      const { dispatch, cat100NameSelected } = nextProps
      dispatch(fetchItem100sIfNeeded(cat100NameSelected))
    }
  }

  handleChange(nextItem1) {
    this.props.dispatch(selectCat100(nextItem1))
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch, cat100NameSelected } = this.props
    dispatch(invalidateItem100(cat100NameSelected))
    dispatch(fetchItem100sIfNeeded(cat100NameSelected))
  }

  render() {
    const { cat100NameSelected, item100s, isFetching, lastUpdated, cats100 } = this.props
	const ops = cats100.map(x => x.cat100Name)
    return (
      <div>
          <h4 className={styles.thisStyle}> |--- redditAsync </h4>

        <RedditAsyncPickerEnt value={cat100NameSelected}
                onChange={this.handleChange}
                options={ops} />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href="#"
               onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {isFetching && item100s.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && item100s.length === 0 &&
          <h2>Empty.</h2>
        }
        {item100s.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <RedditAsyncItem100sEnt item100s={item100s} />
          </div>
        }
            <h4 className={styles.thatStyle}> redditAsync ---| </h4>
    </div>
    )
  }
}
