const consul = require('consul')
const { parse } = require('url')
const { createReadStream } = require('fs')
const { createServer } = require('http')

const { getUrl, consulAddress, address, hostname, port } = require('./environment.js')
const renderStream = require('./render-stream.js')

const bundle = '/dist/bundle.js'
const pathToBundle = `.${bundle}`
const bundleStream = createReadStream(pathToBundle)


const { agent } = consul({
	host: consulAddress,
	promisify: true
})

agent.service.register({
	name: hostname,
	address,
	port
})
	.catch((e) => {
		'logowanie do spana'
	})

createServer((request, response) => {
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
}).listen(port)
