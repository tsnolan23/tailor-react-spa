const setConsul = (consulAddress) => ({ consulAddress })
const setTracing = (tracingAddress) => ({ tracingAddress })

const { env } = process
const {
	TRACING_HOST,
	CONSUL_HOST
} = env

module.exports = ({
	...setTracing(TRACING_HOST),
	...setConsul(CONSUL_HOST)
})
