const { address } = require('ip')


const setHostname = (hostname) => ({ hostname })
const setTracing = (tracingAddress) => ({ tracingAddress })
const setConsul = (consulAddress) => ({ consulAddress })
const setApplicationName = (applicationName) => ({ applicationName })
const setAddress = (address) => ({ address })
const setPort = port => ({ port })

const getUrlFromPort = (port) => (path) => {
	// @todo
	return `//localhost:${port}/${path}`
}

const { env } = process
const {
	TRACING_HOST,
	CONSUL_HOST,
	HOSTNAME,
	npm_package_name,
	npm_package_config_port
} = env

module.exports = ({
	...setHostname(HOSTNAME),
	...setTracing(TRACING_HOST),
	...setConsul(CONSUL_HOST),
	...setApplicationName(npm_package_name),
	...setAddress(address()),
	...setPort(Number(npm_package_config_port)),

	getUrl: getUrlFromPort(npm_package_config_port)
})
