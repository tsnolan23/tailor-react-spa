const VueLoaderPlugin = require('vue-loader/lib/plugin');


module.exports = () => {
	return {
		entry: './src/entry.js',
		output: {
			path: __dirname + '/dist',
			filename: 'bundle.js',
			libraryTarget: 'amd'
		},
		module: {
			rules: [
				{
					test: /\.vue$/,
					use: 'vue-loader'
				},
				{
					test: /\.css$/,
					use: [
						'vue-style-loader',
						'css-loader',
					]
				},
				{
					test: /\.js$/,
					use: 'babel-loader',
					exclude: /node_modules/
				}
			]
		},
		plugins: [
			new VueLoaderPlugin()
		],
		externals: {
			'axios': 'axios',
			'vue': 'vue',
			'vuex': 'vuex'
		}
	}
};
