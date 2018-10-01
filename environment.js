const setConsul = (consulAddress) => ({ consulAddress })
const setTracing = (tracingAddress) => ({ tracingAddress })
const setName = (name) => ({ name })
const setServiceName = (serviceName) => ({ serviceName })
const setPort = port => ({ port })

const { env } = process
const {
	TRACING_HOST,
	CONSUL_HOST,
	npm_package_name,
	npm_package_config_port
} = env

module.exports = ({
	...setServiceName(npm_package_name.replace(/-/g, ':')),
	...setName(npm_package_name),
	...setTracing(TRACING_HOST),
	...setConsul(CONSUL_HOST),
	...setPort(Number(npm_package_config_port))
})
