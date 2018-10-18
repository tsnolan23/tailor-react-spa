import Vue from 'vue';

import createStore from './app/store.js';
import Recommendations from './app/Recommendations.vue';


export default function createApp() {
	const store = createStore();

	const app = new Vue({
		store,
		render: h => h(Recommendations)
	});

	return { app, store };
}
