const consul = require('consul')


module.exports = function registerConsul({ applicationName, consulAddress, hostname, port }) {
	// @todo address will be received from consul bridge
	const address = '1231'

	const { agent } = consul({
		host: consulAddress,
		promisify: true
	})

	return agent.service.register({
		name: applicationName,
		address,
		port
	})
}
