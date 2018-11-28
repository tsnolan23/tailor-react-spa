const { createReadStream } = require('fs')

const bootstrapApplication = require('./react')
const { code, store } = require('../dist/server.js')


// @todo te bootstrap i disty nie pasuja tutaj - nie jest czysto

module.exports = server => server
	.get('/foo.js', (_, reply) => reply
		.type('application/javascript')
		.send(createReadStream('./dist/bundle.js'))
	)

	.get('/bundle.css', (_, reply) => reply
		.type('text/css')
		.send(createReadStream('./dist/bundle.css'))
	)

	.get('/favicon.ico', (_, reply) => reply
		.type('image/x-icon')
		.send(null)
	)

	.get('/', (_, reply) => reply
		.type('text/html')
		.header('link', `<foo.js>; rel="fragment-script", <bundle.css>; rel="stylesheet"`)
		.send(bootstrapApplication({ code, store }))
	)
