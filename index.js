'use strict'

const Tailor = require('node-tailor')
const tailor = new Tailor({
  templatesPath: __dirname + '/templates'
})

module.exports = (req, res) => {
	if (req.url === '/favicon.ico') {
		res.writeHead(200, { 'Content-Type': 'image/x-icon' })
		res.end('')
	  return;
	}

	req.headers['x-request-uri'] = req.url
	req.url = '/index'

	tailor.requestHandler(req, res)
};
