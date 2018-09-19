module.exports = {
	presets: [
		'@babel/preset-env',
		'@babel/preset-react'
	],
	env: {
		server: {
			plugins: [
				[
					'css-modules-transform',
					{
						"generateScopedName": "[path]___[name]__[local]___[hash:base64:5]",
						"extensions": [".scss"]
					}
				]
			]
		}
	}
};
