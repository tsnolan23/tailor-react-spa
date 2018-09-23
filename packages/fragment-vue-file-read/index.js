const consul = require('consul')
const { initTracer, PrometheusMetricsFactory, ProbabilisticSampler } = require('jaeger-client')
const promClient = require('prom-client')
const bunyan = require('bunyan')

const renderStream = require('./render-stream.js')
const { consulAddress, address, hostname, port } = require('./environment.js')

const tracingAddress = 'jaeger'
const serviceName = 'frontend:microservices'

const d = initTracer(
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

module.exports = (request, response, a, b) => {
	const { globalTracer, Tags, FORMAT_HTTP_HEADERS } = require('opentracing');
	// @todo dlaczego globalTracer nie loguje, tylko musze instancje?
	const tracer = globalTracer()
	const parentSpanContext = d.extract(
		FORMAT_HTTP_HEADERS,
		request.headers
	);
	const spanOptions = parentSpanContext ? { childOf: parentSpanContext } : {};

	const span = d.startSpan('teststata_asdaa', spanOptions);
	span.addTags({
		[Tags.HTTP_URL]: 'teateatae',
		[Tags.SPAN_KIND]: Tags.SPAN_KIND_RPC_SERVER
	});

	console.log(request.headers)
	response.writeHead(200, {
    'Content-Type': 'text/html'
  })
  renderStream().pipe(response)
	span.finish();
}
