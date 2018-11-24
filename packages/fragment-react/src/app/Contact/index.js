import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.scss'

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
  </div>
)

Contact.propTypes = {
  contact: PropTypes.object.isRequired
}

export default Contact
