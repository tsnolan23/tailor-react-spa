import React from 'react'
import PropTypes from 'prop-types'
import { compose, withState, didSubscribe } from 'proppy'
import { attach } from 'proppy-react'

import Contact from '../Contact'
import ContactPropType from '../PropTypes/Contact'

import './styles.scss'

const withLogic = compose(
  withState('filter', 'setFilter', ''),
  withState('contacts', 'setContacts', []),
  didSubscribe(props => {
    fetch('https://randomuser.me/api/?results=30')
      .then(response => response.json())
      .then(data => data.results)
      .then(props.setContacts)

    const setFilter = event =>
      props.setFilter(event.detail.value)

    window.addEventListener('fragment-header::contactsFilterChange', setFilter)

    return () => window.removeEventListener('fragment-header::contactsFilterChange', setFilter)  
  })
)

const byName = filter => contact => {
  const fullname = `${contact.name.first} ${contact.name.last}`
  return fullname.toLowerCase().includes(filter.toLowerCase())
}

const Contacts = ({
  filter,
  contacts
}) => (
  <div className="contacts">
    {contacts
    .filter(byName(filter))
    .map((contact, index) => (
      <Contact
        key={index}
        contact={contact}
      />
    ))}
  </div>
)

Contacts.propTypes = {
  filter: PropTypes.string,
  contacts: PropTypes.arrayOf(ContactPropType)
}

Contacts.defaultProps = {
  filter: '',
  contacts: []
}

export default attach(withLogic)(Contacts)
