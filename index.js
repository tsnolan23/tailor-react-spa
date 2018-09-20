const Tailor = require('node-tailor')
const { initTracer, PrometheusMetricsFactory, ProbabilisticSampler } = require('jaeger-client')
const promClient = require('prom-client')
const bunyan = require('bunyan')

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
const tailor = new Tailor({
  templatesPath: __dirname + '/templates',
	tracer: initTracer(
		config,
		{
			host: 'jaeger',
			sampler: new ProbabilisticSampler(1),
			metrics,
			logger
		})
})

module.exports = (req, res) => {
	if (req.url === '/favicon.ico') {
		res.writeHead(200, { 'Content-Type': 'image/x-icon' })
		res.end('')
	  return
	}

	req.headers['x-request-uri'] = req.url
	req.url = '/index'

	tailor.requestHandler(req, res)
}
