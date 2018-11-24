import { hydrate } from 'react-dom';

import createApp from './index.js';


const { app } = createApp(window.CONTACTS_STATE);


hydrate(
	app,
	document.getElementById('contacts')
);
