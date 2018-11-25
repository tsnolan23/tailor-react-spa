const toHtml = require('./html.js')
const preloadState = require('./preload.js')


const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

module.exports = pipe(
  preloadState,
  toHtml
)
