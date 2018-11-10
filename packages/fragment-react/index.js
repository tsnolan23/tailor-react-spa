import { renderToNodeStream } from 'react-dom/server.js'

const consul = require('consul')
const { createReadStream } = require('fs')
const { parse } = require('url')
const { createServer } = require('http')

const { presets } = require('./.babelrc.js')

require('@babel/register')({
  presets
})

import entryServer from './src/entry-server'

const { consulAddress, address, hostname, port, getUrl } = require('./environment.js')


const { agent } = consul({
	host: consulAddress,
	promisify: true
})
agent.service.register({
	name: hostname,
	address,
	port
})
	.catch(() => {
		'logowanie do spana'
	})

createServer(async (request, response) => {
	const { pathname } = parse(request.url)

	const bundle = '/dist/bundle.js'
	const pathToBundle = `.${bundle}`

	switch(pathname) {
		case bundle:
			response.writeHead(200, { 'Content-Type': 'application/javascript' })
			createReadStream(pathToBundle)
				.pipe(response)
			break
		default:
			response.writeHead(200, {
				'Content-Type': 'text/html',
				'Link': `<${getUrl(bundle)}>; rel="fragment-script"`
			})

			const { stream, state } = await entryServer()
				.then(({ state, markup }) => ({
					stream: renderToNodeStream(markup),
					state
				}))

			response.write(`
     			<script>window.CONTACTS_STATE = ${JSON.stringify(state).replace(/</g, '\\\u003c')}</script>
      `)
			stream.pipe(response)
	}
}).listen(port)
