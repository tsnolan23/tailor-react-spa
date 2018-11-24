const { createReadStream } = require('fs')

const consulRegistration = require('./node/consul.js')
const createServer = require('./node/server.js')
const environment = require('./node/environment.js')

const bootstrap = require('./node/react')

const serverCode = require('./dist/server')


const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

pipe(
	consulRegistration,
	async consul => consul.catch(() => /* @todo  obsluga */ null),

	createServer,

	server => server.get('/favicon.ico', (_, reply) => reply
		.type('image/x-icon')
		.send(null)
	),
	server => server.get('/foo.js', (_, reply) => reply
		.type('application/javascript')
		.send(createReadStream('./dist/bundle.js'))
	),
	server => server.get('/', (_, reply) => reply
		.type('text/html')
		.header('link', `<foo.js>; rel="fragment-script"`)
		// @todo apka react
		// @todo merge htmlState ze strumieniem
		// @todo css
		// @todo state
		// .send(htmlState)
		.send(bootstrap(serverCode).stream)
	),

	server => server.listen(environment.port)
)(environment)
