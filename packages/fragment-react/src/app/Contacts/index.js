import React from 'react'
import PropTypes from 'prop-types'
import { Provider, connect } from 'react-redux';

// import Contact from '../Contact/index'

// import styles from './styles.scss'

// const Contacts = ({ contacts }) => (
// 	<div className={styles.contacts}>
// 		{contacts.map((contact, index) => (
// 			<Contact
// 				key={index}
// 				contact={contact}
// 			/>
// 		))}
// 	</div>
// )
const Contacts = ({ contacts }) => (
	<div>
		{contacts.map((contact, index) => (
			<div key={index}>asdada</div>
		))}
	</div>
)

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object)
}

const foo = (state) => ({ contacts: state });

export default connect(foo)(Contacts);
