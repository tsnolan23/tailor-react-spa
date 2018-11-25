const prepareServer = require('./ssr')


const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

pipe(
  environment => ({ environment, server: prepareServer(environment) }),
  ({ environment, server }) => server.listen(environment.port)
)(require('./ssr/environment.js'))
