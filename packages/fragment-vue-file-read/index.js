const consul = require('consul')
const { readFileSync } = require('fs')
const { initTracer, PrometheusMetricsFactory, ProbabilisticSampler } = require('jaeger-client')
const promClient = require('prom-client')
const bunyan = require('bunyan')
const { Tags, FORMAT_HTTP_HEADERS } = require('opentracing')

const renderStream = require('./render-stream.js')
const { consulAddress, address, hostname, port } = require('./environment.js')

const tracingAddress = 'jaeger'
const serviceName = 'frontend:microservices'

const tracer = initTracer(
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
		logger: bunyan.createLogger({
			name: serviceName
		})
	})

const { agent } = consul({
	host: consulAddress,
	promisify: true
})

agent.service.register({
	name: hostname,
	address,
	port
})
	.catch(() => {
		'logowanie do spana'
	})

module.exports = (request, response) => {
	const file = readFileSync('file-to-read.txt')

	response.write(file)

	const parentSpanContext = tracer.extract(
		FORMAT_HTTP_HEADERS,
		request.headers
	)
	const spanOptions = parentSpanContext ? { childOf: parentSpanContext } : {}

	const span = tracer.startSpan('teststata_asdaa', spanOptions)
	span.addTags({
		[Tags.HTTP_URL]: 'teateatae',
		[Tags.SPAN_KIND]: Tags.SPAN_KIND_RPC_SERVER
	})

	response.writeHead(200, {
		'Content-Type': 'text/html'
	})
	renderStream()
		.on('error', ({ message, stack }) => {
			span.setTag(Tags.ERROR, true)
			span.log({ message, stack })
			span.finish()
		})
		.pipe(response)
}
