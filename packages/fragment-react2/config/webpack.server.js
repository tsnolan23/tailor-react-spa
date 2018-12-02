const { resolve } = require('path')
const nodeExternals = require('webpack-node-externals')


module.exports = () => {
	return {
		entry: {
		  server: resolve('src/index.jsx')
    },
		target: 'node',
		externals: [ nodeExternals() ],
		output: {
			path: resolve('dist'),
			libraryTarget: 'commonjs2',
			filename: 'bundle.server.js'
		},
		module: {
			rules: [
				{
					test: /\.js?x$/,
					exclude: /node_modules/,
					loader: 'babel-loader'
				},
				{
					test: /\.scss$/,
					use: [
						{
							loader: 'css-loader/locals',
							options: {
								importLoaders: 1,
								locals: true,
								modules: true,
								localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
							}
						},
						'sass-loader'
					]
				}
			]
		}
	}
}
