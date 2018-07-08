import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Toggle from '../Toggle'

import './styles.scss'

const Chat = () => (
  <Toggle>
    {({ on, toggle }) => (
      <div
        className={classNames('chat', { expanded: on })}
        onClick={toggle}
      />
    )}
  </Toggle>
)

export default Chat
