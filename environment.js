const setConsul = (consulAddress) => ({ consulAddress })
const setTracing = (tracingAddress) => ({ tracingAddress })
const setName = (name) => ({ name })

const { env } = process
const {
	TRACING_HOST,
	CONSUL_HOST,
	npm_package_name
} = env

module.exports = ({
	...setName(npm_package_name),
	...setTracing(TRACING_HOST),
	...setConsul(CONSUL_HOST)
})
