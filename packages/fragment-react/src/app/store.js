import { createStore } from 'redux';

import reducers from './reducers.js';


export default function create(state) {
	return createStore(reducers, state);
};
