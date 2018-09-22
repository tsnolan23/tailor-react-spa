const consul = require('consul')
const { parse } = require('url')
const { createReadStream } = require('fs')

const { getUrl, consulAddress, address, name, port } = require('./environment.js')
const renderStream = require('./render-stream.js')

const bundle = '/dist/bundle.js'
const pathToBundle = `.${bundle}`
const bundleStream = createReadStream(pathToBundle)


const { agent } = consul({
	host: consulAddress,
	promisify: true
})

agent.service.register({
	name,
	address,
	port
})
	.catch((e) => {
		'logowanie do spana'
	})

module.exports = (request, response) => {
	const { pathname } = parse(request.url)

	switch(pathname) {
		case bundle:
			response.writeHead(200, { 'Content-Type': 'application/javascript' })
			bundleStream.pipe(response)
			break
		default:
			response.writeHead(200, {
				'Content-Type': 'text/html',
				'Link': `<${getUrl(bundle)}>; rel="fragment-script"`
			})

			renderStream().pipe(response)
	}
}
