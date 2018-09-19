import Vue from 'vue';

import Recommendations from './app/Recommendations.vue';


export default function createApp() {

	const app = new Vue({
		render: h => h(Recommendations)
	});

	return { app };
}
