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
				'Link': '<http://localhost:6699/dist/bundle.js>; rel="fragment-script"'
			})

			renderStream().pipe(res);
	}
};
