const consul = require('consul')

const renderStream = require('./render-stream.js')
const { address, name, port } = require('./environment.js')


const { agent } = consul({
	host: 'consul',
	promisify: true
})

agent.service.register({
	id,
	name,
	address,
	port
})
	.catch(() => {
		'logowanie do spana'
	})

module.exports = async (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/html'
  })

  renderStream()
    .pipe(response)
}
