const Tailor = require('node-tailor')
const tailorFragment = require('node-tailor/lib/fetch-template.js')
const tailorParse = require('node-tailor/lib/parse-template.js')
const { initTracer, PrometheusMetricsFactory, ProbabilisticSampler } = require('jaeger-client')
const promClient = require('prom-client')
const bunyan = require('bunyan')
const consul = require('consul')
const { render } = require('ejs')

const { name, tracingAddress, consulAddress } = require('./environment.js')


const { agent } = consul({
	host: consulAddress,
	promisify: true
})

const config = {
	serviceName: name,
	reporter: {
		agentHost: tracingAddress
	}
}
const namespace = config.serviceName
const metrics = new PrometheusMetricsFactory(promClient, namespace)
const logger = bunyan.createLogger({
	name: namespace
})
const localAddresses = {}
const { requestHandler } = new Tailor({
	fetchTemplate(request) {
		const templatePath = 'templates/index.html'
		return tailorFragment(templatePath)(request, (baseTemplate, childTemplate) => {
			// @todo cache based on consul services equality
			return tailorParse(['fragment'], ['script'])(render(baseTemplate, {localAddresses}), childTemplate ? render(childTemplate, { localAddresses }) : childTemplate)
		})
	},
	tracer: initTracer(
		config,
		{
			host: tracingAddress,
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
			localAddresses[a.Service] = 'http://' + a.Address + ':' + a.Port
		})

	if (request.url === '/favicon.ico') {
		response.writeHead(200, { 'Content-Type': 'image/x-icon' })
		response.end('')
	  return
	}

	request.headers['x-request-uri'] = request.url
	request.url = '/index'

	requestHandler(request, response)
}
