import React from 'react'
import PropTypes from 'prop-types'

import ContactPropType from '../PropTypes/Contact/index'

import styles from './styles.scss'
import ContactsDeep from '../ContactsDeep'

const Contact = ({
  contact
}) => (
  <div className={styles.contact}>
    <div className={styles['contact-details']}>
      <img className={styles['contact-avatar']} src={contact.picture.medium}/>
      <div className={styles['contact-name']}>
        <span className={styles['contact-first-name']}>{contact.name.first}</span>
        <span className={styles['contact-last-name']}>{contact.name.last}</span>
      </div>
      <span className={styles['contact-email']}>{contact.email}</span>
    </div>
    <ContactsDeep/>
  </div>
)

Contact.propTypes = {
  contact: ContactPropType.isRequired
}

export default Contact
