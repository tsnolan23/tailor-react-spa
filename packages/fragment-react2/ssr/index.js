const consulRegistration = require('./consul.js')
const createServer = require('./server.js')
const createLogger = require('./logger.js')
const defineRoutes = require('./routes.js')


const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

module.exports = pipe(
	consulRegistration,
	// @todo
	async (a) => a.catch(() => {}),
  createLogger,
	createServer,
	defineRoutes
)
