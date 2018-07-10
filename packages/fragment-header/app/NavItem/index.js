import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './styles.scss'

const NavItem = ({
  index,
  active,
  onClick
}) =>  (
  <div
    onClick={() => onClick(index)}
    className={classnames({
      'nav-item': true,
      'current': active
    })}
  >
  </div>  
)

NavItem.propTypes = {
  active: PropTypes.bool,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func
}

NavItem.defaultProps = {
  active: false,
  onClick: () => {}
}

export default NavItem
