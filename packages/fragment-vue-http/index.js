const { machineIdSync } = require('node-machine-id')
const { address } = require('ip')
const consul = require('consul')

const renderStream = require('./render-stream.js')


const { agent } = consul({
	host: 'consul',
	promisify: true
})

module.exports = async (request, response) => {
  const [, error] = await agent.service.register({
    id: machineIdSync(),
    name: 'test2',
    address: address(),
    port: 80
  })
    .then(() => [true])
    .catch((error) => [, error])

	error && 'proszę to wyslać do spana i wywalić serwis'

  response.writeHead(200, {
    'Content-Type': 'text/html'
  })

  renderStream()
    .pipe(response);
}
