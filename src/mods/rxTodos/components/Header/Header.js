import React, { PropTypes, Component } from 'react'
import TodoTextInput from '../TodoTextInput/TodoTextInput'
import style from '../styles/style-app.css'

class Header extends Component {
  handleSave(text) {
    if (text.length !== 0) {
      this.props.addTodo(text)
    }
  }

  render() {
    return (
      <header className="header">
          <h1>Todos</h1>
          <TodoTextInput newTodo
                         onSave={this.handleSave.bind(this)}
                         placeholder="What needs to be done?" />
      </header>
    )
  }
}

Header.propTypes = {
  addTodo: PropTypes.func.isRequired
}

export default Header
