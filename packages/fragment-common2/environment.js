const setConsul = (consulAddress) => ({ consulAddress })
const setApplicationName = (applicationName) => ({ applicationName })
const setPort = port => ({ port })

const {
  PORT,
	CONSUL_HOST,
	npm_package_name,
	npm_package_config_port,
	npm_package_config_consul
} = process.env

module.exports = ({
	...setConsul(CONSUL_HOST || npm_package_config_consul),
	...setApplicationName(npm_package_name),
	...setPort(PORT || npm_package_config_port)
})
