const setConsul = (consulAddress) => ({ consulAddress })
const setApplicationName = (applicationName) => ({ applicationName })
const setPort = port => ({ port })
const setCdn = cdn => ({ cdn })
const setAssetsList = assets => ({ assets })

const {
  CDN_ADDRESS,
  PORT,
	ASSETS_LIST,
	CONSUL_HOST,
	npm_package_name,
  npm_package_config_cdn,
	npm_package_config_port,
	npm_package_config_consul,
  npm_package_config_assets
} = process.env

module.exports = ({
	...setConsul(CONSUL_HOST || npm_package_config_consul),
	...setApplicationName(npm_package_name),
	...setPort(PORT || npm_package_config_port),
  ...setCdn(CDN_ADDRESS || npm_package_config_cdn),
  ...setAssetsList(ASSETS_LIST || npm_package_config_assets)
})
