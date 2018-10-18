import axios from 'axios'
import React from 'react'

import createApp from './index.js'


export default () => {
	return axios.get('https://randomuser.me/api/?results=15')
		.catch(() => ({
			data: {
				results: []
			}
		}))
		.then(({ data }) => data.results)
		.then((state) => {
			const markup = (
				<div id="contacts">
					{createApp(state)}
				</div>
			);
			return {
				state,
				markup
			};
		});
};
