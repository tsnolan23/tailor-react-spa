const { createBundleRenderer } = require('vue-server-renderer');


const { renderToStream } = createBundleRenderer(
	require('./dist/vue-ssr-server-bundle.json'),
	{
		runInNewContext: false,
		inject: false,
		template: `
		<!--vue-ssr-outlet-->
		{{{ renderState({ windowKey: '__RECOMMENDATIONS_STATE__' }) }}}
		{{{ renderStyles() }}}
		`
	}
);

module.exports = () => renderToStream({});
