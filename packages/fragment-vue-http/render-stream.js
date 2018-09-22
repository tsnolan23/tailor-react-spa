const { createBundleRenderer } = require('vue-server-renderer')


const { renderToStream } = createBundleRenderer(
	require('./dist/vue-ssr-server-bundle.json'),
	{
		runInNewContext: false,
		inject: false,
		template: `
		{{{ renderState({ windowKey: '__RECOMMENDATIONS_STATE__' }) }}}
		{{{ renderStyles() }}}
		<!--vue-ssr-outlet-->
		`
	}
)

module.exports = () => renderToStream({})
