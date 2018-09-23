const consul = require('consul')
const { initTracer, PrometheusMetricsFactory, ProbabilisticSampler } = require('jaeger-client')
const promClient = require('prom-client')
const bunyan = require('bunyan')

const renderStream = require('./render-stream.js')
const { consulAddress, address, hostname, port } = require('./environment.js')

const tracingAddress = 'jaeger'
const serviceName = 'aaa:test'

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



module.exports = (request, response, a, b) => {
	const { globalTracer, Tags, FORMAT_HTTP_HEADERS } = require('opentracing');
	const tracer = globalTracer()
console.log(request.headers)
	const span = d.startSpan('teststata_asdaa');
	span.addTags({
		[Tags.HTTP_URL]: 'teateatae',
		[Tags.SPAN_KIND]: Tags.SPAN_KIND_RPC_SERVER
	});

	response.writeHead(200, {
    'Content-Type': 'text/html'
  })
  renderStream().pipe(response)
	span.finish();
}
