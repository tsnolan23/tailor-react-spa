const prepareServer = require('./server')


const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

// @todo store, czy jesli apka nie potrzebuje store to ladowac reacta wczesniej
// @todo merge htmlState, css ze strumieniem https://blog.vullum.io/javascript-flow-callback-hell-vs-async-vs-highland/
// @todo apka kliencka, dev mode
// @todo optimize webpack
// @todo do strumienia trzeba dodac artefakty npkg

// @todo consul jak bedzie zwracac

// @todo pino tee api - pino.destination do obslugi strumieni
// @todo routes.js cleanup

pipe(
  environment => ({ environment, server: prepareServer(environment) }),
  ({ environment, server }) => server.listen(environment.port, () => console.log(`${process.pid}`))
)(require('./server/environment.js'))
