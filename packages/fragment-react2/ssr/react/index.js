const { renderToNodeStream } = require('react-dom/server.js')

const createState = require('./store')

const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

const { Readable } = require('stream')
const s = new Readable({ encoding: 'utf8' })
s.push('your text here')
s.push(null);

s.on('data', (v) => console.log(v))
s.on('end', () => console.log(1))

module.exports = pipe(
  ({ store, code }) => ({ code, state: createState(store) }),
	({ code }) => renderToNodeStream(code)
)
