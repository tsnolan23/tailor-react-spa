const consul = require('consul')
const { createReadStream } = require('fs')
const url = require('url')

const { presets } = require('./.babelrc.js')

require('@babel/register')({
  presets
})

const renderStream = require('./render-stream.js')
const { id, address, name, port } = require('./environment.js')


const { agent } = consul({
	host: 'consul',
	promisify: true
})

agent.service.register({
	id,
	name,
	address,
	port
})
	.catch(() => {
		'logowanie do spana'
	})

module.exports = (req, res) => {
	const pathname = url.parse(req.url).pathname
	const jsHeader = { 'Content-Type': 'application/javascript' }
	switch(pathname) {
		case '/dist/bundle.js':
			res.writeHead(200, jsHeader)
			createReadStream('./dist/bundle.js').pipe(res)
      break
		default:
			res.writeHead(200, {
				'Content-Type': 'text/html',
				'Link': '<http://localhost:80/dist/bundle.js> rel="fragment-script"'
			})

			renderStream().then(({ stream, state }) => {
				res.write(`
     			<script>window.CONTACTS_STATE = ${JSON.stringify(state).replace(/</g, '\\\u003c')}</script>
      `)
				stream.pipe(res)
			})
	}
}
