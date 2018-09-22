const { address } = require('ip')


const setConsul = (consulAddress) => ({ consulAddress })
const setTracing = (tracingAddress) => ({ tracingAddress })
const setName = (name) => ({ name })
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
	npm_package_name,
	npm_package_config_port
} = env

module.exports = ({
	...setTracing(TRACING_HOST),
	...setConsul(CONSUL_HOST),
	...setName(npm_package_name),
	...setAddress(address()),
	...setPort(Number(npm_package_config_port)),

	getUrl: getUrlFromPort(npm_package_config_port)
})
