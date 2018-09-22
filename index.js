const Tailor = require('node-tailor')
const tailorFragment = require('node-tailor/lib/request-fragment.js')
const filterReqHeadersFn = require('node-tailor/lib/filter-headers.js')
const { initTracer, PrometheusMetricsFactory, ProbabilisticSampler } = require('jaeger-client')
const promClient = require('prom-client')
const bunyan = require('bunyan')
const consul = require('consul')


const { agent } = consul({
	host: 'consul',
	promisify: true
})

const config = {
	serviceName: 'my:awesome:service',
	reporter: {
		agentHost: 'jaeger'
	}
}
const namespace = config.serviceName
const metrics = new PrometheusMetricsFactory(promClient, namespace)
const logger = bunyan.createLogger({
	name: namespace
})
const z = new Map();
const tailor = new Tailor({
  templatesPath: __dirname + '/templates',
	// requestFragment(url, attributes, request, span = null) {
  // 	const src = z.get(attributes.id);
	// 	return tailorFragment(filterReqHeadersFn)(src, attributes, request, span)
	// },
	tracer: initTracer(
		config,
		{
			host: 'jaeger',
			sampler: new ProbabilisticSampler(1),
			metrics,
			logger
		})
})

module.exports = async (request, response) => {
  const [ services, error ] = await agent.service.list()
		.then((result) => [ result ])
		.catch((error) => [, error ])

  error && 'do spana i zabic serwer'

	Object.values(services)
		.forEach((a) => {
			console.log(a);
			z.set(a.Service, 'http://' + a.Address + ':' + a.Port)
		})

	if (request.url === '/favicon.ico') {
		response.writeHead(200, { 'Content-Type': 'image/x-icon' })
		response.end('')
	  return
	}

	request.headers['x-request-uri'] = request.url
	request.url = '/index'

	tailor.requestHandler(request, response)
}
