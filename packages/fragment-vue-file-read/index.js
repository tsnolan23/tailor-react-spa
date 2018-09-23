const consul = require('consul')
const fs = require('fs');

const renderStream = require('./render-stream.js')
const { consulAddress, address, name, port } = require('./environment.js')

const { agent } = consul({
	host: consulAddress,
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

module.exports = (request, response) => {


	const file = fs.readFileSync('file-to-read.txt');

	response.write(file);


	renderStream().pipe(response);
}
