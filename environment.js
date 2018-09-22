const setConsul = (consulAddress) => ({ consulAddress })
const setTracing = (tracingAddress) => ({ tracingAddress })
const setName = (name) => ({ name })
const setServiceName = (serviceName) => ({ serviceName })

const { env } = process
const {
	TRACING_HOST,
	CONSUL_HOST,
	npm_package_name
} = env

module.exports = ({
	...setServiceName(npm_package_name.replace(/-/g, ':')),
	...setName(npm_package_name),
	...setTracing(TRACING_HOST),
	...setConsul(CONSUL_HOST)
})
