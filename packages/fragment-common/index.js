const consul = require('consul')
const { parse } = require('url')
const { createReadStream } = require('fs')

const { consulHost, address, name, port, getUrl } = require('./environment.js')


const { agent } = consul({
	host: consulHost,
	promisify: true
})

agent.service.register({
	name,
	address,
	port
})
	.catch(() => {
		'logowanie do spana'
	})

module.exports = (request, response) => {
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
			return response.end('')
	}
}
