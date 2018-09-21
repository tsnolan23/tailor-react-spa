const Tailor = require('node-tailor')
const { initTracer, PrometheusMetricsFactory, ProbabilisticSampler } = require('jaeger-client')
const promClient = require('prom-client')
const bunyan = require('bunyan')
const consul = require('consul')({
  host: 'consul'
});

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
  consul.agent.service.list(function(err, result) {
  	Object.values(result)
			.filter(({ Service }) => Service === 'test2')
			.forEach(({ Address }) => {
				console.log(Address);

				// consul.agent.join(Address, ((er, res) => {
				// 	console.log(er, res);
				// }));
			});
  });
	if (req.url === '/favicon.ico') {
		res.writeHead(200, { 'Content-Type': 'image/x-icon' })
		res.end('')
	  return
	}

	req.headers['x-request-uri'] = req.url
	req.url = '/index'

	tailor.requestHandler(req, res)
}
