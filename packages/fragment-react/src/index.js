import React  from 'react'
import { Provider } from 'react-redux';

import Contacts from './app/Contacts'
import createStore from './app/store.js';


export default function createApp(state) {
	return (
		<Provider store={createStore(state)}>
			<Contacts/>
		</Provider>
	);
}
