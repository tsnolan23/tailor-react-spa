const { renderToNodeStream } = require('react-dom/server.js')

const htmlState = require('./html-state.js')
const preloadState = require('./preload.js')

const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)


module.exports = pipe(
	// @todo async await
	(compiledReact) => preloadState() && ({ ...compiledReact }),
	({ store, app }) => ({ app, htmlState: htmlState(store.getState()) }),
	({ app, htmlState }) => ({ htmlState, stream: renderToNodeStream(app) })
)
