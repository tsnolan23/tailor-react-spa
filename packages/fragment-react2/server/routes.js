const { createReadStream, readFileSync } = require('fs')
const { resolve } = require('path')
const { readdirSync } = require('fs')

const html = readFileSync(resolve('dist/index.html'), 'utf8')
const bootstrapApplication = require('./react')
const { code, store } = require('../dist/bundle.server.js')

const clientFiles = readdirSync(resolve('dist/client'))
console.log(clientFiles)
// @todo te bootstrap i disty nie pasuja tutaj - nie jest czysto

module.exports = server => server
	.get('/bundle.client.js', (_, reply) => reply
		.type('application/javascript')
		.send(createReadStream('./dist/bundle.client.js'))
	)

	.get('/favicon.ico', (_, reply) => reply
		.type('image/x-icon')
		.send(null)
	)

	.get('/', (_, reply) => {
    reply.res.write(html)
    bootstrapApplication({ code, store }).pipe(reply.res)

    reply
      .type('text/html')
      .header('link', `<bundle.client.js>; rel="fragment-script"`)
  })
