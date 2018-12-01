const { readFileSync } = require('fs')
const { resolve, dirname } = require('path')

const react = require('./react')
const { assets } = require('./environment.js')
const { client, server, view } = require(resolve(assets))
const { code, store } = require(resolve(dirname(assets), server.js))
const jsClient = readFileSync(resolve(dirname(assets), client.js), 'utf8')
const index = readFileSync(resolve(dirname(assets), view.html), 'utf8')


// @todo te bootstrap i disty nie pasuja tutaj - nie jest czysto
module.exports = server => server
	.get(`/${client.js}`, (_, reply) => reply
		.type('application/javascript')
		.send(jsClient)
	)

	.get('/favicon.ico', (_, reply) => reply
		.type('image/x-icon')
		.send(null)
	)

	.get('/', (_, reply) => {
    reply.res.write(index)
    react({ code, store }).pipe(reply.res)

    reply
      .type('text/html')
      .header('link', `<${client.js}>; rel="fragment-script"`)
  })
