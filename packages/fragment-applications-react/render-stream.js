import { renderToNodeStream } from 'react-dom/server';

import entryServer from './src/entry-server.js'


module.exports = () => {
	return entryServer()
		.then(({ state, markup }) => ({
			stream: renderToNodeStream(markup),
			state
		}));
};
