const pino = require('pino')


const logger = pino(pino.destination('./logs'))

process.on('uncaughtException', pino.final(logger, (err, finalLogger) => {
  finalLogger.error(err, 'uncaughtException')
  process.exit(1)
}))

process.on('unhandledRejection', pino.final(logger, (err, finalLogger) => {
  finalLogger.error(err, 'unhandledRejection')
  process.exit(1)
}))

module.exports = () => logger
