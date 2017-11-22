import React, { Component } from 'react'
import { bool, func, number } from 'prop-types'
import './styles.scss'
import classNames from 'classnames'

class NavItem extends Component {

  handleClick() {
    this.props.onClick(this.props.index)
  }

  render() {
    const classes = classNames({
      'nav-item': true,
      'current': this.props.active
    })
    return(
      <div className={classes} onClick={() => this.handleClick()}></div>
    )
  }

}

NavItem.propTypes = {
  active: bool,
  index: number,
  onClick: func
}

export default NavItem
