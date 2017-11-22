import React, { Component } from 'react'
import classNames from 'classnames'
import './styles.scss'

class Chat extends Component {

  constructor(props) {
    super(props)
    this.state ={
      isExpanded: false
    }
  }

  toggleExpansion() {
    this.setState({ isExpanded: !this.state.isExpanded })
  }

  render() {
    const classes = classNames({
      chat: true,
      expanded: this.state.isExpanded
    })
    return(
      <div onClick={() => this.toggleExpansion() } className={classes}></div>
    )
  }

}

export default Chat
