const consul = require('consul')
const { createServer } = require('http')

const renderStream = require('./render-stream.js')
const { consulAddress, address, hostname, port } = require('./environment.js')


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

createServer((request, response) => {
	response.writeHead(200, {
		'Content-Type': 'text/html'
	})

	renderStream()
		.on('error', ({ message, stack }) => {
			console.log(message, stack)
		})
		.pipe(response)
}).listen(port)
