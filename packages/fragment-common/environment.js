const { machineIdSync } = require('node-machine-id')
const { address } = require('ip')


const setId = (id) => ({ id })
const setName = (name) => ({ name })
const setAddress = (address) => ({ address })
const setPort = port => ({ port })

const getUrlFromPort = (port) => (path) => {
	return `//test.local:${port}/${path}`
}

const { env } = process
const {
	npm_package_name,
	npm_package_config_port
} = env

module.exports = ({
	...setId(machineIdSync()),
	...setName(npm_package_name),
	...setAddress(address()),
	...setPort(Number(npm_package_config_port)),

	getUrl: getUrlFromPort(npm_package_config_port)
})
