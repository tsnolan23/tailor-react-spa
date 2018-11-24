const consulRegistration = require('./ssr/consul.js')
const createServer = require('./ssr/server.js')
const initializeRoutes = require('./ssr/routes.js')
const environment = require('./ssr/environment.js')


const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

// @todo store, czy jesli apka nie potrzebuje store to ladowac reacta wczesniej
// @todo sprytnie zeby na serwerze ladowalo to co trzeba tylko - tak zrobic foldery
// @todo merge htmlState, css ze strumieniem
// @todo browserlist
// @todo apka kliencka, dev mode
// @todo optimize webpack

pipe(
	consulRegistration,
	async consul => consul.catch(() => /* @todo  obsluga */ null),
	createServer,
	initializeRoutes,
	server => server.listen(environment.port)
)(environment)
