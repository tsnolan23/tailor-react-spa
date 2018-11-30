const fastify = require('fastify')


module.exports = logger => fastify({
	logger
})
  // @todo to another file
  // https://github.com/fastify/fastify/issues/534
  .addContentTypeParser('*', function (req, done) {
  done()
})
