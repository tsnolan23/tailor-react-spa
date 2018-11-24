const setConsul = (consulAddress) => ({ consulAddress })
const setApplicationName = (applicationName) => ({ applicationName })
const setPort = port => ({ port })


const {
	CONSUL_HOST,
	npm_package_name,
	npm_package_config_port
} = process.env

module.exports = ({
	...setConsul(CONSUL_HOST),
	...setApplicationName(npm_package_name),
	...setPort(npm_package_config_port)
})
