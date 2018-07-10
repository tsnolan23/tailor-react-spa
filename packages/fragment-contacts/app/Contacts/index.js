import React from 'react'
import PropTypes from 'prop-types'
import { compose, withState, didSubscribe } from 'proppy'
import { attach } from 'proppy-react'

import Contact from '../Contact'
import ContactPropType from '../PropTypes/Contact'

import './styles.scss'

const withContacts = compose(
  withState('contacts', 'setContacts', []),
  didSubscribe(props => {
    fetch('https://randomuser.me/api/?results=20')
      .then(response => response.json())
      .then(data => data.results)
      .then(props.setContacts)
  })
);

const Contacts = ({
  contacts
}) => (
  <div className="contacts">
    {contacts.map((contact, index) => (
      <Contact
        key={index}
        contact={contact}
      />
    ))}
  </div>
)

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(ContactPropType)
}

Contacts.defaultProps = {
  contacts: []
}

export default attach(withContacts)(Contacts)
