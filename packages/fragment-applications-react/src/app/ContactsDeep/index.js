import React from 'react'
import PropTypes from 'prop-types'
import { Provider, connect } from 'react-redux';

import Contact from '../Contact/index'
import ContactPropType from '../PropTypes/Contact/index'

import styles from './styles.scss'
import ContactDeep from '../ContactDeep'

const ContactsDeep = ({ contacts }) => (
	<div className={styles.contacts}>
		{contacts.map((contact, index) => (
			<div key={index}>
				<ContactDeep
					contact={contact}
				/>
				<ContactDeep
					contact={contact}
				/>
				<ContactDeep
					contact={contact}
				/>
			</div>
		))}
	</div>
)

ContactsDeep.propTypes = {
	contacts: PropTypes.arrayOf(ContactPropType)
}

const foo = (state) => ({ contacts: state });

export default connect(foo)(ContactsDeep);
