import React, { Component } from 'react'
import Contact from '../Contact'
import './styles.scss'

class Contacts extends Component {
  constructor(props) {
    super(props)

    this.state = {
      contacts: []
    }
  }

  componentDidMount() {
    this.fetchContacts()
  }

  fetchContacts() {
    fetch('https://randomuser.me/api/?results=20')
      .then(response => response.json())
      .then(data => this.setState({ contacts: data.results }))
  }

  render() {
    const { contacts } = this.state

    return (
      <div className="contacts">
        {contacts.map(contact => (
          <Contact
            key={contact.id.value}
            contact={contact}
          />
        ))}
      </div>
    )
  }
}

export default Contacts
