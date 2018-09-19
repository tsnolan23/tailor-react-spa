import createApp from './index.js';


export default (context) => new Promise((resolve, reject) => {
	const { app, store } = createApp();

	store.dispatch('fetchItems')
		.then(() => {
			context.state = store.state;
			resolve(app);
		})
		.catch(reject);
})
