import React from 'react'
import Input from '../Input'

const ContactsFilterInput = () => (
  <Input
    placeholder="Filter contacts"
    onChange={event => {
      const externalEvent = new CustomEvent('fragment-header::contactsFilterChange', {
        detail: {
          value: event.target.value
        }
      })

      window.dispatchEvent(externalEvent)
    }}
  />
)

export default ContactsFilterInput