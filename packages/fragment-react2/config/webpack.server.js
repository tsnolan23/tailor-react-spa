const { resolve } = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")


module.exports = () => {
	return {
		entry: resolve('src/test.jsx'),
		target: 'node',
		// exclude all imports from build starts without relative path
    // https://github.com/liady/webpack-node-externals
		externals: /^[a-z\-0-9]+$/,
		output: {
			path: resolve('dist'),
			libraryTarget: 'commonjs2',
			filename: 'server.js'
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: 'bundle.css'
			})
		],
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
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
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
