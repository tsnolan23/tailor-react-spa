const url = require('url')
const { createReadStream } = require('fs')

const renderStream = require('./render-stream.js');


const bundleStream = createReadStream('./dist/bundle.js');

module.exports = (req, res) => {
	const pathname = url.parse(req.url).pathname
	const jsHeader = { 'Content-Type': 'application/javascript' }
	switch(pathname) {
		case '/dist/bundle.js':
			res.writeHead(200, jsHeader)
			bundleStream.pipe(res)
			break;
		default:
			res.writeHead(200, {
				'Content-Type': 'text/html',
				'Link': '<http://localhost:5656/dist/bundle.js>; rel="fragment-script"'
			})

			renderStream().pipe(res);
	}
};
