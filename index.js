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

	Jagger
	docker run -d -p5775:5775/udp -p6831:6831/udp -p6832:6832/udp -p9200:9200 -p16686:16686 -e SPAN_STORAGE_TYPE=elasticsearch -e ES_SERVER_URLS=http://192.168.1.4:9200 jaegertracing/all-in-one:latest

	 https://github.com/jaegertracing/jaeger-client-node/issues/121

	 % sysctl net.inet.udp.maxdgram
net.inet.udp.maxdgram: 9216
% sudo sysctl net.inet.udp.maxdgram=65536
net.inet.udp.maxdgram: 9216 -> 65536
% sudo sysctl net.inet.udp.maxdgram
net.inet.udp.maxdgram: 65536

https://github.com/jaegertracing/jaeger-client-node/issues/124


prometeus
https://prometheus.io/docs/prometheus/latest/getting_started/
./prometheus --config.file=prometheus.yml

elasticsearch
https://www.elastic.co/guide/en/elasticsearch/guide/current/running-elasticsearch.html

https://www.jaegertracing.io/docs/1.6/deployment/#elasticsearch

https://stackoverflow.com/questions/47341662/cannot-connect-to-elasticsearch-on-docker-from-golang
https://github.com/olivere/elastic/issues/470

https://github.com/jaegertracing/jaeger/tree/master/plugin/storage/es
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
