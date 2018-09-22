const setConsul = (consulAddress) => ({ consulAddress })
const setJaeger = (jaegerAddress) => ({ jaegerAddress })

const { env } = process
const {
	JAEGER_HOST,
	CONSUL_HOST
} = env

module.exports = ({
	...setJaeger(JAEGER_HOST),
	...setConsul(CONSUL_HOST)
})
