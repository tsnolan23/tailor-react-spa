const Tailor = require('node-tailor')
const filterReqHeadersFn = require('node-tailor/lib/filter-headers.js')


module.exports = ({ agent }, tracer) => {
	return new Tailor({
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
		filterRequestHeaders(attributes, request) {
			return {
				...filterReqHeadersFn(attributes, request),
				'Custom-header': 12312312312
			}
		},
		fetchContext: async () => {
			const [ services, error ] = await agent.service.list()
				.then((result) => [ result ])
				.catch((error) => [, error ])

			error && 'do spana i zabic serwer'

			const urls = Object.values(services)
				.map(({ Address, Port }) => 'http://' + Address + ':' + Port)
				//.map(({ Address, Port }) => 'http://localhost:' + Port)

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
		tracer
	})
}
