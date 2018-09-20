const Tailor = require('node-tailor')
const { initTracer, PrometheusMetricsFactory, ProbabilisticSampler } = require('jaeger-client');
const promClient = require('prom-client');
const bunyan = require('bunyan');

const config = {
	serviceName: 'my:awesome:service',
	reporter: {
		agentHost: "jaeger"
	}
};
const namespace = config.serviceName;
const metrics = new PrometheusMetricsFactory(promClient, namespace);

const logger = bunyan.createLogger({
	name: namespace
});
const tailor = new Tailor({
  templatesPath: __dirname + '/templates',
	/*

konsul

grafana
docker run -d --name=grafana -p 3000:3000 grafana/grafana

zipkin (nieuzywany)
docker run -d -p 9411:9411 openzipkin/zipkin

prometeus
https://prometheus.io/docs/prometheus/latest/getting_started/
	 */
	tracer: initTracer(
		config,
		{
			host: "jaeger",
			sampler: new ProbabilisticSampler(1),
			metrics,
			logger
		})
})

module.exports = (req, res) => {
	if (req.url === '/favicon.ico') {
		res.writeHead(200, { 'Content-Type': 'image/x-icon' })
		res.end('')
	  return;
	}

	req.headers['x-request-uri'] = req.url
	req.url = '/index'

	tailor.requestHandler(req, res)
};
