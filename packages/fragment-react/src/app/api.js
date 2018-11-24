import axios from 'axios';

const makeRequest = () => {
	return axios.get('https://randomuser.me/api/?results=15')
		.catch(() => ({
			data: {
				results: []
			}
		}))
		.then(({ data }) => data.results)
}

export {
	makeRequest
}
