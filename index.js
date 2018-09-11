'use strict'

const Tailor = require('node-tailor')
const { initTracer, PrometheusMetricsFactory, ConstSampler } = require('jaeger-client');
const promClient = require('prom-client');
const bunyan = require('bunyan');

const config = {
	serviceName: 'my:awesome:service'
};
const namespace = config.serviceName;
const metrics = new PrometheusMetricsFactory(promClient, namespace);

const logger = bunyan.createLogger({
	name: 'hello-world'
});
const tailor = new Tailor({
  templatesPath: __dirname + '/templates',
	/*
	docker run -d -p5775:5775/udp -p6831:6831/udp -p6832:6832/udp -p16686:16686 jaegertracing/all-in-one:latest
	 https://github.com/jaegertracing/jaeger-client-node/issues/121
	 */
	tracer: initTracer(
		config,
		{
			host: '127.0.0.1',
			port: 6832,
			metrics,
			logger,
			sampler: new ConstSampler(true)
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
