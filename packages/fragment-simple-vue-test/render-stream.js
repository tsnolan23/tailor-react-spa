const { createBundleRenderer } = require('vue-server-renderer');


const { renderToStream } = createBundleRenderer(
	require('./dist/vue-ssr-server-bundle.json'),
	{
		runInNewContext: false,
		inject: false,
		template: `
		{{{ renderStyles() }}}
		<!--vue-ssr-outlet-->
		`
	}
);

module.exports = () => renderToStream({});
