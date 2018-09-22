const { address } = require('ip')


const setConsul = (consulHost) => ({ consulHost })
const setName = (name) => ({ name })
const setAddress = (address) => ({ address })
const setPort = port => ({ port })

const { env } = process
const {
	CONSUL_HOST,
	npm_package_name,
	npm_package_config_port
} = env

module.exports = ({
	...setConsul(CONSUL_HOST),
	...setName(npm_package_name),
	...setAddress(address()),
	...setPort(Number(npm_package_config_port))
})
