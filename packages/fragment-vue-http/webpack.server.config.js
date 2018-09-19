const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const VueSSRPlugin = require('vue-server-renderer/server-plugin');

module.exports = {
	// The target should be set to "node" to avoid packaging built-ins.
	target: 'node',
	entry: './src/entry-server.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: '/dist/',
		filename: 'bundle.js',
		libraryTarget: 'commonjs2'
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
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js'
		}
	},
	// We can remove the devServer block.
	performance: {
		hints: false
	},
	// Avoids bundling external dependencies, so node can load them directly from node_modules/
	externals: Object.keys(require('./package.json').dependencies),
	devtool: 'source-map',
	plugins: [
		new VueSSRPlugin(),
		new VueLoaderPlugin()
	]
}