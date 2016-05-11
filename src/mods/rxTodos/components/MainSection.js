import React, { Component, PropTypes } from 'react'
import TodoItem from './TodoItem'
import Footer from './Footer'
import Header from './Header'
// import './index.css'
// import * as styles from './styles.scss';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
}

class MainSection extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = { filter: SHOW_ALL }
  }

  handleClearCompleted() {
    const atLeastOneCompleted = this.props.datums.todos.some(todo => todo.completed)
    if (atLeastOneCompleted) {
      this.props.actions.clearCompleted()
    }
  }

  handleShow(filter) {
    this.setState({ filter })
  }

  renderToggleAll(completedCount) {
    const { datums, actions } = this.props
    if (datums.todos.length > 0) {
      return (
        <input className="toggle-all"
               type="checkbox"
               checked={completedCount === datums.todos.length}
               onChange={actions.completeAll} />
      )
    }
  }

  renderFooter(completedCount) {
    const { datums } = this.props
    const { filter } = this.state
    const activeCount = datums.todos.length - completedCount

    if (datums.todos.length) {
      return (
        <Footer completedCount={completedCount}
                activeCount={activeCount}
                filter={filter}
                onClearCompleted={this.handleClearCompleted.bind(this)}
                onShow={this.handleShow.bind(this)} />
      )
    }
  }

  render() {
    const { datums, actions } = this.props
    const { filter } = this.state

    const filteredTodos = datums.todos.filter(TODO_FILTERS[filter])
    const completedCount = datums.todos.reduce((count, todo) =>
      todo.completed ? count + 1 : count,
      0
    )

    return (
				<div>
					<Header addTodo={actions.addTodo} />
					<section className="main">
						 {this.renderToggleAll(completedCount)}
						
						<ul className="todo-list">
							{filteredTodos.map(todo =>
								<TodoItem key={todo.id} todo={todo} {...actions} />
							)}
						</ul>
						{this.renderFooter(completedCount)}
					</section>
				</div>
    )
  }
}

MainSection.propTypes = {
  datums: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default MainSection
