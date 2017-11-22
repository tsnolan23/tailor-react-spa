import React, { Component } from 'react'
import './styles.scss'
import NavItem from '../NavItem'
import Logo from '../Logo'

const items = [ 0, 1, 2, 3 ]

class Header extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: 'Test',
      active: 1
    }
  }

  toggle() {
    this.setState({ name: this.state.name === 'Test' ? 'New' : 'Test' })
  }

  selectNavItem(index) {
    this.setState({ active: index })
  }

  render() {
    return(
      <div onClick={() => { this.toggle()}} className="header">
        <Logo/>
        {
          items.map((item, index) => {
            return(
              <NavItem
                active={index === this.state.active}
                index={index}
                onClick={(index) => this.selectNavItem(index)}
                key={index}
              />
            )
          })
        }
      </div>
    )
  }

}

export default Header
