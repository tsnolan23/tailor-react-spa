const consulRegistration = require('./consul.js')
const createServer = require('./server.js')
const defineRoutes = require('./routes.js')


const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

module.exports = pipe(
	consulRegistration,
	createServer,
	defineRoutes
)
