module.exports = () => {
	return {
		entry: './src/entry-server.js',
		target: 'node',
		externals: /^[a-z\-0-9]+$/,
		output: {
			path: __dirname + '/dist',
			libraryTarget: 'commonjs2',
			filename: 'server.js'
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader'
				},
				// {
				// 	test: /\.scss$/,
				// 	loader: [
				// 		'style-loader',
				// 		{
				// 			loader: 'css-loader',
				// 			options: {
				// 				importLoaders: 1,
				// 				modules: true,
				// 				localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
				// 			}
				// 		},
				// 		'sass-loader'
				// 	]
				// }
			]
		}
	};
}
