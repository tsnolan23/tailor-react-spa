module.exports = () => {
	return {
		entry: './src/index.js',
		output: {
			path: __dirname + '/dist',
			filename: 'bundle.js',
			libraryTarget: 'amd'
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader'
				},
				{
					test: /\.scss$/,
					loader: [
						'style-loader',
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1,
								modules: true,
								localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
							}
						},
						'sass-loader'
					]
				}
			]
		},
		externals: {
			'react': 'react',
			'axios': 'axios',
			'react-dom': 'react-dom',
			'react-redux': 'react-redux',
			'redux': 'redux',
			'prop-types': 'prop-types',
			'classnames': 'classnames'
		}
	};
}