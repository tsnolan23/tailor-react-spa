const { address } = require('ip')


const setName = (name) => ({ name })
const setAddress = (address) => ({ address })
const setPort = port => ({ port })

const { env } = process
const {
	npm_package_name,
	npm_package_config_port
} = env

module.exports = ({
	...setName(npm_package_name),
	...setAddress(address()),
	...setPort(Number(npm_package_config_port))
})
