import React  from 'react'
import { Provider } from 'react-redux';

import Contacts from './app/Contacts'
import createStore from './app/store.js';


export default function createApp(state = []) {
	const store = createStore(state)

	const app = (
		<Provider store={store}>
			<Contacts/>
		</Provider>
	);

	return {
		app, store
	}
}
