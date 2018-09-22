const consul = require('consul')

const renderStream = require('./render-stream.js')
const { consulHost, address, name, port } = require('./environment.js')


const { agent } = consul({
	host: consulHost,
	promisify: true
})

agent.service.register({
	name,
	address,
	port
})
	.catch((e) => {
		'logowanie do spana'
	})

module.exports = (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  })
  renderStream().pipe(res)
}
