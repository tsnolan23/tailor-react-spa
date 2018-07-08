import React from 'react'
import PropTypes from 'prop-types'
import Avatar from 'react-avatar'

import './styles.scss'

const Contact = ({
  contact
}) => (
  <div className="contact">
    <div className="contact-details">
      <Avatar
        round
        size={100}
        src={contact.picture.medium}
        name={`${contact.name.first} ${contact.name.last}`}
      />
      <div className="contact-name">
        <span className="contact-first-name">{contact.name.first}</span>
        <span className="contact-last-name">{contact.name.last}</span>
      </div>
      <span className="contact-email">{contact.email}</span>
    </div>
  </div>
);

Contact.propTypes = {
  contact: PropTypes.object
}

export default Contact
