import React, { Component } from 'react'
import axios from 'axios'
import Contact from '../Contact'
import './styles.scss'

class Contacts extends Component {

  constructor(props) {
    super(props)
    this.state ={
      contacts: []
    }
  }

  componentWillMount() {
    this.fetchContacts()
  }

  fetchContacts() {
    axios.get('https://randomuser.me/api/?results=20').then((response) => {
      this.setState({ contacts: response.data.results })
    })
  }

  render() {
    const { contacts } = this.state
    return(
      <div className="contacts">
        {
          contacts.length > 0 && contacts.map((contact) => {
            return <Contact key={contact.id.value}/>
          })
        }
      </div>
    )
  }

}

export default Contacts
