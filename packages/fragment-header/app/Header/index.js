import React from 'react'
import PropTypes from 'prop-types'
import { compose, withProps, withState } from 'proppy'
import { attach } from 'proppy-react'

import Logo from '../Logo'
import NavItem from '../NavItem'

import './styles.scss'

const withHeaderState = compose(
  withState('active', 'setActive', 1),
  withProps({ items: [ 0, 1, 2 ,3 ] })
)

const Header = ({
  items,
  active,
  setActive
}) => (
  <div className="header">
    <Logo/>
    {
      items.map((item, index) => (
        <NavItem
          key={index}
          index={index}
          active={index === active}
          onClick={setActive}
        />
      ))
    }
  </div>
)

Header.propTypes =  {
  items: PropTypes.arrayOf(PropTypes.number).isRequired,
  active: PropTypes.number.isRequired,
  setActive: PropTypes.func.isRequired
}

export default attach(withHeaderState)(Header)
