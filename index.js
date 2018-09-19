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
	name: namespace
});
const tailor = new Tailor({
  templatesPath: __dirname + '/templates',
	/*

	Jagger
	docker run -d -p5775:5775/udp -p6831:6831/udp -p6832:6832/udp -p16686:16686 -e SPAN_STORAGE_TYPE=elasticsearch -e ES_SERVER_URLS=http://172.17.0.2:9200 jaegertracing/all-in-one:latest

	 https://github.com/jaegertracing/jaeger-client-node/issues/121

https://github.com/jaegertracing/jaeger-client-node/issues/124

grafana
docker run -d --name=grafana -p 3000:3000 grafana/grafana

zipkin (nieuzywany)
docker run -d -p 9411:9411 openzipkin/zipkin

prometeus
https://prometheus.io/docs/prometheus/latest/getting_started/

elasticsearch
docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -e "network.host=0.0.0.0" docker.elastic.co/elasticsearch/elasticsearch:6.4.0

https://stackoverflow.com/questions/47341662/cannot-connect-to-elasticsearch-on-docker-from-golang
https://github.com/olivere/elastic/issues/470

kibana

do poduszki:
https://www.jaegertracing.io/docs/1.6/deployment/#elasticsearch
https://github.com/jaegertracing/jaeger/tree/master/plugin/storage/es
	 */
	tracer: initTracer(
		config,
		{
			reporter: {
				collectorEndpoint: 'http://jaeger:14268/api/traces'
			},
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
