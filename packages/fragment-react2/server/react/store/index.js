const toHtml = require('./html.js')
const preloadState = require('./preload.js')


const pipe = (...fns) => x => fns.reduce((v, f) => v.then(f), Promise.resolve(x))

module.exports = pipe(
  preloadState,
  ({ store, name }) => Promise.resolve(toHtml({ store, name }))
)
