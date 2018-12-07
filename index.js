const { initTracer, PrometheusMetricsFactory, ProbabilisticSampler } = require('jaeger-client')
const promClient = require('prom-client')
const { createLogger } = require('bunyan')
const consul = require('consul')
const { createServer } = require('http')

const { serviceName, port, tracingAddress, consulAddress } = require('./environment.js')
const microservices = require('./microservices.js')


const { requestHandler } = microservices(
	consul({
		host: consulAddress,
		promisify: true
	}),

	initTracer(
		{
			serviceName,
			reporter: {
				agentHost: tracingAddress
			}
		},
		{
			host: tracingAddress,
			sampler: new ProbabilisticSampler(1),
			metrics: new PrometheusMetricsFactory(promClient, serviceName),
			logger: createLogger({
				name: serviceName
			})
		})
)

createServer((request, response) => {
	if (request.url === '/favicon.ico') {
		response.writeHead(200, { 'Content-Type': 'image/x-icon' })
		response.end('')
		return
	} else if (request.url !== '/') {
		return;
	}

	request.headers['x-request-uri'] = request.url
	request.url = '/index'

	requestHandler(request, response)
}).listen(port)
