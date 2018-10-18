import React  from 'react'
import { hydrate } from 'react-dom';

import createApp from './index.js'


hydrate(
	createApp(window.CONTACTS_STATE),
	document.getElementById('contacts')
);
