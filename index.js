const Tailor = require('node-tailor')
const { initTracer, PrometheusMetricsFactory, ProbabilisticSampler } = require('jaeger-client')
const promClient = require('prom-client')
const bunyan = require('bunyan')
const consul = require('consul')

const { serviceName, tracingAddress, consulAddress } = require('./environment.js')


const { agent } = consul({
	host: consulAddress,
	promisify: true
})

const config = {
	serviceName,
	reporter: {
		agentHost: tracingAddress
	}
}
const metrics = new PrometheusMetricsFactory(promClient, serviceName)
const logger = bunyan.createLogger({
	name: serviceName
})
const { requestHandler } = new Tailor({
	handledTags: ['script'],
	handleTag(request, tag, options, context) {
		if (tag.attributes && tag.attributes.type === 'tailor/plugin') {
			return `<script>
								(function (d) {
						var i;
						require(d);
						var arr = ['react', 'react-dom', 'react-redux', 'redux', 'prop-types', 'classnames', 'vue', 'vuex', 'axios'];
						while (i = arr.pop()) (function (dep) {
							define(dep, d, function (b) {
								return b[dep];
							})
						})(i);
					}(['${context['service-common'].src}/dist/bundle.js']));
			</script>`
		}

		return ''
	},
	fetchContext: async () => {
		const [ services, error ] = await agent.service.list()
			.then((result) => [ result ])
			.catch((error) => [, error ])

		error && 'do spana i zabic serwer'

		const urls = Object.values(services)
			.map(({ Address, Port }) => 'http://' + Address + ':' + Port)

		return Promise.resolve(
			Object.keys(services)
				.reduce((prev, curr, index) => ({
					...prev,
					[curr]: {
						src: urls[index]
					}
				}), {})
		)
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
	if (request.url === '/favicon.ico') {
		response.writeHead(200, { 'Content-Type': 'image/x-icon' })
		response.end('')
	  return
	}

	request.headers['x-request-uri'] = request.url
	request.url = '/index'

	requestHandler(request, response)
}
