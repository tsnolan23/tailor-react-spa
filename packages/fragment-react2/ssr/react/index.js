const { renderToNodeStream } = require('react-dom/server.js')

const htmlState = require('./html-state.js')
const preloadState = require('./preload.js')
const preloadStyles = require('./styles.js')

const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)


module.exports = pipe(
	// @todo async await
	({ store, code }) => preloadState() && ({ store, code }),
	({ store, code }) => ({ code, htmlState: htmlState(store.getState()) }),
	({ code }) => renderToNodeStream(code)
)
