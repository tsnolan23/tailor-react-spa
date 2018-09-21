const { machineIdSync } = require('node-machine-id')
const { address } = require('ip')
const consul = require('consul')

const renderStream = require('./render-stream.js')


const { agent } = consul({
	host: 'consul',
	promisify: true
})

// @todo module.exports powinno zwracac server dopiero po rozwiazaniu:
agent.service.register({
	id: machineIdSync(),
	name: 'fragment-vue-http',
	address: address(),
	port: 80
})
	.catch(() => {
		'logowanie do spana';
	})

module.exports = async (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/html'
  })

  renderStream()
    .pipe(response);
}
