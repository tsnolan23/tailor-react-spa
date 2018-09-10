module.exports = () => {
  return {
		entry: './common.js',
		output: {
			path: __dirname + '/dist',
			filename: 'bundle.js',
			libraryTarget: 'umd'
		}
	};
}
