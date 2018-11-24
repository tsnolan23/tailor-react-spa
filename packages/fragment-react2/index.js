const consulRegistration = require('./ssr/consul.js')
const createServer = require('./ssr/server.js')
const initializeRoutes = require('./ssr/routes.js')
const environment = require('./ssr/environment.js')


const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

pipe(
	consulRegistration,
	createServer,
	initializeRoutes,
	server => server.listen(environment.port)
)(environment)
