import createApp from './index.js';


const { app, store } = createApp();

store.replaceState(window.__RECOMMENDATIONS_STATE__);
app.$mount('#poc-vue-test');
