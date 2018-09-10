const { presets } = require('./.babelrc.js');

require('@babel/register')({
  presets
});

const url = require('url')
const fs = require('fs')
const renderStream = require('./render-stream.js');

module.exports = (req, res) => {
	const pathname = url.parse(req.url).pathname
	const jsHeader = { 'Content-Type': 'application/javascript' }
	switch(pathname) {
		case '/dist/bundle.js':
			res.writeHead(200, jsHeader)
      fs.createReadStream('./dist/bundle.js').pipe(res)
      break;
		default:
			res.writeHead(200, {
				'Content-Type': 'text/html',
				'Link': '<http://localhost:1234/dist/bundle.js>; rel="fragment-script"'
			})

			renderStream().then(({ stream, state }) => {
				res.write(`
     			<script>window.CONTACTS_STATE = ${JSON.stringify(state).replace(/</g, '\\\u003c')}</script>
      `);
				stream.pipe(res);
			});
	}
}
