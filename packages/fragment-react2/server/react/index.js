const { renderToNodeStream } = require('react-dom/server.js')

const createState = require('./store')


const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

module.exports = pipe(
  ({ store, code }) => ({ code, state: createState(store) }),
	({ code }) => renderToNodeStream(code)
)
