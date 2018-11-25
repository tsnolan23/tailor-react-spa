const prepareServer = require('./ssr')


const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

// @todo store, czy jesli apka nie potrzebuje store to ladowac reacta wczesniej
// @todo merge htmlState, css ze strumieniem https://blog.vullum.io/javascript-flow-callback-hell-vs-async-vs-highland/
// @todo apka kliencka, dev mode
// @todo optimize webpack
// @todo server.css czy bundle.css
// @todo logger reqeusts log, logger.js stworzyc i dodac do pipe, http logger

pipe(
  environment => ({ environment, server: prepareServer(environment) }),
  ({ environment, server }) => server.listen(environment.port, () => console.log(`${process.pid}`))
)(require('./ssr/environment.js'))
