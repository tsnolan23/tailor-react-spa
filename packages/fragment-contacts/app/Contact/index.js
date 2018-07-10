import React from 'react'
import PropTypes from 'prop-types'

import ContactPropType from '../PropTypes/Contact'

import './styles.scss'

const Contact = ({
  contact
}) => (
  <div className="contact">
    <div className="contact-details">
      <img className="contact-avatar" src={contact.picture.medium}/>
      <div className="contact-name">
        <span className="contact-first-name">{contact.name.first}</span>
        <span className="contact-last-name">{contact.name.last}</span>
      </div>
      <span className="contact-email">{contact.email}</span>
    </div>
  </div>
)

Contact.propTypes = {
  contact: ContactPropType.isRequired
}

export default Contact
