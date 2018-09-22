const { address } = require('ip')


const setJaeger = (jaegerAddress) => ({ jaegerAddress })
const setConsul = (consulAddress) => ({ consulAddress })
const setName = (name) => ({ name })
const setAddress = (address) => ({ address })
const setPort = port => ({ port })

const { env } = process
const {
	JAEGER_HOST,
	CONSUL_HOST,
	npm_package_name,
	npm_package_config_port
} = env

module.exports = ({
	...setJaeger(JAEGER_HOST),
	...setConsul(CONSUL_HOST),
	...setName(npm_package_name),
	...setAddress(address()),
	...setPort(Number(npm_package_config_port))
})
