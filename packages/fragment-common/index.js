const { machineIdSync } = require('node-machine-id')
const { address } = require('ip')
const consul = require('consul')
const url = require('url')
const fs = require('fs')

const { agent } = consul({
	host: 'consul',
	promisify: true
})

// @todo module.exports powinno zwracac server dopiero po rozwiazaniu:
agent.service.register({
	id: machineIdSync(),
	name: 'fragment-common',
	address: address(),
	port: Number(process.env.npm_package_config_port)
})
	.catch(() => {
		'logowanie do spana';
	})

module.exports = (req, res) => {
	const pathname = url.parse(req.url).pathname
	switch(pathname) {
		case '/dist/bundle.js':
			res.writeHead(200, { 'Content-Type': 'application/javascript' })
      fs.createReadStream('./dist/bundle.js').pipe(res);
			break
		default:
			res.writeHead(200, {
				'Content-Type': 'text/html',
				'Link': '<http://localhost:80/dist/bundle.js>; rel="fragment-script"'
			})
			return res.end('')
	}
}
