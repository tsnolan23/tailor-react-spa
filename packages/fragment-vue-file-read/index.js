const consul = require('consul')
const { createReadStream } = require('fs')
const { initTracer, PrometheusMetricsFactory, ProbabilisticSampler } = require('jaeger-client')
const promClient = require('prom-client')
const bunyan = require('bunyan')
const { Tags, FORMAT_HTTP_HEADERS } = require('opentracing')
var http = require('http');

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

console.log({ consulAddress, address, hostname, port });

agent.service.register({
	name: hostname,
	address,
	port
})
	.catch((e) => {
	console.log(e);
		'logowanie do spana'
	})

http.createServer(function (request, response)  {

	response.writeHead(200, {
		'Content-Type': 'text/html'
	})

	const file = createReadStream('file-to-read.txt')

	file.pipe(response);

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
}).listen(5000);
/*
module.exports = (request, response) => {

	response.writeHead(200, {
		'Content-Type': 'text/html'
	})

	const file = createReadStream('file-to-read.txt')

	file.pipe(response);

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
}
*/
